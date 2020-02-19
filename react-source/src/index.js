import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FacebookChart from './Charts/FacebookChart';
import SpotifyChart from './Charts/SpotifyChart';
import ActivityChart from './Charts/ActivityChart'
import * as serviceWorker from './serviceWorker';
import Analysis from './Analysis';

ReactDOM.render(<FacebookChart/>, document.getElementById('facebookchart'));
ReactDOM.render(<SpotifyChart/>, document.getElementById('spotifychart'));
ReactDOM.render(<ActivityChart/>, document.getElementById('activitychart'));
ReactDOM.render(<SpotifyChart/>, document.getElementById('spotifychart'));
ReactDOM.render(<Analysis/>, document.getElementById('analysis'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
