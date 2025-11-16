class Cloud extends MovableObject {

    constructor() {
        super().loadImage('assets/img_pollo_locco/img/5_background/layers/4_clouds/1.png');
        this.y = 0;
        this.x = 10 + Math.random() * 600;
        this.width = 720;
        this.height = 480;
    }
}