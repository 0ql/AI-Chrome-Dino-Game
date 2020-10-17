class Obstacle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.img = kaktus_png;
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
    this.x -= OBSTACLE_SPEED;

    //...entfernen...
    if (this.x + this.width < 0) {
      obstacles.splice(obstacles.indexOf(this), 1);

      //...und neues einfügen
      generateNewObstacle();
    }
  }

  draw() {
    image(this.img, this.x, this.y, this.width, this.height);
  }
}