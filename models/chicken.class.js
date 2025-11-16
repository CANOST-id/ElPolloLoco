class Chicken extends MovableObject {

    constructor() {
        super().loadImage('assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');

        this.y = 340;
        this.x = 200 + Math.random() * 500;
        this.height = 80;
        this.width = 80;
    }
}