class Dino {
  constructor() {
    this.x = DINO_X;
    this.y = DINO_Y;
    this.alive = true;
    this.width = DINO_WIDTH;
    this.height = DINO_HEIGHT;
    this.acc = GRAVITY;
    this.vel = 0;
    this.jumping = true;
    this.crouching = false;

    this.jumpimg = dino_jumping_img;

    let imgs = [dino_running1_png, dino_running2_png];
    this.runAnimHandler = new AnimHandler(imgs, DINO_ANIM_SPEED);

    imgs = [dino_crouching1_png, dino_crouching2_png];
    this.crouchAnimHandler = new AnimHandler(imgs, DINO_ANIM_SPEED);
	}
	
	reset() {
		this.x = DINO_X;
    this.y = DINO_Y;
    this.alive = true;
    this.width = DINO_WIDTH;
    this.height = DINO_HEIGHT;
    this.acc = GRAVITY;
    this.vel = 0;
    this.jumping = true;
    this.crouching = false;
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
    if (!this.jumping && !this.crouching) {
      //wenn er nicht gerade springt (gegen doppeljumps) knapp über den Boden anheben (sonst klappt das wegen der CD oben nicht) und Geschwindigkeit nach oben
      this.jumping = true;
      this.vel = -DINO_JUMP_POWER;
      this.y = CANVAS_HEIGHT - this.height - 1;
    }
  }

  crouch() {
    if (!this.jumping && !this.crouching) {
      //wenn dino sich nicht croucht neue größe & pos für crouchen einstellen
      this.height = DINO_CROUCH_HEIGHT;
      this.width = DINO_CROUCH_WIDTH;
      this.y = CANVAS_HEIGHT - DINO_CROUCH_HEIGHT;
      this.crouching = true;
    }
  }

  uncrouch() {
    if (this.crouching) {
      //ducken wieder aufheben
      this.height = DINO_HEIGHT;
      this.width = DINO_WIDTH;
      this.y = CANVAS_HEIGHT - DINO_HEIGHT;
      this.crouching = false;
    }
  }
}