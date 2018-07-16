import React, { Component } from "react";
const ReactDOM = require("react-dom");

import * as AppInfo from "../utils/AppInfo";

import NavBar from "./NavBar";
import TasksList from "./TasksList";
import Analyze from "./Analyze";

class AppShell extends Component {
    constructor() {
        super();
        this.state = {
            filter: {
                where: {
                    archive: false
                },
                order: "done"
            }
        };
    }

    componentWillMount() {
        if (navigator.serviceWorker) {
            navigator.serviceWorker.register("sw.js");
        }
    }

    handleFilterChange = filter => {
        this.setState({ filter });
    };

    render() {
        return (
            <div className="container pt-5">
                <NavBar onFilterChange={this.handleFilterChange} />
                {document.location.search == "?analyze" ? (
                    <Analyze />
                ) : (
                    <TasksList filter={this.state.filter} />
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

if (document.getElementById("root")) {
    ReactDOM.render(<AppShell />, document.getElementById("root"));
}
