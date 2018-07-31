import React  from "react";

import "./analyze.scss";

export default class Analyze extends React.Component {
    constructor() {
        super();
        this.state = {
            result: [],
            loaded: false
        };
    }

    componentDidMount() {
        fetch("/api/tasks/analyze")
            .then(response => {
                if (response.ok) return response.json();
                throw new Error("Can not load, status: " + response.status);
            })
            .then(data => {
                this.setState({
                    result: data.result,
                    loaded: true
                });
            })
            .catch(error => {
                this.setState({
                    error: error,
                    loaded: true
                });
            });
    }

    render() {
        let content = "";

        if (this.state.loaded) {
            if (this.state.error) {
                content = (
                    <div className="alert alert-danger">
                        {this.state.error.message}
                    </div>
                );
            } else {
                const result = this.state.result;
                let analyzeCardItems = [
                    {
                        title: "Закрыто",
                        value: result.sumPrice,
                        unit: "",
                        icon: "fas fa-bolt",
                        tip:
                            result.potentialPrice ==
                            result.sumPrice
                                ? ""
                                : `потенциально ${
                                      result.potentialPrice
                                  }`
                    },
                    {
                        title: "Время",
                        value: result.sumTime,
                        unit: " ч",
                        icon: "fas fa-clock",
                        tip: ""
                    },
                    {
                        title: "Коэффициент",
                        value: result.koeff,
                        unit: "",
                        icon: "fas fa-asterisk",
                        tip: ""
                    }
                ];

                const analyzeCardItemsRendered = analyzeCardItems.map(
                    (item, index) => (
                        <div className="col analyze-item" key={index}>
                            <div className="row no-gutters">
                                <div className="col-3 icon">
                                    <i className={item.icon + " fa-2x"} />
                                </div>
                                <div className="col">
                                    <span className="title">{item.title}</span>
                                    <span className="value">{item.value}</span>
                                    <span className="unit"> {item.unit}</span>
                                    <span className="tip">{item.tip}</span>
                                </div>
                            </div>
                        </div>
                    )
                );

                content = (
                    <div className="analyze-container">
                        <div className="row">{analyzeCardItemsRendered}</div>
                    </div>
                );
            }
        } else {
            content = (
                <div className="alert alert-info loading">
                    Анализируем продуктивность...
                </div>
            );
        }

        return <div className="list-group">{content}</div>;
    }
}
