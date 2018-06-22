import React, {Component} from 'react';

export default class Analyze extends Component {
    constructor() {
        super();
        this.state = {
            result: [],
            loaded: false,
        };
    }

    componentDidMount() {
        fetch('/api/tasks/analyze')
            .then(response => {
                if (response.ok)
                    return response.json();
                throw new Error('Can not load, status: ' + response.status);
            })
            .then(data => {
                this.setState({
                    result: data.result,
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

    render() {
        let content = '';

        if (this.state.loaded) {
            if (this.state.error) {
                content = <div className='alert alert-danger'>{this.state.error.message}</div>;
            }
            else {
                let analyzeItems = this.state.result.items.map((item, index) =>
                    <div className="col analyze-item" key={index}>
                        <div className="row no-gutters">
                            <div className="col-3 icon"><i className={item.icon + ' fa-2x'}/></div>
                            <div className="col">
                                <span className="title">{item.title}</span>
                                <span className="value">{item.value}</span>
                                <span className="unit">{item.unit}</span>
                            </div>
                        </div>
                    </div>
                );

                content = <div className="analyze-container">
                    <div className="row">
                        {analyzeItems}
                    </div>
                </div>;
            }
        }
        else {
            content = <div className='alert alert-info loading'>Анализируем продуктивность...</div>;
        }

        return (
            <div className="list-group">
                {content}
            </div>
        );
    }
}
