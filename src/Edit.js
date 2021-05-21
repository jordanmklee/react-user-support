import React from "react";
import RecordForm from "./RecordForm";

import TextField from '@material-ui/core/TextField';

import axios from "axios";
const GET_RECORD_BY_ID_URL = "https://bimiscwebapi-test.azurewebsites.net/api/users/GetUserSupportById/";

class Edit extends React.Component{
	state = {
		dateCreated: "",
		dateModified: "",
		createdBy: "",
		modifiedBy: "",
	}
	
	componentDidMount(){
		// Get record details for props.id from API
		axios.get(GET_RECORD_BY_ID_URL + this.props.location.state.id)
			.then(res => {
				this.setState({
					dateCreated: res.data.data.dateCreated,
					dateModified: res.data.data.dateModified,
					createdBy: res.data.data.createdBy,
					modifiedBy: res.data.data.modifiedBy,
				})
			})
	}
	
	render(){	

		return(
			<div className="editContainer">
				<h1>Edit Record</h1>
				<div className="inputContainer">
					<TextField label="ID" variant="filled" disabled fullWidth defaultValue={this.props.location.state.id}/>
				</div>
				
				<RecordForm recordDetails={
					<div>
						<div className="inputContainer">
							<TextField label="Date Created" variant="filled" disabled value={this.state.dateCreated}/>
						</div>
						<div className="inputContainer">
							<TextField label="Date Modified" variant="filled" disabled value={this.state.dateModified}/>
						</div>
						<div className="inputContainer">
							<TextField label="Created By" variant="filled" disabled value={this.state.createdBy}/>
						</div>
						<div className="inputContainer">
							<TextField label="Modified By" variant="filled" disabled value={this.state.modifiedBy}/>
						</div>
					</div>
				}/>
			</div>
		)
	}
}

export default Edit;