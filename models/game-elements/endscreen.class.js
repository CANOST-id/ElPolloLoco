/** * Endscreen class representing the end screen of the game.
 */
class Endscreen {
    canvas;
    ctx;
    isWin;
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

    /** * Creates the endscreen image element and sets its source based on win/loss status.
     */
    createEndscreen() {
        this.endImage = document.createElement('img');
        this.endImage.src = this.isWin ?
            'assets/img_pollo_locco/img/win_lost/you_win.png' :
            'assets/img_pollo_locco/img/win_lost/game_over_a.png';
        this.endImageStyle();
        document.body.appendChild(this.endImage);
    }

    /**  * Sets the style and ID for the endscreen image element. 
     */
    endImageStyle() {
        this.endImage.className = 'end-image';
        this.endImage.id = 'endscreen_image';
    }
}