function init() {
	for (let i = 0; i < POPSIZE; i++) {
		agents.push(new Dino(DINO_X, 0));
	}
}

function runAI() { // sorry für schlechte Wahl von funktionsnamen
	//alle obstacles bewegen
	for (let i in obstacles) {
		for (let j in agents) {
			if (agents[j].alive) {
				if (obstacles[i].collide(agents[j])) { // wenn collidiert Agent töten & punktzahl vergeben
					agents[j].alive = false;
					// neat.population[j].score = distanceWalked;
				} else {
					// neat.population[j].activate([distanceFromDinoToNextObstacle()])
					agents[j].update();
					agents[j].draw();
				}
			}
		}
		obstacles[i].update();
		obstacles[i].draw();
	}
}

function runPLAYER() {
	for (let i in obstacles) {
		//collisions
		if (obstacles[i].collide(dino)) { // wenn collidiert neustart
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
		if (obstacles[i].x < minx && obstacles[i].x > DINO_X + DINO_WIDTH) {
			minx = obstacles[i].x;
		}
	}

	//pos vom obstacle minus die vom dino und die breite des dinos, weil wir die distanz von rechte kante dino zu linker kante obstacle wollen
	return minx - DINO_X - DINO_WIDTH;
}

function realDistance() {
	return int(distanceWalked / DISTANCE_COEFFICIENT);
}