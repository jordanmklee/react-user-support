import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';

class Controls extends React.Component{
	render(){
		const handleSearchChange = (term) => {
			this.props.onSearchChange(term.target.value);
		}
		return(
			<div>
				<div style={{float:"left"}}>
					<TextField id="outlined-basic" variant="outlined" label="Search" onChange={handleSearchChange}/>
				</div>
				
				<ul className="buttonContainer" style={{float:"right"}}>
					<li>
						{!this.props.editMode
						? <Link to="/add">
							<Button variant="contained" color="primary">
								ADD
							</Button>
						</Link>
						: <Button variant="contained" color="primary" disabled>
							ADD
						</Button>}
					</li>
					<li>
						{this.props.deleteMode && !this.props.editMode
						? <Button variant="contained" color="secondary" onClick={this.props.onDeleteClick}>
							DELETE
						</Button>
						: <Button variant="contained" color="secondary" disabled>
							DELETE
						</Button>}
					</li>
					<li>
						{this.props.editMode
						? <Button variant="contained" color="primary" onClick={this.props.onEditClick}>
							SAVE
						</Button>
						: <Button variant="contained" color="default" onClick={this.props.onEditClick}>
							EDIT
						</Button>}
					</li>
				</ul>
			</div>
		)
	}
}

export default Controls;