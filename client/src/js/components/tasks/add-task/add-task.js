import React from "react"
import linkifyIt from "linkify-it"
import tlds from "tlds"

import "./add-task.scss"

const linkify = linkifyIt()
linkify.tlds(tlds)

export default class AddTask extends React.Component {
    constructor() {
        super()
        this.state = {
            name: ""
        }
    }

    handleInput = (key, e) => {
        const value = e.target.value
        this.setState(prevState => {
            prevState[key] = value
            return prevState
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.onAdd(this.state)
        this.setState({
            name: ""
        })
    }

    render() {
        return (
            <div className="add-task-container d-flex justify-content-end">
                <form
                    onSubmit={this.handleSubmit}
                    className="form-inline justify-content-start add-task-form mt-2"
                >
                    <input
                        type="text"
                        onChange={e => this.handleInput("name", e)}
                        className="form-control add-task-name-input"
                        placeholder="Что надо сделать?"
                        value={this.state.name}
                        required
                    />
                    <button
                        type="submit"
                        className="btn btn-outline-secondary add-task-submit-button"
                    >
                        <i className="fas fa-plus icon" /> Добавить
                    </button>
                </form>
            </div>
        )
    }
}
