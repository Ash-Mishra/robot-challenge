import React, { Component } from "react";
import GridComponent from "../../components/GridComponent/GridComponent";
import CommandAreaComponent from "../../components/CommandAreaComponent/CommandAreaComponent";
import ControlPannel from "../../components/ControlPannel/ControlPannel";
import functions from "../../functionality/movements";
import OutputResultComponent from '../../components/OutputResultComponent/OutputResultComponent';

export default class RobotChallengeComatiner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridXDimension: 5,
      gridYDimension: 5,
      robotRotationDegree: 90,
      robotXPosition: 0,
      robotYPosition: 0,
      currentCommandNummber: 0,
      commandArray: [],
      textAreaValue: "",
      outputString:"",
    };
  }

  handleTextAreaChange = value => {
    let commands = value.split("\n");
    this.resetState();
    this.setState({ commandArray: commands, textAreaValue: value });
  };

  resetState = () => {
    this.setState({
      robotRotationDegree: 90,
      robotXPosition: 0,
      robotYPosition: 0,
      currentCommandNummber: 0,
      outputString: ""
    });
  };

  handleSingleStep = () => {
    const { commandArray, currentCommandNummber } = this.state;
    this.executeSingleStep(commandArray[currentCommandNummber]);
  };

  executeSingleStep = (command) => {
    const {
      robotXPosition,
      robotYPosition,
      robotRotationDegree,
      currentCommandNummber
    } = this.state;
    let currentPosition = {
      x: robotXPosition,
      y: robotYPosition,
      direction: robotRotationDegree
    };
    let returnedvalue = functions.executeSingleCommand(
      command,
      currentPosition,
      this.state.gridXDimension,
      this.state.gridYDimension
    );
    if (returnedvalue["error"]) {
      this.setState({ currentCommandNummber: currentCommandNummber + 1, outputString:command+returnedvalue["error"] });
    } else {
      this.setState({
        robotXPosition: returnedvalue["x"],
        robotYPosition: returnedvalue["y"],
        robotRotationDegree: returnedvalue["direction"],
        currentCommandNummber: currentCommandNummber + 1,
        outputString: returnedvalue["x"] + " " +returnedvalue["y"]+" "+returnedvalue["direction"]
      });
    }
    if (
      this.state.currentCommandNummber >=
      this.state.commandArray.length - 1
    ) {
      this.resetState();
    }
  };

  handleAllSteps = () => {
    const {
      commandArray,
      gridXDimension,
      gridYDimension,
      robotXPosition,
      robotYPosition,
      robotRotationDegree,
      currentCommandNummber
    } = this.state;
    let currentPosition = {
      x: robotXPosition,
      y: robotYPosition,
      direction: robotRotationDegree
    };
    for (
      let command = currentCommandNummber;
      command < commandArray.length;
      command++
    ) {
      currentPosition = functions.executeSingleCommand(
        commandArray[command],
        currentPosition,
        gridXDimension,
        gridYDimension
      );
      if (currentPosition["error"]) {
        break;
      }
    }
    if (currentPosition["error"]) {
      this.setState({outputString:currentPosition["error"]});
    }
    this.setState({
      robotXPosition: currentPosition["x"],
      robotYPosition: currentPosition["y"],
      robotRotationDegree: currentPosition["direction"],
      currentCommandNummber: commandArray.length - 1,
      outputString: currentPosition["x"]+" "+ currentPosition["y"]+" "+ currentPosition["direction"]
    });
  };

  handleReset = () => {
    this.setState({
      textAreaValue: "",
      previousTextAreaValue: "",
      robotXPosition: null,
      robotYPosition: null,
      robotRotationDegree: null,
      currentCommandNummber: -1
    });
  };

  render() {
    return (
      <div className="main-container">
        <article>
          <CommandAreaComponent
            currentValue={this.state.textAreaValue}
            handleTextAreaChange={this.handleTextAreaChange}
          />
        </article>

        <article>
          <GridComponent
            gridXDimension={this.state.gridXDimension}
            gridYDimension={this.state.gridYDimension}
            robotRotationDegree={-this.state.robotRotationDegree}
            robotYPosition={this.state.robotYPosition}
            robotXPosition={this.state.robotXPosition}
          />
        </article>

        <ControlPannel
          handleSingleStep={this.handleSingleStep}
          handleAllSteps={this.handleAllSteps}
          handleReset={this.handleReset}
        />
        <OutputResultComponent outputString={this.state.outputString}/>
      </div>
    );
  }
}
