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
                className="form-inline filter tasks-filter"
            >
                <div className="input-group search-input-group">
                    <div className="input-group-prepend">
                        <i className="fas fa-search" />
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Поиск и фильтр"
                        onChange={e => this.handleInputAndSubmit("name", e)}
                    />
                </div>
            </form>
        );
    }
}
