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
myRec.interimResults = false; // allow partial recognition (faster, less accurate)


var x = 320;
var y = 636;
var maze;
var level1;
var level2;
var level3;
var music;
var hit;
var spr;
var loopholes = [[],[],[]]; //array for the spots player can pass through//
var smileys = [[65,65],[310,600]];

var timeleft = 10;
var startTime = 0;
var currentTime = 0;

function preload() {
  maze = loadImage("data/maze.png"); //beginner level

  music = loadSound('Motivated.mp3'); //background music

}

function setup() {
  createCanvas(640,640);
  myRec.onResult = parseResult; // recognition callback
  myRec.start(); // start engine
  dx = 0;
  dy = 0;
  // pixelDensity(1);
  // maze.loadPixels();
  // loadPixels();

  // document.getElementById('defaultCanvas0');
  // document.getElementById('defaultCanvas0').style.marginLeft = windowWidth/2 - 320 + "px";
  // document.getElementById('defaultCanvas0').style.marginTop = windowHeight/2 - 320 + "px";

  //noCanvas();


  //Plays background electronic music
  music.play();

  //Animation of square using p5 Play Library
  spr = createSprite(
    x, y, 10, 10);
  spr.shapeColor = color(255,0,0);
  spr.rotateToDirection = true;
  spr.maxSpeed = 3;
  spr.friction = 0.1;

}

function draw() {
  background(maze);
  hit = red(get(x, y));
  
  /*
  textSize(16);
  text(millis()/1000,width/3, height/4);

  textSize(16);
  text("Years:",width/6, height/4);
 
  textSize(16);
  text("Life:",width/6, height/8);
  */

  image(maze, 0, 0);

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
  ellipse(0, 0, 9, 9);
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

  happy1 = new Hapiness(185,65);
  happy1.drawHapiness();

  drawSmileys();

  collect();

  // for (var x = 0; x < maze.width; x++) {
  //   for (var y = 0; y < maze.height; y++ ) {

  //     // Calculate the 1D location from a 2D grid
  //     var loc = (x + y*maze.width)*4;

  //     // Get the R,G,B values from image
  //     var r,g,b;
  //     r = maze.pixels[loc];

  //     // Calculate an amount to change brightness based on proximity to the mouse
  //     var maxdist = 50;
  //     var d = dist(x, y, mouseX, mouseY);
  //     var adjustbrightness = 255*(maxdist-d)/maxdist;
  //     r += adjustbrightness;

  //     // Constrain RGB to make sure they are within 0-255 color range
  //     r = constrain(r, 0, 255);

  //     // Make a new color and set pixel in the window
  //     //color c = color(r, g, b);
  //     var pixloc = (y*width + x)*4;
  //     pixels[pixloc] = r;
  //     pixels[pixloc+1] = r;
  //     pixels[pixloc+2] = r;
  //     pixels[pixloc+3] = 255;
  //   }
  // }
  // updatePixels();
  //drawGrid ();
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


class Hapiness {

  constructor(x,y){

    this.x = x;
    this.y = y;

  }

  drawHapiness(){

  noStroke();

  // smiley face
  fill(247, 202, 24);
  ellipse(this.x, this.y, 20, 20);

  //smiley eyes & mouth
  fill(0);
  ellipse(this.x-5, this.y-2, 4, 4);
  ellipse(this.x+5, this.y-2, 4, 4);
  arc(this.x, this.y+3, 10, 8, radians(0), radians(180));

  }
}

function drawSmileys(){

  for (var i= 0; i<smileys.length; i++){

    new Hapiness(smileys[i][0],smileys[i][1]).drawHapiness();

  }

}

function collect(){

  for (var i= 0; i<smileys.length; i++){

    if (dist(x,y,smileys[i][0],smileys[i][1])< 8) {

      console.log("FFCG");
      smileys.splice(i,1);
    }
  }  
}


//Brightness Effect

function drawGrid (){

// console.log(mouseX,mouseY);

//   for(var i =0; i< width; i+= 20){
//    for(var j=0; j<height; j+= 20){
//      //fill(255-dist(mouseX,mouseY,i,j));
//      //rect(i,j,20,20);
//      if(mouseX <500 && mouseY < 500){
//        fill(255-dist(mouseX,mouseY,i,j),0,0);
//        rect(i,j,20,20);
//      }
//      else if(mouseX >500 && mouseY < 500){
//        fill(0, 255-dist(mouseX,mouseY,i,j),0);
//        rect(i,j,20,20);
//      }
//      else if(mouseX >500 && mouseY > 500){
//        fill(0,0,255-dist(mouseX,mouseY,i,j));
//        rect(i,j,20,20);
//      }
//      else{
//        fill(255-dist(mouseX,mouseY,i,j),255-dist(mouseX,mouseY,i,j),0);
//        rect(i,j,20,20);
//      }
//    }
//   }
}




