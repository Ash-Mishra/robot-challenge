import React from "react";
import { mount , configure} from "enzyme";
import GridSquare from './GridSquare'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });