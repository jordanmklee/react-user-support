import React from "react";
import RecordForm from "./RecordForm";

import TextField from '@material-ui/core/TextField';

class Edit extends React.Component{
	render(){
		const details = <>
			<div className="inputContainer">
				<TextField label="Date Created" variant="filled" disabled fullWidth defaultValue="asd"/>
			</div>
			<div className="inputContainer">
				<TextField label="Date Modified" variant="filled" disabled fullWidth defaultValue="asd"/>
			</div>
			<div className="inputContainer">
				<TextField label="Created By" variant="filled" disabled fullWidth defaultValue="asd"/>
			</div>
			<div className="inputContainer">
				<TextField label="Modified By" variant="filled" disabled fullWidth defaultValue="asd"/>
			</div>
		</>

		return(
			<div className="editContainer">
				<h1>Edit Record</h1>
				<div className="inputContainer">
					<TextField label="ID" variant="filled" disabled fullWidth defaultValue={this.props.location.state.id}/>
				</div>
				
				<RecordForm recordDetails={details}/>
			</div>
		)
	}
}

export default Edit;