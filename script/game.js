let canvas;
let world;
let keyboard = new Keyboard();
let buttons;
let sounds;

/** * Initializes the game by setting up the canvas and creating the game world.
 * @param {HTMLCanvasElement} canvas - The canvas element where the game will be rendered
 * @param {World} world - The game world instance
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, buttons);

}

/** * Displays the start overlay with the start screen image and initializes buttons.
 * @param {HTMLCanvasElement} canvas - The canvas element where the start screen will be displayed
 * @param {Buttons} buttons - The Buttons instance managing the game buttons
 */
function startOverlay() {
    canvas = document.getElementById('canvas');
    buttons = new Buttons();
    let ctx = canvas.getContext('2d');
    let startImage = new Image();
    startImage.src = 'assets/img_pollo_locco/img/9_intro_outro_screens/start/startscreen_2.png';
    startImage.onload = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);
    };
}

/** * Starts the game by stopping the start sound, playing background music, initializing the game world, and starting enemy movement.
 */
function startGame() {
    if (sounds) {
        sounds.startBackgroundMusic();
    }
    init();
    if (world) {
        world.startEnemyMovement();
    }
}

/** * Sets up event listeners for loading the game and restarting it.
 */
window.addEventListener('load', () => {
    sounds = new Sounds();
});

/** * Restarts the game by removing the endscreen, resetting the character and enemy animations, and starting the game.
 */
function restartGame() {
    removeEndscreen();
    resetCharacter();
    resetEnemyAnimation();
    startGame();
}

/** * Displays the endscreen based on win/loss status.
 * @param {boolean} isWin - Indicates if the player has won or lost
 */
function showEndscreen(isWin) {
    new Endscreen(canvas, isWin);
}

/** * Removes the endscreen image from the DOM if it exists.
 */
function removeEndscreen() {
    let endImage = document.getElementById('endscreen_image');
    if (endImage) {
        endImage.remove();
    }
}

/** * Resets the enemy animations by clearing existing enemies and recreating them.
 */
function resetEnemyAnimation() {
    if (world && world.level) {
        world.level.enemies = [];
        for (let i = 0; i < 3; i++) {
            world.level.enemies.push(new Chicken());
        }
        world.level.enemies.push(new SmallChicken());
        world.level.enemies.push(new SmallChicken());
        world.level.enemies.push(new Endboss());
        world.startEnemyMovement();
    }
}

/** * Resets the character's position and energy to initial values.
 */
function resetCharacter() {
    world.character.energy = 100;
    world.character.x = 120;
    world.character.y = 80;
    world.character.speedY = 0;
}

// Keyboard Events

/** * Sets up event listeners for keyboard keydown and keyup events to update the keyboard state.
 */
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        keyboard.RIGHT = true;
    }
    if (e.key === 'ArrowLeft') {
        keyboard.LEFT = true;
    } if (e.key === 'ArrowUp') {
        keyboard.UP = true;
    }
    if (e.key === ' ') {
        keyboard.SPACE = true;
    }
    if (e.key === 'd') {
        keyboard.D = true;
    }
});

/** * Sets up event listeners for keyboard keydown and keyup events to update the keyboard state.
 */
window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight') {
        keyboard.RIGHT = false;
    }
    if (e.key === 'ArrowLeft') {
        keyboard.LEFT = false;
    }
    if (e.key === 'ArrowUp') {
        keyboard.UP = false;
    }
    if (e.key === ' ') {
        keyboard.SPACE = false;
    }
    if (e.key === 'd') {
        keyboard.D = false;
    }
});

// Touch Button Events

/** * Sets up touch event listeners for on-screen buttons to update the keyboard state.
 */
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn-left').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('btn-left').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById('btn-right').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('btn-right').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
    document.getElementById('btn-jump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('btn-jump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
    document.getElementById('btn-throw').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
    document.getElementById('btn-throw').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
});