class Character extends MovableObject {

    images_walking = [
        'assets/img_pollo_locco/img/2_character_pepe/2_walk/W-21.png',
        'assets/img_pollo_locco/img/2_character_pepe/2_walk/W-22.png',
        'assets/img_pollo_locco/img/2_character_pepe/2_walk/W-23.png',
        'assets/img_pollo_locco/img/2_character_pepe/2_walk/W-24.png',
        'assets/img_pollo_locco/img/2_character_pepe/2_walk/W-25.png',
        'assets/img_pollo_locco/img/2_character_pepe/2_walk/W-26.png'
    ];
    currentImageIndex = 0;

    constructor() {
        super().loadImage('assets/img_pollo_locco/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.images_walking);

        this.animate();

        this.height = 250;
        this.width = 100;
        this.y = 175;
        this.x = 50;
    }

    animate() {
        setInterval(() => {
            let i = this.currentImageIndex % this.images_walking.length;
            let path = this.images_walking[i];
            this.img = this.imageCache[path];
            this.currentImageIndex++;
        }, 1000 / 10);
    }

    jump() {
    }
}