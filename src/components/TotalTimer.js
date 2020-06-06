import React, { Component } from "react";
import "../App.css";

class TotalTimer extends Component {

  render() {
    const { timer1Value, timer2Value, timer3Value } = this.props;
    let miliseconds = ("0" + (Math.floor((timer1Value + timer2Value + timer3Value) / 1) % 1000)).slice(-3);
    let seconds = ("0" + (Math.floor((timer1Value + timer2Value + timer3Value)  / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor((timer1Value + timer2Value + timer3Value)  / 60000) % 60)).slice(-2);
    return (
      <div className="Timer">
        <div className="Timer-header">Total Timer</div>
        <div className="Timer-display">
          {minutes} : {seconds} : {miliseconds}
        </div>
      </div>
    );
  }
}

export default TotalTimer;
