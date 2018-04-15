import React, {Component} from 'react';
import linkifyIt from 'linkify-it';
import tlds from 'tlds';

const linkify = linkifyIt();
linkify.tlds(tlds);

export default class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newTask: {
                name: ''
            }
        };

        //Boilerplate code for binding methods with `this`
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(key, e) {
        let state = Object.assign({}, this.state.newTask);
        state[key] = e.target.value;
        this.setState({newTask: state});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onAdd(this.state.newTask);
        this.setState({
            newTask: {
                name: ''
            }
        });
        document.querySelector('.add-task-button').style.display = 'block';
        document.querySelector('.add-task-form').style.display = 'none';
    }

    render() {
        return (
            <div>
                <button className="btn btn-link add-task-button" onClick={() => {
                    document.querySelector('.add-task-button').style.display = 'none';
                    document.querySelector('.add-task-form').style.display = 'flex';
                    document.querySelector('.add-task-name-input').focus();
                    document.addEventListener('mouseup', (e) => {
                        if (!e.target.classList.contains('add-task-name-input') &&
                            !e.target.classList.contains('add-task-submit-button')) {
                            document.querySelector('.add-task-button').style.display = 'block';
                            document.querySelector('.add-task-form').style.display = 'none';
                        }
                    });
                }}>
                    <i className="fas fa-plus mr-1" />
                    Add new task
                </button>
                <form onSubmit={this.handleSubmit} className="form-inline justify-content-start add-task-form mt-2"
                      style={{display: 'none'}}>
                    <div className="input-group mr-2">
                        <input type="text" onChange={(e) => this.handleInput('name', e)} className="form-control add-task-name-input"
                               placeholder="Task name" value={this.state.newTask.name} required />
                    </div>
                    <input type="submit" className="btn btn-primary add-task-submit-button" value="Add"/>
                </form>
            </div>
        );
    }
}
