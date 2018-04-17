import React, {Component} from 'react';
const ReactDOM = require('react-dom');
import NavBar from './NavBar';
import TasksList from "./TasksList";
import Analyze from "./Analyze";

class App extends Component {
    render() {
        return (
            <div className="container pt-5">
                <NavBar/>
                {document.location.search == '?analyze' ? (
                    <Analyze/>
                ) : (
                    <TasksList/>
                )}
            </div>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<App/>, document.getElementById('root'));
}
