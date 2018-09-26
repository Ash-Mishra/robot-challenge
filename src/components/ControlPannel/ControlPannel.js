import React, {Component} from 'react';

export default class ControlPannel extends Component{
  
  handleSingleStep = () =>{
    this.props.handleSingleStep();
  }

  handleAllSteps = () =>{
    this.props.handleAllSteps();
  }

  handleReset = () =>{
    this.props.handleReset();
  }
  
  render (){
    return <div>
        <button className="single-step-button" onClick={this.handleSingleStep}>RUN SINGLE STEP</button>
        <button className="all-step-button" onClick={this.handleAllSteps}>RUN ALL STEPS</button>
        <button className="reset-button" onClick={this.handleReset}>RESET</button>
      </div>
    
  }
}