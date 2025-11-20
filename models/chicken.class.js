class Chicken extends MovableObject {
    speed = 0.25;
    energy = 20;
    isDead = false;

    chicken_walk_images = [
        'assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');
        this.loadImages(this.chicken_walk_images);
        this.y = 340;
        this.x = 600 + Math.random() * 1000;
        this.height = 80;
        this.width = 80;
        this.speed = 0.25 + Math.random() * 0.6;
        this.energy = 20;
        this.animateChicken();
    }

    animateChicken() {
        this.moveLeft();
        this.walkInterval = setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.chicken_walk_images);
            }
        }, 1000 / 10);
    }

    hit(damage = 20) {
        this.energy -= damage;
        if (this.energy <= 0) {
            this.energy = 0;
            this.isDead = true;
            this.chickenDeathAnimation();
        }
        console.log(`Chicken hit! Energy: ${this.energy}`);
    }



    isDead() {
        
        return this.energy <= 0;

    }
}