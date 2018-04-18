import React, {Component} from 'react';
import linkifyIt from 'linkify-it';
import tlds from 'tlds';
import EditTask from './EditTask';
import ReactModal from 'react-modal';

const linkify = linkifyIt();
linkify.tlds(tlds);

export default class Task extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDeleteConfirmModal: false
        };

        this.handleEditTask = this.handleEditTask.bind(this);
        this.handleEditTaskClick = this.handleEditTaskClick.bind(this);
        this.handleDeleteTask = this.handleDeleteTask.bind(this);
        this.handleDoneTask = this.handleDoneTask.bind(this);
        this.handleNotDoneTask = this.handleNotDoneTask.bind(this);
        this.handleArchiveTask = this.handleArchiveTask.bind(this);
    }

    handleEditTask(task) {
        document.getElementById('task-' + task.id).classList.remove('active-task');
        this.props.onEdit(task);
    }

    handleEditTaskClick(e) {
        if (e.target.classList.contains('task-inner') || e.target.classList.contains('task-name') ||
            e.target.classList.contains('task-description')) {
            for (let e of document.getElementsByClassName('task'))
                e.classList.remove('active-task');
            document.getElementById('task-' + this.props.task.id).classList.add('active-task');
        }
    }

    handleDeleteTask() {
        this.setState({showDeleteConfirmModal: true});
    }

    handleDoneTask() {
        this.props.onDone(this.props.task);
    }

    handleNotDoneTask() {
        this.props.onNotDone(this.props.task);
    }

    handleArchiveTask() {
        this.props.onArchive(this.props.task);
    }

    render() {
        let task = this.props.task;
        return (
            <div className={"list-group-item flex-column align-items-start task" + (task.done ? " task-done" : "")}
                 id={'task-' + task.id}>

                <div className="task-actions task-actions-prepend">
                    {task.done ? (
                        <a href="javascript:" title="Не готово" className="action action-icon"
                           key={"task-done-" + task.id}
                           onClick={this.handleNotDoneTask}><i className="far fa-check-circle"/></a>
                    ) : (
                        <a href="javascript:" title="Готово!" className="action action-icon"
                           onClick={this.handleDoneTask}><i className="far fa-circle"/></a>
                    )}
                </div>

                <div className="task-view" onClick={this.handleEditTaskClick}>
                    <div className="d-flex w-100 justify-content-between task-inner">
                        <span className="task-name">{task.name}</span>
                        <div className="d-flex">
                            <div className="task-actions">
                                {task.done === 1 &&
                                <a href="javascript:" title="Архивировать" className="action action-icon"
                                   key={"task-" + task.id + "-archive"}
                                   onClick={this.handleArchiveTask}><i className="fas fa-archive"/></a>
                                }
                                <a href="javascript:" title="Удалить" className="action action-icon"
                                   onClick={this.handleDeleteTask}><i className="fas fa-trash"/></a>
                            </div>
                            {task.estimateTime > 0 &&
                            <div className="task-time task-estimate-time">
                                <i className="far fa-clock task-data-icon task-estimate-time-icon"/> оценка {task.estimateTime}
                            </div>}
                        </div>
                    </div>
                    <div className="d-flex w-100 justify-content-between task-inner">
                        <p className="task-description" dangerouslySetInnerHTML={{
                            __html: Task.renderDescription(task.description)
                        }}/>
                        {task.actualTime > 0 &&
                        <div className="task-time task-actual-time">
                            <i className="far fa-check-circle task-data-icon task-actual-time-icon"/> ушло {task.actualTime}
                        </div>}
                    </div>
                </div>

                <EditTask task={task} onEdit={this.handleEditTask} onDelete={this.handleDeleteTask}/>

                <ReactModal isOpen={this.state.showDeleteConfirmModal} ariaHideApp={false}>
                    <div className="modal-title">Вы уверены, что хотите удалить "{task.name}"?</div>
                    <div className="modal-buttons">
                        <button className="btn btn-danger" onClick={() => (this.props.onDelete(task))} autoFocus>Да
                        </button>
                        <button className="btn btn-secondary ml-1"
                                onClick={() => (this.setState({showDeleteConfirmModal: false}))}>Нет
                        </button>
                    </div>
                    <a href="#" className="modal-close"
                       onClick={() => (this.setState({showDeleteConfirmModal: false}))}>
                        <i className="far fa-times-circle"/>
                    </a>
                </ReactModal>
            </div>
        )
    }

    static renderDateTime(datetime) {
        let date = new Date(Date.parse(datetime)),
            now = new Date(),
            diffMinutes = Math.round((now - date) / 1000 / 60);
        if (diffMinutes < 1)
            return 'just now';
        else if (diffMinutes === 1)
            return '1 minute ago';
        else if (diffMinutes < 60)
            return diffMinutes + ' minutes ago';
        else if (diffMinutes > 59 && diffMinutes < 60 * 24) {
            const hours = Math.round(diffMinutes / 60);
            return hours + (hours == 1 ? ' hour' : ' hours') + ' ago';
        }
        else
            return (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '.' +
                (date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()) + '.' +
                date.getFullYear() + ' ' +
                (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' +
                (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
    }

    static renderDescription(desc) {
        if (desc) {
            // Search for links
            const matches = linkify.match(desc);
            if (typeof matches !== 'undefined' && matches !== null) {
                for (let i = 0; i < matches.length; i++) {
                    desc = desc.replace(matches[i].raw, '<a href="' + matches[i].url + '" target="_blank">' + matches[i].raw + '</a>');
                }
            }
        }
        return desc;
    }
}
