class Obstacle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    collide(dino) {
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
        this.x -= OBSTACLE_SPEED;
        
        if(this.x + this.width < 0) {
            obstacles.splice(obstacles.indexOf(this), 1);
            generateNewObstacle();
        }
    }

    draw() {
        rect(this.x, this.y, this.width, this.height);
    }
}