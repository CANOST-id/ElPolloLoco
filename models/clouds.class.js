class Cloud extends MovableObject {

    constructor() {
        super().loadImage('assets/img_pollo_locco/img/5_background/layers/4_clouds/1.png');
        this.y = 0;
        this.x = Math.random() * 600 - 200;
        this.animate();
        this.width = 720;
        this.height = 480;
    }
    animate() {
        setInterval(() => {
            this.x -= 0.25;
            if (this.x < -720) {
                this.x = 600;
            }
        }, 1000 / 60);
    }
}