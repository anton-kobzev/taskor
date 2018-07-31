import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";

import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import TasksList from "../../tasks/tasks-list/tasks-list";
import Analyze from "../../analyze/analyze";
import Settings from "../../settings/settings";

import "./app.scss";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            tasksLoaded: false,
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
                <Header onFilterChange={this.handleFilterChange} />
                <Router>
                    <div className="container">
                        <div className="row no-gutters">
                            <div className="col-2">
                                <Sidebar />
                            </div>
                            <div className="col-10">
                                <AnimatedSwitch
                                    atEnter={{ opacity: 0 }}
                                    atLeave={{ opacity: 0 }}
                                    atActive={{ opacity: 1 }}
                                    className="animated-switch-wrapper"
                                >
                                    <Route
                                        exact
                                        path="/"
                                        component={() => (
                                            <TasksList
                                                filter={this.state.filter}
                                            />
                                        )}
                                    />
                                    <Route
                                        path="/analyze"
                                        component={Analyze}
                                    />
                                    <Route
                                        path="/settings"
                                        component={Settings}
                                    />
                                    <Route render={() => <div>404 (</div>} />
                                </AnimatedSwitch>
                            </div>
                        </div>
                    </div>
                </Router>
            </div>
        );
    }
}

if (document.getElementById("root")) {
    ReactDOM.render(<App />, document.getElementById("root"));
}
