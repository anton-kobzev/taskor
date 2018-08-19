import React from "react"

import "./tasks-filter.scss"

export default class TasksFilter extends React.Component {
    constructor() {
        super()
        this.state = {
            filter: {
                where: {
                    archive: false
                },
                order: "done"
            }
        }
    }

    handleInput = (key, value) => {
        this.setState(prevState => {
            prevState.filter.where[key] = value
            this.props.onFilter(prevState.filter)
            return prevState
        })
    }

    render() {
        return (
            <form className="filter tasks-filter" onSubmit={e => e.preventDefault()}>
                <div className="search">
                    <div className="search-icon-container">
                        <i className="fas fa-search" />
                    </div>
                    <input
                        type="text"
                        className="form-control search-input"
                        placeholder="Поиск и фильтр..."
                        onChange={e => this.handleInput("name", e.target.value)}
                    />
                </div>
            </form>
        )
    }
}
