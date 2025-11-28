class Endscreen {
    canvas;
    ctx;
    isWin;
    endImage;

    constructor(canvas, isWin) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.isWin = isWin;
        this.createEndscreen();
        
        // Back to Home Button erstellen
        if (window.buttons) {
            window.buttons.createBackToHomeButton();
        }
    }

    createEndscreen() {
        this.endImage = document.createElement('img');
        this.endImage.src = this.isWin ?
            'assets/img_pollo_locco/img/win_lost/you_win.png' :
            'assets/img_pollo_locco/img/win_lost/game_over_a.png';
        this.endImageStyle();
        document.body.appendChild(this.endImage);
    }

    endImageStyle() {
        this.endImage.className = 'end-image';
    }
}