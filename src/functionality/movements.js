const INVALID_COMMAND_STATEMENT = "Invalid Command";
const INDEX_OUT_OF_RANGE_ERROR = "Index out of range";
const DIRECTION_ARRAY = ["north", "east", "south", "west"];

const DIRECTION_MULTIPLIER = {
  "north": 1,
  "south": -1,
  "east": 1,
  "west": -1,
};

const AXIS_DIRECTION_RELATION = {
  "north": 'y',
  "south": 'y',
  "east": 'x',
  "west": 'x'
}

const DIRECTION_DEGREE_RELATION = {
  "north": 90,
  "south": 270,
  "east": 0,
  "west": 180
}

// All movement functions in this dictionary
const functions = {

  // get commands and convert it into readable and executable form
  parseCommand: (command) => {
    if(!command){
      return [INVALID_COMMAND_STATEMENT];
    }
    var lowerCaseCommand = command.toLowerCase();
    var commandArray = lowerCaseCommand.split(" ").filter(Boolean);

    switch (commandArray[0]) {
      case 'left':
        return commandArray.length == 1 ? ["left"] : [INVALID_COMMAND_STATEMENT];
      case 'right':
        return commandArray.length == 1 ? ["right"] : [INVALID_COMMAND_STATEMENT];
      case 'aboutturn':
        return commandArray.length == 1 ? ["aboutturn"] : [INVALID_COMMAND_STATEMENT];
      case 'report':
        return commandArray.length == 1 ? ["report"] : [INVALID_COMMAND_STATEMENT];
      case 'move':
        {
          return commandArray.length == 1 ? ["move", "1"] : isNaN(parseInt(commandArray[1])) ? [INVALID_COMMAND_STATEMENT] : commandArray;
        }
      case 'place':
        {
          var lengthOfCommand = commandArray.length
          if (lengthOfCommand < 4 || isNaN(parseInt(commandArray[1])) || isNaN(parseInt(commandArray[2])) || !DIRECTION_ARRAY.includes(commandArray[3])) {
            return [INVALID_COMMAND_STATEMENT]
          } else return commandArray
        }
      default:
        return [INVALID_COMMAND_STATEMENT];
    }
  },

  // returns an array containing the axis and the magnitude of steps to be travelled
  moveNCommand: (moveCommandArray, currentDirection) => {
    var numberOfSteps = parseInt(moveCommandArray[1]);
    var numberOfStepswithMagnitude = numberOfSteps * DIRECTION_MULTIPLIER[currentDirection];
    return [AXIS_DIRECTION_RELATION[currentDirection], String(numberOfStepswithMagnitude)]
  },


  // returns the new direction string 
  rotateBot: (currentDirection, newDirectiveCommand) => {
    var currentIndex = DIRECTION_ARRAY.indexOf(currentDirection);
    var newIndex = currentIndex;

    switch (newDirectiveCommand) {
      case "right":
        {
          newIndex = currentIndex == DIRECTION_ARRAY.length - 1 ? 0 : currentIndex + 1;
          break;
        }
      case "left":
        {
          newIndex = currentIndex == 0 ? DIRECTION_ARRAY.length - 1 : currentIndex - 1;
          break;
        }
      case "aboutturn":
        {
          if (currentIndex % 2 == 0) {
            newIndex = currentIndex == 0 ? 2 : 0;
          } else {
            newIndex = currentIndex == 1 ? 3 : 1;
          }
        }
    }
    return DIRECTION_ARRAY[newIndex];
  },


  // returns a dict containing the new cordinates and direction
  placeBot: (placeCommandArray) => {
    var xAxisCordinate = parseInt(placeCommandArray[1]);
    var yAxisCordinate = parseInt(placeCommandArray[2]);
    if (xAxisCordinate < 0 || yAxisCordinate < 0) {
      return {
        "error": INDEX_OUT_OF_RANGE_ERROR
      }
    } else {
      return {
        "x": xAxisCordinate,
        "y": yAxisCordinate,
        "direction": DIRECTION_DEGREE_RELATION[placeCommandArray[3]]
      }
    }
  },


  // executes a single command and returns the new position
  executeSingleCommand: (commandString, currentPosition, xDimensionGrid, yDimensionGrid) => {
    var commandArray = functions.parseCommand(commandString);
    if (commandArray.includes(INVALID_COMMAND_STATEMENT)) {
      return {
        "error": INVALID_COMMAND_STATEMENT
      }
    } else {
      switch (commandArray[0]) {
        case 'left':
        case 'right':
        case 'aboutturn':
          {
            if (currentPosition["x"]===null){
              return {"error":"robot not placed"}
            }
            currentPosition["direction"] = DIRECTION_DEGREE_RELATION[functions.rotateBot(getKeyByValue(DIRECTION_DEGREE_RELATION, currentPosition["direction"]), commandArray[0])];
            return currentPosition;
          }
        case 'place':
          return functions.placeBot(commandArray);
        case 'move':
          {
            if (currentPosition["x"]===null){
              return {"error":"robot not placed"}
            }
            var resultingArray = functions.moveNCommand(commandArray, getKeyByValue(DIRECTION_DEGREE_RELATION, currentPosition["direction"]));
            if (resultingArray[0] == "y") {
              currentPosition["y"] = currentPosition["y"] + parseInt(resultingArray[1]);
              currentPosition["y"] = currentPosition["y"] >= yDimensionGrid ? yDimensionGrid - 1 : currentPosition["y"]
              currentPosition["y"] = currentPosition["y"] < 0 ? 0 : currentPosition["y"]
            } else {
              currentPosition["x"] = currentPosition["x"] + parseInt(resultingArray[1]);
              currentPosition["x"] = currentPosition["x"] >= yDimensionGrid ? yDimensionGrid - 1 : currentPosition["x"]
              currentPosition["x"] = currentPosition["x"] < 0 ? 0 : currentPosition["x"]
            }
            return currentPosition;
          }
        case 'report':{
          if (currentPosition["x"]===null){
            return {"error":"robot not placed"}
          }
          return currentPosition;
        }    
      }
    }
  }

};

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

module.exports = functions