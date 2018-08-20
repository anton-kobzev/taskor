import React from "react"
import TasksFilter from "../../tasks/tasks-filter/tasks-filter"

import "./header.scss"

export default class Header extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-primary justify-content-between">
                <div className="container">
                    <a className="navbar-brand mr-4" href="/">
                        <i className="fas fa-bolt" /> Taskor
                    </a>
                    <ul className="navbar-nav ml-4">
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="fas fa-user-circle fa-lg mr-1" />{" "}
                                Демо Пользователь
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
