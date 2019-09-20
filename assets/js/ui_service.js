var canvas = document.getElementById('game-canvas');
paper.setup(canvas);

var boardRaster = new paper.Raster('board');
var boardWidht = 3544;
var boardHeight = 2363;
var boardTransX = 0;
var boardTransY = 0;
boardRaster.position = new paper.Point(boardWidht / 2, boardHeight / 2);

var pawn = new paper.Raster('pawn_yellow');
pawn.position = new paper.Point(100, 100);
pawn.scale(0.8);

var board = new paper.Group([boardRaster, pawn]);

///// THE DICE

var diceSize = 100;

var diceFrame = new paper.Path.Rectangle(
    new paper.Rectangle(new paper.Point(0, 0), new paper.Size(diceSize, diceSize)),
    new paper.Size(10, 10));
diceFrame.fillColor = 'white';
diceFrame.strokeColor = 'black';
diceFrame.strokeWidth = 2;

var diceD0 = new paper.Path.Circle(
    new paper.Point(50, 50),
    diceSize / 10);
diceD0.fillColor = 'black';

var diceD1 = diceD0.clone();
diceD1.position = new paper.Point(20, 20);
var diceD2 = diceD0.clone();
diceD2.position = new paper.Point(20, 50);
var diceD3 = diceD0.clone();
diceD3.position = new paper.Point(20, 80);
var diceD4 = diceD0.clone();
diceD4.position = new paper.Point(80, 20);
var diceD5 = diceD0.clone();
diceD5.position = new paper.Point(80, 50);
var diceD6 = diceD0.clone();
diceD6.position = new paper.Point(80, 80);

var dice = new paper.Group([
  diceFrame,
  diceD0, diceD1, diceD2, diceD3, diceD4, diceD5, diceD6
]);

function drawDice(n) {
  [diceD0, diceD1, diceD2, diceD3, diceD4, diceD5, diceD6].forEach(function(d) {
    d.visible = false;
  })

  if (n == 1) {
    [diceD0].forEach(function(d) {
      d.visible = true;
    })
  } else if (n == 2) {
    [diceD1, diceD6].forEach(function(d) {
      d.visible = true;
    })
  } else if (n == 3) {
    [diceD0, diceD1, diceD6].forEach(function(d) {
      d.visible = true;
    })
  } else if (n == 4) {
    [diceD1, diceD3, diceD4, diceD6].forEach(function(d) {
      d.visible = true;
    })
  } else if (n == 5) {
    [diceD0, diceD1, diceD3, diceD4, diceD6].forEach(function(d) {
      d.visible = true;
    })
  } else if (n == 6) {
    [diceD1, diceD2, diceD3, diceD4, diceD5, diceD6].forEach(function(d) {
      d.visible = true;
    })
  }
}

dice.visible = false;
var diceRolling = false;
var diceValue = 1;
var diceTime = 0;

paper.view.draw();

var translateBoard = function(x, y, callback) {
  boardTransX = x;
  boardTransY = y;
  board.tweenTo(
    {position: new paper.Point(boardWidht / 2 + x, boardHeight / 2 + y)},
    {duration: 300}
  );
  callback();
}

var move = function({x, y}, callback) {
  window.updatePlayerPosition(x,y)
  var cb = callback || (function () {});
  pawn.tweenTo(
    {position: new paper.Point(boardTransX + x, boardTransY + y - 100)},
    {duration: 100}
  ).then(function () {
    translateBoard(
      paper.view.bounds.width / 2 - x,
      paper.view.bounds.height / 2 - y,
      cb);
  });
}

var rollDice = function ({result: value}, callback) {
  var cb = callback || (function () {});

  dice.position = new paper.Point(paper.view.bounds.right - 100, paper.view.bounds.bottom - 100);
  drawDice(diceValue);

  dice.visible = true;
  diceRolling = true;

  var dx = Math.floor((Math.random() * 200) + 100);
  var dy = Math.floor((Math.random() * 200) + 100);

  dice.tweenTo(
    {position: new paper.Point(dice.position.x - dx, dice.position.y - dy)},
    {duration: 500}
  ).then(function() {
    diceRolling = false;
    diceValue = value;
    drawDice(diceValue);
    setTimeout(function() {
      dice.visible = false;
      cb();
    }, 1000);
  });
}

function tempDiceValue(current) {
  var n = Math.floor((Math.random() * 6) + 1);
  if (n == current) {
    return tempDiceValue(current);
  } else {
    return n;
  }
}

dice.onFrame = function (event) {
  if (diceRolling) {
    if (event.time - diceTime > 0.1) {
      diceTime = event.time;
      diceValue = tempDiceValue(diceValue);
      drawDice(diceValue);
    }
  }
}

function show_card({resource_name}, callback) {
  console.log('show_card', {resource_name})
  callback()
}

function show_text({title, text}, callback) {
  console.log('show_text', {title, text})
  callback()
}

// OTHER PLAYERS

var pawnColors = [
  'pawn_red',
  'pawn_green',
  'pawn_blue'
];

var players = {};

var addPlayer = function (uuid, name) {
  if (players[uuid]) {
    players[uuid].remove();
  }

  var index = Math.floor(Math.random() * 3);

  var player = new paper.Raster(pawnColors[index]);
  player.position = new paper.Point(100, 100);
  player.scale(0.8);

  players[uuid] = player;
}

var removePlayer = function (uuid) {
  if (players[uuid]) {
    players[uuid].remove();
  }

  delete players[uuid];
}

var movePlayer = function (uuid, x, y) {
  if (players[uuid]) {
    players[uuid].tweenTo(
      {position: new paper.Point(boardTransX + x, boardTransY + y - 30)},
      {duration: 100}
    )
  }
}

var setPlayerPosition = function (uuid, x, y) {
  if (players[uuid]) {
    players[uuid].position = new paper.Point(boardTransX + x, boardTransY + y - 30);
  }
}

export const ui_service = {
  move: move,
  roll_dice: rollDice,
  show_card: show_card,
  show_text: show_text,
  add_player: addPlayer,
  remove_player: removePlayer,
  move_player: movePlayer,
  set_player_position: setPlayerPosition
};

window.move = move;
window.rollDice = rollDice;
