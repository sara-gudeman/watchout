// start slingin' some d3 here.

// set up function
// -- provide board
// -- provide group container
// -- create enemies (initial number)
// -- place player (randomly maybe)
// -- initialize & set timer

// player module
// -- methods (player actions)

// enemy module
// -- create enemies
// -- methods (enemy actions)

// enemy movement module
// -- check all enemies
// -- monitor positions

// collision detection module

// player class
// -- create new player



// setup

var height = 400,
    width = 400;

var makeRandomNum = function(factor) {
  return Math.floor(Math.random() * factor);
}

// Player constructor function
var Player = function(x, y, type) {
  this.body;
  this.x = x || 0;
  this.y = y || 0;
  this.type = type || "enemy";
};

// game board selector
var board = d3.select('.gameboard').append('svg')
    .attr('width', width)
    .attr('height', height)
  .append('g');

// draw a player on the gameboard
var drawEnemy = function(cx, cy) {   
  board.append('circle')
    .attr('cx', cx)
    .attr('cy', cy)
    .attr('r', 20)
    .attr('fill', 'red')
};

// create some enemies for game
var makeEnemies = function(num) {
  for (var i = 0; i < num; i++) {
    drawEnemy(makeRandomNum(width), makeRandomNum(height));
  }
}

var moveEnemies = function() {
  board.selectAll('circle')
    .transition()
    .duration(1000)
    .attr('cx', function(d, i) {
      return makeRandomNum(width);
    })
    .attr('cy', function(d, i) {
      return makeRandomNum(height);
    });
}

// var player = new Player(width / 2, height / 2, 'friend');
var drawPlayer = function(cx, cy) {
  board.append('path')
    .attr('d', 'M230 80 A 45 45, 0, 1, 0, 275 125 L 275 80 Z')
    .attr('fill', 'blue')
    .attr('transform', 'scale(.5)');
}
// <path d="M230 80
//            A 45 45, 0, 1, 0, 275 125
//            L 275 80 Z" fill="red"/>

drawPlayer(0, 0);

// part of setup
makeEnemies(4);
setInterval(moveEnemies, 1000);

// d3.select('.gameboard')
//     .data([player], function(d){return [player]})
//     // .data(player)
//     // .enter()
//     // .append('svg')
//     //   .attr('width', 40)
//     //   .attr('height', 40)
//       .append('circle')
//         .attr('cx', 20)
//         .attr('cy', 20)
//         .attr('r', 20)
//         .attr('fill', 'red');

// d3.select('.gameboard')
//     .data([player], function(d){return [player]})
//     .attr('width', 100);


  