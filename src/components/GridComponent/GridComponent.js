import React, {Component} from 'react';
import GridSquare from '../GridSquare/GridSquare'

export default class GridComponent extends Component {
  
  createGrid = () => {
    const {
      gridXDimension,
      gridYDimension,
      robotXPosition,
      robotYPosition,
      robotRotationDegree,
    } = this.props
    let table = []
    let squareClassName = "";

    // Outer loop to create parent
    for (let i = gridYDimension-1; i >=0; i--) {
      let children = []
      //Inner loop to create children
      for (let j = 0; j < gridXDimension; j++) {
        let isRobotPresent = false;
        if(robotXPosition == j && robotYPosition == i) isRobotPresent=true;
        else isRobotPresent=false;
        squareClassName = "class-"+i+"-y-"+j+"-x-square";
        children.push(<td className={squareClassName}><GridSquare rotationDegree = {robotRotationDegree} isRobotPresent={isRobotPresent}/></td>)
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