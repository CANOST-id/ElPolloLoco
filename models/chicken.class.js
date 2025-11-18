class Chicken extends MovableObject {

    chicken_walk_images = [
        'assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    speed = 0.25;

    constructor() {
        super().loadImage('assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');
        this.loadImages(this.chicken_walk_images);

        this.y = 340;
        this.x = 600 + Math.random() * 1000;
        this.height = 80;
        this.width = 80;
        this.animateChicken();
        this.speed = 0.25 + Math.random() * 0.6;
    }

    animateChicken() {
        this.moveLeft();
        setInterval(() => {
            this.playAnimation(this.chicken_walk_images);
        }, 1000 / 10);
    }
}