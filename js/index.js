let dino, obstacles;

let distanceWalked;

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  angleMode(DEGREES);
  frameRate(60);

  distanceWalked = 0;

  dino = new Dino(50, 0, DINO_WIDTH, DINO_HEIGHT, GRAVITY);

  obstacles = [];

  //ein obstacle für den start
  obstacles.push(new Obstacle(int(random(OBSTACLE_MIN_DISTANCE, OBSTACLE_MAX_DISTANCE))));

  //restliche 10 mit generateNewObstacle()
  for (let i = 0; i < 3; i++) {
    generateNewObstacle();
  }
}

function draw() {
  background(220);

  //gelaufene distanz erhöhen
  distanceWalked += OBSTACLE_SPEED;


  //alle obstacles bewegen
  for (let i = 0; i < obstacles.length; i++) {
    //collisions
    if (obstacles[i].collide(dino)) {
      //wenn collidiert neustart
      setup();
    }

    //update
    obstacles[i].update();

    //zeichnen
    obstacles[i].draw();
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
    obstacles.push(new Dragon(maxx + int(random(OBSTACLE_MIN_DISTANCE, OBSTACLE_MAX_DISTANCE)), CANVAS_HEIGHT - DRAGON_HEIGHT - DRAGON_HEIGHT_WHERE_THEY_FLY, DRAGON_WIDTH, DRAGON_HEIGHT, DRAGON_SPEED));
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
  if (key == " " || keyCode == UP_ARROW) {
    //sprung
    dino.jump();
  } else if (keyCode == SHIFT || keyCode == DOWN_ARROW) {
    //crouchen
    dino.crouch();
  }
}

function keyReleased() {
  if (keyCode == SHIFT || keyCode == DOWN_ARROW) {
    //crouchen aufheben
    dino.uncrouch();
  }
}

function realDistance() {
  return int(distanceWalked / DISTANCE_COEFFICIENT);
}