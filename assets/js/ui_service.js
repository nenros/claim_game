var canvas = document.getElementById('game-canvas');
paper.setup(canvas);

var raster = new paper.Raster('board');
raster.bounds.left = 0
raster.bounds.top = 0;

var pawn = new paper.Raster('pawn_yellow');
pawn.position = new paper.Point(100, 100);
pawn.scale(0.8);

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

var rollDice = function () {
  dice.position = new paper.Point(paper.view.bounds.right - 100, paper.view.bounds.bottom - 100);
  dice.visible = true;
}

// window.tween = dice.tweenTo(
//   { position: new paper.Point(500, 500) },
//   { duration: 1000, start: false }
// );

// window.tween.start();

// window.dice = dice;

// var diceValue = 1;
// drawDice(diceValue);

// var diceTime = 0;

// function rollDice(current) {
//   var n = Math.floor((Math.random() * 6) + 1);
//   if (n == current) {
//     return rollDice(current);
//   } else {
//     return n;
//   }
// }

// dice.visible = false;

paper.view.draw();

var move = function({x, y}, callback) {
  var cb = callback || (function () {});
  pawn.tweenTo(
    {position: new paper.Point(x, y - 70)},
    {duration: 300}
  ).then(callback);
}

export const ui_service = {
  move: move
};

window.move = move;
window.rollDice = rollDice;
