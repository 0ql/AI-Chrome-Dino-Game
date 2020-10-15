class Dino {
    constructor(x, y, width, height, acc){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.acc = acc;
        this.vel = 0;
        this.jumping = false;

        this.img = loadImage("assets/dino.png");
    }

    update() {
        if(this.y + this.height < CANVAS_HEIGHT) {
            //wenn dino über dem Boden
            //physics
            this.vel += this.acc;
            this.y += this.vel;
            if(this.y + this.height > CANVAS_HEIGHT) {
                //collision dedection für den boden
                //wenn unter Boden jumping auf false, auf höhe des bodens setzen und vel = 0
                this.jumping = false;
                this.y = CANVAS_HEIGHT - this.height;
                this.vel = 0;
            }
        }
    }

    draw() {
        image(this.img, this.x, this.y, this.width, this.height);
    }

    jump() {
        if(this.jumping == false) {
            //wenn er nicht gerade springt (gegen doppeljumps) knapp über den Boden anheben (sonst klappt das wegen der CD oben nicht) und Geschwindigkeit nach oben
            this.jumping = true;
            this.vel = -DINO_JUMP_POWER;
            this.y = CANVAS_HEIGHT - this.height - 1;
        }
    }

    duck() {
        if(this.jumping == false) {
            //wenn dino sich nicht duckt neue größe & pos für ducken einstellen
            this.height = DINO_DUCK_HEIGHT;
            this.width = DINO_DUCK_WIDTH;
            this.y = CANVAS_HEIGHT - DINO_DUCK_HEIGHT;
        }
    }

    unduck() {
        //ducken wieder aufheben
        this.height = DINO_HEIGHT;
        this.width = DINO_WIDTH;
        this.y = CANVAS_HEIGHT - DINO_HEIGHT;
    }
}