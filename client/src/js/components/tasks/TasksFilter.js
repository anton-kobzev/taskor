import React, { Component } from "react";

export default class TasksFilter extends Component {
    constructor() {
        super();
        this.state = {
            where: {
                archive: false
            },
            order: "done"
        };
    }

    handleInputAndSubmit = (key, e) => {
        let where = {};
        where[key] = e.target.value;
        this.props.onChange({
            loadFromNetwork: false,
            where: where
        });
    };

    handleSubmit = e => {
        this.props.onChange({
            loadFromNetwork: true,
            where: {
                name: this.state.name
            }
        });
        e.preventDefault();
    };

    render() {
        return (
            <form
                onSubmit={this.handleSubmit}
                className="filter tasks-filter"
            >
                <div className="search">
                    <div className="search-icon-container">
                        <i className="fas fa-search" />
                    </div>
                    <input
                        type="text"
                        className="form-control search-input"
                        placeholder="Поиск и фильтр"
                        onChange={e => this.handleInputAndSubmit("name", e)}
                    />
                </div>
            </form>
        );
    }
}
