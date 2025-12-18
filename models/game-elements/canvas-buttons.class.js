/**
 * Canvas Buttons Class manages the buttons displayed on the game canvas for user interaction.
 * Inherits from DrawableObject.
 * @extends {DrawableObject}
 */
class Buttons extends DrawableObject {
    buttonContainer;
    startButton;
    homeButton;
    muteButton;
    infoButton;
    fullscreenButton;
    isMuted = false;
    gameRunning = false;

    /**
     * Initializes the Buttons instance by creating the button container, buttons, and setting up event listeners.
     */
    constructor() {
        super();
        this.createContainer();
        this.createAllButtons();
        this.setupEventListeners();
        this.buttonContainer.buttonsInstance = this;
    }

    /**
     * Creates the button container and appends it to the header.
     */
    createContainer() {
        this.buttonContainer = document.createElement('nav');
        this.buttonContainer.className = 'canvas-button-container';
        document.querySelector('header').appendChild(this.buttonContainer);
        this.updateContainerPosition();
    }

    /**
     * Creates all buttons and appends them to the button container.
     */
    createAllButtons() {
        this.startButton = this.createButton('START', 'canvas-btn start-btn', () => this.toggleGame());
        this.homeButton = this.createButton('HOME', 'canvas-btn home-btn', () => location.reload());
        this.muteButton = this.createButton('🔊', 'canvas-btn mute-btn', () => this.toggleMute());
        this.infoButton = this.createButton('INFO', 'canvas-btn info-btn', () => this.toggleInfo());
        setTimeout(() => this.updateMuteButton(), 100);
    }

    /**
     * Creates a button element with specified content, class, and click handler.
     * @param {string} content - The inner HTML content of the button
     * @param {string} className - The CSS class name for styling the button
     * @param {Function} clickHandler - The function to call when the button is clicked
     * @returns {HTMLButtonElement} The created button element
     */
    createButton(content, className, clickHandler) {
        let button = document.createElement('button');
        button.innerHTML = content;
        button.className = className;
        button.addEventListener('click', clickHandler);
        this.buttonContainer.appendChild(button);
        return button;
    }

    /**
     * Sets up event listeners for fullscreen changes and window resizing to update button container position.
     */
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

    /**
     * Updates the position of the button container to align with the canvas element.
     */
    updateContainerPosition() {
        let canvas = document.getElementById('canvas');
        if (!canvas) return;
        const canvasRect = canvas.getBoundingClientRect();
        this.buttonContainer.style.left = (canvasRect.left + canvasRect.width / 2) + 'px';
        this.buttonContainer.style.top = (canvasRect.bottom - 80) + 'px';
    }

    /**
     * Toggles the game state between running and not running.
     */
    toggleGame() {
        if (!this.gameRunning) {
            this.gameRunning = true;
            this.startButton.innerHTML = 'RESTART';
            this.disableResetButton();
            startGame(); 
        } else {
            this.disableResetButton();
            restartGame();
        }
    }

    /**
     * Toggles the mute state of the game sounds and changes the mute button icon.
     */
    toggleMute() {
        if (typeof sounds !== 'undefined' && sounds) {
            this.isMuted = sounds.toggleMute();
            this.muteButton.innerHTML = this.isMuted ? '🔇' : '🔊';
        }
    }

    /**
     * Updates the mute button display based on the saved mute state in local storage.
     * Updates the isMuted property accordingly and changes the button icon.
     */
    updateMuteButton() {
        let savedState = localStorage.getItem('gameIsMuted');
        this.isMuted = savedState === 'true';
        if (this.muteButton) {
            this.muteButton.innerHTML = this.isMuted ? '🔇' : '🔊';
        }
    }

    /**
     * Toggles the information dialog display.
     */
    toggleInfo() {
        openDialog();
    }

    /**
     * Disables the reset button and applies disabled styling.
     */
    disableResetButton() {
        this.startButton.disabled = true;
        this.startButton.classList.add('reset-btn');
    }

    /**
     * Enables the reset button and removes disabled styling.
     */
    enableResetButton() {
        this.startButton.disabled = false;
        this.startButton.classList.remove('reset-btn');
    }
}