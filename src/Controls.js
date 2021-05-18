import React from "react";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';

class Controls extends React.Component{
	render(){
		return(
			<div>
				<div style={{float:"left"}}>
					<TextField id="outlined-basic" variant="outlined" label="Search"/>
				</div>
				
				<ul className="buttonContainer" style={{float:"right"}}>
					<li>
						<Button
							variant="contained"
							color="primary">
							ADD
						</Button>
					</li>
					<li>
						<Button
							variant="contained"
							color="secondary">
							DELETE
						</Button>
					</li>
					<li>
						<Button
							variant="outlined"
							color="default"
							onClick={this.props.onEditClick}>
								{this.props.editMode ? "CANCEL" : "EDIT"}
						</Button>
					</li>
				</ul>
			</div>
		)
	}
}

export default Controls;