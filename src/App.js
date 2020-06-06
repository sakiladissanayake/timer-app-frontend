import React, { Component } from "react";

import Timer from "./components/Timer";
import TotalTimer from "./components/TotalTimer";

class App extends Component {

  constructor(){
    super();
    this.state = {
      isLoading: false,
      isAuthenticated: false,
      user: {},
      timer1Value : 0,
      timer2Value : 0,
      timer3Value : 0
    };
  }

  authenticateUser = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const jwtToken = urlParams.get('jwt');
    this.setState({
      isLoading: true,
      user: {},
      isAuthenticated: false,
    })
    if(jwtToken){
      fetch('http://localhost:5000/api/login', {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${jwtToken}`
        }
      })
      .then(response => response.json())
      .then(data => 
        {
          console.log("authorized");
          this.setState({
            isLoading: false,
            user: data.authData.user,
            isAuthenticated: true,
          })
        }
      )
      .catch(() => {
        console.log("unauthorized");
        this.setState({
          isLoading: false,
          user: {},
          isAuthenticated: false,
        })
    });
  }else {
    this.setState({
      isLoading: false,
      user: {},
      isAuthenticated: false,
    })
  }
}
  
  async componentDidMount() {
    this.authenticateUser();
  }
    
  



  handleTimeChange1 = (time) => {
    this.setState({
      timer1Value: time
    })
  }

  handleTimeChange2 = (time) => {
    this.setState({
      timer2Value:time
    })
  }

  handleTimeChange3 = (time) => {
    this.setState({
      timer3Value:  time
    })
  }

  renderUserDetails = () => {
    const {isAuthenticated, user, isLoading} = this.state;
    if(isLoading){
      return (<div><h4>Verifing JWT Token...</h4></div>);
    }
    else if(isAuthenticated){
      return (<div><h4>User Authorized! Hello: {user.username}</h4></div>);
    }

    return (<div><h4>User Unauthorized</h4></div>);
  }

  render() {

    return (
     
      <div className="App">
        <div className="App-title">Timer App</div>
        {this.renderUserDetails()}
        <div className="Timers">
          <TotalTimer 
            timer1Value={this.state.timer1Value}
            timer2Value={this.state.timer2Value}
            timer3Value={this.state.timer3Value}
          />
        </div>
        <br></br>
        <div className="Timers">
          <Timer name={'Timer 1'} frequence={10000} onTimeChange={this.handleTimeChange1}/>
          <Timer name={'Timer 2'} frequence={1000} onTimeChange={this.handleTimeChange2}/>
          <Timer name={'Timer 3'} frequence={100} onTimeChange={this.handleTimeChange3}/>
        </div>
      </div>
    );
  }
}

export default App;
