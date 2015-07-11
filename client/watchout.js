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

// setup draggable elements
var drag = d3.behavior.drag()
     .on('drag', function(d){
      d3.select(this)
      .transition()
      .duration(15)
      .attr('cx', d3.event.x)
      .attr('cy', d3.event.y);
     });

var dragPath = d3.behavior.drag()
     .on('drag', function(d){
      d3.select(this)
      .transition()
      .duration(15)
      .attr('x', d3.event.x)
      .attr('y', d3.event.y);
      // .transition()
      // .duration(15)

      // .attr('transform','scale(.5) translate(' +d3.event.x *2+ ','+ d3.event.y*2 +')')
     });


// draw a player on the gameboard
var drawEnemy = function(cx, cy) {   
  board.append('circle')
    .attr('cx', cx)
    .attr('cy', cy)
    .attr('r', 20)
    .attr('fill', 'red')
    .call(drag);
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
  // board.append('path')
  //   .attr('d', 'M230 80 A 45 45, 0, 1, 0, 275 125 L 275 80 Z')
  //   .attr('fill', 'blue')
  //   .attr('transform', 'scale(.5)');
  board.append('rect')
    .attr('x', width/2)
    .attr('y', height/2)
    .attr('width', 25)
    .attr('height', 25)
    .attr('fill', 'blue')
    .call(dragPath);
}

var detectCollision = function(player) {
  var playerX = player.attr('x');
  var playerY = player.attr('y');
  board.selectAll('circle').each(function(d, i ){
    var cx = d3.select(this).attr('cx');
    var cy = d3.select(this).attr('cy');
    if (cx - playerX < 10 && cy - playerY < 10) {
      console.log("hit");
    }
  });
};

setInterval(function(){
  detectCollision(board.select('rect'));  
},200)


// part of setup
makeEnemies(4);
drawPlayer(0, 0);
setInterval(moveEnemies, 1000);
board.selectAll('circle').call(drag);
board.selectAll('path').call(dragPath);

  