import React, { Component } from 'react';

class Analysis extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className="Chart Analysis">
                <img src="sad.svg" className="sadFace"></img>
                <div className="listOfActions"> 
                    <ul>
                        <li>Get outside! You aren't moving much</li>
                        <li>Try listening to higher tempo music, with positive messages</li>
                        <li>Most importantly, speak out! A problem shared is a problem halved</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Analysis;
