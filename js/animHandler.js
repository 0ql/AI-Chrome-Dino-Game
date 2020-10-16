class AnimHandler {
  constructor(imgs, animSpeed) {
    this.imgs = imgs;
    this.animSpeed = animSpeed;

    this.imgIndex = 0;
    this.animTime = 0;
  }

  update() {
    this.animTime += deltaTime;

    if (this.animTime > this.animSpeed) {

      //reset animTime
      this.animTime = 0;

      //change to next image
      this.imgIndex = (this.imgIndex + 1) % this.imgs.length;
    }
  }

  getImage() {
    return this.imgs[this.imgIndex];
  }
}