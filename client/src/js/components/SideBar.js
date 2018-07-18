import React, { Component } from "react";

export default class SideBar extends Component {
    render() {
        return (
            <nav className="navbar sidebar">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a href="/" className="nav-link">
                            <i className="fas fa-tasks fa-lg mr-1" /> Список задач
                        </a>
                        <a href="?analyze" className="nav-link">
                            <i className="fas fa-chart-pie fa-lg mr-1" /> Анализ
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }
}
