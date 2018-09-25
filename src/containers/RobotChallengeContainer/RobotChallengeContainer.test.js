import React from "react";
import { mount , configure} from "enzyme";
import RobotChallengeContainer from './RobotChallengeContainer';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe("RobotChallengeContainer", () =>{
  let props;
  let mountedRobotChallengeContainer;
  const robotChallengeContainer = () => {
    if (!mountedRobotChallengeContainer) {
      mountedRobotChallengeContainer = mount(
        <RobotChallengeContainer/>
      );
    }
    return mountedRobotChallengeContainer;
  }

  it("is any div present",()=>{
    expect(robotChallengeContainer().find("div").length).toBeGreaterThanOrEqual(1);
  })
})