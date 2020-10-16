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
}

function generateNewObstacle() {

  //finde obstacle des am weitesten rechts ist

  let maxx = 0;

  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x > maxx) {
      maxx = obstacles[i].x;
    }
  }

  // wenn player schon weit genug gelaufen & Zufall

  if (realDistance() > MIN_WALKED_DISTANCE_FOR_DRAGONS && random() < DRAGON_PROBABILITY) {

    //fliegendes Obstacle
    obstacles.push(new Dragon(maxx + int(random(OBSTACLE_MIN_DISTANCE, OBSTACLE_MAX_DISTANCE)), CANVAS_HEIGHT - DRAGON_HEIGHT - DRAGON_HEIGHT_WHERE_THEY_FLY, DRAGON_WIDTH, DRAGON_HEIGHT, random(-DRAGON_SPEED, DRAGON_SPEED)));
  } else {

    //normales Obstacle
    obstacles.push(new Obstacle(maxx + int(random(OBSTACLE_MIN_DISTANCE, OBSTACLE_MAX_DISTANCE)), CANVAS_HEIGHT - OBSTACLE_HEIGHT, OBSTACLE_WIDTH, OBSTACLE_HEIGHT));
  }
}

function distanceFromDinoToNextObstacle() {
  //distanz von Dino zu obstacle direkt rechts neben ihm

  //finde obstacle dessen x am kleinsten aber rechts von dino
  let minx = Math.Infinity;

  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x < minx && obstacles[i].x > dino.x + dino.width) {
      minx = obstacles[i].x;
    }
  }

  //pos vom obstacle minus die vom dino und die breite des dinos, weil wir die distanz von rechte kante dino zu linker kante obstacle wollen
  return minx - dino.x - dino.width;
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