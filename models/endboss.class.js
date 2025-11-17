class Endboss extends MovableObject {

    chicken_walk_images = [
        'assets/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png',
        'assets/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G6.png',
        'assets/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G7.png',
        'assets/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G8.png',
        'assets/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G9.png',
        'assets/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G10.png',
        'assets/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G11.png',
        'assets/img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G12.png'

    ];
    currentImageIndex = 0;

    constructor() {
        super().loadImage(this.chicken_walk_images[0]);
        this.loadImages(this.chicken_walk_images);
        this.y = 50;
        this.x = 1600;
        this.height = 400;
        this.width = 300;
        this.animateEndboss();
    }


    animateEndboss() {
        setInterval(() => {
            this.playAnimation(this.chicken_walk_images);
        }, 300);
    }
}