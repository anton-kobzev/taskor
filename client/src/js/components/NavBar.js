import React, { Component } from "react";
import TasksFilter from "./tasks/TasksFilter";

export default class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-primary justify-content-between">
                <div className="container">
                    <a className="navbar-brand mr-4" href="/">
                        <i className="fas fa-bolt" /> Taskor
                    </a>
                    <TasksFilter onChange={this.props.onFilterChange} />
                    <ul className="navbar-nav ml-4">
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="fas fa-user-circle fa-lg mr-1" /> Антон
                                Кобзев
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
