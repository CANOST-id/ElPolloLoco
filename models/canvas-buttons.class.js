class Buttons extends DrawableObject {
    startButton;
    backToHomeButton;
    restartButton;
    muteButton;
    infoButton;
    fullscreenButton;
    buttonContainer;
    isMuted = false;
    gameRunning = false;

    constructor() {
        super();
        this.createButtonContainer();
        this.createStartButton();
        this.createBackToHomeButton();
        this.createMuteButton();
        this.createInfoButton();
        this.createFullscreenButton();
    }

    toggleGame() {
        if (!this.gameRunning) {
            this.gameRunning = true;
            startGame();
        } else {
            location.reload();
        }
        this.startButtonStyle();
    }

    createButtonContainer() {
        this.buttonContainer = document.createElement('div');
        this.buttonContainer.className = 'button-container';

        let canvas = document.getElementById('canvas');
        let canvasRect = canvas.getBoundingClientRect();

        this.buttonContainer.style.width = canvasRect.width + 'px';
        this.buttonContainer.style.height = 'auto';
        this.buttonContainer.style.display = 'flex';
        this.buttonContainer.style.gap = '10px';
        this.buttonContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        this.buttonContainer.style.padding = '15px';
        this.buttonContainer.style.borderRadius = '10px';
        this.buttonContainer.style.border = '2px solid rgba(255, 255, 255, 0.3)';
        this.buttonContainer.style.zIndex = '1000';

        document.body.appendChild(this.buttonContainer);
    }

    // Start/Restart Button (toggle)
    createStartButton() {
        this.startButton = document.createElement('button');
        this.startButtonStyle();
        this.buttonContainer.appendChild(this.startButton);
        this.startButtonListener();
    }

    startButtonStyle() {
        this.startButton.innerHTML = this.gameRunning ? 'Restart Game' : 'Start Game';
        this.startButton.className = 'canvas-button-style start-restart-button';
    }

    // Back to Home Button
    createBackToHomeButton() {
        this.backToHomeButton = document.createElement('button');
        this.backToHomeButtonStyle();
        this.buttonContainer.appendChild(this.backToHomeButton); // Zum Container hinzufügen!
        this.backToHomeButtonListener();
    }

    backToHomeButtonStyle() {
        this.backToHomeButton.innerHTML = 'Back to Home';
        this.backToHomeButton.className = 'canvas-button-style back-to-home-button';
    }

    // Mute/Unmute Button (toggle) - nur EINEN Button erstellen
    createMuteButton() {
        this.muteButton = document.createElement('button');
        this.muteButtonStyle();
        this.buttonContainer.appendChild(this.muteButton); // Zum Container hinzufügen!
        this.muteButtonListener();
    }

    muteButtonStyle() {
        if (this.isMuted) {
            // Unmute Icon (durchgestrichen)
            this.muteButton.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                    <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>`;
        } else {
            // Mute Icon (mit Schallwellen)
            this.muteButton.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                    <path d="M19.07 4.93l-1.41 1.41A9 9 0 0 1 20 12a9 9 0 0 1-2.34 5.66l1.41 1.41A11 11 0 0 0 22 12a11 11 0 0 0-2.93-7.07z" stroke="currentColor" stroke-width="2"/>
                    <path d="M15.54 8.46l-1.41 1.41A3 3 0 0 1 16 12a3 3 0 0 1-1.87 2.13l1.41 1.41A5 5 0 0 0 18 12a5 5 0 0 0-2.46-4.54z" stroke="currentColor" stroke-width="2"/>
                </svg>`;
        }
        this.muteButton.className = 'canvas-button-style mute-button';
    }

    // Info Button
    createInfoButton() {
        this.infoButton = document.createElement('button');
        this.infoButtonStyle();
        this.buttonContainer.appendChild(this.infoButton); // Zum Container hinzufügen!
        this.infoButtonListener();
    }

    infoButtonStyle() {
        this.infoButton.innerHTML = 'INFO';
        this.infoButton.className = 'canvas-button-style info-button';
    }

    // Event Listeners
    startButtonListener() {
        this.startButton.addEventListener('click', () => {
            this.toggleGame();
        });
    }

    backToHomeButtonListener() {
        this.backToHomeButton.addEventListener('click', () => {
            location.reload();
        });
    }

    muteButtonListener() {
        this.muteButton.addEventListener('click', () => {
            this.toggleMute();
        });
    }

    infoButtonListener() {
        this.infoButton.addEventListener('click', () => {
            this.toggleInfo();
        });
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        this.muteButtonStyle(); // Button-Icon aktualisieren

        if (this.isMuted) {
            this.disableSound();
        } else {
            this.enableSound();
        }
    }

    toggleInfo() {
        openDialog();
    }

    // Sound Funktionen
    enableSound() {
        console.log('Sound enabled');
    }

    disableSound() {
        console.log('Sound disabled');
    }

    createFullscreenButton() {
        this.fullscreenButton = document.createElement('button');
        this.fullscreenButtonStyle();
        this.buttonContainer.appendChild(this.fullscreenButton);
        this.fullscreenButtonListener();
    }

    fullscreenButtonStyle() {
        this.fullscreenButton.innerHTML = '⛶';
        this.fullscreenButton.className = 'canvas-button-style fullscreen-button';
    }

    fullscreenButtonListener() {
        this.fullscreenButton.addEventListener('click', () => {
            toggleFullscreen();
        });
    }
}