import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import Checkbox from '@material-ui/core/Checkbox';
import CreateIcon from '@material-ui/icons/Create';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import { TablePagination } from "@material-ui/core";

import axios from "axios";

import Controls from "./Controls";

class Grid extends React.Component{
	state = {
		records: [],
		deleteMode: false,
		editMode: false,
		totalNumRecords: 0,
		numRecordsPerPage: 20,
		pageNumber: 1,
		searchString: "",
	};

	// Populate grid values from API call
	componentDidMount(){
		axios.get(this.generateUrl())
		.then(res => {
			this.setState({totalNumRecords: parseInt(res.data.message)});	
		})

		this.getRecords();
	}



	// Generates URL for API call using state variables
	generateUrl = () => {
		return "https://bimiscwebapi-test.azurewebsites.net/api/users/GetUsersSupport"
				+ "/" + this.state.numRecordsPerPage
				+ "/" + this.state.pageNumber
				+ "/" + this.state.searchString;
	}



	getRecords = () => {
		axios.get(this.generateUrl())
			.then(res => {
				var newState = [];
				res.data.data.forEach(record => {
					newState = newState.concat({
						key: record.id,
						isSelected: false,
						id: record.id,
						screenName: record.screenName,
						description: record.description,
						recordStatus: record.recordStatus,
						dateCreated: record.dateCreated,
						dateModified: record.dateModified,
						createdBy: record.createdBy,
						modifiedBy: record.modifiedBy,
					});
				})
		
				this.setState({records: newState});
			})
	}



	handleDeleteClick = () => {
		// Get list of IDs to delete
		var deleteIds = [];
		this.state.records.forEach(record => {
			if(record.isSelected)
				deleteIds = deleteIds.concat(record.id);
		})

		// TODO delete using API

		// Create new state by filtering the IDs to delete from prev state
		var newState = this.state.records.filter(e => !deleteIds.includes(e.id));
		this.setState({records: newState, deleteMode: false});		// Once deleted, disable button again
	}



	// Toggles editMode state variable
	handleEditClick = () => {
		var toggle = !this.state.editMode;
		this.setState({editMode: toggle})
	}



	handleCheck = (item) => {
		var newStateRecords = [];

		this.state.records.forEach(record => {
			if(record.id === item.props.id){
				var toggledSelect = !record.isSelected;

				newStateRecords = newStateRecords.concat({
						key: record.key,
						isSelected: toggledSelect,			// Toggle isSelected between true and false
						id: record.id,
						screenName: record.screenName,
						description: record.description,
						recordStatus: record.recordStatus,
						dateCreated: record.dateCreated,
						dateModified: record.dateModified,
						createdBy: record.createdBy,
						modifiedBy: record.modifiedBy,
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



	handlePageChange = (newPageNum) => {
		this.setState({pageNumber: parseInt(newPageNum+1)}, () => { 
			this.getRecords();
		});
	}



	handleRowsPerPageChange = (newRowsPerPage) => {
		this.setState({numRecordsPerPage: parseInt(newRowsPerPage)}, () => {
			this.getRecords();
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
				/>
				<table style={{"width":"100%"}}>
					<GridHeader/>
					<RecordList
						records={this.state.records}
						editMode={this.state.editMode}
						handleCheck={this.handleCheck}
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
					id={record.id}
					screenName={record.screenName}
					description={record.description}
					recordStatus={record.recordStatus}
					dateCreated={record.dateCreated}
					dateModified={record.dateModified}
					createdBy={record.createdBy}
					modifiedBy={record.modifiedBy}

					editMode={this.props.editMode}
					onCheckChange={this.props.handleCheck}
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
	render(){
		const handleCheckClick = () => {
			this.props.onCheckChange(this);
		}

		return(
			<tr>
				<td><Checkbox 
					checked={this.props.isSelected}
					onChange={handleCheckClick}/>
				</td> 
				<td>
					<Link to="/edit">
						<Button
						variant="outlined">
							<CreateIcon fontSize="small"/>
						</Button>
					</Link>
				</td>
				<td>{this.props.id}</td>
				{this.props.editMode
					? <td><TextField variant="outlined" defaultValue={this.props.screenName}/></td> 
					: <td>{this.props.screenName}</td>}
				{this.props.editMode
					? <td><TextField variant="outlined" defaultValue={this.props.description}/></td>
					: <td>{this.props.description}</td>}
				{this.props.editMode
					? <td><TextField variant="outlined" defaultValue={this.props.recordStatus}/></td>
					: <td>{this.props.recordStatus}</td>}
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