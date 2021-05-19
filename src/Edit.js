import React from "react";
import { Link } from "react-router-dom";

import TextField from '@material-ui/core/TextField';

import Button from "@material-ui/core/Button";

class Edit extends React.Component{
	render(){
		return(
			<div>
				<div className="editContainer">
					<h2>Edit</h2>
					<ul className="textFieldContainer">
						<li>
							<TextField label="ID" variant="filled" disabled defaultValue="1"/>
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
					</ul>
				</div>
			</div>
		)
	}
}

export default Edit;