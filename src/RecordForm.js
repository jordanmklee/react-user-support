import React from "react"
import { Link } from "react-router-dom";

import TextField from '@material-ui/core/TextField';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';
import Button from "@material-ui/core/Button";

import axios from "axios";
const POST_URL = "https://bimiscwebapi-test.azurewebsites.net/api/users/SaveUserSupport/";
const GET_RECORD_STATUS_URL = "https://bimiscwebapi-test.azurewebsites.net/api/users/GetRecordStatusListForUsers/";

class ReactForm extends React.Component{
	state = {
		screenName: "",
		description: "",
		recordStatus: "",
		error: false,
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
		
		// Error checking for filled out form
		if(!(this.state.screenName === ""
			|| this.state.description === ""
			|| this.state.recordStatus === "")){
			this.setState({error: false});
				
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
			
			// TODO redirect on success
		}
		else{
			console.log("Fill out the form before submitting!");
			this.setState({error: true});
		}
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
			<div className="editContainer">
				<h2>{this.props.title}</h2>

				<div className="inputContainer">
					{this.state.error
						? <TextField label="Screen Name" variant="filled" error helperText="Required" required fullWidth onChange={this.handleNewScreenName}/>
						: <TextField label="Screen Name" variant="filled" required fullWidth onChange={this.handleNewScreenName}/>}
				</div>
				
				<div className="inputContainer">
					{this.state.error
						? <TextField label="Description" variant="filled" error helperText="Required" required fullWidth onChange={this.handleNewDescription}/>
						: <TextField label="Description" variant="filled" required fullWidth onChange={this.handleNewDescription}/>}
				</div>
				
				<div className="inputContainer" style={{paddingLeft: "35px", paddingRight: "35px"}}>
					{this.state.error
						? <FormControl style={{width: "100%"}}>
							<InputLabel error required>Record Status</InputLabel>
							<Select
								value={this.state.recordStatus}
								onChange={this.handleNewRecordStatus}
								fullWidth
								error>
								<MenuItem value={1}>New</MenuItem>
								<MenuItem value={2}>Visible</MenuItem>
								<MenuItem value={3}>Not Visible</MenuItem>
							</Select>
							<FormHelperText error>Required</FormHelperText>
						</FormControl>
						: <FormControl style={{width: "100%"}}>
							<InputLabel required>Record Status</InputLabel>
							<Select
								value={this.state.recordStatus}
								onChange={this.handleNewRecordStatus}
								fullWidth>
								<MenuItem value={1}>New</MenuItem>
								<MenuItem value={2}>Visible</MenuItem>
								<MenuItem value={3}>Not Visible</MenuItem>
							</Select>
						</FormControl>}
					
				</div>

				<ul className="buttonContainer">
					<li><Link to="/">
						<Button variant="contained" color="secondary">BACK</Button>
					</Link></li>
					<li>
						<Button variant="contained" color="primary" onClick={this.handleSaveClick}>SAVE</Button>
					</li>
				</ul>

			</div>
		)
	}
}

export default ReactForm;
