import React, {Component} from 'react';
import './FacebookChart.css';
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, YAxis, AreaSeries} from 'react-vis';
import {curveCatmullRom} from 'd3-shape'; 
import axios from 'axios';

class SpotifyChart extends Component {
    
    constructor() {
        super();
        this.state = {  
            data: null
        }
    }

    componentWillMount() {
            let currentComponent = this;
            axios.post('http://mood-insights.herokuapp.com/users/getFeedsByType?', { "username" : "giorgosb", "type": "spotify"}).then(function(response) {
                var data = [];
                for (var i = 0; i < response.data.msg[0].feeds.length; i++) {
                    let y = parseFloat(response.data.msg[0].feeds[i].result)
                    let x = i + 1;
                    data.push({x,y});  
                }
                currentComponent.setState({data: data});
            });
    
    }
    
    
    render() {
        if (!this.state.data) {
            return <div></div>
        }
          return (
            <div className="Chart">
                <div className="chartHeader">
                    <h1 className="ChartTitle">Spotify</h1>
                    <img src="spotify.svg" alt="Mood Insights" className="chartLogo"/>
                </div>
            <XYPlot height={(window.innerHeight / 2) - 100} width={(window.innerWidth / 2) - 170} >
                <LineSeries data={this.state.data} curve={curveCatmullRom.alpha(0.1)} />
                <YAxis></YAxis>
                <AreaSeries data={this.state.data} curve={curveCatmullRom.alpha(0.1)} style={{opacity: 0.3}}></AreaSeries>
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

export default SpotifyChart;
