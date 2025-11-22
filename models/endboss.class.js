class Endboss extends MovableObject {
    
    currentImageIndex = 0;
    energy = 100;
    isHurting = false;
    isDying = false;
    animationInterval;

    constructor() {
        super().loadImage(ENDBOSS_IMAGES.chicken_walk_images[0]);
        this.loadImages(ENDBOSS_IMAGES.chicken_walk_images);
        this.loadImages(ENDBOSS_IMAGES.chicken_hurt_images);
        this.loadImages(ENDBOSS_IMAGES.chicken_dead_images);
        this.y = 50;
        this.x = 1600;
        this.height = 400;
        this.width = 300;
        this.animateEndboss();
    }

    animateEndboss() {
        this.animationInterval = setInterval(() => {
            if (this.isDead() && !this.isDying) {
                this.isDying = true;
                this.playDeathAnimation();
            } else if (this.isHurting) {
                this.playAnimation(ENDBOSS_IMAGES.chicken_hurt_images);
            } else if (!this.isDead()) {
                this.playAnimation(ENDBOSS_IMAGES.chicken_walk_images);
            }
        }, 300);
    }

    hit(damage = 20) {
        if (this.isDead()) return;
        
        this.energy -= damage;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.isHurting = true;
            this.lastHit = new Date().getTime();
            setTimeout(() => {
                this.isHurting = false;
            }, 900);
        }
    }

    playDeathAnimation() {
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
}