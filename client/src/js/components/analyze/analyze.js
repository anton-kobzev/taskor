import React from "react"

import "./analyze.scss"

export default class Analyze extends React.Component {
    constructor() {
        super()
        this.state = {
            result: [],
            loaded: false
        }
    }

    componentDidMount() {
        fetch("/api/tasks/analyze")
            .then(response => {
                if (response.ok) return response.json()
                throw new Error("Can not load, status: " + response.status)
            })
            .then(data => {
                this.setState({
                    result: data.result,
                    loaded: true
                })
            })
            .catch(error => {
                this.setState({
                    error: error,
                    loaded: true
                })
            })
    }

    render() {
        let content = ""

        if (this.state.loaded) {
            if (this.state.error) {
                content = (
                    <div className="alert alert-danger">
                        {this.state.error.message}
                    </div>
                )
            } else {
                const result = this.state.result
                let analyzeCardItems = [
                    {
                        title: "Заработано",
                        value: result.donePrice,
                        unit: "у. е.",
                        icon: "fas fa-award",
                        tip:
                            result.potentialPrice == result.donePrice
                                ? ""
                                : `потенциально ${result.potentialPrice}`,
                        color: "#aee1ff"
                    },
                    {
                        title: "Затрачено",
                        value: result.doneTime,
                        unit: " ч",
                        icon: "fas fa-clock",
                        tip:
                            result.allTime == result.doneTime
                                ? ""
                                : `включая не выполненные: ${result.allTime} ч`,
                        color: "#ffa692"
                    },
                    {
                        title: "Коэффициент",
                        value: result.koeff,
                        unit: "",
                        icon: "fas fa-asterisk",
                        tip: "заработано / затрачено",
                        color: "#ffd25a"
                    }
                ]

                const analyzeCardItemsRendered = analyzeCardItems.map(
                    (item, index) => (
                        <div
                            className={
                                "col analyze-item" +
                                (item.tip ? " with-tip" : "")
                            }
                            key={index}
                        >
                            <div
                                className="analyze-item-inner"
                                style={{ backgroundColor: item.color }}
                            >
                                <div className="analyze-item-icon-container">
                                    <i className={item.icon + " fa-2x"} />
                                </div>
                                <div className="analyze-item-data-container">
                                    <span className="title">{item.title}</span>
                                    <span className="value">{item.value}</span>
                                    <span className="unit"> {item.unit}</span>
                                </div>
                            </div>
                            {item.tip && (
                                <div
                                    className="analyze-item-tip"
                                    style={{ borderColor: item.color }}
                                >
                                    {item.tip}
                                </div>
                            )}
                        </div>
                    )
                )

                content = (
                    <section className="page-section analyze-container">
                        <header>Анализ продуктивности</header>
                        <div className="row">{analyzeCardItemsRendered}</div>
                    </section>
                )
            }
        } else {
            content = (
                <div className="alert alert-info loading">
                    Анализируем продуктивность...
                </div>
            )
        }

        return <div className="list-group">{content}</div>
    }
}
