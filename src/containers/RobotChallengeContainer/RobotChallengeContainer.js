import React, { Component } from 'react';
import GridComponent from '../../components/GridComponent/GridComponent'
import CommandAreaComponent from '../../components/CommandAreaComponent/CommandAreaComponent'
import ControlPannel from '../../components/ControlPannel/ControlPannel'
import functions from '../../functionality/movements'

export default class RobotChallengeComatiner extends Component{
  constructor(props){
    super(props);
    this.state = {
      gridXDimension: 5,
      gridYDimension: 5,
      robotRotationDegree: null,
      robotXPosition:null,
      robotYPosition:null,
      textAreaValue: '',
      currentCommandNummber: -1,
    }
  }

  handleTextAreaChange = (value) => {
    this.setState({textAreaValue:value})
  }

  handleSingleStep = () =>{
    const {textAreaValue, currentCommandNummber} = this.state;
    let commands = textAreaValue.split('\n');
    this.executeSingleStep(commands[currentCommandNummber+1])
  }

  executeSingleStep  = (command) =>{
    const {robotXPosition,robotYPosition,robotRotationDegree,currentCommandNummber}=this.state;
    let currentPosition ={
      "x": robotXPosition,
      "y": robotYPosition,
      "direction": robotRotationDegree
    }
    let returnedvalue = functions.executeSingleCommand(command,currentPosition,this.state.gridXDimension,this.state.gridYDimension);
    if (returnedvalue["error"]){
      console.log("error")
      this.setState({currentCommandNummber:currentCommandNummber+1})
    }
    else{
      this.setState({robotXPosition:returnedvalue["x"],robotYPosition:returnedvalue["y"], robotRotationDegree:returnedvalue["direction"],currentCommandNummber:currentCommandNummber+1})
    }
  }
  
  handleAllSteps = () =>{
    const {textAreaValue, gridXDimension, gridYDimension, robotXPosition, robotYPosition, robotRotationDegree} = this.state;
    let commands = textAreaValue.split('\n');
    let currentPosition ={
      "x": robotXPosition,
      "y": robotYPosition,
      "direction": robotRotationDegree
    }
    for(let command=0; command < commands.length; command++){
      currentPosition = functions.executeSingleCommand(commands[command],currentPosition,gridXDimension,gridYDimension);
      if(currentPosition["error"]){
        break;
      }
    }
    if(currentPosition["error"]){
      console.log("error",currentPosition["error"]);
    }
    this.setState({robotXPosition:currentPosition["x"], robotYPosition:currentPosition["y"], robotRotationDegree:currentPosition["direction"]});
  }

  handleReset = () =>{
    this.setState({
      textAreaValue: '',
      previousTextAreaValue: '',
      robotXPosition: null,
      robotYPosition: null,
      robotRotationDegree: null,
      currentCommandNummber: -1,
    })
  }
  
  render(){
    return <div className="main-container">
      <article>
        <CommandAreaComponent 
        currentValue={this.state.textAreaValue} 
        handleTextAreaChange={this.handleTextAreaChange}/>
      </article>

      <article>
        <GridComponent 
        gridXDimension={this.state.gridXDimension} 
        gridYDimension={this.state.gridYDimension} 
        robotRotationDegree={-this.state.robotRotationDegree} 
        robotYPosition={this.state.robotYPosition} 
        robotXPosition={this.state.robotXPosition} />
      </article>

      <ControlPannel 
      handleSingleStep={this.handleSingleStep} 
      handleAllSteps={this.handleAllSteps} 
      handleReset={this.handleReset}/>
    </div>
  }
}