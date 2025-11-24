class Buttons extends DrawableObject {
    startButton;
    backToHomeButton;
    restartButton;
    muteButton;
    unmuteButton;
    infoButton;
    fullscreenButton;
    buttonContainer;
    isMuted = false;
    gameRunning = false;

// start und restart sind ein button - toggle game status - innerHTML ändert schrift
// backtohome ist ein button - back to home
// mute und unmute sind ein button - toggle mute - innerHTML ändert svg
// info ist ein button - toggle dialog  
// fullscreen ist ein button - toggle - innerHTML ändert svg

    constructor() {
        super();
        this.startButton();
        this.backToHomeButton();
        this.restartButton();
        this.muteButton();
        this.unmuteButton();
        this.infoButton();
    }

    // button container erstellen inkl positionierung
    
    createButtonContainer() {
        this.buttonContainer = document.createElement('div');
        this.buttonContainer.className = 'button-container';
        let canvas = document.getElementById('canvas');
        let canvasRect = canvas.getBoundingClientRect();
        this.buttonContainer.className = 'button-container';

        document.body.appendChild(this.buttonContainer);
    }

    // start button ertsellen und funktion hinzufügen zum toggle start/restart game
    // funktionen für die buttons auslagern

    startButton() {
        this.startButton = document.createElement('button');
        this.startButtonStyle();
        document.body.appendChild(this.startButton);
        this.startButtonListener();
    }

    startButtonStyle() {
        this.startButton.innerHTML = 'Start Game';
    }

    backToHomeButton() {
        this.backToHomeButton = document.createElement('button');
        this.backToHomeButtonStyle();
        document.body.appendChild(this.backToHomeButton);
        this.backToHomeButtonListener();
    }

    backToHomeButtonStyle() {
        this.backToHomeButton.innerHTML = 'Back to Home';
        this.backToHomeButton.className = 'back-to-home-button';
    }

    restartButton() {
        this.restartButton = document.createElement('button');
        this.restartButtonStyle();
        document.body.appendChild(this.restartButton);
        this.restartButtonListener();
    }

    restartButtonStyle() {
        this.restartButton.innerHTML = 'Restart';
        this.restartButton.className = 'restart-button';
    }

    muteButton() {
        this.muteButton = document.createElement('button');
        this.muteButtonStyle();
        document.body.appendChild(this.muteButton);
        this.muteButtonListener();
    }


    // mute button erstellen mit svg icon - icon toggle bei klick
    // funktion zum sound ein- und ausschalten
    // svg icons auslagern 
    // style auslagern in canvas-button-styles.css

    muteButtonStyle() {
        this.muteButton.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                <path d="M19.07 4.93l-1.41 1.41A9 9 0 0 1 20 12a9 9 0 0 1-2.34 5.66l1.41 1.41A11 11 0 0 0 22 12a11 11 0 0 0-2.93-7.07z" stroke="currentColor" stroke-width="2"/>
                <path d="M15.54 8.46l-1.41 1.41A3 3 0 0 1 16 12a3 3 0 0 1-1.87 2.13l1.41 1.41A5 5 0 0 0 18 12a5 5 0 0 0-2.46-4.54z" stroke="currentColor" stroke-width="2"/>
            </svg>`;
        this.muteButton.className = 'mute-button';
        this.muteButton.style.background = 'none';
        this.muteButton.style.border = '2px solid #fff';
        this.muteButton.style.borderRadius = '5px';
        this.muteButton.style.padding = '8px';
        this.muteButton.style.cursor = 'pointer';
        this.muteButton.style.color = '#fff';
    }

    unmuteButton() {
        this.unmuteButton = document.createElement('button');
        this.unmuteButtonStyle();
        document.body.appendChild(this.unmuteButton);
        this.unmuteButtonListener();
    }

    unmuteButtonStyle() {
        this.unmuteButton.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>`;
        this.unmuteButton.className = 'unmute-button';
        this.unmuteButton.style.background = 'none';
        this.unmuteButton.style.border = '2px solid #fff';
        this.unmuteButton.style.borderRadius = '5px';
        this.unmuteButton.style.padding = '8px';
        this.unmuteButton.style.cursor = 'pointer';
        this.unmuteButton.style.color = '#fff';
        this.unmuteButton.style.display = 'none';
    }

    // info button erstellen - onclick info dialog anzeigen/ausblenden
    // vorhandene funktionalität von game.js nutzen

    infoButton() {
        this.infoButton = document.createElement('button');
        this.infoButtonStyle();
        document.body.appendChild(this.infoButton);
        this.infoButtonListener();
    }

    infoButtonStyle() {
    }

    startButtonListener() {
    }

    backToHomeButtonListener() {
    }

    restartButtonListener() {
    }

    muteButtonListener() {
        this.muteButton.addEventListener('click', () => {
            this.toggleMute();
        });
    }

    unmuteButtonListener() {
        this.unmuteButton.addEventListener('click', () => {
            this.toggleMute();
        });
    }


    // eigentlich überflüssig, da toggle in mute und unmute button listenern aufgerufen wird

    toggleMute() {
        if (this.isMuted) {
            this.isMuted = false;
            this.muteButton.style.display = 'block';
            this.unmuteButton.style.display = 'none';
            this.enableSound();
        } else {
            this.isMuted = true;
            this.muteButton.style.display = 'none';
            this.unmuteButton.style.display = 'block';
            this.disableSound();
        }
    }

    // Sound ein- und ausschalten kann bleiben, da hier die eigentliche Logik implementiert wird
    enableSound() {
        // Sound-Logik für unmute
        console.log('Sound enabled');
    }

    disableSound() {
        // Sound-Logik für mute
        console.log('Sound disabled');
    }

    // restart game funktion anpasssen - kein location.reload 
    // sondern endscreen entfernen und game neu starten
    restartGame() {
        document.body.removeChild(this.backToHomeButton);
        document.body.removeChild(this.endImage);
        location.reload();
    }
}