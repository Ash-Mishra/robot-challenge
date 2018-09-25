import React, { Component } from 'react';
import robotImage from '../../images/favicon.ico'
import './Robot.css'

export default class Robot extends Component{
  constructor(props){
    super(props)
  }
  render(){
    const {rotation} = this.props
    return <div className="image-container">
      {this.props.isRobotPresent?<img src={robotImage} style={{transform: `rotate(${rotation}deg)`}} className="robot-image"/>:<span></span>}
    </div>
  }
}