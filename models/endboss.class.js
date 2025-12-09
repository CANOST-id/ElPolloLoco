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
        this.x = 1650;
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
        this.speed = 3;
        this.moveLeftToCharacter();
    }

    moveLeftToCharacter() {
        if (this.movementInterval) {
            clearInterval(this.movementInterval);
        }
        this.movementInterval = setInterval(() => {
            if (!this.isDead() && this.isMoving) {
                this.checkCharacterCollision();
                this.x -= this.speed;
                if (this.x <= 100) {
                    this.stopMovement();
                }
            }
        }, 1000 / 60);
    }

    checkCharacterCollision() {
        if (this.world && this.world.character) {
            let distance = Math.abs(this.x - this.world.character.x);
            if (distance < 300 && !this.isMoving && !this.isDead()) {
                this.startMovingToCharacter();
            }
            if (distance < 10 && !this.isAttacking) {
                this.startAttacking();
            } else if (distance > 200 && this.isAttacking) {
                this.stopAttacking();
            }
        }
    }

    startAttacking() {
        this.isAttacking = true;
        this.isMoving = false;
    }

    stopAttacking() {
        this.isAttacking = false;
        this.isMoving = true;
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
            this.checkCharacterCollision();
            if (this.isDead() && !this.isDying) {
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
        }, 200);
            return this.isDying = true;
    }

    isDead() {
        return this.energy <= 0;
    }

    getHitboxMargins() {
        return { 
            top: 90,
            bottom: 50, 
            left: 40, 
            right: 40 
        };
    }
}
