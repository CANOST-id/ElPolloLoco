let canvas;
let world;
let keyboard = new Keyboard();
let buttons = new Buttons();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function startOverlay() {
    canvas = document.getElementById('canvas'); 
    let ctx = canvas.getContext('2d');
    let startImage = new Image();
    startImage.src = 'assets/img_pollo_locco/img/9_intro_outro_screens/start/startscreen_1.png';
    startImage.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);
    };
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        keyboard.RIGHT = true;
    }
    if (e.key === 'ArrowLeft') {
        keyboard.LEFT = true;
    }
    if (e.key === 'ArrowUp') {
        keyboard.UP = true;
    }
    if (e.key === ' ') {
        keyboard.SPACE = true;
    }
    if (e.key === 'd') {
        keyboard.D = true;
    }
});
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

function startGame() {
    init();
    disableStartGameButton();
}

function disableStartGameButton() {
    let startButton = document.getElementById('start-button');
    startButton.disabled = true;
    startButton.style.backgroundColor = 'gray';
}

function enableStartGameButton() {
    let startButton = document.getElementById('start-button');
    startButton.disabled = false;
    startButton.style.backgroundColor = '#f074155d';
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        enterFullscreen(document.documentElement);  
    } else {
        exitFullscreen(); 
    }
}

function enterFullscreen(element) {
    document.getElementById('canvas').classList.add('scale-1-5');
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
    document.getElementById('canvas').classList.remove('scale-1-5');
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }

}