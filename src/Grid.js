import React from "react";
import Controls from "./Controls";

import PropTypes from 'prop-types';

import { v4 as uuidv4 } from 'uuid';

import Checkbox from '@material-ui/core/Checkbox';
import CreateIcon from '@material-ui/icons/Create';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import { TablePagination } from "@material-ui/core";

import axios from "axios";

class Grid extends React.Component{
	state = {
		records: [],
		editMode: false
	};

	// Populates grid values from API call
	componentDidMount(){
		axios.get("https://bimiscwebapi-test.azurewebsites.net/api/users/GetUsersSupport/20/1")	// TODO ?
			.then(res => {
				var newState = [];
				res.data.data.forEach(record => {
					newState = newState.concat({
						//key: uuidv4(),
						key: record.id,
						uniqueId: uuidv4(),
						isSelected: false,
						id: record.userId,
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

	
	// TODO something wrong with this? keys seem to be being reused (look up proper way to delete element from state array)
	// TODO Also, selection makes ID col entry disappear?
	deleteRecord = (deleteIds) => {
		console.log("Deleting " + deleteIds);
		var newStateRecords = [];
		deleteIds.forEach(deleteId => {
			this.state.records.forEach(record => {
				if(record.uniqueId !== deleteId){
					newStateRecords = newStateRecords.concat(record);
				}
			})
		})

		this.setState({records: newStateRecords})
	}


	handleDeleteClick = () => {
		var deleteIds = [];
		
		this.state.records.forEach(record => {
			if(record.isSelected){
				console.log("TODO delete: " + record.uniqueId);
				deleteIds = deleteIds.concat(record.uniqueId);
			}
		})
		this.deleteRecord(deleteIds);
	}

	handleEditClick = () => {
		var toggle = !this.state.editMode;
		this.setState({editMode: toggle})
	}

	handleCheck = (item) => {
		var newStateRecords = [];

		this.state.records.forEach(record => {
			if(record.uniqueId === item.props.uniqueId){
				var toggledSelect = !record.isSelected;
				newStateRecords = newStateRecords.concat({
						key: record.key,
						uniqueId: record.uniqueId,
						isSelected: toggledSelect,
						id: record.Id,
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
			this.setState({records: newStateRecords})
		})

	}

	render(){
		return(
			<>
				<Controls
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
					numRecords={this.state.records.length}
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



// TODO render elements selected by the pagination
class RecordList extends React.Component{
	render(){
		const records = this.props.records.map((record) => {
			return(
				<RecordItem
					key={record.key}
					uniqueId={record.uniqueId}
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
				<td><Button variant="outlined"><CreateIcon fontSize="small"/></Button></td>
				<td>{this.props.id}</td>
				{this.props.editMode
					? <td><TextField id="outlined-basic" variant="outlined" defaultValue={this.props.screenName}/></td> 
					: <td>{this.props.screenName}</td>}
				{this.props.editMode
					? <td><TextField id="outlined-basic" variant="outlined" defaultValue={this.props.description}/></td>
					: <td>{this.props.description}</td>}
				{this.props.editMode
					? <td><TextField id="outlined-basic" variant="outlined" defaultValue={this.props.recordStatus}/></td>
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
	const [rowsPerPage, setRowsPerPage] = React.useState(20);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
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