let dino, obstacles = [], distanceWalked = 0, agents = [], agentsAlive = POPSIZE;

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  angleMode(DEGREES);
  frameRate(60);

  GAMEMODE === "PLAYER" ? dino = new Dino() : init();

  generateObstacles();
}

function draw() {
  background(220);

  // gelaufene distanz erhöhen
  distanceWalked += OBSTACLE_SPEED;

  if (GAMEMODE === "AI") {
		runAI();
		text(agentsAlive, 100, 50);
  } else {
		runPLAYER();
  }

  //distanz anzeigen
	text(realDistance(), 50, 50);
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