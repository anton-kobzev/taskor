import React, {Component} from 'react';

export default class EditTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: props.task
        };

        //Boilerplate code for binding methods with `this`
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleInput(key, e) {
        let state = Object.assign({}, this.state.task);
        state[key] = e.target.value;
        this.setState({task: state});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onEdit(this.state.task);
    }

    handleClick(e) {
        if (e.target.classList.contains('task-edit-inner')) {
            this.handleSubmit(e);
            document.getElementById('task-' + this.props.task.id).classList.remove('active-task');
            e.stopPropagation();
        }
    }

    render() {
        return (
            <div className="task-edit">
                <form onSubmit={this.handleSubmit} onClick={this.handleClick}>
                    <div className="d-flex justify-content-between">
                        <div className="task-edit-inner">
                            <input type="text" onChange={(e) => this.handleInput('name', e)} tabIndex="1"
                                   className="form-control mb-2 task-name-input" placeholder="Task name" required
                                   value={this.state.task.name}/>
                            <textarea className="form-control task-description-input" rows="2" tabIndex="2"
                                      onChange={(e) => this.handleInput('description', e)}
                                      placeholder="Description" value={this.state.task.description}/>
                        </div>
                        <div className="task-actions d-flex align-items-center">
                            <a href="javascript:" title="Delete" className="action action-icon" onClick={() => {
                                this.props.onDelete(this.state.task)
                            }}>
                                <i className="fas fa-trash"/>
                            </a>
                            <a href="javascript:" title="Start timer" className="action action-icon">
                                <i className="far fa-clock"/>
                            </a>
                            <input type="submit" className="btn btn-primary action action-button"
                                   value="Save"/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
