import React from "react";

import "./tasks-filter.scss";

export default class TasksFilter extends React.Component {
    constructor() {
        super();
        this.state = {
            where: {
                archive: false
            },
            order: "done"
        };
    }

    handleInput = (key, e) => {
        let where = {};
        where[key] = e.target.value;
        this.props.onChange({
            loadFromNetwork: false,
            where: where
        });
    };

    render() {
        return (
            <form className="filter tasks-filter">
                <div className="search">
                    <div className="search-icon-container">
                        <i className="fas fa-search" />
                    </div>
                    <input
                        type="text"
                        className="form-control search-input"
                        placeholder="Поиск и фильтр"
                        onChange={e => this.handleInput("name", e)}
                    />
                </div>
            </form>
        );
    }
}
