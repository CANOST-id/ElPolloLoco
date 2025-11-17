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
    world;

    constructor() {
        super().loadImage('assets/img_pollo_locco/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.images_walking);

        this.animate();

        this.height = 250;
        this.width = 100;
        this.y = 175;
        this.x = 70;
    }

    animate() {

        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x = this.x + 7;
                this.world.camera_x = this.world.camera_x - 7;
                this.otherDirection = false;
            }

            if (this.world.keyboard.LEFT && this.x > 70) {
                this.x = this.x - 7;
                this.world.camera_x = this.world.camera_x + 7;

                this.otherDirection = true;
            }
        }, 1000 / 60);


        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.images_walking);
            }
        }, 1000 / 30);
    }

    jump() {
    }
}