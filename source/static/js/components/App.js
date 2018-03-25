import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import NavBar from './NavBar';
import TasksList from "./TasksList";

class App extends Component {
    render() {
        return (
            <div className="container pt-5">
                <NavBar/>
                <TasksList/>
            </div>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<App/>, document.getElementById('root'));
}
