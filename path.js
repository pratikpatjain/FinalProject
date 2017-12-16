/*

Final Project: THE PATH

The Path is a puzzle game about following the path and figuring your way out of the maze. 
This game has a twist. You are in fact rewarded for breaking free from the path. 
On a deeper level it speaks about how, in life, we tend to walk on paths set in motion by our parents,
idols, influencers or peers and we keep following it. This game is about breaking away from that path 
to discover yourself and carve your own path. 

*/
var myRec = new p5.SpeechRec(); // new P5.SpeechRec object
myRec.continuous = true; // do continuous recognition
myRec.interimResults = true; // allow partial recognition (faster, less accurate)


var x = 320;
var y = 636;
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
  level0 = loadImage("data/maze.png"); //beginner level

  music = loadSound('Motivated.mp3'); //background music

}

function setup() {
  createCanvas(640,640);
  myRec.onResult = parseResult; // recognition callback
  myRec.start(); // start engine
  dx = 0;
  dy = 0;
  // document.getElementById('defaultCanvas0');
  // document.getElementById('defaultCanvas0').style.marginLeft = windowWidth/2 - 320 + "px";
  // document.getElementById('defaultCanvas0').style.marginTop = windowHeight/2 - 320 + "px";

  //noCanvas();

  //Animation of square using p5 Play Library
  // music.play();
  // spr = createSprite(
  //   x, y, 10, 10);
  // spr.shapeColor = color(255,0,0);
  // spr.rotateToDirection = true;
  // spr.maxSpeed = 3;
  // spr.friction = 0.1;

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

  image(level0, 0, 0);

  if (hit < 50) 
  {
    console.log("Too bad, you hit the wall");
    x = 320;
    y = 636;
  }

  x+=dx;
  y+=dy;
  
  
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

  // if (mouseIsPressed) {
  //   spr.attractionPoint(1, mouseX, mouseY);
  // }
  // drawSprites();

  //Movement of Red Ball/Player

  //Move Up using W or up arrow

  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    y--;
  }

  //Move Up using S or down arrow
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    y++;
  }

  //Move Up using D or right arrow
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    x++;
  }

  //Move Up using A or left arrow
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    x--;
  }
}

function convertSeconds(s) {
  var min = floor(s / 60);
  var sec = s % 60;
  return nf(min, 2) + ':' + nf(sec, 2);
}

function parseResult()
  {
    // recognition system will often append words into phrases.
    // so hack here is to only use the last word:
    var mostrecentword = myRec.resultString.split(' ').pop();
    if(mostrecentword.indexOf("left")!==-1) { dx=-1;dy=0; }
    else if(mostrecentword.indexOf("right")!==-1) { dx=1;dy=0; }
    else if(mostrecentword.indexOf("up")!==-1) { dx=0;dy=-1; }
    else if(mostrecentword.indexOf("down")!==-1) { dx=0;dy=1; }
    console.log(mostrecentword);
  }





