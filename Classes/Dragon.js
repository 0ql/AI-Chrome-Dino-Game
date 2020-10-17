class Dragon {
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;

    let imgs = [dragon1_png, dragon2_png];

    this.animHandler = new AnimHandler(imgs, DRAGON_ANIM_SPEED);

    this.animTime = 0;
    this.imgIndex = 0;
  }

  collide(dino) {
    //Collision detection aus dem internet
    if (this.x < dino.x + dino.width &&
      this.x + this.width > dino.x &&
      this.y < dino.y + dino.height &&
      this.y + this.height > dino.y) {
      return true;
    } else {
      return false;
    }
  }

  update() {
    //wenn obstacle links aus dem bildschirm gelaufen ist...
    this.x -= OBSTACLE_SPEED + this.speed;

    //...entfernen...
    if (this.x + this.width < 0) {
      obstacles.splice(obstacles.indexOf(this), 1);

      //...und neues einfügen
      generateNewObstacle();
    }

    //Animation
    this.animHandler.update();
  }

  draw() {
    image(this.animHandler.getImage(), this.x, this.y, this.width, this.height);
  }
}