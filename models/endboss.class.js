class Endboss extends MovableObject {
    currentImageIndex = 0;
    energy = 100;
    isHurting = false;
    isDying = false;
    isAttacking = false;
    animationInterval;
    movementInterval;
    isMoving = false;

    constructor() {
        super().loadImage(ENDBOSS_IMAGES.chicken_walk_images[0]);
        this.loadImages(ENDBOSS_IMAGES.chicken_walk_images);
        this.loadImages(ENDBOSS_IMAGES.chicken_hurt_images);
        this.loadImages(ENDBOSS_IMAGES.chicken_dead_images);
        this.loadImages(ENDBOSS_IMAGES.chicken_alert_images);
        this.loadImages(ENDBOSS_IMAGES.chicken_attack_images);
        this.y = 50;
        this.x = 1600;
        this.height = 400;
        this.width = 300;
        this.animateEndboss();
    }

    performAttack() {
        if (this.isDead() || this.isAttacking) return false;
        this.isAttacking = true;
        this.isMoving = false;
        setTimeout(() => {
            this.isAttacking = false;
            if (this.energy < 100) {
                this.isMoving = true;
            }
        }, 800);
        return true;
    }

    hit(damage = 20) {
        if (this.isDead()) return;
        this.energy -= damage;
        if (this.energy <= 0) {
            this.energy = 0;
            this.stopMovement();
        } else {
            this.endbossIsHurting();
            if (!this.isMoving && this.energy < 100) {
                this.startMovingToCharacter();
            }
            setTimeout(() => {
                this.isHurting = false;
            }, 600);
        }
    }

    endbossIsHurting() {
        this.isHurting = true;
        this.lastHit = new Date().getTime();
    }

    startMovingToCharacter() {
        this.isMoving = true;
        this.speed = 2;
        this.moveLeftToCharacter();
    }

    moveLeftToCharacter() {
        if (this.movementInterval) {
            clearInterval(this.movementInterval);
        }
        this.movementInterval = setInterval(() => {
            if (!this.isDead() && this.isMoving) {

                this.x -= this.speed;
                if (this.x <= 100) {
                    this.stopMovement();
                }
            }
        }, 1000 / 60);
    }

    stopMovement() {
        this.isMoving = false;
        if (this.movementInterval) {
            clearInterval(this.movementInterval);
            this.movementInterval = null;
        }
    }

    animateEndboss() {
        this.animationInterval = setInterval(() => {
            if (this.isDead() && !this.isDying) {
                this.isDying = true;
                this.playDeathAnimation();
            } else if (this.isAttacking) {
                this.playAnimation(ENDBOSS_IMAGES.chicken_attack_images);
            } else if (this.isHurting) {
                this.playAnimation(ENDBOSS_IMAGES.chicken_hurt_images);
            } else if (this.isMoving) {
                this.playAnimation(ENDBOSS_IMAGES.chicken_walk_images);
            } else if (!this.isDead()) {
                this.playAnimation(ENDBOSS_IMAGES.chicken_alert_images);
            }
        }, 200);
    }

    playDeathAnimation() {
        this.stopMovement();
        clearInterval(this.animationInterval);
        let deathAnimationIndex = 0;
        let deathInterval = setInterval(() => {
            if (deathAnimationIndex < ENDBOSS_IMAGES.chicken_dead_images.length) {
                let path = ENDBOSS_IMAGES.chicken_dead_images[deathAnimationIndex];
                this.img = this.imageCache[path];
                deathAnimationIndex++;
            } else {
                clearInterval(deathInterval);
            }
        }, 300);
    }

    isDead() {
        return this.energy <= 0;
    }

    getHitboxMargins() {
        return { 
            top: 50,
            bottom: 30, 
            left: 40, 
            right: 40 
        };
    }
}
