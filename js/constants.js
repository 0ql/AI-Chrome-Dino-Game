const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 300;

const DINO_WIDTH = 32;
const DINO_HEIGHT = 45;

const DISTANCE_COEFFICIENT = 100; // teile gelaufene pixel durch diesen wert damit die zahl nicht so groß wird

const DINO_CROUCH_WIDTH = 32;
const DINO_CROUCH_HEIGHT = 16;

const GRAVITY = 0.5;
const DINO_JUMP_POWER = 10;

const OBSTACLE_WIDTH = 32;
const OBSTACLE_HEIGHT = 40;
const OBSTACLE_SPEED = 4;

const MIN_WALKED_DISTANCE_FOR_FLYING_OBSTACLES = 10; //minimale distanz, die der player schon gelaufen sein muss, damit es fliegende obstacles gibt (damit die erst später kommen)
const FLYING_OBSTACLE_PROBABILITY = 0.5;

const FLYING_OBSTACLE_WIDTH = 16;
const FLYING_OBSTACLE_HEIGHT = 16;
const FLYING_OBSTACLE_HEIGHT_WHERE_THEY_FLY = 16;

const OBSTACLE_MIN_DISTANCE = 200;
const OBSTACLE_MAX_DISTANCE = 600;