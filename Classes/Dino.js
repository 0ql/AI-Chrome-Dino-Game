class Dino {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.alive = true;
    this.width = DINO_WIDTH;
    this.height = DINO_HEIGHT;
    this.acc = GRAVITY;
    this.vel = 0;
    this.jumping = false;
    this.crouching = false;

    this.img = loadImage("../assets/dino.png");
    this.crouchimg = loadImage("../assets/crouching_dino.png");

    var imgs = [loadImage("../assets/dino_running1.png"), loadImage("../assets/dino_running2.png")];
    this.runAnimHandler = new AnimHandler(imgs, DINO_ANIM_SPEED);

    var imgs = [loadImage("../assets/dino_crouching1.png"), loadImage("../assets/dino_crouching2.png")];
    this.crouchAnimHandler = new AnimHandler(imgs, DINO_ANIM_SPEED);
  }

  update() {
    if (this.y + this.height < CANVAS_HEIGHT) { // wenn dino über dem Boden
      //physics
      this.vel += this.acc;
      this.y += this.vel;
      if (this.y + this.height > CANVAS_HEIGHT) {
        //collision dedection für den boden
        //wenn unter Boden jumping auf false, auf höhe des bodens setzen und vel = 0
        this.jumping = false;
        this.y = CANVAS_HEIGHT - this.height;
        this.vel = 0;
      }
    }

    //animation

    if (!this.jumping) {
      if (this.crouching) {
        this.crouchAnimHandler.update();
      } else {
        this.runAnimHandler.update();
      }
    }
  }

  draw() {
    if (this.crouching) {
      image(this.crouchAnimHandler.getImage(), this.x, this.y, this.width, this.height);
    } else if (this.jumping) {
      image(this.jumpimg, this.x, this.y, this.width, this.height);
    } else {
      image(this.runAnimHandler.getImage(), this.x, this.y, this.width, this.height);
    }
  }

  jump() {
    if (this.jumping == false) {
      //wenn er nicht gerade springt (gegen doppeljumps) knapp über den Boden anheben (sonst klappt das wegen der CD oben nicht) und Geschwindigkeit nach oben
      this.jumping = true;
      this.vel = -DINO_JUMP_POWER;
      this.y = CANVAS_HEIGHT - this.height - 1;
    }
  }

  crouch() {
    if (this.jumping == false) {
      //wenn dino sich nicht croucth neue größe & pos für crouchen einstellen
      this.height = DINO_CROUCH_HEIGHT;
      this.width = DINO_CROUCH_WIDTH;
      this.y = CANVAS_HEIGHT - DINO_CROUCH_HEIGHT;
      this.crouching = true;
    }
  }

  uncrouch() {
    //ducken wieder aufheben
    this.height = DINO_HEIGHT;
    this.width = DINO_WIDTH;
    this.y = CANVAS_HEIGHT - DINO_HEIGHT;
    this.crouching = false;
  }
}