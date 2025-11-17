class Chicken extends MovableObject {

    chicken_walk_images = [
        'assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    currentChickenImageIndex = 0;

    constructor() {
        super().loadImage('assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');
        this.loadChickenImages(this.chicken_walk_images);

        this.y = 340;
        this.x = 200 + Math.random() * 500;
        this.height = 80;
        this.width = 80;
        this.animateChicken();
    }

    animateChicken() {
        setInterval(() => {
            this.x -= 0.8;
            if (this.x < -80) {
                this.x = 600;
            }
            let c = this.currentChickenImageIndex % this.chicken_walk_images.length;
            let path = this.chicken_walk_images[c];
            this.img = this.imageChickenCache[path];
            this.currentChickenImageIndex++;
        }, 1000 / 10);
    }
}