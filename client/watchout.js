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
    width = 400,
    score = 0,
    highScore = 0,
    collisions = 0;

var makeRandomNum = function(factor) {
  return Math.floor(Math.random() * factor);
}

var sendMessage = function(text) {
  d3.select('.messageboard span')
  .text(text)
  .transition().duration(500)
  .style('opacity', 1)
  .transition().duration(2000)
  .style('opacity', 0);
}

// Player constructor function
//    this.body;
//   this.x = x || 0;
//   this.y = y || 0;
//   this.type = type || "enemy";
// };

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

      var boundX = d3.event.x;
      var boundY = d3.event.y;

      var elementDimension = d3.select(this).attr('width');

      if (d3.event.x >= width - elementDimension) {
        boundX = width - elementDimension;
      }
      if (d3.event.x <= 0) {
        boundX = 0;
      }
      if (d3.event.y >= height - elementDimension) {
        boundY = height - elementDimension;
      }
      if (d3.event.y <= 0) {
        boundY = 0;
      }
      d3.select(this)
      .transition()
      .duration(15)
      .attr('x', boundX)
      .attr('y', boundY);
     });


// draw a player on the gameboard
var drawEnemy = function(cx, cy) {   
  board.append('circle')
    .attr('cx', cx)
    .attr('cy', cy)
    .attr('r', 20)
    .attr('fill', 'red')
    .transition().duration(750)
    .attr('fill','black');

    d3.selectAll('circle').append('image');
  // d3.selectAll('circle').enter().append('image');
  // d3.selectAll('circle')
  //   .enter()
  //   .append('image');
      // .attr('xlink: href', 'shuriken.png');
    // .call(drag);
};

// create some enemies for game
var makeEnemies = function(num) {
  for (var i = 0; i < num; i++) {
    drawEnemy(makeRandomNum(width), makeRandomNum(height));
  }
  console.log(board.selectAll('circle'));
  board.selectAll('circle').select('path');
  sendMessage('New enemy added');
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
    .attr('class', 'rotate')
    .call(dragPath);
}

var detectCollision = function(player) {
  var playerX = player.attr('x');
  var playerY = player.attr('y');
  board.selectAll('circle').each(function(d, i ){
    var cx = d3.select(this).attr('cx');
    var cy = d3.select(this).attr(  'cy');
    if (Math.abs(cx - playerX) < 30 && Math.abs(cy - playerY) < 30) {
      if (highScore < score) {
        var prevHighScore = highScore;
        highScore = score;
        var newEnemiestoAdd = Math.floor(highScore / 100) - Math.floor(prevHighScore/100);
        if (newEnemiestoAdd > 0) {
          makeEnemies(newEnemiestoAdd);
        }
        d3.select('.high div').text(highScore);
      }
      
      score = 0;
      collisions++; 
      d3.select('.collisions div').text(collisions);
      d3.select('.current div').text(score);
    }
  });
};

var increaseScore = function() {
  score++;
  // highScore+= score;
  d3.select('.current div').text(score);
  // d3.select('.high div').text(highScore);
};

setInterval(function(){
  detectCollision(board.select('rect'));  
},200);


// part of setup
d3.select('.current div').text(0);
d3.select('.collisions div').text(0);
d3.select('.high div').text(0);
makeEnemies(4);
drawPlayer(0, 0);

setInterval(increaseScore, 100);
setInterval(moveEnemies, 1000);
board.selectAll('circle').call(drag);
board.selectAll('path').call(dragPath);

  