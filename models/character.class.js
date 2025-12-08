class Character extends MovableObject {

    y = 50;
    x = 50;
    height = 250;
    width = 100;
    world;
    animationInterval;
    movementInterval;
    isDying = false;
    idleTime = 0;
    isPlayingIdleSound = false;
    isPlayingSnoringSound = false;
    isPlayingRunningSound = false;

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
                this.playCharacterAnimation();
            }
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
                let isWalking = (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) ||
                    (this.world.keyboard.LEFT && this.x > 70);
                if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                    this.moveRight();
                }
                if (this.world.keyboard.LEFT && this.x > 70) {
                    this.moveCharacterLeft();
                }
                this.handleRunningSound(isWalking);
            }
        }, 1000 / 60);
    }

    playCharacterAnimation() {
        if (this.isHurt()) {
            this.playHurtAnimation();
        } else if (this.isAboveGround()) {
            this.playJumpAnimation();
        } else {
            this.checkMovement();
        }
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

    playHurtAnimation() {
        this.playAnimation(CHARACTER_IMAGES.images_hurt);
        this.resetIdleTime();
    }

    playJumpAnimation() {
        this.playAnimation(CHARACTER_IMAGES.images_jumping);
        this.resetIdleTime();
    }

    handleIdleState() {
        this.idleTime += 0.1;
        if (this.idleTime >= 5) {
            this.handleSleepingState();
        } else if (this.idleTime >= 2) {
            this.handleStandingIdleState();
        } else {
            this.handleEarlyIdleState();
        }
    }

    handleSleepingState() {
        this.playAnimation(CHARACTER_IMAGES.images_sleeping);
        if (!this.isPlayingSnoringSound && this.world && this.world.sound) {
            this.world.sound.playSound(this.world.sound.snoringSound);
            this.isPlayingSnoringSound = true;
            this.isPlayingIdleSound = false;
        }
    }

    handleStandingIdleState() {
        this.playAnimation(CHARACTER_IMAGES.images_standing);
        if (!this.isPlayingIdleSound && this.world && this.world.sound) {
            this.world.sound.playSound(this.world.sound.idleSound);
            this.isPlayingIdleSound = true;
            this.isPlayingSnoringSound = false;
        }
    }

    handleEarlyIdleState() {
        this.playAnimation(CHARACTER_IMAGES.images_standing);
        this.isPlayingIdleSound = false;
        this.isPlayingSnoringSound = false;
    }

    checkMovement() {
        let isMoving = this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.SPACE || this.world.keyboard.UP || this.world.keyboard.D;
        let isWalking = this.world.keyboard.RIGHT || this.world.keyboard.LEFT;

        if (isMoving) {
            this.playAnimation(CHARACTER_IMAGES.images_walking);
            this.handleRunningSound(isWalking);
            this.resetIdleTime();
        } else {
            this.stopRunningSound();
            this.handleIdleState();
        }
    }

    handleRunningSound(isWalking) {
        if (this.world && this.world.sound) {
            let runningSound = this.world.sound.runingSound;
            if (isWalking) {
                if (runningSound.paused) {
                    runningSound.play().catch(e => { });
                }
            } else {
                if (!runningSound.paused) {
                    runningSound.pause();
                }
            }
        }
    }

    stopRunningSound() {
        if (this.world && this.world.sound) {
            this.world.sound.runingSound.pause();
            this.isPlayingRunningSound = false;
        }
    }

    resetIdleTime() {
        this.idleTime = 0;
        this.stopIdleSounds();
        this.stopRunningSound();
    }

    stopIdleSounds() {
        if (this.isPlayingSnoringSound && this.world && this.world.sound) {
            this.world.sound.snoringSound.pause();
            this.world.sound.snoringSound.currentTime = 0;
        }
        if (this.isPlayingIdleSound && this.world && this.world.sound) {
            this.world.sound.idleSound.pause();
            this.world.sound.idleSound.currentTime = 0;
        }
        this.isPlayingIdleSound = false;
        this.isPlayingSnoringSound = false;
    }

    getHitboxMargins() {
        return {
            top: 110,
            bottom: 20,
            left: 30,
            right: 30
        };
    }
}