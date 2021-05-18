import './App.css';

import Controls from "./Controls";
import Grid from "./Grid";

function App() {
  return (
    <div className="App" style={{margin:"auto", width:"90%"}}>
      <h1 style={{"textAlign": "left",}}>User Support</h1>
      <Controls />
      <Grid />
    </div>
  );
}

export default App;
