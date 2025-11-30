let canvas;
let world;
let keyboard = new Keyboard();
let buttons;

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

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, buttons);
}

function startGame() {
    init();
    if (world) {
        world.startEnemyMovement();
    }
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        keyboard.RIGHT = true;}
    if (e.key === 'ArrowLeft') {
        keyboard.LEFT = true;
    }if (e.key === 'ArrowUp') {
        keyboard.UP = true;}
    if (e.key === ' ') {
        keyboard.SPACE = true;}
    if (e.key === 'd') {
        keyboard.D = true;}
});

window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight') {
        keyboard.RIGHT = false;}
    if (e.key === 'ArrowLeft') {
        keyboard.LEFT = false;}
    if (e.key === 'ArrowUp') {
        keyboard.UP = false;}
    if (e.key === ' ') {
        keyboard.SPACE = false;}
    if (e.key === 'd') {
        keyboard.D = false;}
});

function toggleFullscreen() {
    let canvas = document.getElementById('canvas');
    if (!document.fullscreenElement) {
        enterFullscreen(canvas);
    } else {
        exitFullscreen();
    }
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

function showEndscreen(isWin) {
    new Endscreen(canvas, isWin);
}

// Touch Button Events
document.addEventListener('DOMContentLoaded', () => {
    // Left Button
    document.getElementById('btn-left').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('btn-left').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    // Right Button  
    document.getElementById('btn-right').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('btn-right').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    // Jump Button
    document.getElementById('btn-jump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('btn-jump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });

    // Throw Button
    document.getElementById('btn-throw').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
    document.getElementById('btn-throw').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
});