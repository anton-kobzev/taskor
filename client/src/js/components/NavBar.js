import React, {Component} from 'react';

export default class NavBar extends Component {
    state = {isOffline: !navigator.onLine};
    componentDidMount() {
        window.addEventListener('online', () => {this.setState({isOffline: false})});
        window.addEventListener('offline', () => {this.setState({isOffline: true})});
    }
    render() {
        return (
            <nav className="navbar navbar-dark">
                <a className="navbar-brand" href="/">
                    Список задач
                </a>
                <ul className="navbar-nav mr-auto">
                    <li className={"nav-item" + (document.location.search == '?analyze' ? " active" : "")}>
                        <a className="nav-link" href="/?analyze">Анализ</a>
                    </li>
                </ul>
                <span className="navbar-text">
                    {this.state.isOffline &&
                        <span><i className="fas fa-exclamation-triangle mr-1"/>Отсутствует подключение к интернету</span>}
                </span>
            </nav>
        );
    }
}
