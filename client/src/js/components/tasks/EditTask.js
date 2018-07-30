import React, { Component } from "react";

export default class EditTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: props.task
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.task.time !== this.state.task.time)
            this.setState(prevState => {
                const task = prevState.task;
                task.time = nextProps.task.time;
                return { task };
            });
    }

    handleInput(key, e) {
        let state = Object.assign({}, this.state.task);
        state[key] = e.target.value;
        this.setState({ task: state });
        if (e.target.classList.contains("task-description-input")) {
            // Adjust textarea height
            e.target.style.height = "1px";
            e.target.style.height = 23 + e.target.scrollHeight + "px";
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onEdit(this.state.task);
    }

    handleClick(e) {
        if (e.target.classList.contains("task-edit-inner")) {
            this.handleSubmit(e);
            document
                .getElementById("task-" + this.props.task.id)
                .classList.remove("active-task");
            e.stopPropagation();
        }
    }

    render() {
        return (
            <div className={"task-edit task-edit-" + this.props.task.id}>
                <form onSubmit={this.handleSubmit} onClick={this.handleClick}>
                    <div className="d-flex justify-content-between">
                        <div className="task-edit-inner">
                            <input
                                type="text"
                                onChange={e => this.handleInput("name", e)}
                                tabIndex="1"
                                className="form-control mb-2 task-name-input"
                                placeholder="Название"
                                required
                                value={this.state.task.name}
                            />
                            <textarea
                                className="form-control task-description-input"
                                rows="2"
                                tabIndex="2"
                                onChange={e =>
                                    this.handleInput("description", e)
                                }
                                placeholder="Описание"
                                value={this.state.task.description}
                            />
                        </div>
                        <div className="task-actions d-flex align-items-center">
                            <i className="fas fa-award task-price-icon" />
                            <input
                                type="text"
                                className="form-control task-small-input"
                                placeholder="цена"
                                onChange={e => this.handleInput("price", e)}
                                value={
                                    this.state.task.price > 0
                                        ? this.state.task.price
                                        : ""
                                }
                            />

                            <i className="far fa-clock task-time-icon" />
                            <input
                                type="text"
                                className="form-control task-small-input"
                                placeholder="ушло"
                                onChange={e => this.handleInput("time", e)}
                                value={
                                    this.state.task.time > 0
                                        ? this.state.task.time
                                        : ""
                                }
                            />

                            <button
                                type="submit"
                                className="btn btn-primary action action-button"
                            >
                                <i className="fas fa-check icon"/> Сохранить
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
