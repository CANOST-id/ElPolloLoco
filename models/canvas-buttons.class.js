class Buttons extends DrawableObject {
    buttonContainer;
    startButton;
    homeButton;
    muteButton;
    infoButton;
    fullscreenButton;    
    isMuted = false;
    gameRunning = false;

    constructor() {
        super();
        this.createContainer();
        this.createAllButtons();
        this.setupEventListeners();
        this.buttonContainer.buttonsInstance = this;
    }

    createContainer() {
        this.buttonContainer = document.createElement('div');
        this.buttonContainer.className = 'canvas-button-container';
        document.body.appendChild(this.buttonContainer);
        this.updateContainerPosition();
    }

    createAllButtons() {
        this.startButton = this.createButton('START', 'canvas-btn start-btn', () => this.toggleGame());
        this.homeButton = this.createButton('HOME', 'canvas-btn home-btn', () => location.reload());
        this.muteButton = this.createButton('🔊', 'canvas-btn mute-btn', () => this.toggleMute());
        this.fullscreenButton = this.createButton('◱', 'canvas-btn fullscreen-btn', () => this.toggleFullscreen());
        this.infoButton = this.createButton('INFO', 'canvas-btn info-btn', () => this.toggleInfo());
    }

    createButton(content, className, clickHandler) {
        const button = document.createElement('button');
        button.innerHTML = content;
        button.className = className;
        button.addEventListener('click', clickHandler);
        this.buttonContainer.appendChild(button);
        return button;
    }

    setupEventListeners() {
        document.addEventListener('fullscreenchange', () => {
            this.updateContainerPosition();
        });
        
        window.addEventListener('resize', () => {
            this.updateContainerPosition();
        });
        setTimeout(() => this.updateContainerPosition(), 100);
        setInterval(() => this.updateContainerPosition(), 1000);
    }

    updateContainerPosition() {
        const canvas = document.getElementById('canvas');
        if (!canvas) return;
        const canvasRect = canvas.getBoundingClientRect();
        this.buttonContainer.style.left = (canvasRect.left + canvasRect.width / 2) + 'px';
        this.buttonContainer.style.top = (canvasRect.bottom - 80) + 'px';
    }

    toggleGame() {
        if (!this.gameRunning) {
            this.gameRunning = true;
            this.startButton.innerHTML = 'RESTART';
            startGame(); 
        } else {
            restartGame();
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        this.muteButton.innerHTML = this.isMuted ? '🔇' : '🔊';
        if (this.isMuted) {
            this.disableSound();
        } else {
            this.enableSound();
        }
    }

    toggleInfo() {
        openDialog();
    }

    toggleFullscreen() {
        toggleFullscreen();
    }

    enableSound() {
        console.log('Sound enabled');
    }

    disableSound() {
        console.log('Sound disabled');
    }
}