import React from "react";
import { mount } from "enzyme";
import GridComponent from './GridComponent';
import GridSquare from '../GridSquare/GridSquare'


describe("Testing GridComponent",()=>{
  let props;
  let mountedGridComponent;
  const gridComponent = ()=>{
    if(!mountedGridComponent){
      mountedGridComponent = mount(
        <GridComponent {...props}/>
      )
    }
    return mountedGridComponent;
  }

  beforeEach(()=>{
    props={
      gridXDimension: undefined,
      gridYDimension: undefined,
      robotXPosition: undefined,
      robotYPosition: undefined,
      robotRotationDegree: undefined,
    }
    mountedGridComponent = undefined
  })

  describe("when the grid is 5*5",()=>{
    beforeEach(()=>{
      props.gridXDimension = 5;
      props.gridYDimension = 5;
      props.robotXPosition = 3;
      props.robotYPosition = 4;
      props.robotRotationDegree = 180;
    });
    
    it("is the number of boxes the same as 5*5",()=>{
      expect(gridComponent().find('tbody').find(GridSquare).length).toEqual(25);
    });

    it("is robot present in the right square ",()=> {
      let gridComponentTable = gridComponent().find('table');
      let row = gridComponentTable.find('tr').first();
      let column = row.find('td').at(3);
      expect(column.find('img').length).toBe(1);
    });

    it("is robot present in the right square ",()=> {
      props.robotXPosition = 4;
      let gridComponentTable = gridComponent().find('table');
      let row = gridComponentTable.find('tr').first();
      let column = row.find('td').at(3);
      expect(column.find('img').length).toBe(0);
    });
  })
})