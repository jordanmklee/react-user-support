import React from "react";
import { Link } from "react-router-dom";

import TextField from '@material-ui/core/TextField';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from '@material-ui/core/FormControl';
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
import Button from "@material-ui/core/Button";

import axios from "axios";
const POST_URL = "https://bimiscwebapi-test.azurewebsites.net/api/users/SaveUserSupport/";
const GET_RECORD_STATUS_URL = "https://bimiscwebapi-test.azurewebsites.net/api/users/GetRecordStatusListForUsers/";

class Edit extends React.Component{
	state = {
		screenName: "",
		description: "",
		recordStatus: "",	// Default recordStatus is 1 (New)
	}

	handleNewScreenName = (value) => {
		this.setState({screenName: value.target.value})
	}

	handleNewDescription = (value) => {
		this.setState({description: value.target.value})
	}

	handleNewRecordStatus = (value) => {
		this.setState({recordStatus: value.target.value})
	}

	// Creates new record and submits it via API
	handleSaveClick = (event) => {
		let newRecord = {
			"Id": "0",									// TODO Hardcoded ID = 0 for ADD
			"ScreenName": this.state.screenName,
			"Description": this.state.description,
			"RecordStatusId": this.state.recordStatus,
			"ModifiedBy": "1",							// TODO Hardcoded 1 = Michael Jackson
		}

		let config = {
			"Content-Type": 'application/json',
			"Accept": 'application/json',
		}

		axios.post(POST_URL, newRecord, config)
			.then(res => {
				console.log(res.data);
			})
	}

	render(){
		// TODO use GetUserBySupportId API to fill in the default values when editing
		// TODO use GetRecordStatusListForUsers API to fill in the Record Status dropdown values
		var recordStatusValues;
		axios.get(GET_RECORD_STATUS_URL)
			.then(res => {
				recordStatusValues = res.data.data;
				//console.log(recordStatusValues);
			});

		return(
			<div>
				<div className="editContainer">
					<h2>Edit</h2>
					<div style={{padding: 10}}>
						<TextField label="Screen Name" variant="filled" fullWidth onChange={this.handleNewScreenName}/>
					</div>
					<div style={{padding: 10}}>
						<TextField label="Description" variant="filled" fullWidth onChange={this.handleNewDescription}/>
					</div>
					<div style={{padding: 10}}>
					<FormControl style={{width: "100%"}}>
						<InputLabel>Record Status</InputLabel>
						<Select
							value={this.state.recordStatus}
							onChange={this.handleNewRecordStatus}
							fullWidth>
							<MenuItem value={1}>New</MenuItem>
							<MenuItem value={2}>Visible</MenuItem>
							<MenuItem value={3}>Not Visible</MenuItem>
						</Select>
					</FormControl>
					</div>

					<ul className="buttonContainer">
						<li><Link to="/">
							<Button variant="contained" color="secondary">BACK</Button>
						</Link></li>
						<li><Link to="/">
							<Button variant="contained" color="primary" onClick={this.handleSaveClick}>SAVE</Button>
						</Link></li>
					</ul>
				</div>
			</div>
		)
	}
}

export default Edit;