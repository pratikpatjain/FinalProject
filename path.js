/*

Final Project: THE PATH

The Path is a puzzle game about following the path and figuring your way out of the maze. 
This game has a twist. You are in fact rewarded for breaking free from the path. 
On a deeper level it speaks about how, in life, we tend to walk on paths set in motion by our parents,
idols, influencers or peers and we keep following it. This game is about breaking away from that path 
to discover yourself and carve your own path. 

*/

var x = 201;
var y = 397;
var level0;
var level1;
var level2;
var level3;
var music;
var hit;
var spr;
var loopholes = [[],[],[]]; //array for the spots player can pass through//

var timeleft = 10;
var startTime = 0;
var currentTime = 0;

function preload() {
  level0 = loadImage("data/maze2.png"); //beginner level
  level1 = loadImage("data/maze2.png"); //first level
  level2 = loadImage("data/maze2.png"); //second level
  level3 = loadImage("data/maze2.png"); //third level

  music = loadSound('Motivated.mp3'); //background music

}

function setup() {
  createCanvas(402, 402);
  //noCanvas();

  //Animation of square using p5 Play Library
  music.play();
  spr = createSprite(
    x, y, 10, 10);
  spr.shapeColor = color(255,0,0);
  spr.rotateToDirection = true;
  spr.maxSpeed = 3;
  spr.friction = 0.1;

  //Timer Code//

  /*startTime = millis();

  var params = getURLParams();

  if (params.minute) {
    var min = params.minute;
    timeleft = min * 60;
  }

  var timer = select('#timer');
  timer.html(convertSeconds(timeleft - currentTime));

  var interval = setInterval(timeIt, 1000);

  function timeIt() {
    currentTime = floor((millis() - startTime) / 1000);
    timer.html(convertSeconds(timeleft - currentTime));
  }
  */
}

function draw() {
  background(level0);
  hit = red(get(x, y));
  
  /*
  textSize(16);
  text(millis()/1000,width/3, height/4);

  textSize(16);
  text("Years:",width/6, height/4);
 
  textSize(16);
  text("Life:",width/6, height/8);
  */
  if (hit == 0) 
  {
    console.log("you hit the wall");
    x = 201;
    y = 397;
  }


  //image(level0, 0, 0);
  
  ellipseMode(CENTER);
  push();
  translate(x, y);
  fill(255, 0, 0);
  ellipse(0, 0, 8, 8);
  pop();


  if (x > 148 && x < 158) {
    if (y < 5) {
      fill (16,178,2);
      textSize(40);
      stroke(0);
      text("YOU WIN!", 50, 50);
    }
  }

  if (mouseIsPressed) {
    spr.attractionPoint(1, mouseX, mouseY);
  }
  drawSprites();

  //Movement of Red Ball/Player

  if (keyIsDown(UP_ARROW)) {
    y--;
  }

  if (keyIsDown(DOWN_ARROW)) {
    y++;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    x++;
  }

  if (keyIsDown(LEFT_ARROW)) {
    x--;
  }
}

function convertSeconds(s) {
  var min = floor(s / 60);
  var sec = s % 60;
  return nf(min, 2) + ':' + nf(sec, 2);
}



