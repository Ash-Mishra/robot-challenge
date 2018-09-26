import React from "react";
import { mount } from "enzyme";
import GridSquare from './GridSquare'

describe("GridSquare testing",() => {
  let props;
  let mountedGridSquare;
  const gridSquareComponent=()=>{
    if(!mountedGridSquare){
      mountedGridSquare = mount(
        <GridSquare {...props}/>
      );
    }
    return mountedGridSquare;
  }

  beforeEach(()=>{
    props = {
      rotationDegree: undefined,
      isRobotPresent: undefined,
    }
    mountedGridSquare = undefined;
  });

  it("always renders a div", () => {
    const divs = gridSquareComponent().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });
})