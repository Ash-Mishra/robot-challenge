import React, { Component } from 'react';
import GridComponent from '../../components/GridComponent/GridComponent'

export default class RobotChallengeComatiner extends Component{
  render(){
    return <div className="main-container">
      <GridComponent gridXDimension={5} gridYDimension={5} robotRotationDegree={90} robotYPosition={1} robotXPosition={1} />
    </div>
  }
}