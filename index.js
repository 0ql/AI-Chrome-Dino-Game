var dino, obstacles;

function setup() {
	createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
	angleMode(DEGREES);

	dino = new Dino(50, 0, 16, 32, 1);

	obstacles = [];
	obstacles.push(new Obstacle(int(random(50))));

	for(var i = 0; i < 10; i++) {
		obstacles.push(new Obstacle(obstacles[i].x + int(random(50)), CANVAS_HEIGHT - 16, 16, 16));
	}
}

function draw() {
	background(220);

	line(0, 300, 1000, 300);

	for(var i = 0; i <  obstacles.length; i++) {
		obstacles[i].update();
	}

	for(var i = 0; i <  obstacles.length; i++) {
		obstacles[i].draw();
	}

	dino.update();
	dino.draw();
}