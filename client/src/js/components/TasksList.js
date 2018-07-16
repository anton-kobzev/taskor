import React, { Component } from "react";
import Helpers from "./Helpers";
import Task from "./Task";
import AddTask from "./AddTask";

export default class TasksList extends Component {
    constructor() {
        super();
        this.state = {
            tasksDisplayed: [],
            tasks: [],
            loaded: false,
            progress: null
        };
    }

    componentDidMount() {
        this.fetchTaskList(JSON.stringify(this.props.filter));
    }

    componentDidUpdate() {
        const filterQuery = JSON.stringify(this.props.filter);
        if (filterQuery != this.lastFilterQuery) {
            if (this.props.filter.loadFromNetwork) {
                this.fetchTaskList(filterQuery);
            } else {
                this.setState((prevState, props) => {
                    return {
                        tasksDisplayed: prevState.tasks.filter(
                            task =>
                                props.filter.where.name == "" ||
                                task.name
                                    .toLowerCase()
                                    .includes(
                                        props.filter.where.name.toLowerCase()
                                    )
                        )
                    };
                });
                this.lastFilterQuery = filterQuery;
            }
        }
    }

    fetchTaskList(filterQuery) {
        this.lastFilterQuery = filterQuery;
        fetch("/api/tasks/?filter=" + filterQuery)
            .then(response => {
                if (response.ok) return response.json();
                throw new Error(
                    "Can not load tasks, status: " + response.status
                );
            })
            .then(data => {
                this.setState({
                    tasksDisplayed: data,
                    tasks: data,
                    loaded: true
                });
            })
            .catch(error => {
                this.setState({
                    error: error,
                    loaded: true
                });
            });
    }

    updateTask(task) {
        return fetch("/api/tasks/" + task.id, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(task)
        })
            .then(response => {
                return response.json();
            })
            .then(task => {
                this.updateTaskInList(task);
            });
    }

    updateTaskInList(task) {
        this.setState(prevState => {
            prevState.tasksDisplayed = prevState.tasks.map(
                currentTask => (currentTask.id === task.id ? task : currentTask)
            );
            return prevState;
        });
    }

    removeTaskFromList(task) {
        let array = this.state.tasksDisplayed.filter(function(item) {
            return item !== task;
        });
        this.setState({ tasksDisplayed: array });
    }

    handleAddTask = task => {
        fetch("/api/tasks", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(task)
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState(prevState => {
                    const tasks = prevState.tasks.concat(data);
                    return {
                        tasksDisplayed: tasks,
                        tasks: tasks
                    };
                });
            });
    };

    handleEditTask = task => {
        this.updateTask(task);
    };

    handleDeleteTask = task => {
        fetch("/api/tasks/" + task.id, { method: "delete" }).then(() => {
            this.removeTaskFromList(task);
            if (this.state.progress.task.id == task.id) this.stopTimer();
        });
    };

    handleDoneTask = task => {
        task.done = 1;
        this.updateTask(task);
    };

    handleUnDoneTask = task => {
        task.done = 0;
        this.updateTask(task);
    };

    handleArchiveTask = task => {
        task.archive = 1;
        this.updateTask(task);
        this.removeTaskFromList(task);
    };

    startTimer = task => {
        this.stopTimer(); // Stop previous task
        const progress = {
            timerSeconds: task.actualTime * 3600,
            timerId: 0,
            task: task,
            paused: false
        };
        progress.timerId = setInterval(() => {
            if (!this.state.progress.paused) {
                this.setState(
                    prevState => {
                        let progress = prevState.progress;
                        progress.timerSeconds++;
                        return { progress };
                    },
                    () => {
                        if (this.state.progress.timerSeconds % 300 == 0) {
                            // Sync timer with server
                            this.updateTask({
                                id: this.state.progress.task.id,
                                actualTime:
                                    Math.round(
                                        (this.state.progress.timerSeconds /
                                            3600) *
                                            10
                                    ) / 10
                            });
                        }
                    }
                );
            }
        }, 1000);
        this.setState({ progress });
    };

    togglePauseTimer = () => {
        this.setState(prevState => {
            prevState.progress.paused = !prevState.progress.paused;
            return prevState;
        });
    };

    stopTimer = () => {
        if (this.state.progress) {
            clearInterval(this.state.progress.timerId);
            this.updateTask({
                id: this.state.progress.task.id,
                actualTime:
                    Math.round((this.state.progress.timerSeconds / 3600) * 10) /
                    10
            });
            this.setState({ progress: null });
        }
    };

    renderTasks() {
        let content;

        if (this.state.loaded) {
            if (this.state.error) {
                content = (
                    <div className="alert alert-danger">
                        {this.state.error.message}
                    </div>
                );
            } else {
                content = this.state.tasksDisplayed.map(task => (
                    <Task
                        task={task}
                        key={task.id}
                        inProgress={
                            this.state.progress &&
                            this.state.progress.task.id == task.id
                        }
                        onEdit={this.handleEditTask}
                        onDelete={this.handleDeleteTask}
                        onDone={this.handleDoneTask}
                        onNotDone={this.handleUnDoneTask}
                        onArchive={this.handleArchiveTask}
                        onTimerStart={this.startTimer}
                    />
                ));
            }
        } else {
            content = (
                <div className="alert alert-info loading">
                    Загрузка списка задач...
                </div>
            );
        }

        return <div className="list-group">{content}</div>;
    }

    render() {
        const timerPanel = this.state.progress && (
            <div className="row panel">
                <div className="col">
                    <div
                        className={
                            "timer" +
                            (this.state.progress.paused ? " paused" : "")
                        }
                    >
                        <span className="text">В работе: </span>
                        <span className="task-name">
                            {this.state.progress.task.name}{" "}
                        </span>
                        <i className="far fa-clock icon" />
                        <span className="time">
                            {Helpers.secondsToHms(
                                this.state.progress.timerSeconds
                            )}
                        </span>
                        <span
                            className="icon-button timer-button-pause"
                            onClick={this.togglePauseTimer}
                        >
                            <i className="fas fa-pause icon" />
                        </span>
                        <span
                            className="icon-button timer-button-stop"
                            onClick={this.stopTimer}
                        >
                            <i className="fas fa-square" />
                        </span>
                    </div>
                </div>
            </div>
        );

        return (
            <div className="task-list-container">
                {timerPanel}
                <div className="row task-list">
                    <div className="col">{this.renderTasks()}</div>
                </div>
                <div className="row float-right">
                    <div className="col">
                        <AddTask onAdd={this.handleAddTask} />
                    </div>
                </div>
            </div>
        );
    }
}
