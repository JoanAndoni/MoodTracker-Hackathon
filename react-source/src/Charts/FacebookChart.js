import React, {Component} from 'react';
import './FacebookChart.css';
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, YAxis, AreaSeries} from 'react-vis';
import {curveCatmullRom} from 'd3-shape'; 
import axios from 'axios';

class FacebookChart extends Component {
    
    constructor() {
        super();
        this.state = {  
            facebookdata: null,
            twitterdata: null
        }
    }

    componentWillMount() {
        let currentComponent = this;
        axios.post('http://mood-insights.herokuapp.com/users/getFeedsByType?', { "username" : "giorgosb", "type": "twitter"}).then(function(response) {
            var data = [];
            for (var i = 0; i < response.data.msg[0].feeds.length; i++) {
                let y = parseFloat(response.data.msg[0].feeds[i].result)
                let x = i + 1;
                data.push({x,y});  
            }
            currentComponent.setState({twitterdata: data});
        });

        axios.post('http://mood-insights.herokuapp.com/users/getFeedsByType?', { "username" : "giorgosb", "type": "facebook"}).then(function(response) {
            var data = [];
            for (var i = 0; i < response.data.msg[0].feeds.length; i++) {
                let y = parseFloat(response.data.msg[0].feeds[i].result)
                let x = i + 1;
                data.push({x,y});  
            }
            currentComponent.setState({facebookdata: data});
        });

    }


    
    render() {
        if (!this.state.facebookdata || !this.state.twitterdata) {
            return <div></div>
        }
          return (

            <div className="Chart">
                <div className="chartHeader">
                    <h1 className="ChartTitle">Social Media</h1>
                    <img src="socialmedia.svg" alt="Mood Insights" className="chartLogo"/>
                </div>
            <XYPlot height={(window.innerHeight / 2) - 100} width={(window.innerWidth / 2) - 170} yDomain={[0,1]}>
                <LineSeries data={this.state.facebookdata} curve={curveCatmullRom.alpha(0.1)} />
                <AreaSeries data={this.state.facebookdata} curve={curveCatmullRom.alpha(0.1)} style={{opacity: 0.3}}></AreaSeries>
                <LineSeries data={this.state.twitterdata} curve={curveCatmullRom.alpha(0.1)} />
                <AreaSeries data={this.state.twitterdata} curve={curveCatmullRom.alpha(0.1)} style={{opacity: 0.3}}></AreaSeries>
                <YAxis></YAxis>
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

export default FacebookChart;
