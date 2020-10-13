var dino, obstacles;

function setup() {
	createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
	angleMode(DEGREES);

	dino = new Dino(50, 0, DINO_WIDTH, DINO_HEIGHT, GRAVITY);

	obstacles = [];
	obstacles.push(new Obstacle(int(random(OBSTACLE_MIN_DISTANCE, OBSTACLE_MAX_DISTANCE))));

	for(var i = 0; i < 10; i++) {
		generateNewObstacle();
	}
}

function draw() {
	background(220);

	for(var i = 0; i <  obstacles.length; i++) {
		if(obstacles[i].collide(dino)) {
			console.log("lsot");
		}
	}

	for(var i = 0; i <  obstacles.length; i++) {
		obstacles[i].update();
	}

	for(var i = 0; i <  obstacles.length; i++) {
		obstacles[i].draw();
	}

	dino.update();
	dino.draw();
}

function generateNewObstacle() {
	var maxy = 0;

	for(var i = 0; i < obstacles.length; i++) {
		if(obstacles[i].x > maxy) {
			maxy = obstacles[i].x;
		}
	}

	obstacles.push(new Obstacle(maxy + int(random(OBSTACLE_MIN_DISTANCE, OBSTACLE_MAX_DISTANCE)), CANVAS_HEIGHT - OBSTACLE_HEIGHT, OBSTACLE_WIDTH, OBSTACLE_HEIGHT));
}

function distanceFromDinoToNextObstacle() {
	var maxy = 0;

	for(var i = 0; i < obstacles.length; i++) {
		if(obstacles[i].x > maxy) {
			maxy = obstacles[i].x;
		}
	}

	return maxy - dino.x;
}

function keyPressed() {
	if(key == " ") {
		dino.jump();
	}
}