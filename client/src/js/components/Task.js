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
        this.handleTimerStart = this.handleTimerStart.bind(this);
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
            document.querySelectorAll('.task-edit-' + this.props.task.id + ' .task-description-input').forEach((o) => {
                o.style.height = "1px";
                o.style.height = (23 + o.scrollHeight) + "px";
            });
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

    handleTimerStart() {
        this.props.onTimerStart(this.props.task);
    }

    render() {
        let task = this.props.task;
        return (
            <div className={"list-group-item flex-column align-items-start task" + (task.done ? " task-done" : "")
                + (this.props.inProgress ? " task-in-progress" : "")} id={'task-' + task.id}>

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
                                {task.done &&
                                <a href="javascript:" title="Архивировать" className="action action-icon"
                                   key={"task-" + task.id + "-archive"}
                                   onClick={this.handleArchiveTask}><i className="fas fa-archive"/></a>
                                }
                                <button className="btn btn-outline-primary btn-sm" onClick={this.handleTimerStart}>
                                    <i className="fas fa-angle-right"/> Начать работу
                                </button>
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
                        <button className="btn btn-outline-secondary ml-1"
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

    static renderDescription(desc) {
        if (desc) {
            // Shorten text without cutting words
            const allowedLength = 95;
            if (desc.length > allowedLength) {
                const initial = desc;
                desc = desc.substr(0, allowedLength);
                desc = desc.substr(0, Math.min(desc.length, desc.lastIndexOf(' ')));
                if (desc != initial)
                    desc += '...';
            }
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
