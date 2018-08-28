import React from "react"
import Helpers from "../../../utils/helpers"
import Task from "../task/task"
import AddTask from "../add-task/add-task"

import "./tasks-list.scss"
import TasksFilter from "../tasks-filter/tasks-filter"

export default class TasksList extends React.Component {
    constructor() {
        super()
        this.state = {
            tasks: [],
            loaded: false,
            progress: {
                running: false,
                paused: false,
                timerSeconds: 0,
                timerId: 0,
                task: null
            },
            filter: {}
        }
    }

    componentDidMount() {
        this.fetchTaskList(
            encodeURI(
                JSON.stringify({
                    where: {
                        archive: false
                    },
                    order: "done"
                })
            )
        )
    }

    fetchTaskList(filterQuery) {
        fetch("/api/tasks/?filter=" + filterQuery)
            .then(response => {
                if (response.ok) return response.json()
                throw new Error
            })
            .then(data => {
                this.setState({
                    tasks: data,
                    loaded: true
                })
            })
            .catch(error => {
                this.setState({
                    error: 'Не получилось загрузить задачи',
                    loaded: true
                })
            })
    }

    updateTask(task) {
        this.updateTaskInList(task)
        return fetch("/api/tasks/" + task.id, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(task)
        })
    }

    updateTaskInList(task) {
        this.setState(prevState => {
            return {
                tasks: prevState.tasks.map(
                    currentTask =>
                        currentTask.id === task.id
                            ? { ...currentTask, ...task }
                            : currentTask
                )
            }
        })
    }

    removeTaskFromList(task) {
        this.setState(prevState => {
            const newTasks = prevState.tasks.filter(item => item !== task)
            return { tasks: newTasks }
        })
    }

    handleAddTask = task => {
        const tempId = "temp-" + Math.round(Math.random() * 1000)
        this.setState(prevState => {
            return {
                tasks: prevState.tasks.concat({ ...task, id: tempId })
            }
        })
        fetch("/api/tasks", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(task)
        })
            .then(response => response.json())
            .then(createdTask => {
                this.setState(prevState => {
                    return {
                        tasks: prevState.tasks.map(task => {
                            return {
                                ...task,
                                id: task.id == tempId ? createdTask.id : task.id
                            }
                        })
                    }
                })
            })
    }

    handleEditTask = task => {
        this.updateTask(task)
    }

    handleDeleteTask = task => {
        this.removeTaskFromList(task)
        if (
            this.state.progress.running &&
            this.state.progress.task.id == task.id
        ) {
            this.stopTimer()
        }
        fetch("/api/tasks/" + task.id, { method: "delete" })
    }

    handleDoneTask = task => {
        task.done = 1
        this.updateTask(task)
    }

    handleUnDoneTask = task => {
        task.done = 0
        this.updateTask(task)
    }

    handleArchiveTask = task => {
        this.removeTaskFromList(task)
        task.archive = 1
        this.updateTask(task)
    }

    handleFilter = filter => {
        this.setState({ filter }, () => {
            this.forceUpdate()
        })
    }

    startTimer = task => {
        this.stopTimer() // Stop previous task
        const progress = {
            running: true,
            paused: false,
            timerSeconds: task.time * 3600,
            timerId: 0,
            task: task
        }
        progress.timerId = setInterval(() => {
            if (!this.state.progress.paused) {
                this.setState(
                    prevState => {
                        let progress = prevState.progress
                        progress.timerSeconds++
                        return { progress }
                    },
                    () => {
                        if (this.state.progress.timerSeconds % 300 == 0) {
                            // Sync timer with server
                            this.updateTask({
                                id: this.state.progress.task.id,
                                time:
                                    Math.round(
                                        (this.state.progress.timerSeconds /
                                            3600) *
                                            10
                                    ) / 10
                            })
                        }
                    }
                )
            }
        }, 1000)
        this.setState({ progress })
    }

    togglePauseTimer = () => {
        this.setState(prevState => {
            prevState.progress.paused = !prevState.progress.paused
            return prevState
        })
    }

    stopTimer = () => {
        if (this.state.progress.running) {
            clearInterval(this.state.progress.timerId)
            this.updateTask({
                id: this.state.progress.task.id,
                time:
                    Math.round((this.state.progress.timerSeconds / 3600) * 10) /
                    10
            })
            this.setState(prevState => {
                prevState.progress.running = false
                return prevState
            })
        }
    }

    renderTasks() {
        let content

        if (this.state.loaded) {
            if (this.state.error) {
                content = (
                    <div className="alert alert-danger">
                        {this.state.error}
                    </div>
                )
            } else {
                let tasks = this.state.tasks

                if (
                    this.state.filter.where !== undefined &&
                    this.state.filter.where.name
                ) {
                    tasks = tasks.filter(
                        task =>
                            task.name
                                .toLowerCase()
                                .includes(
                                    this.state.filter.where.name.toLowerCase()
                                ) ||
                            task.description
                                .toLowerCase()
                                .includes(
                                    this.state.filter.where.name.toLowerCase()
                                )
                    )
                }

                if (tasks.length == 0) {
                    content = (
                        <div className="alert alert-info">
                            <i className="far fa-dot-circle icon" /> Задач нет
                        </div>
                    )
                } else {
                    content = tasks.map(task => (
                        <Task
                            task={task}
                            key={task.id}
                            inProgress={
                                this.state.progress.running &&
                                this.state.progress.task.id == task.id
                            }
                            onEdit={this.handleEditTask}
                            onDelete={this.handleDeleteTask}
                            onDone={this.handleDoneTask}
                            onNotDone={this.handleUnDoneTask}
                            onArchive={this.handleArchiveTask}
                            onTimerStart={this.startTimer}
                        />
                    ))
                }
            }
        } else {
            content = (
                <div className="alert alert-info">
                    <span className="loader" />
                    <span className="loader-message">
                        Загрузка списка задач...
                    </span>
                </div>
            )
        }

        return <div className="list-group">{content}</div>
    }

    render() {
        const taskInProgress =
            this.state.progress.task &&
            this.state.tasks.find(
                task => task.id == this.state.progress.task.id
            )
        const timerPanel = (
            <div
                className={
                    "col " +
                    (this.state.progress.running
                        ? "visible-animated"
                        : "invisible-animated")
                }
            >
                <div
                    className={
                        "timer" + (this.state.progress.paused ? " paused" : "")
                    }
                >
                    <span className="text">В работе: </span>
                    <span className="task-name">
                        {taskInProgress && taskInProgress.name}
                    </span>
                    <i className="far fa-clock icon" />
                    <span className="time">
                        {Helpers.secondsToHms(this.state.progress.timerSeconds)}
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
                        <i className="fas fa-square icon" />
                    </span>
                </div>
            </div>
        )

        return (
            <div className="task-list-container">
                <div className="row panel">{timerPanel}</div>
                <div className="row">
                    <div className="col">
                        <TasksFilter onFilter={this.handleFilter} />
                    </div>
                </div>
                <div className="row task-list">
                    <div className="col">{this.renderTasks()}</div>
                </div>
                <div className="row">
                    <div className="col">
                        <AddTask onAdd={this.handleAddTask} />
                    </div>
                </div>
            </div>
        )
    }
}
