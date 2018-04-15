import React, { Component } from 'react';

export default class NavBar extends Component {
    constructor() {
        super();
        this.state = {
            mailInfo: ''
        };
    }

    componentDidMount() {
        //this.checkMail();
    }

    // Check unread messages with specified interval
    checkMail() {
        fetch('/api/mail/unreadCountByFolders')
            .then((response) => (response.json()))
            .then((data) => {
                let mailInfo = [];
                for (let mailLabel in data)
                    if (data.hasOwnProperty(mailLabel) && parseInt(data[mailLabel]) > 0) {
                        mailInfo.push(data[mailLabel] + ' new ' + mailLabel + (data[mailLabel] > 1 ? ' mails' : ' mail'));
                    }
                if (mailInfo)
                    this.setState({
                        mailInfo: mailInfo.join(', ')
                    })
            });
        setInterval(() => {
            this.checkMail();
        }, 1000 * 60); // 1 min
    }

    render() {
        return (
            <nav className="navbar navbar-dark bg-primary">
                <a className="navbar-brand" href="/">Task list</a>
                <span className="navbar-text">{this.state.mailInfo}</span>
            </nav>
        );
    }
}
