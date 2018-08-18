import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { spring, AnimatedSwitch } from "react-router-transition"

import Header from "../header/header"
import Sidebar from "../sidebar/sidebar"
import TasksList from "../../tasks/tasks-list/tasks-list"
import Analyze from "../../analyze/analyze"
import Settings from "../../settings/settings"

import "./app.scss"

class App extends React.Component {
    constructor() {
        super()
    }

    componentWillMount() {
        if (navigator.serviceWorker) {
            navigator.serviceWorker.register("sw.js")
        }
    }

    render() {
        const animatedSwitchMapStyles = styles => ({
            opacity: styles.opacity,
            transform: `translateY(${styles.y}px)`
        });
        const animatedSwitchTransition = {
            atEnter: {
                opacity: 0,
                y: 10
            },
            atLeave: {
                opacity: 0,
                y: spring(-10)
            },
            atActive: {
                opacity: 1,
                y: spring(0)
            }
        }

        return (
            <div>
                <Header />
                <Router>
                    <div className="container">
                        <div className="row no-gutters">
                            <div className="col-2">
                                <Sidebar />
                            </div>
                            <div className="col-10">
                                <AnimatedSwitch
                                    atEnter={animatedSwitchTransition.atEnter}
                                    atLeave={animatedSwitchTransition.atLeave}
                                    atActive={animatedSwitchTransition.atActive}
                                    mapStyles={animatedSwitchMapStyles}
                                    className="animated-switch-wrapper"
                                >
                                    <Route
                                        exact
                                        path="/"
                                        component={() => <TasksList />}
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
        )
    }
}

if (document.getElementById("root")) {
    ReactDOM.render(<App />, document.getElementById("root"))
}
