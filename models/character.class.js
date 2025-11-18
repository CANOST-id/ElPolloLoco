class Character extends MovableObject {

    y = 70;
    x = 70;
    height = 250;
    width = 100;
    world;
    currentImageIndex = 0;
    animationInterval;
    movementInterval;
    isDying = false;

    images_walking = [
        'assets/img_pollo_locco/img/2_character_pepe/2_walk/W-21.png',
        'assets/img_pollo_locco/img/2_character_pepe/2_walk/W-22.png',
        'assets/img_pollo_locco/img/2_character_pepe/2_walk/W-23.png',
        'assets/img_pollo_locco/img/2_character_pepe/2_walk/W-24.png',
        'assets/img_pollo_locco/img/2_character_pepe/2_walk/W-25.png',
        'assets/img_pollo_locco/img/2_character_pepe/2_walk/W-26.png'
    ];

    images_jumping = [
        'assets/img_pollo_locco/img/2_character_pepe/3_jump/J-31.png',
        'assets/img_pollo_locco/img/2_character_pepe/3_jump/J-32.png',
        'assets/img_pollo_locco/img/2_character_pepe/3_jump/J-33.png',
        'assets/img_pollo_locco/img/2_character_pepe/3_jump/J-34.png',
        'assets/img_pollo_locco/img/2_character_pepe/3_jump/J-35.png',
        'assets/img_pollo_locco/img/2_character_pepe/3_jump/J-36.png',
        'assets/img_pollo_locco/img/2_character_pepe/3_jump/J-37.png',
        'assets/img_pollo_locco/img/2_character_pepe/3_jump/J-38.png',
        'assets/img_pollo_locco/img/2_character_pepe/3_jump/J-39.png'

    ];

    images_hurt = [
        'assets/img_pollo_locco/img/2_character_pepe/4_hurt/H-41.png',
        'assets/img_pollo_locco/img/2_character_pepe/4_hurt/H-42.png',
        'assets/img_pollo_locco/img/2_character_pepe/4_hurt/H-43.png'
    ];

    images_dead = [
        'assets/img_pollo_locco/img/2_character_pepe/5_dead/D-51.png',
        'assets/img_pollo_locco/img/2_character_pepe/5_dead/D-52.png',
        'assets/img_pollo_locco/img/2_character_pepe/5_dead/D-53.png',
        'assets/img_pollo_locco/img/2_character_pepe/5_dead/D-54.png',
        'assets/img_pollo_locco/img/2_character_pepe/5_dead/D-55.png',
        'assets/img_pollo_locco/img/2_character_pepe/5_dead/D-56.png',
        'assets/img_pollo_locco/img/2_character_pepe/5_dead/D-57.png'
    ];

    constructor() {
        super().loadImage('assets/img_pollo_locco/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.images_walking);
        this.loadImages(this.images_jumping);
        this.loadImages(this.images_hurt);
        this.loadImages(this.images_dead);
        this.applyGravity();
        this.animate();
    }

    animate() {
        this.animationInterval = setInterval(() => {
            if (this.isDead() && !this.isDying) {
                this.isDying = true;
                this.playDeathAnimation();
            } else if (!this.isDead()) {
                if (this.isHurt()) {
                    this.playAnimation(this.images_hurt);
                } else if (this.isAboveGround()) {
                    this.playAnimation(this.images_jumping);
                } else {
                    this.movementAnimation();
                }
            }
        }, 1000 / 10); 
        this.movementInterval = setInterval(() => {
            if (!this.isDead()) {
                if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                    this.moveRight();
                }
                if (this.world.keyboard.LEFT && this.x > 70) {
                    this.moveCharacterLeft();
                }
            }
        }, 1000 / 60); 
    }

    movementAnimation() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.images_walking);
        }
        if (this.world.keyboard.SPACE || this.world.keyboard.UP) {
            this.jump();
        }
    }

    playDeathAnimation() {
        let deathAnimationIndex = 0;
        setInterval(() => {
            if (deathAnimationIndex < this.images_dead.length) {
                let path = this.images_dead[deathAnimationIndex];
                this.img = this.imageCache[path];
                deathAnimationIndex++;
            } 
        }, 150); // Etwas schneller für Death-Animation
    }
}