import Topbar from "./components/topbar/topbar";
import "./app.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Editor from "./components/Editor";

function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Editor/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;