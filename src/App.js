import React, { Component } from 'react';
import logo from './logo.svg';
import RobotChallengeConatainer from './containers/RobotChallengeContainer/RobotChallengeContainer'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <RobotChallengeConatainer/>
      </div>
    );
  }
}

export default App;
