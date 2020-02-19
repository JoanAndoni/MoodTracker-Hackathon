import React, { Component } from 'react';
import './FacebookChart.css';
import '../../node_modules/react-vis/dist/style.css';
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalBarSeries,
    VerticalBarSeriesCanvas,
    LabelSeries
} from 'react-vis';
import axios from 'axios';

class ActivityChart extends Component {

    constructor() {
        super();
        this.state = {
            data: [
                { x: "Mon", y: 12463 },
                { x: "Tue", y: 17137 },
                { x: "Wed", y: 18829 },
                { x: "Thur", y: 2883 },
                { x: "Fri", y: 3277 },
                { x: "Sat", y: 500 },
                { x: "Sun", y: 2182 }
            ]
        }
    }

    componentWillMount() {
       // axios.get('http://www.google.com').then(response => this.setState({ data: response.data.name }));
    }


    render() {
        if (!this.state.data) {
            return <div></div>
        }
        return (
            <div className="Chart">
                <div className="chartHeader">
                    <h1 className="ChartTitle">Activity</h1>
                    <img src="exercise.svg" alt="Exercise - Mood Insights" className="chartLogo" />
                </div>

                <XYPlot xType="ordinal" height={(window.innerHeight / 2) - 100} width={(window.innerWidth / 2) - 170}>
                    <VerticalBarSeries className="vertical-bar-series-example" data={this.state.data} />
                    <XAxis />
                    <YAxis />
                </XYPlot>
            </div>
        );
    }

    componentDidMount() {
        window.addEventListener("resize", this.render());
    }

    /**
     * Dispose
     */
    componentWillUnmount() {
        window.removeEventListener("resize", this.render());
    }
}

export default ActivityChart;
