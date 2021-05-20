import React from "react";
import { Link } from "react-router-dom";

import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

import axios from "axios";
const POST_URL = "https://bimiscwebapi-test.azurewebsites.net/api/users/SaveUserSupport/";
const GET_RECORD_STATUS_URL = "https://bimiscwebapi-test.azurewebsites.net/api/users/GetRecordStatusListForUsers/";

class Edit extends React.Component{

	render(){
		const handleAdd = () => {

			let newRecord = {
				"Id": "0",
				"ScreenName": "asdasdasdasdasd",
				"Description": "asd2",
				"RecordStatusId": "2",
				"ModifiedBy": "1",
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

		// TODO use GetUserBySupportId API to fill in the default values when editing
		// TODO use GetRecordStatusListForUsers API to fill in the Record Status dropdown values
		var recordStatusValues;
		axios.get(GET_RECORD_STATUS_URL)
			.then(res => {
				recordStatusValues = res.data.data;
				console.log(recordStatusValues);
			});
		
		return(
			<div>
				<div className="editContainer">
					<h2>Edit</h2>
					<ul className="textFieldContainer">
						<li>
							<TextField label="ID" variant="filled" disabled defaultValue="0"/>
						</li>
						<li>
							<TextField label="Screen Name" variant="filled"/>
						</li>
						<li>
							<TextField label="Description" variant="filled"/>
						</li>
						<li>
							<TextField label="Record Status" variant="filled"/>
						</li>
						<li>
							<TextField label="Date Created" variant="filled" disabled defaultValue="TODAY"/>
						</li>
						<li>
							<TextField label="Date Modified" variant="filled" disabled defaultValue="TODAY"/>
						</li>
						<li>
							<TextField label="Created By" variant="filled" disabled defaultValue="John Smith"/>
						</li>
						<li>
							<TextField label="Modified By" variant="filled" disabled defaultValue="John Smith"/>
						</li>
						
					</ul>

					<ul className="buttonContainer">
						<li><Link to="/">
							<Button variant="contained" color="secondary">BACK</Button>
						</Link></li>
						<li><Link to="/">
							<Button variant="contained" color="primary">SAVE</Button>
						</Link></li>
						<Button variant="contained" color="primary" onClick={handleAdd}>ADD</Button>
					</ul>
				</div>
			</div>
		)
	}
}

export default Edit;