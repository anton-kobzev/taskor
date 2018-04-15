import React, {Component} from 'react';
import Task from './Task';
import AddTask from "./AddTask";

export default class TasksList extends Component {
    constructor() {
        super();
        this.state = {
            tasks: [],
            loaded: false,
        };
        this.handleAddTask = this.handleAddTask.bind(this);
        this.handleEditTask = this.handleEditTask.bind(this);
        this.handleDeleteTask = this.handleDeleteTask.bind(this);
        this.handleDoneTask = this.handleDoneTask.bind(this);
        this.handleNotDoneTask = this.handleNotDoneTask.bind(this);
        this.handleArchiveTask = this.handleArchiveTask.bind(this);
    }

    componentDidMount() {
        fetch('/api/tasks/?filter={"where":{"archive":"false"}}')
            .then(response => {
                if (response.ok)
                    return response.json();
                throw new Error('Can not load tasks, status: ' + response.status);
            })
            .then(data => {
                this.setState({
                    tasks: data,
                    loaded: true,
                });
            })
            .catch(error => {
                this.setState({
                    error: error,
                    loaded: true,
                });
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
        this.updateTask(task);
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
        let content;
        console.log(this.state);
        if (this.state.loaded) {
            if (this.state.error) {
                content = <div className='alert alert-danger'>{this.state.error.message}</div>;
            }
            else {
                content = this.state.tasks.map(task =>
                    <Task task={task} key={task.id} onEdit={this.handleEditTask} onDelete={this.handleDeleteTask}
                          onDone={this.handleDoneTask} onNotDone={this.handleNotDoneTask}
                          onArchive={this.handleArchiveTask}/>);
            }
        }
        else {
            content = <div className='alert alert-info'>Loading...</div>;
        }

        return (
            <div className="list-group">
                {content}
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
                    <div className="row float-right">
                        <div className="col">
                            <AddTask onAdd={this.handleAddTask}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
