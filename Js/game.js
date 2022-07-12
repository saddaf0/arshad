
class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");

    this.leadeboardTitle = createElement("h2");

    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }

  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    player1 = createSprite(width-1100, height / 2 - 50);
    player1.addImage("player1", playerImage);
    player1.scale = 0.5;

    player2 = createSprite(width-1200, height / 2 + 150);
    player2.addImage("player2", playerImage);
    player2.scale = 0.5;

    players = [player1, player2];
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");

    this.resetButton.class("resetButton");
    this.resetButton.position(width / 2 ,height/2);
  }

  play() {
    this.handleElements();
this.handleResetButton()
    Player.getPlayersInfo();

    if (allPlayers !== undefined) {
      image(backgroundImage, 0, 0, width*4, height);

      //index of the array
      var index = 0;
      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //use data form the database to display the cars in x and y direction
        var x =width/4+allPlayers[plr].positionX;
        var y = allPlayers[plr].positionY;

        players[index - 1].position.x = x;
        players[index - 1].position.y = y;

        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);

          // Changing camera position in y direction
      camera.position.x=players[index-1].position.x
        }
      }

      this.handlePlayerControls();

      drawSprites();
    }
  }

  handlePlayerControls() {
    // handling keyboard events
    if (keyIsDown(UP_ARROW)) {
      player.positionX+= 10;
      player.update();
    }
  }

  handleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
        playerCount: 0,
        gameState: 0,
        players: {}
      });
      window.location.reload();
    });
  }
}