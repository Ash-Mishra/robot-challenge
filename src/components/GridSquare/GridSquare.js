import React, { Component } from 'react';
import Robot from '../Robot/Robot'
import './GridSquare.css'


export default class Square extends Component  {
  render(){
    return <div className='single-grid-square'>
      <Robot rotation = {this.props.rotationDegree}  isRobotPresent={this.props.isRobotPresent} />
    </div>
  }
}
