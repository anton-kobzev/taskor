import React, {Component} from 'react';
const ReactDOM = require('react-dom');
import NavBar from './NavBar';
import TasksList from "./TasksList";
import Analyze from "./Analyze";

class App extends Component {
    componentWillMount() {
        if (navigator.serviceWorker) {
            navigator.serviceWorker.register('sw.js');
        }
    }
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
