class Dino {
    constructor(x, y, width, height, acc){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.acc = acc;
        this.vel = 0;
        this.jumping = false;
    }

    update() {
        if(this.y + this.height < CANVAS_HEIGHT) {
            this.vel += this.acc;
            this.y += this.vel;
            if(this.y + this.height > CANVAS_HEIGHT) {
                this.jumping = false;
                this.y = CANVAS_HEIGHT - this.height;
                this.vel = 0;
            }
        }
    }

    draw() {
        rect(this.x, this.y, this.width, this.height);
    }

    jump() {
        if(this.jumping == false) {
            this.jumping = true;
            this.vel = -DINO_JUMP_POWER;
            this.y = CANVAS_HEIGHT - this.height - 1;
        }
    }

    duck() {
        this.height = DINO_DUCK_HEIGHT;
        this.y = CANVAS_HEIGHT - DINO_DUCK_HEIGHT;
    }

    unduck() {
        this.height = DINO_HEIGHT;
        this.y = CANVAS_HEIGHT - DINO_HEIGHT;
    }
}