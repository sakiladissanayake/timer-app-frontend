import React, { Component } from "react";
import "../App.css";

class Timer extends Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0,
    frequence: this.props.frequence
  };

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime
    });
    this.timer = setInterval(() => {
      this.setState({ 
        timerTime: Date.now() - this.state.timerStart
       }, () => {
        this.props.onTimeChange(this.state.timerTime)
      });
    }, this.state.frequence);
    
  };

  stopTimer = () => {
    this.setState({ timerOn: false });
    clearInterval(this.timer);
  };

  resetTimer = () => {
    this.setState({
      timerOn: false,
      timerStart: 0,
      timerTime: 0,
    });
    this.props.onTimeChange(0)
    clearInterval(this.timer);
  };

  render() {
    const { timerTime } = this.state;
    let miliseconds = ("0" + (Math.floor(timerTime / 1) % 1000)).slice(-3);
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    return (
      <div className="Timer">
        <div className="Timer-header">{this.props.name}</div>
        <div className="Timer-display">
          {minutes} : {seconds} : {miliseconds}
        </div>
        {this.state.timerOn === false && (
          <button onClick={this.startTimer}>Play</button>
        )}
        {this.state.timerOn === true && (
          <button onClick={this.stopTimer}>Pause</button>
        )}
        {
          <button onClick={this.resetTimer}>Reset</button>
        }
      </div>
    );
  }
}

export default Timer;
