class Endscreen {
    canvas;
    ctx;
    isWin;
    backToHomeButton;
    endImage;

    constructor(canvas, isWin) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.isWin = isWin;
        this.createEndscreen();
        this.createButton();
    }

    createEndscreen() {
        this.endImage = document.createElement('img');
        this.endImage.src = this.isWin ?
            'assets/img_pollo_locco/img/win_lost/you_win.png' :
            'assets/img_pollo_locco/img/win_lost/you_lost.png';
        this.endImageStyle();
        document.body.appendChild(this.endImage);
    }

    createButton() {
        this.backToHomeButton = document.createElement('button');
        this.backToHomeButtonStyle();
        document.body.appendChild(this.backToHomeButton);
        this.buttonListener();
    }

    endImageStyle() {
        this.endImage.className = 'end-image';
    }

    backToHomeButtonStyle() {
        this.backToHomeButton.innerHTML = 'Back to Home';
        this.backToHomeButton.className = 'back-to-home-button';
    }

    buttonListener() {
        this.backToHomeButton.addEventListener('click', () => {
            this.restartGame();
        });
    }

    restartGame() {
        document.body.removeChild(this.backToHomeButton);
        document.body.removeChild(this.endImage);
        location.reload();
    }
}