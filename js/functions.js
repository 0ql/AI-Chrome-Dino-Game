function init() {
	for (let i = 0; i < POPSIZE; i++) {
		agents.push(new Dino());
	}
}

function generateObstacles() {
	//ein obstacle für den start
  obstacles.push(new Obstacle(int(random(OBSTACLE_MIN_DISTANCE, OBSTACLE_MAX_DISTANCE))));

	for (let i = 0; i < 3; i++) {
    generateNewObstacle();
  }
}

function runAI() {

	if (agentsAlive < 1) {
		console.log('Durchschnitt letzter Generation: ' + neat.getAverage());
		neat.evolve();
		obstacles = [];
		generateObstacles();
		for (let i in agents) {
			agents[i].reset();
		}
		distanceWalked = 0;
		agentsAlive = POPSIZE;
	}

	// agents und obstacles colliden
	for (let i in agents) {
		for (let j in obstacles) {
			if (agents[i].alive && obstacles[j].collide(agents[i])) {
				agents[i].alive = false;
				neat.population[i].score = realDistance();
				agentsAlive--;
			}
		}
	}

	let distDtoO = 1 - softSign(distanceFromDinoToNextObstacle());
	let distDtoD = 1 - softSign(distanceFromDinoToNextDragon());
	// console.log(distDtoO, distDtoD);
	// NN ausführen
	for (let i in agents) {
		if (agents[i].alive) {
			let output = neat.population[i].activate([distDtoO, distDtoD]);
			if (output[0] > 0.5) {
				agents[i].jump();
			}
			if (output[1] > 0.5) {
				agents[i].crouch();
			} else {
				agents[i].uncrouch();
			}

			agents[i].update();
			agents[i].draw();
		}
	}

	// obstacles updaten & drawen
	for (let i in obstacles) {
		obstacles[i].update();
		obstacles[i].draw();
	}

}

function runPLAYER() {
	for (let i in obstacles) {
		//collisions
		if (obstacles[i].collide(dino)) { // wenn collidiert neustart
			distanceWalked = 0;
			obstacles = [];
			setup(); // Notiz: die setup funktion sollte nur einmal ausgeführt werden
		}
		obstacles[i].update();
		obstacles[i].draw();
	}

	dino.update();
	dino.draw();
}

function generateNewObstacle() {

	// finde obstacle das am weitesten rechts ist
	let maxx = 0;

	for (let i = 0; i < obstacles.length; i++) {
		if (obstacles[i].x > maxx) {
			maxx = obstacles[i].x;
		}
	}

	// wenn player schon weit genug gelaufen & Zufall
	if (realDistance() > MIN_WALKED_DISTANCE_FOR_DRAGONS && random() < DRAGON_PROBABILITY) {

		//fliegendes Obstacle
		obstacles.push(new Dragon(maxx + int(random(OBSTACLE_MIN_DISTANCE, OBSTACLE_MAX_DISTANCE)), CANVAS_HEIGHT - DRAGON_HEIGHT - DRAGON_HEIGHT_WHERE_THEY_FLY, DRAGON_WIDTH, DRAGON_HEIGHT, DRAGON_SPEED));
	} else {

		//normales Obstacle
		obstacles.push(new Obstacle(maxx + int(random(OBSTACLE_MIN_DISTANCE, OBSTACLE_MAX_DISTANCE)), CANVAS_HEIGHT - OBSTACLE_HEIGHT, OBSTACLE_WIDTH, OBSTACLE_HEIGHT));
	}
}

function distanceFromDinoToNextObstacle() { // distanz von Dino zu obstacle direkt rechts neben ihm

	// finde obstacle dessen x am kleinsten aber rechts von dino
	let minx = Infinity;

	for (let i in obstacles) {
		if (obstacles[i] instanceof Obstacle && obstacles[i].x < minx && obstacles[i].x > DINO_X + DINO_WIDTH) {
			minx = obstacles[i].x;
		}
	}

	//pos vom obstacle minus die vom dino und die breite des dinos, weil wir die distanz von rechte kante dino zu linker kante obstacle wollen
	return minx !== Infinity ? minx - DINO_X - DINO_WIDTH : CANVAS_WIDTH - DINO_X;
}

function distanceFromDinoToNextDragon() { // distanz von Dino zu dragon direkt rechts neben ihm

	// finde dragon dessen x am kleinsten aber rechts von dino
	let minx = Infinity;

	for (let i in obstacles) {
		if (obstacles[i] instanceof Dragon && obstacles[i].x < minx && obstacles[i].x > DINO_X + DINO_WIDTH) {
			minx = obstacles[i].x;
		}
	}

	//pos vom dragon minus die vom dino und die breite des dinos, weil wir die distanz von rechte kante dino zu linker kante dragon wollen
	return minx !== Infinity ? minx - DINO_X - DINO_WIDTH : CANVAS_WIDTH - DINO_X;
}

function realDistance() {
	return int(distanceWalked / DISTANCE_COEFFICIENT);
}

function softSign(x) {
	return x / (20 + Math.abs(x));
}