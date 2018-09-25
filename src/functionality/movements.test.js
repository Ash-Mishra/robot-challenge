// require statement
var movementFunctions = require("./movements");

test("Testing parseCommand function", () => {
  expect.assertions(9);
  // syntax parseCommand(string)
  expect(movementFunctions.parseCommand("LEFT")).toEqual(["left"]);
  expect(movementFunctions.parseCommand("RIGHT")).toEqual(["right"]);
  expect(movementFunctions.parseCommand("REPORT")).toEqual(["report"]);
  expect(movementFunctions.parseCommand("MOVE 5")).toEqual(["move", "5"]);
  expect(movementFunctions.parseCommand("MOVE")).toEqual(["move", "1"]);
  expect(movementFunctions.parseCommand("ABOUTTURN")).toEqual(["aboutturn"]);
  expect(movementFunctions.parseCommand("PLACE 1 2 NORTH")).toEqual(["place", "1", "2", "north"]);
  expect(movementFunctions.parseCommand("PLACE 1 2 NORTH")).toEqual(["place", "1", "2", "north"]);
  expect(movementFunctions.parseCommand("PALACE 1 2 NORTH")).toEqual(["Invalid Command"]);
})

test("Testing MOVE N command", () => {
  expect.assertions(4);
  // syntax moveNCommand(moveArray, currentdirection)
  expect(movementFunctions.moveNCommand(["move", "3"], "north")).toEqual(["y", "3"]);
  expect(movementFunctions.moveNCommand(["move", "2"], "south")).toEqual(["y", "-2"]);
  expect(movementFunctions.moveNCommand(["move", "3"], "east")).toEqual(["x", "3"]);
  expect(movementFunctions.moveNCommand(["move", "3"], "west")).toEqual(["x", "-3"]);
})

test("Testing rotateBot command", () => {
  expect.assertions(7);
  // syntax rotate(currentDirection, newDirectiveCommand)
  expect(movementFunctions.rotateBot("north", "left")).toEqual("west");
  expect(movementFunctions.rotateBot("south", "left")).toEqual("east");
  expect(movementFunctions.rotateBot("west", "right")).toEqual("north");
  expect(movementFunctions.rotateBot("east", "right")).toEqual("south");
  expect(movementFunctions.rotateBot("north", "aboutturn")).toEqual("south");
  expect(movementFunctions.rotateBot("east", "aboutturn")).toEqual("west");
  expect(movementFunctions.rotateBot("south", "aboutturn")).toEqual("north");
})

// syntax placeBot(commandArray)
test("Testing placeBot command", () => {
  var retunedValue = movementFunctions.placeBot(["place", "1", "2", "north"])
  expect(retunedValue).toEqual({
    "x": 1,
    "y": 2,
    "direction": 90
  });
  retunedValue = movementFunctions.placeBot(["place", "3", "4", "west"])
  expect(retunedValue).toEqual({
    "x": 3,
    "y": 4,
    "direction": 180
  });
  retunedValue = movementFunctions.placeBot(["place", "2", "5", "east"])
  expect(retunedValue).toEqual({
    "x": 2,
    "y": 5,
    "direction": 0
  });
  retunedValue = movementFunctions.placeBot(["place", "3", "1", "south"])
  expect(retunedValue).toEqual({
    "x": 3,
    "y": 1,
    "direction": 270
  });
  retunedValue = movementFunctions.placeBot(["place", "-3", "1", "south"])
  expect(retunedValue).toEqual({
    "error": "Index out of range"
  });
  retunedValue = movementFunctions.placeBot(["place", "3", "-1", "south"])
  expect(retunedValue).toEqual({
    "error": "Index out of range"
  });
  retunedValue = movementFunctions.placeBot(["place", "-1", "1", "south"])
  expect(retunedValue).toEqual({
    "error": "Index out of range"
  });
})

test("Testing executeSingleCommand", () => {
  // syntax executeSingleCommand(commandString, currentDictionaryXYDirection)
  var newPosition = movementFunctions.executeSingleCommand("PAALACE 0 0 NORTH", {"x": 3, "y":4, "direction": 0}, 5, 5);
  expect(newPosition).toEqual({
    "error" :"Invalid Command"
  })

  newPosition = movementFunctions.executeSingleCommand("PLACE 0 0 NORTH", {"x": 3, "y":4, "direction": 0}, 5, 5);
  expect(newPosition).toEqual({
    "x": 0,
    "y": 0,
    "direction": 90
  })

  newPosition = movementFunctions.executeSingleCommand("MOVE", {"x": 3, "y":4, "direction": 0}, 5, 5);
  expect(newPosition).toEqual({
    "x": 4,
    "y": 4,
    "direction": 0
  })

  newPosition = movementFunctions.executeSingleCommand("MOVE 3", {"x": 1, "y":2, "direction": 90}, 5, 5);
  expect(newPosition).toEqual({
    "x": 1,
    "y": 4,
    "direction": 90
  })

  newPosition = movementFunctions.executeSingleCommand("LEFT", {"x": 3, "y":4, "direction": 0});
  expect(newPosition).toEqual({
    "x": 3,
    "y": 4,
    "direction": 90
  })

  newPosition = movementFunctions.executeSingleCommand("aboutturn", {"x": 3, "y":4, "direction": 0});
  expect(newPosition).toEqual({
    "x": 3,
    "y": 4,
    "direction": 180
  })

  newPosition = movementFunctions.executeSingleCommand("Report", {"x": 3, "y":4, "direction": 0});
  expect(newPosition).toEqual({
    "x": 3,
    "y": 4,
    "direction": 0
  })

})