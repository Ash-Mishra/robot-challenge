import React, { Component } from 'react';

export default class OutputResultComponent extends Component{
  render(){
    return <div className="outputDiv"> 
      <pre>{this.props.outputString}</pre>
    </div>
  }
}