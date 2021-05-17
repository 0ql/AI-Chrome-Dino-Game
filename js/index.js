let dino, obstacles = [], distanceWalked = 0, agents = [], agentsAlive = POPSIZE, averageScores = [], scoresThisRound = [],
  dino_jumping_png, dino_running1_png, dino_running2_png, dino_crouching1_png, dino_crouching2_png, kaktus_png, dragon1_png, dragon2_png;

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  angleMode(DEGREES);
  frameRate(60);

  dino_jumping_img = loadImage("https://0ql.github.io/AI-Chrome-Dino-Game/assets/dino_jumping.png");
  dino_running1_png = loadImage("https://0ql.github.io/AI-Chrome-Dino-Game/assets/dino_running1.png");
  dino_running2_png = loadImage("https://0ql.github.io/AI-Chrome-Dino-Game/assets/dino_running2.png");
  dino_crouching1_png = loadImage("https://0ql.github.io/AI-Chrome-Dino-Game/assets/dino_crouching1.png");
  dino_crouching2_png = loadImage("https://0ql.github.io/AI-Chrome-Dino-Game/assets/dino_crouching2.png");
  kaktus_png = loadImage("https://0ql.github.io/AI-Chrome-Dino-Game/assets/kaktus.png");
  dragon1_png = loadImage("https://0ql.github.io/AI-Chrome-Dino-Game/assets/dragon1.png")
  dragon2_png = loadImage("https://0ql.github.io/AI-Chrome-Dino-Game/assets/dragon2.png")
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

  if (frameCount % 100 == 0) {
    console.log(returnArray());
  }
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
