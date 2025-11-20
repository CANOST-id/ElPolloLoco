class Character extends MovableObject {

    y = 70;
    x = 70;
    height = 250;
    width = 100;
    world;
    animationInterval;
    movementInterval;
    isDying = false;
    idleTime = 0;

    constructor() {
        super().loadImage(CHARACTER_IMAGES.images_standing[0]);
        this.characterImagesLoaded();
        this.applyGravity();
        this.animate();
    }

    characterImagesLoaded() {
        this.loadImages(CHARACTER_IMAGES.images_walking);
        this.loadImages(CHARACTER_IMAGES.images_jumping);
        this.loadImages(CHARACTER_IMAGES.images_hurt);
        this.loadImages(CHARACTER_IMAGES.images_dead);
        this.loadImages(CHARACTER_IMAGES.images_standing);
        this.loadImages(CHARACTER_IMAGES.images_sleeping);
    }

    animate() {
        this.animateInterval();
        this.moveInterval();
    }

    animateInterval() {
        this.animationInterval = setInterval(() => {
            if (this.isDead() && !this.isDying) {
                this.isDying = true;
                this.playDeathAnimation();
            } else if (!this.isDead()) {
                if (this.isHurt()) {
                    this.playAnimation(CHARACTER_IMAGES.images_hurt);
                    this.resetIdleTime();
                } else if (this.isAboveGround()) {
                    this.playAnimation(CHARACTER_IMAGES.images_jumping);
                    this.resetIdleTime();
                } else {
                    this.checkMovement();
                }}
            this.handleJump();
        }, 1000 / 10);
    }

    handleJump() {
        if (this.world.keyboard.SPACE || this.world.keyboard.UP) {
            this.jump();
            this.resetIdleTime();
        }
    }

    moveInterval() {
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

    playDeathAnimation() {
        let deathAnimationIndex = 0;
        let deathAnimationInterval = setInterval(() => {
            if (deathAnimationIndex < CHARACTER_IMAGES.images_dead.length) {
                let path = CHARACTER_IMAGES.images_dead[deathAnimationIndex];
                this.img = this.imageCache[path];
                deathAnimationIndex++;
            } else {
                clearInterval(deathAnimationInterval);
                clearInterval(this.animationInterval);
                clearInterval(this.movementInterval);
            }
        }, 150);
    }

    handleIdleState() {
        this.idleTime += 0.1;
        if (this.idleTime >= 5) {
            this.playAnimation(CHARACTER_IMAGES.images_sleeping);
        } else if (this.idleTime >= 1) {
            this.playAnimation(CHARACTER_IMAGES.images_standing);
        }
    }

    checkMovement() {
        let isMoving = this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.SPACE || this.world.keyboard.UP || this.world.keyboard.D;
        if (isMoving) {
            this.playAnimation(CHARACTER_IMAGES.images_walking);
            this.resetIdleTime();
        } else {
            this.handleIdleState();
        }
    }

    resetIdleTime() {
        this.idleTime = 0;
    }
}