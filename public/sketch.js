let socket = io();
let myColor = "white";
let myImage;

socket.on("connect", newConnection);
socket.on("mouseBroadcast", drawOtherMouse);
socket.on("color", setColor);
socket.on("newPlayer", newPlayer);

function newPlayer(newPlayerColor) {
  // console.log(newPlayerColor);

  push();
  textSize(16);
  textAlign(LEFT);
  textFont("Georgia");
  textStyle(ITALIC);
  fill(newPlayerColor);
  text("another player joined: ", width/4*3, height/15*14);
  pop();
}

function setColor(assignedColor) {
  myColor = assignedColor;
}

function newConnection() {
  // console.log("your id: " + socket.id);
}

function drawOtherMouse(data) {
  push();
  fill(data.color);
  noStroke();
  rect(data.x, data.y, 18);
  pop();
}

function preload(){
  // put preload code here
  myImage = loadImage("./assets/image/rose.png");
}

function draw() {
  // image
  image(myImage, 0, 0, 3508/2.3, 2480/2.3);

  //text
  let myText = "try here the color assigned to you with mouse clicked";
  fill(0);
  noStroke();
  textSize(16);
  textAlign(LEFT);
  textFont("Georgia");
  textStyle(ITALIC);
  text(myText, width/4*3, height/8*7);

  let myText2 = "choose which part to fill";
  fill(0);
  noStroke();
  textSize(16);
  textAlign(LEFT);
  textFont("Georgia");
  textStyle(ITALIC);
  text(myText2, width/4*3, height/10*9);
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  // put setup code here
  background("white");
}


function mouseClicked() {
  push();
  fill(myColor);
  noStroke();
  rect(mouseX, mouseY, 18);
  pop();
  // create the message
  let message = {
    x: mouseX,
    y: mouseY,
    color: myColor,
  };
  // send to the server
  socket.emit("mouse", message);
}
