import React, {Component} from 'react';
const ReactDOM = require('react-dom');

import * as AppInfo from '../utils/AppInfo';

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
                <div className="row float-left footer">
                    <div className="col app-info">
                        {AppInfo.APP_NAME} v{AppInfo.APP_VERSION}
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<App/>, document.getElementById('root'));
}
