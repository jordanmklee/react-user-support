import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Grid from "./Grid";
import RecordForm from "./RecordForm";

function App() {
	return (
		<div className="App" style={{margin:"auto", width:"90%"}}>
			<h1 style={{"textAlign": "left",}}>User Support</h1>
			<Router>
				<Switch>
					<Route path="/add" component={RecordForm}/>
					<Route path="/edit" component={RecordForm}/>
					<Route path="/" component={Grid}/>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
