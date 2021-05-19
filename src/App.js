import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Grid from "./Grid";

const Edit = () => (
	<div>
		<h1>Hello world</h1>
	</div>
);

function App() {
	return (
		<div className="App" style={{margin:"auto", width:"90%"}}>
			<h1 style={{"textAlign": "left",}}>User Support</h1>
			<Router>
				<Switch>
					<Route path="/edit" component={Edit}/>
					<Route path="/" component={Grid}/>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
