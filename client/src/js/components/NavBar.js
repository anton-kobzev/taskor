import React, { Component } from "react";
import TasksFilter from "./TasksFilter";

export default class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-primary justify-content-between">
                <a className="navbar-brand mr-4" href="/">
                    <i className="fas fa-bolt" /> Taskor
                </a>
                {document.location.search == "" && (
                    <TasksFilter onChange={this.props.onFilterChange} />
                )}
                <div className="navbar-nav ml-4">
                    <div className="nav-item">
                        <a href="?analyze" className="nav-link">
                            Анализ
                        </a>
                    </div>
                </div>
            </nav>
        );
    }
}
