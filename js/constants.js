const POPSIZE = 200; // größe der Population die jede Runde generiert wird
const GAMEMODE = 'AI'; // 'PLAYER' wenn nur ein Dino vom Benutzer kontrolliert werden soll; 'AI' funktioniert noch nicht


const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 300;

const DINO_WIDTH = 40;
const DINO_HEIGHT = 43;
const DINO_X = 50;
const DINO_Y = 0;

const DISTANCE_COEFFICIENT = 100; // teile gelaufene pixel durch diesen wert damit die zahl nicht so groß wird

const DINO_CROUCH_WIDTH = 55;
const DINO_CROUCH_HEIGHT = 26;

const GRAVITY = 0.3;
const DINO_JUMP_POWER = 10;

const OBSTACLE_WIDTH = 32;
const OBSTACLE_HEIGHT = 48;
const OBSTACLE_SPEED = 4;

const MIN_WALKED_DISTANCE_FOR_DRAGONS = 10; //minimale distanz, die der player schon gelaufen sein muss, damit es fliegende obstacles gibt (damit die erst später kommen)
const DRAGON_PROBABILITY = 0.3;

const DRAGON_WIDTH = 42;
const DRAGON_HEIGHT = 36;
const DRAGON_HEIGHT_WHERE_THEY_FLY = 40;
const DRAGON_SPEED = 1;

const OBSTACLE_MIN_DISTANCE = 200;
const OBSTACLE_MAX_DISTANCE = 600;

// Animation, größer ist langsamer
const DINO_ANIM_SPEED = 150;
const DRAGON_ANIM_SPEED = 500;

const nt = neataptic;
const neat = new nt.Neat(3, 2, null, { // neue Neataptic instanz
  mutation: nt.methods.mutation.ALL,
  popsize: POPSIZE,
  mutationRate: 0.2,
  elitism: Math.round(POPSIZE * 0.1)
});
