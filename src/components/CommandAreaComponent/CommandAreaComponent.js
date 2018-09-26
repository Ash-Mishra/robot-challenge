import React, {Component} from 'react';
import './CommandAreaComponent.css'

export default class CommandAreaComponent extends Component{
  
  handleChange = (e) =>{
    this.props.handleTextAreaChange(e.target.value);
  }
  
  render(){
    const {currentValue} = this.props;
    return <textarea onChange={this.handleChange} className="command-area" value={currentValue}/>

  }
}