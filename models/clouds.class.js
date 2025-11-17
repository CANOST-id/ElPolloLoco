class Cloud extends MovableObject {

    speed = 0.15;

    constructor() {
        super().loadImage('assets/img_pollo_locco/img/5_background/layers/4_clouds/1.png');
        this.y = 0;
        this.x = Math.random() * 1800 - 200;
        this.animate();
        this.width = 720;
        this.height = 480;
    }
    animate() {
        this.moveLeft();
    }
}