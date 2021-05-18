import React from "react";
import PropTypes from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';
import CreateIcon from '@material-ui/icons/Create';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import { TablePagination } from "@material-ui/core";

class Grid extends React.Component{
	// TODO Remove this hardcoded state
	state = {
		records: [
			{
				isSelected: true,
				id: 1,
				screenName: "John Smith",
				description: "lorem ipsum",
				recordStatus: "record a",
				dateCreated: Date.now(),
				dateModified: Date.now(),
				createdBy: "John Smith",
				modifiedBy: "John Smith",
			},
			{
				isSelected: false,
				id: 1,
				screenName: "Jane Smith",
				description: "ipsum lorem",
				recordStatus: "record b",
				dateCreated: Date.now(),
				dateModified: Date.now(),
				createdBy: "Jane Smith",
				modifiedBy: "Jane Smith",
			},
		]
	};

	render(){
		return(
			<>
				<table style={{"width":"100%"}}>
					<GridHeader/>
					<RecordList
						records={this.state.records}
					/>
				</table>
				<GridPagination></GridPagination>
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
					isSelected={record.isSelected}
					id={record.id}
					screenName={record.screenName}
					description={record.description}
					recordStatus={record.recordStatus}
					dateCreated={record.dateCreated}
					dateModified={record.dateModified}
					createdBy={record.createdBy}
					modifiedBy={record.modifiedBy}
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
	isSelected: PropTypes.bool
}



class RecordItem extends React.Component{	
	render(){
		const editMode = true;	// TODO this needs to update based on EDIT button
		const isSelected = this.props.isSelected;

		return(
			<tr>
				<td><Checkbox checked={isSelected}></Checkbox></td>
				<td><Button><CreateIcon fontSize="small"/></Button></td>
				<td>{this.props.id}</td>
				{editMode
					? <td><TextField id="outlined-basic" variant="outlined" defaultValue={this.props.screenName}/></td> 
					: <td>{this.props.screenName}</td>}
				{editMode
					? <td><TextField id="outlined-basic" variant="outlined" defaultValue={this.props.description}/></td>
					: <td>{this.props.description}</td>}
				{editMode
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


class GridPagination extends React.Component{
	render(){
		return(
			<TablePagination
				component="div"
				count={100}
				rowsPerPage={20}
				rowsPerPageOptions={[5, 10, 20, 50, 100, 500, 1000]}
			/>
		)
	}
}

export default Grid;