import React from "react"
import { NavLink } from "react-router-dom"

import "./sidebar.scss"

export default class Sidebar extends React.Component {
    render() {
        const menu = [
            {
                title: "Список задач",
                url: "/",
                icon: "fas fa-tasks"
            },
            {
                title: "Анализ",
                url: "/analyze",
                icon: "fas fa-chart-pie"
            },
            {
                title: "Настройки",
                url: "/settings",
                icon: "fas fa-cog"
            }
        ]
        return (
            <nav className="navbar sidebar">
                <ul className="navbar-nav">
                    {menu.map((item, index) => (
                        <li className="nav-item" key={index}>
                            <NavLink
                                to={item.url}
                                exact={true}
                                activeClassName="active"
                                className="nav-link link-secondary"
                            >
                                <i className={item.icon + " fa-lg mr-1"} />{" "}
                                {item.title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        )
    }
}
