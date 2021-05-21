import React from "react";
import RecordForm from "./RecordForm";

class Add extends React.Component{
	render(){
		return(
			<div className="editContainer">
				<h1>Add New Record</h1>
				<RecordForm/>
			</div>
		)
	}
}

export default Add;