var canvas;
var backgroundImage;
var player1, player2, player1Image, player2Image;
var monster1, monster2, monster1_img, monster2_img, monsters;
var players = []
var form, player, playerCount;
var coinImage , Coins, fuelImage ,fuels,  bulletImage, bullets, blast, BlastImage;
var gameState, database;
var allPlayers;



function preload(){
 backgroundImage = loadImage("assets/b.jpg");
 bg = loadImage("assets/background.jpg");
 bulletImage = loadImage("assets/ammo.png");
 coinImage = loadImage("assets/coin.png");
 fuelImage = loadImage("assets/fuel.png");
 monster1_img = loadImage("assets/monster1.png");
 monster2_img = loadImage("assets/Monster2.png");
 lifeImage = loadImage("./assets/life.png");
 playerImage = loadImage("assets/player.png");
 BlastImage = loadImage("assets/blast.png");

}

function setup() {
  canvas = createCanvas(windowWidth-50, windowHeight-50);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start(); 
}

function draw() {
  background(bg);
  if (playerCount === 2) {
    game.update(1);
  }

  if (gameState === 1) {
    game.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}