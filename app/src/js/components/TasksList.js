import React, {Component} from 'react';
import Task from './Task';
import AddTask from "./AddTask";

export default class TasksList extends Component {
    constructor() {
        super();
        this.state = {
            tasks: [],
        };
        this.handleAddTask = this.handleAddTask.bind(this);
        this.handleEditTask = this.handleEditTask.bind(this);
        this.handleDeleteTask = this.handleDeleteTask.bind(this);
        this.handleDoneTask = this.handleDoneTask.bind(this);
        this.handleNotDoneTask = this.handleNotDoneTask.bind(this);
        this.handleArchiveTask = this.handleArchiveTask.bind(this);
    }

    componentDidMount() {
        fetch('/api/tasks')
            .then(response => {
                return response.json();
            })
            .then(tasks => {
                this.setState({tasks});
            });
    }

    // Update and delete helpers
    updateTask(task) {
        return fetch('/api/tasks/' + task.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })
            .then((response) => {
                return response.json();
            });
    }

    updateTaskInList(task) {
        this.setState((prevState) => {
            prevState.tasks = prevState.tasks.map((currentTask) => (currentTask.id === task.id ? task : currentTask));
            return prevState;
        });
    }

    removeTaskFromList(task) {
        let array = this.state.tasks.filter(function (item) {
            return item !== task
        });
        this.setState({tasks: array});
    }

    // Handlers
    handleAddTask(task) {
        fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState((prevState) => ({
                    tasks: prevState.tasks.concat(data)
                }));
            });
    }

    handleEditTask(task) {
        this.updateTask(task);
        this.updateTaskInList(task);
    }

    handleDeleteTask(task) {
        fetch('/api/tasks/' + task.id,
            {method: 'delete'});
        this.removeTaskFromList(task);
    }

    handleDoneTask(task) {
        task.done = 1;
        this.updateTask(task)
        this.updateTaskInList(task);
    }

    handleNotDoneTask(task) {
        task.done = 0;
        this.updateTask(task);
        this.updateTaskInList(task);
    }

    handleArchiveTask(task) {
        task.archive = 1;
        this.updateTask(task);
        this.removeTaskFromList(task);
    }

    // Render
    renderTasks() {
        let tasks = this.state.tasks.map(task =>
            <Task task={task} key={task.id} onEdit={this.handleEditTask} onDelete={this.handleDeleteTask}
                  onDone={this.handleDoneTask} onNotDone={this.handleNotDoneTask} onArchive={this.handleArchiveTask}/>);
        return (
            <div className="list-group">
                {tasks}
            </div>
        );
    }

    render() {
        return (
            <div className="row task-list">
                <div className="col">
                    <div className="row">
                        <div className="col">
                            {this.renderTasks()}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <AddTask onAdd={this.handleAddTask}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}