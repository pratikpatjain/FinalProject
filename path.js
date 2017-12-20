/*

Final Project: THE PATH

The Path is a puzzle game about following the path and figuring your way out of the maze. 
This game has a twist. You are in fact rewarded for breaking free from the path. 
On a deeper level it speaks about how, in life, we tend to walk on paths set in motion by our parents,
idols, influencers or peers and we keep following it. This game is about breaking away from that path 
to discover yourself and carve your own path. 

*/

//The P5 Speech Library 
var myRec = new p5.SpeechRec(); // new P5.SpeechRec object
myRec.continuous = true; // do continuous recognition
myRec.interimResults = false; // allow partial recognition (faster, less accurate)


//Global Variables

//Initial Position of the Ball
var x = 320; 
var y = 630;

var maze;
var level1;
var level2;
var level3;
var music;
var hit;
var spr;
var joy;
var finish;
var hitwall;
var walkoflife;
var whoosh;
var hitmsgcount = 0;
var beginGame = false;
var ypos = 0;
//var delay;
var button;

var score = 0;

var sadfaces = [[295,395],[92,473],[193,195],[550,345],[320,550]]; //array for the roaming sad faces

var sadfaceObjects = [];

var gateways = [[210,313],[7,618],[515,108],[618,388]]; //array for the spots player can pass through//

var smileys = [[65,65],[242,625],[626,90],[92,370],[193,142],[550,245],[575,600],[448,422],[295,295],[448,168],[218,498],[15,550],[345,91]];


//Preloads media for faster performance
function preload() {
  maze = loadImage("data/maze.png"); //beginner level

  music = loadSound("Motivated.mp3"); //title background music

  walkoflife = loadSound("walk.mp3"); // game background music

  finish = loadSound("achievement.wav"); //sound played when you get hapiness 

  joy = loadSound("joy.wav");

  hitwall = loadSound("hitwall.mp3"); //sound effect when you hit wall

  whoosh = loadSound("whoosh.wav"); //sound effect when you teleport

}

function setup() {
  createCanvas(640,640);
  myRec.onResult = parseResult; // recognition callback
  myRec.start(); // start engine
  dx = 0;
  dy = 0;

  // if(!beginGame)
  // titlescreen();

  // pixelDensity(1);
  // maze.loadPixels();
  // loadPixels();


  //To place the game in the centre of the screen
  // document.getElementById('defaultCanvas0');
  // document.getElementById('defaultCanvas0').style.marginLeft = windowWidth/2 - 320 + "px";
  // document.getElementById('defaultCanvas0').style.marginTop = windowHeight/2 - 320 + "px";

  //Plays titlescreen electronic music
  //music.play();

  //Plays game electronic music
  walkoflife.play();
  walkoflife.setVolume(0.4);

  //Loops the music
  walkoflife.setLoop(true);

  //Animation of square using p5 Play Library
  // spr = createSprite(
  //   x, y, 10, 10);
  // spr.shapeColor = color(255,0,0);
  // spr.rotateToDirection = true;
  // spr.maxSpeed = 3;
  // spr.friction = 0.1;

}

function draw() {

  

  if(beginGame){

  // console.log()
  // var elem = document.querySelector('button');
  // button.remove();
  // console.log('btn removed');

  //music.stop(); 
  } 

  background(maze);

  hit = red(get(x, y)); //To check for color
  
  /*
  textSize(16);
  text(millis()/1000,width/3, height/4);

  textSize(16);
  text("Years:",width/6, height/4);
 
  textSize(16);
  text("Life:",width/6, height/8);
  */

  image(maze, 0, 0);

  if (hit < 50) //Restart if you hit the wall
  {
    console.log("Too bad, you hit the wall");
    fill (255);
    strokeWeight(4);
    textSize(30);
    text("Too bad, you hit the wall", 160, 220);
    if (hitmsgcount<10000)
    hitthewall();
    //timer = setInterval(hitthewall, 1000);
    x = 320;
    y = 630;
    hitwall.play();
    scoreElement = document.getElementById("Score");
    score--; //Reduces Score by 1
    scoreElement.innerHTML = "Score : " + score;
    

  }
  else {hitmsgcount=0}

  x+=0.25*dx;
  y+=0.25*dy;
  
  //Player
  ellipseMode(CENTER);
  push();
  translate(x, y);
  stroke(55, 150, 255);
  strokeWeight (1 +(frameCount % 2));
  fill(255, 0, 0);
  ellipse(0, 0, 10, 10);
  pop();

  //For Displaying Win Message when the player reaches the end of the Maze
  if (x > 315 && x < 325) {
    if (y < 10) {
      fill (16,178,2);
      textSize(35);
      stroke(0);
      text("GOAL ATTAINED!", 150, 150);
      finish.play(); //finishing sound
    }
  }

  //p5 Play Sprite
  // if (mouseIsPressed) {
  //   spr.attractionPoint(1, mouseX, mouseY);
  // }
  // drawSprites();

  //Movement of Red Ball/Player

  //Move Up using W or up arrow

  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    y = y - 2;
  }

  //Move Up using S or down arrow

  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    y = y + 2;
  }

  //Move Up using D or right arrow

  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    x = x + 2;
  }

  //Move Up using A or left arrow

  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    x = x - 2;
  }

  happy1 = new Hapiness(193,142);
  happy1.drawHapiness();

  // sad1 = new Sadness(295,600);
  // sad1.drawSadness();

  portal1 = new Portal(210,313);
  portal1.drawPortal();

  drawSmileys();

  drawSadfaces();

  drawGateways();

  collect();

  transport();

  grief();

  //Displaying Score
  
  // stroke(121,0,255);
  // fill(55, 150, 255);
  // strokeWeight(3);
  // textSize(17);
  // text("S c o r e :",235,149)
  // textSize(21);
  // text(score,312,149);

  //Brightness Effect for spotlight around player

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

//Title Screen
function titlescreen() {

  //console.log("ffff");
  
  background(0); 
  fill(255);
  strokeWeight(7);
  textSize(65);
  text("The Path", 180,height/3); 
  textSize(35);
  text("'Carve your path'", 180,height/2); 

  stroke(0,255,0);
  button = createButton('PLAY');
  button.position(300, 380);
  button.style.color = "white";
  button.mousePressed(function (){
    beginGame = true;
  });
  
}

//For making player move with Voice Recognition
function parseResult()
{
    // recognition system will often append words into phrases.
    // so hack here is to only use the last word:

    var mostrecentword = myRec.resultString.split(' ').pop();

    //Used or for other words to be included to make speech response smoother
    if(mostrecentword.indexOf("left")!==-1 || mostrecentword.indexOf("lift")!==-1 ){ 

      dx=-1;
      dy=0; 
    }
    else if(mostrecentword.indexOf("right")!==-1 || mostrecentword.indexOf("ride")!==-1 ) { 

      dx=1;
      dy=0; 
    }
    else if(mostrecentword.indexOf("up")!==-1 || mostrecentword.indexOf("app")!==-1) { 

      dx=0;
      dy=-1;
    }
    else if(mostrecentword.indexOf("down")!==-1) { 

      dx=0;
      dy=1;
    }
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
  fill(255, 202, 24);
  ellipse(this.x, this.y, 18, 18);

  // Jiggling randomly on the vertical axis
  //this.x = this.x + random(-1, 1);
  this.y = this.y + random(-1, 1);

  //smiley eyes & mouth
  fill(0);
  ellipse(this.x-4, this.y-2, 3, 3);
  ellipse(this.x+4, this.y-2, 3, 3);
  arc(this.x, this.y+2, 9, 8, radians(0), radians(180));

  }
}

//To draw the Happy Faces
function drawSmileys(){

  for (var i= 0; i<smileys.length; i++){

    new Hapiness(smileys[i][0],smileys[i][1]).drawHapiness();

  }

}

function collect(){

  for (var i= 0; i<smileys.length; i++){

    if (dist(x,y,smileys[i][0],smileys[i][1])< 8) {

      console.log("Joy");
      smileys.splice(i,1);
      joy.play();
      scoreElement = document.getElementById("Score");
      score = score+5;
      scoreElement.innerHTML = "Score : " + score;
    }
  }  
}

//Sad Faces
class Sadness {

  constructor(x,y){

    this.x = x;
    this.y = y;
    this.currentY = y;

  }

  drawSadness(){

  noStroke();

  // sad face
  fill(75, 144, 209);
  ellipse(this.x, this.y + sin(ypos)*27, 18, 18);

  // Moving the sad faces up & down
  ypos += 0.01;

  //sad eyes & mouth
  fill(0);
  ellipse(this.x-4, (this.y+ sin(ypos)*28)-2, 3, 3);
  ellipse(this.x+4, (this.y+ sin(ypos)*28)-2, 3, 3);
  arc(this.x, (this.y+ sin(ypos)*28)+5, 9, 8, radians(180), radians(0));
  this.currentY = this.y+ sin(ypos)*28;
  }
}

//To draw the Sad Faces
function drawSadfaces(){

  for (var i= 0; i<sadfaces.length; i++){

    sadfaceObjects.push(new Sadness(sadfaces[i][0],sadfaces[i][1]));
    sadfaceObjects[i].drawSadness();

  }

}

function grief(){

  for (var i= 0; i<sadfaceObjects.length; i++){

    if (dist(x,y,sadfaceObjects[i].x,sadfaceObjects[i].currentY)< 8) {

      console.log("Misery");
      joy.play();
      x = 320;
      y = 630;
    }
  }  
}

class Portal {

  constructor(x,y){

    this.x = x;
    this.y = y;
  }

  drawPortal(){

    fill(255,65,242);
    strokeWeight();
    stroke(255,255,0);
    strokeWeight (1 +(frameCount % 2));
    //this.x += random(-1, 1);
    //this.y += random(-1, 1);
    rect(this.x,this.y,15,15);
    
  }
}

//To draw the Portals
function drawGateways(){

  for (var i= 0; i<gateways.length; i++){

    new Portal (gateways[i][0],gateways[i][1]).drawPortal();

  }

}

//For teleporting the player
function transport(){

  for (var i= 0; i<gateways.length; i++){

    //console.log(dist(x,y,gateways[i][0],gateways[i][1]));

    if (dist(x,y,gateways[i][0],gateways[i][1])< 15) {

      console.log("Dr.Who");
      whoosh.play(); //teleportation sound effect

      //Randomly transports players when they enter a portal 
      switch(parseInt(random(0,4))){


        case 0 : x = 345; 
                 y = 450;
                 //console.log("Apparate Please");
                 break;

        case 1 : x = 445; 
                 y = 475;
                 break;

        case 2 : x = 65;
                 y = 190;
                 break;

        case 3 : x = 472;
                 y = 120;
                 break;         

      } 
    }
  }    
}


function hitthewall(){

  text("Too bad, you hit the wall", 160, 220);
  hitmsgcount++;
  // if(hitmsgcount == 10)
  //   clearInterval(timer);
}

//Brightness Effect for spotlight around player

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




