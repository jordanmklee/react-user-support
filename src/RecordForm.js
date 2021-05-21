import React from "react"
import { Link } from "react-router-dom";
import { Redirect } from 'react-router'

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
const GET_RECORD_BY_ID_URL = "https://bimiscwebapi-test.azurewebsites.net/api/users/GetUserSupportById/";

class RecordForm extends React.Component{
	state = {
		id: 0,

		screenName: "",
		description: "",
		recordStatus: "",

		dateCreated: "",
		dateModified: "",
		createdBy: "",
		modifiedBy: "",
		
		error: null,
		recordStatusValues: [],
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
			let newRecord = {
				"Id": this.state.id,									// ID = 0 tells API to add new record; add/edit if ID != 0
				"ScreenName": this.state.screenName,
				"Description": this.state.description,
				"RecordStatusId": this.state.recordStatus,
				"ModifiedBy": "1",							// TODO Hardcoded 1 = Michael Jackson
			}
	
			let config = {
				"Content-Type": 'application/json',
				"Accept": 'application/json',
			}
	
			// Add new record to API and redirect to grid view
			axios.post(POST_URL, newRecord, config)
				.then(() =>{
					console.log("[SUCCESS] Added!")
					this.setState({error: false})
				})
		}
		else{
			console.log("Fill out the form before submitting!");
			this.setState({error: true});
		}
	}



	componentDidMount(){
		// API: GetRecordStatusListForUsers
		axios.get(GET_RECORD_STATUS_URL)
			.then(res => {
				this.setState({recordStatusValues: res.data.data})
			})

		// If editing existing record, get existing record details for props.id from API
		if(this.props.location.state.id !== 0){
			axios.get(GET_RECORD_BY_ID_URL + this.props.location.state.id)
			.then(res => {
				this.setState({
					id: this.props.location.state.id,
					screenName: res.data.data.screenName,
					description: res.data.data.description,
					recordStatus: res.data.data.recordStatusId,
	
					dateCreated: res.data.data.dateCreated,
					dateModified: res.data.data.dateModified,
					createdBy: res.data.data.createdBy,
					modifiedBy: res.data.data.modifiedBy,
				})
			})
		}
	}

	render(){
		// Redirect on save
		if(this.state.error === false)
			return <Redirect to="/"/>
		
		return(
			<div>
				{/* ID field; only show if id != 0 (ie. Adding new record) */}
				{(this.state.id !== 0)
					?(	<div className="inputContainer">
							<TextField label="ID" variant="filled" disabled fullWidth value={this.state.id}/>
						</div>
					)
				: <></> }



				{/* Regular form */}
				<div className="inputContainer">
					{this.state.error
						? <TextField label="Screen Name" variant="outlined" error helperText="Required" required fullWidth onChange={this.handleNewScreenName} value={this.state.screenName}/>
						: <TextField label="Screen Name" variant="outlined" required fullWidth onChange={this.handleNewScreenName} value={this.state.screenName}/>}
				</div>
				
				<div className="inputContainer">
					{this.state.error
						? <TextField label="Description" variant="outlined" error helperText="Required" required fullWidth onChange={this.handleNewDescription} value={this.state.description}/>
						: <TextField label="Description" variant="outlined" required fullWidth onChange={this.handleNewDescription} value={this.state.description}/>}
				</div>
				
				<div className="inputContainer" >
							{this.state.error
								? <FormControl variant="outlined" style={{width: "100%"}}>
									<InputLabel error required>Record Status</InputLabel>
									<Select
										value={this.state.recordStatus}
										onChange={this.handleNewRecordStatus}
										label="Record Status"
										fullWidth
										error>
										{this.state.recordStatusValues.map((value) => (
											<MenuItem key={value.id} value={value.id}>{value.name}</MenuItem>
										))}
									</Select>
									<FormHelperText error>Required</FormHelperText>
								</FormControl>
								: <FormControl variant="outlined" style={{width: "100%"}}>
									<InputLabel required>Record Status</InputLabel>
									<Select
										value={this.state.recordStatus}
										onChange={this.handleNewRecordStatus}
										label="Record Status"
										fullWidth>
										{this.state.recordStatusValues.map((value) => (
											<MenuItem key={value.id} value={value.id}>{value.name}</MenuItem>
										))}
									</Select>
								</FormControl>}
						</div>



				{/* Detail fields; only show if id != 0 (ie. Adding new record) */}
				{(this.state.id !== 0)
					?(	<div>
							<div className="inputContainer">
								<TextField label="Date Created" variant="filled" disabled fullWidth value={this.state.dateCreated}/>
							</div>
							<div className="inputContainer">
								<TextField label="Date Modified" variant="filled" disabled fullWidth value={this.state.dateModified}/>
							</div>
							<div className="inputContainer">
								<TextField label="Created By" variant="filled" disabled fullWidth value={this.state.createdBy}/>
							</div>
							<div className="inputContainer">
								<TextField label="Modified By" variant="filled" disabled fullWidth value={this.state.modifiedBy}/>
							</div>
						</div>
					)
					: <></> }
				


				{/* Buttons for all forms */}
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

export default RecordForm;
