import React, { Component } from "react";
const ReactDOM = require("react-dom");

import NavBar from "./NavBar";
import SideBar from "./SideBar";
import TasksList from "./tasks/TasksList";
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
            <div>
                <NavBar onFilterChange={this.handleFilterChange} />
                <div className="container">
                    <div className="row">
                        <div className="col-2">
                            <SideBar />
                        </div>
                        <div className="col-10">
                            {document.location.search == "?analyze" ? (
                                <Analyze />
                            ) : (
                                <TasksList filter={this.state.filter} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById("root")) {
    ReactDOM.render(<AppShell />, document.getElementById("root"));
}
