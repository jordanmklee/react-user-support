import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import Checkbox from '@material-ui/core/Checkbox';
import CreateIcon from '@material-ui/icons/Create';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem'
import { TablePagination } from "@material-ui/core";

import Controls from "./Controls";

import axios from "axios";
const GET_URL = "https://bimiscwebapi-test.azurewebsites.net/api/users/GetUsersSupport/";
const DELETE_URL = "https://bimiscwebapi-test.azurewebsites.net/api/users/DeleteUserSupport/";
const POST_URL = "https://bimiscwebapi-test.azurewebsites.net/api/users/SaveUserSupport/";
const GET_RECORD_STATUS_URL = "https://bimiscwebapi-test.azurewebsites.net/api/users/GetRecordStatusListForUsers/";

class Grid extends React.Component{
	state = {
		records: [],
		deleteMode: false,
		editMode: false,
		totalNumRecords: 0,
		numRecordsPerPage: 20,
		pageNumber: 1,

		recordStatusValues: [],
	};

	componentDidMount(){
		// API: GetRecordStatusListForUsers
		axios.get(GET_RECORD_STATUS_URL)
		.then(res => {
			this.setState({recordStatusValues: res.data.data})
		})

		// Populate grid values from API call
		axios.get(this.generateUrl())
		.then(res => {
			this.setState({totalNumRecords: parseInt(res.data.message)});	
		})

		this.getRecords("");
	}

	// Generates URL for API call using state variables
	generateUrl = () => {
		return GET_URL
				+ this.state.numRecordsPerPage + "/"
				+ this.state.pageNumber + "/";
	}

	// Retrieves records from API, based on state variables
	getRecords = (term) => {
		axios.get(this.generateUrl() + term)
			.then(res => {
				var newNumRecords = parseInt(res.data.message);
				
				var newState = [];
				res.data.data.forEach(record => {
					newState = newState.concat({
						key: record.id,
						isSelected: false,
						edited: false,
						id: record.id,
						userId: record.userId,
						screenName: record.screenName,
						description: record.description,
						recordStatusId: record.recordStatusId,
						dateCreated: record.dateCreated,
						dateModified: record.dateModified,
						createdBy: record.createdBy,
						modifiedBy: record.modifiedBy,

						recordStatusValues: this.state.recordStatusValues,
					});
				})
		
				this.setState({records: newState, totalNumRecords: newNumRecords});
			})
	}

	// Updates grid items based on API search
	handleSearchChange = (term) => {
		this.getRecords(term);
	}

	// Deletes all selected RecordItems
	handleDeleteClick = () => {
		// Get list of IDs to delete
		// TODO delete the array deleteIds, just do everything on API and re-render
		// (this will solve the pagination item count not updating on delete)
		var deleteIds = [];
		this.state.records.forEach(record => {
			if(record.isSelected){
				deleteIds = deleteIds.concat(record.id);

				// Delete using API
				axios.delete(DELETE_URL + record.id + "/" + record.userId)
					.then(res => { console.log(res); })		// TODO delete printout
			}
		})

		// Create new state by filtering the IDs to delete from prev state
		var newState = this.state.records.filter(e => !deleteIds.includes(e.id));
		this.setState({records: newState, deleteMode: false});		// Once deleted, disable button again
	}

	
	// TODO TextFields every onChange updates the state; slow input!
	handleEditClick = () => {
		var toggle = !this.state.editMode;		// Toggles editMode state variable

		
		// Edit all changed records via API
		this.state.records.forEach((record) => {
			if(record.edited){
				let editedRecord = {
					"Id": record.id,
					"ScreenName": record.screenName,
					"Description": record.description,
					"RecordStatusId": record.recordStatusId,
					"ModifiedBy": "1",			// TODO Hardcoded
				}

				let config = {
					"Content-Type": 'application/json',
					"Accept": 'application/json',
				}

				console.log("Attempting to POST")
				console.log(editedRecord)
				axios.post(POST_URL, editedRecord, config)
			}
		})

		this.setState({editMode: toggle})
	}

	// Update state to reflect changed TextField for ScreenName
	handleScreenNameChange = (id, value) => {
		let newRecords = [];
		this.state.records.forEach(record => {
			if(record.id === id){
				newRecords = newRecords.concat({
					key: record.id,
					isSelected: record.isSelected,
					edited: true,
					id: record.id,
					userId: record.userId,
					screenName: value.target.value,		// New ScreenName
					description: record.description,
					recordStatusId: record.recordStatusId,
					dateCreated: record.dateCreated,
					dateModified: record.dateModified,
					createdBy: record.createdBy,
					modifiedBy: record.modifiedBy,

					recordStatusValues: record.recordStatusValues,
				})
			}
			else
				newRecords = newRecords.concat(record)
		})

		this.setState({records: newRecords});
	}

	// Update state to reflect changed TextField for Description
	handleDescriptionChange = (id, value) => {
		let newRecords = [];
		this.state.records.forEach(record => {
			if(record.id === id){
				newRecords = newRecords.concat({
					key: record.id,
					isSelected: record.isSelected,
					edited: true,
					id: record.id,
					userId: record.userId,
					screenName: record.screenName,
					description: value.target.value,		// New Description
					recordStatusId: record.recordStatusId,
					dateCreated: record.dateCreated,
					dateModified: record.dateModified,
					createdBy: record.createdBy,
					modifiedBy: record.modifiedBy,

					recordStatusValues: record.recordStatusValues,
				})
			}
			else
				newRecords = newRecords.concat(record)
		})

		this.setState({records: newRecords});
	}

	// Updates isChecked for de/selected RecordItems
	handleCheck = (item) => {
		var newStateRecords = [];

		this.state.records.forEach(record => {
			if(record.id === item.props.id){
				var toggledSelect = !record.isSelected;

				newStateRecords = newStateRecords.concat({
						key: record.key,
						isSelected: toggledSelect,			// Toggle isSelected between true and false
						id: record.id,
						userId: record.userId,
						screenName: record.screenName,
						description: record.description,
						recordStatus: record.recordStatus,
						dateCreated: record.dateCreated,
						dateModified: record.dateModified,
						createdBy: record.createdBy,
						modifiedBy: record.modifiedBy,

						recordStatusValues: record.recordStatusValues,
				})
			}
			else{
				newStateRecords = newStateRecords.concat(record);
			}
		})
		
		// Undisable delete button when at least one record selected
		var newDeleteMode = false;
		newStateRecords.forEach(record => {
			if(record.isSelected)
				newDeleteMode = true;
		})

		this.setState({records: newStateRecords, deleteMode: newDeleteMode})
	}

	// Updates grid items from API for new page selected from pagination component
	handlePageChange = (newPageNum) => {
		this.setState({pageNumber: parseInt(newPageNum+1)}, () => { 
			this.getRecords("");
		});
	}

	// Updates number of grid items based on selected value from pagination component
	handleRowsPerPageChange = (newRowsPerPage) => {
		this.setState({numRecordsPerPage: parseInt(newRowsPerPage)}, () => {
			this.getRecords("");
		})
	}

	render(){
		return(
			<>
				<Controls
					deleteMode={this.state.deleteMode}
					editMode={this.state.editMode}
					onDeleteClick={this.handleDeleteClick}
					onEditClick={this.handleEditClick}
					onSearchChange={this.handleSearchChange}
				/>
				<table style={{"width":"100%"}}>
					<GridHeader/>
					<RecordList
						records={this.state.records}
						editMode={this.state.editMode}
						handleCheck={this.handleCheck}
						handleScreenNameChange={this.handleScreenNameChange}
						handleDescriptionChange={this.handleDescriptionChange}
						recordStatusValues={this.state.recordStatusValues}
				/>
				</table>
				<GridPagination
					numRecords={this.state.totalNumRecords}
					numRecordsPerPage={this.state.numRecordsPerPage}
					pageNumber={this.state.pageNumber}
					onPageChange={this.handlePageChange}
					onRowsPerPageChange={this.handleRowsPerPageChange}
				/>
			</>
		)
	}
}



class GridHeader extends React.Component{
	render(){
		return(
			<thead>
				<tr>
					<th>&nbsp;</th>
					<th>&nbsp;</th>
					<th>ID</th>
					<th>Screen Name</th>
					<th>Description</th>
					<th>Record Status</th>
					<th>Date Created</th>
					<th>Date Modified</th>
					<th>Created By</th>
					<th>Modified By</th>
				</tr>
			</thead>
		)
	}
}



class RecordList extends React.Component{
	render(){
		const records = this.props.records.map((record) => {
			return(
				<RecordItem
					key={record.key}
					isSelected={record.isSelected}
					edited={record.edited}
					id={record.id}
					userId={record.userId}
					screenName={record.screenName}
					description={record.description}
					recordStatusId={record.recordStatusId}
					dateCreated={record.dateCreated}
					dateModified={record.dateModified}
					createdBy={record.createdBy}
					modifiedBy={record.modifiedBy}

					editMode={this.props.editMode}
					onCheckChange={this.props.handleCheck}
					onScreenNameChange={this.props.handleScreenNameChange}
					onDescriptionChange={this.props.handleDescriptionChange}

					recordStatusValues={this.props.recordStatusValues}
				/>
			)
		})

		return(
			<tbody>
				{records}
			</tbody>
		)
	}
}
RecordList.propTypes = {
	isSelected: PropTypes.bool,
	editMode: PropTypes.bool,
}



class RecordItem extends React.Component{
	state = {
		recordStatusName: "",
	}

	componentDidMount(){
		// Convert prop.recordStatusId into the corresponding name
		let id = this.props.recordStatusId
		this.props.recordStatusValues.forEach((value) => {
			if(value.id === id){
				this.setState({recordStatusName: value.name})
			}
		})
	}

	render(){
		const handleCheckClick = () => {
			this.props.onCheckChange(this);
		}

		const handleScreenNameChange = (value) => {
			this.props.onScreenNameChange(this.props.id, value);
		}

		const handleDescriptionChange = (value) => {
			this.props.onDescriptionChange(this.props.id, value);
		}

		return(
			<tr>
				<td>
					{!this.props.editMode
					? <Checkbox checked={this.props.isSelected} onChange={handleCheckClick}/>
					: <Checkbox checked={this.props.isSelected} disabled/>}
				</td> 
				<td>
					{!this.props.editMode
					? <Link to={{
						pathname: "/edit",
						state: { id: this.props.id }
						}}>
						<Button variant="outlined" color="primary">
							<CreateIcon fontSize="small"/>
						</Button>
					</Link>
					: <Button variant="outlined" disabled>
						<CreateIcon fontSize="small"/>
					</Button>}
				</td>
				<td>{this.props.id}</td>
				{this.props.editMode
					? <td><TextField variant="filled" onChange={handleScreenNameChange}
						defaultValue={this.props.screenName}/></td> 
					: <td>{this.props.screenName}</td>}
				{this.props.editMode
					? <td><TextField variant="filled" onChange={handleDescriptionChange}
						defaultValue={this.props.description}/></td>
					: <td>{this.props.description}</td>}
				{this.props.editMode
					? <td>{	<FormControl variant="filled" style={{width: "100%"}}>
								<Select
									value={this.props.recordStatusId}
									fullWidth>
									{this.props.recordStatusValues.map((value) => (
										<MenuItem key={value.id} value={value.id}>{value.name}</MenuItem>
										))}
								</Select>
							</FormControl>
							} </td>
					: <td>{this.state.recordStatusName}</td>}
				<td>{this.props.dateCreated}</td>
				<td>{this.props.dateModified}</td>
				<td>{this.props.createdBy}</td>
				<td>{this.props.modifiedBy}</td>
			</tr>
		)
	}
}
RecordItem.propTypes = {
	isSelected: PropTypes.bool
}



function GridPagination(props){
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(props.numRecordsPerPage);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
		props.onPageChange(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(event.target.value);
		setPage(0);
		props.onRowsPerPageChange(event.target.value);
	};

	return(
		<TablePagination
			rowsPerPageOptions={[5, 10, 20, 50, 100, 500, 1000]}
			component="div"
			count={props.numRecords}
			rowsPerPage={rowsPerPage}
			page={page}
			onChangePage={handleChangePage}
			onChangeRowsPerPage={handleChangeRowsPerPage}
      />
	)
	
}
GridPagination.propTypes = {
	numRecords: PropTypes.number
}

export default Grid;