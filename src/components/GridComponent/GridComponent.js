import React, {Component} from 'react';
import GridSquare from '../GridSquare/GridSquare'

export default class GridComponent extends Component {
  
  createGrid = () => {
    let table = []
    // Outer loop to create parent
    for (let i = 4; i >=0; i--) {
      let children = []
      //Inner loop to create children
      for (let j = 0; j < 5; j++) {
        let isRobotPresent = false;
        if(this.props.robotXPosition == j && this.props.robotYPosition == i) isRobotPresent=true;
        else isRobotPresent=false;
        children.push(<td><GridSquare rotationDegree = {this.props.robotRotationDegree} isRobotPresent={isRobotPresent}/></td>)
      }
      //Create the parent and add the children
      table.push(<tr>{children}</tr>)
    }
    return table
  }

  render() {
    const {
      gridXDimension,
      gridYDimension,
      robotXPosition,
      robotYPosition,
      robotRotationDegree,
    } = this.props
    
    return <div> 
        <table>
          <tbody>
            {this.createGrid()}
          </tbody>
        </table>     
      </div>
  }
}