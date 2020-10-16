let dino, obstacles = [], distanceWalked = 0, agents = [];

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  angleMode(DEGREES);
  frameRate(60);

  GAMEMODE === "PLAYER" ? dino = new Dino(DINO_X, 0) : init();

  //ein obstacle für den start
  obstacles.push(new Obstacle(int(random(OBSTACLE_MIN_DISTANCE, OBSTACLE_MAX_DISTANCE))));

  //restliche 10 mit generateNewObstacle()
  for (let i = 0; i < 3; i++) {
    generateNewObstacle();
  }
}

function draw() {
  background(220);

  // gelaufene distanz erhöhen
  distanceWalked += OBSTACLE_SPEED;

  if (GAMEMODE === "AI") {
    runAI();
  } else {
    runPLAYER();
  }

  //same mit dem dino
  dino.update();
  dino.draw();

  //distanz anzeigen
  text(realDistance(), 50, 50);

  //das ist nur debug für die funktionen
  text(distanceFromDinoToNextObstacle(), 100, 50);
  text(distanceFromDinoToNextDragon(), 150, 50);
}

function keyPressed() {
  if (GAMEMODE === "PLAYER") {
    if (key == " " || keyCode == UP_ARROW || key == "w") {
      // sprung
      dino.jump();
    } else if (keyCode == SHIFT || keyCode == DOWN_ARROW || key == "s") {
      // crouchen
      dino.crouch();
    }
  }
}

function keyReleased() {
  if (GAMEMODE === "PLAYER") {
    if (keyCode == SHIFT || keyCode == DOWN_ARROW || key == "s") {
      // crouchen aufheben
      dino.uncrouch();
    }
  }
}