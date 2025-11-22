class Endscreen {
    canvas;
    ctx;
    isWin;
    restartButton;

    constructor(canvas, isWin) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.isWin = isWin;
        this.createRestartButton();
    }

    createEndscreen() {
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        let endImage = new Image();
        endImage.src = this.isWin ?
            'assets/img_pollo_locco/img/9_intro_outro_screens/win/you win A.png' :
            'assets/img_pollo_locco/img/9_intro_outro_screens/game_over/game over A.PNG';
        endImage.onload = () => {
            this.ctx.drawImage(endImage, 0, 0, this.canvas.width, this.canvas.height);
        };
    }

    createRestartButton() {
        this.restartButton = document.createElement('button');
        this.designButton();
        document.body.appendChild(this.restartButton);
        this.buttonLisitener();
    }

    designButton() {
        this.restartButton.innerHTML = 'RESTART GAME';
        this.restartButton.style.position = 'absolute';
        this.restartButton.style.left = '50%';
        this.restartButton.style.top = '30%';
        this.restartButton.style.transform = 'translateX(-50%)';
        this.restartButton.style.padding = '15px 30px';
        this.restartButton.style.fontSize = '20px';
        this.restartButton.style.backgroundColor = '#ff6b35';
        this.restartButton.style.color = 'white';
        this.restartButton.style.border = 'none';
        this.restartButton.style.borderRadius = '10px';
        this.restartButton.style.cursor = 'pointer';
        this.restartButton.style.zIndex = '1000';
    }

    buttonLisitener() {
        this.restartButton.addEventListener('click', () => {
            this.restartGame();
        });
    }

    restartGame() {
        document.body.removeChild(this.restartButton);
        location.reload();
    }
}