import React from "react";
import { mount, shallow } from "enzyme";
import RobotChallengeContainer from './RobotChallengeContainer';
import GridComponent from '../../components/GridComponent/GridComponent'
import GridSquare from '../../components/GridSquare/GridSquare';
import ControlPannel from '../../components/ControlPannel/ControlPannel';
import CommandAreaComponent from '../../components/CommandAreaComponent/CommandAreaComponent';
import Robot from '../../components/Robot/Robot'

// test boilerplate
describe("RobotChallengeContainer", () =>{
  let mountedRobotChallengeContainer;
  let shallowRobotChallengeContainer;
  const robotChallengeContainer = () => {
    if (!mountedRobotChallengeContainer) {
      mountedRobotChallengeContainer = mount(
        <RobotChallengeContainer/>
      );
    }
    return mountedRobotChallengeContainer;
  }

  const robotChallengeContainershallow = () =>{
    if(!shallowRobotChallengeContainer){
      shallowRobotChallengeContainer = shallow(
        <RobotChallengeContainer/>
      );
    }
    return shallowRobotChallengeContainer;
  }

  beforeEach(()=>{
    shallowRobotChallengeContainer = undefined;
    mountedRobotChallengeContainer = undefined;
  })
  it("is any div present",()=>{
    expect(robotChallengeContainer().find("div").length).toBeGreaterThanOrEqual(1);
  })

  // functional testing of RobotChallengeContainer
  describe("functional testing",()=>{
    let robotContainer=robotChallengeContainershallow();
    
    beforeEach(()=>{
      robotContainer.setState({
        gridXDimension: 5,
        gridYDimension: 5,
        robotRotationDegree: null,
        robotXPosition:null,
        robotYPosition:null,
        textAreaValue: '',
        currentCommandNummber: -1,
      })
    });
    
    it("is the state set",()=>{
      expect(robotContainer.state().gridXDimension).toEqual(5);
    });

    it("of handleTextAreaChange",()=>{
      robotContainer.instance().handleTextAreaChange("Testing....");
      expect(robotContainer.state().textAreaValue).toEqual("Testing....")
    });

    it("of handleSingleStep",()=>{
      robotContainer.instance().handleTextAreaChange("place 4 4 north \n left \n move ");
      robotContainer.instance().handleSingleStep();
      expect(robotContainer.state().robotXPosition).toBe(4);
    });

    it("of handleAllSteps",()=>{
      robotContainer.instance().handleTextAreaChange("place 4 4 north \n left \n move ");
      robotContainer.instance().handleAllSteps();
      expect(robotContainer.state().robotXPosition).toBe(3);
      expect(robotContainer.state().robotYPosition).toBe(4);
      expect(robotContainer.state().robotRotationDegree).toBe(180);
    });

    it("of handleReset",()=>{
      robotContainer.instance().handleTextAreaChange("place 4 4 north \n left \n move ");
      robotContainer.instance().handleAllSteps();
      robotContainer.instance().handleReset();
      expect(robotContainer.state().robotXPosition).toBeNull();
      expect(robotContainer.state().robotYPosition).toBeNull();
      expect(robotContainer.state().robotRotationDegree).toBeNull();
      expect(robotContainer.state().gridXDimension).not.toBeNull();
    });

  })

  // UI testing
  describe("Ui testing",()=>{
    let robotContainer = robotChallengeContainer();
    
    beforeEach(()=>{
      robotContainer.setState({
        gridXDimension: 5,
        gridYDimension: 5,
        robotRotationDegree: null,
        robotXPosition:null,
        robotYPosition:null,
        textAreaValue: '',
        currentCommandNummber: -1,
      })
    });
    it(" of Grid and components being rendered",()=>{
      expect(robotContainer.find(GridComponent).length).toBe(1);
      expect(robotContainer.find(GridSquare).length).toBe(25);
      expect(robotContainer.find(ControlPannel).length).toBe(1);
      expect(robotContainer.find(CommandAreaComponent).length).toBe(1);
      expect(robotContainer.find(Robot).length).toBe(25);
    })

    it(" of grid wether a robot is displayed or not",()=>{
      robotContainer.setState({
        robotRotationDegree: 90,
        robotXPosition: 3,
        robotYPosition:3
      })
      expect(robotContainer.find('img').length).toBe(1);
      expect(robotContainer.find(".class-3-y-3-x-square").length).toBe(1);
      expect(robotContainer.find(".class-3-y-3-x-square").find('img').length).toBe(1);
    })

    it("of grid when some command is added to text area and single step is clicked",()=>{
      let commandArea = robotContainer.find('.command-area');
      expect(commandArea.length).toBe(1);
      commandArea.simulate('change', { target: { value: "place 4 4 north \n left \n move"}});
      expect(robotContainer.state().textAreaValue).toBe("place 4 4 north \n left \n move");
      let singleStepButton = robotContainer.find('.single-step-button');
      expect(singleStepButton.length).toBe(1);
      singleStepButton.simulate('click');
      expect(robotContainer.find('.class-4-y-4-x-square').find(Robot).props().isRobotPresent).toBeTruthy();
      expect(robotContainer.find('.class-4-y-4-x-square').find('img').length).toBe(1);
    })

    it("of grid when some command is added to text area and run all steps is clicked",()=>{
      let commandArea = robotContainer.find('.command-area');
      expect(commandArea.length).toBe(1);
      commandArea.simulate('change', { target: { value: "place 4 4 north \n left \n move"}});
      expect(robotContainer.state().textAreaValue).toBe("place 4 4 north \n left \n move");
      let allStepButton = robotContainer.find('.all-step-button');
      expect(allStepButton.length).toBe(1);
      allStepButton.simulate('click');
      expect(robotContainer.find('.class-4-y-3-x-square').find(Robot).props().isRobotPresent).toBeTruthy();
      expect(robotContainer.find('.class-4-y-4-x-square').find('img').length).toBe(0);
      expect(robotContainer.find('.class-4-y-3-x-square').find('img').length).toBe(1);
      let resetButton = robotContainer.find('.reset-button');
      resetButton.simulate('click');
      expect(robotContainer.find('img').length).toBe(0);
    })
  })
})