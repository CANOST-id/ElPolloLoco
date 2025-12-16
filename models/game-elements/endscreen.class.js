/** * Endscreen class representing the end screen of the game.
 */
class Endscreen {
    /** @type {HTMLCanvasElement} The canvas element for drawing */
    canvas;
    /** @type {CanvasRenderingContext2D} The 2D rendering context of the canvas */
    ctx;
    /** @type {boolean} Indicates if the player has won or lost */
    isWin;
    /** @type {HTMLImageElement} The image element for the endscreen */
    endImage;

    /**
     * Creates an endscreen on the given canvas based on win/loss status.
     * @param {HTMLCanvasElement} canvas - The canvas element to draw the endscreen on
     * @param {boolean} isWin - Indicates if the player has won or lost
     */
    constructor(canvas, isWin) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.isWin = isWin;
        this.createEndscreen();
    }

    /**
     * Creates the endscreen image element and sets its source based on win/loss status.
     * Appends the created image to the document body.
     */
    createEndscreen() {
        this.endImage = document.createElement('img');
        this.endImage.src = this.isWin ?
            'assets/img_pollo_locco/img/win_lost/you_win.png' :
            'assets/img_pollo_locco/img/win_lost/game_over_a.png';
        this.endImageStyle();
        document.body.appendChild(this.endImage);
        this.enableResetButton();
    }

    /**
     * Enables the reset button when the game ends.
     */
    enableResetButton() {
        if (typeof buttons !== 'undefined' && buttons && buttons.enableResetButton) {
            buttons.enableResetButton();
        }
    }

    /**
     * Sets the style and ID for the endscreen image element.
     * Applies CSS class and unique identifier for styling purposes.
     */
    endImageStyle() {
        this.endImage.className = 'end-image';
        this.endImage.id = 'endscreen_image';
    }
}