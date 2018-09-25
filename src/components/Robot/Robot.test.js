import React from "react";
import { mount , configure} from "enzyme";
import Robot from './Robot'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// Testing boilerplate
describe("Robot", () =>{
  let props;
  let mountedRobot;
  const robotComponent = () => {
    if (!mountedRobot) {
      mountedRobot = mount(
        <Robot {...props}/>
      );
    }
    return mountedRobot;
  }

  beforeEach(()=>{
    props = {
      rotation: undefined,
      isRobotPresent: undefined,
    }
    mountedRobot = undefined;
  });


  // main tests in Robot
  it("always renders a div", () => {
    const divs = robotComponent().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  describe("when isRobotPresent is false",()=>{
    beforeEach(()=>{
      props.isRobotPresent = false;
    })

    it("will image be displayed",()=>{
      const parentDiv = robotComponent().find("div");
      expect(parentDiv.find("img").length).toEqual(0);
    })
  })

  describe("when isRobotPresent is true", () => {
    beforeEach(()=>{
      props.isRobotPresent = true;
      props.rotation = 90;
    })

    it("will image be displayed",()=>{
      expect(robotComponent().find("img").length).toEqual(1);
    })

    it("transform will be present in image",()=>{
      expect(robotComponent().find("img").props().style.transform).toBe('rotate(90deg)');
    })
  })
  
})