class MovableObject extends DrawableObject {

    speed = 0.5;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.5;
    energy = 100;
    lastHit = 0;
    currentImageIndex = 0;
    gameStarted = true;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 35);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
        return this.y < 164;
        }
    }

    moveLeft() {
        this.moveInterval = setInterval(() => {
            if (this.gameStarted && !this.isDead()) {
                this.x -= this.speed;
                if (this.x < -720) {
                    this.x = 500;
                }
            }
        }, 1000 / 60);
    }

    moveCharacterLeft() {
        this.x = this.x - 7;
        this.world.camera_x = this.world.camera_x + 7;
        this.otherDirection = true;
    }

    moveRight() {
        this.x = this.x + 7;
        this.world.camera_x = this.world.camera_x - 7;
        this.otherDirection = false;
    }

    jump() {
        if (this.isAboveGround()) return;
        this.speedY = 18;
            this.world.sound.playSound(this.world.sound.jumpSound);
    }

    playAnimation(images) {
        let i = this.currentImageIndex % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImageIndex++;
    }

    chickenDeathAnimation() {
        clearInterval(this.animateChicken);
        this.loadImage('assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
    }

    isColliding(mo) {
        if (this.isDead() || mo.isDead()) {
            return false;
        }
        let thisMargins = this.getHitboxMargins();
        let otherMargins = mo.getHitboxMargins();
        
        return this.x + thisMargins.left < mo.x + mo.width - otherMargins.right &&
            this.x + this.width - thisMargins.right > mo.x + otherMargins.left &&
            this.y + thisMargins.top < mo.y + mo.height - otherMargins.bottom &&
            this.y + this.height - thisMargins.bottom > mo.y + otherMargins.top;
    }

    getHitboxMargins() {
        return { top: 10, bottom: 10, left: 10, right: 10 };
    }

    hit() {
        this.lastHit = new Date().getTime();
        this.energy -= 1;
        
        if (this.energy <= 0) {
            this.energy = 0;
            if (this.world && this.world.sound) {
                this.world.sound.playSound(this.world.sound.deadCharacterSound);
            }
        } else {
            if (this.world && this.world.sound) {
                this.world.sound.playSound(this.world.sound.hurtSound);
            }
        }
    }

    hitBoss() {
        this.lastHit = new Date().getTime();
        this.energy -= 20;
        if (this.energy <= 0) {
            this.energy = 0;
            if (this.world && this.world.sound) {
                this.world.sound.playSound(this.world.sound.deadCharacterSound);
            }
        } else {
            if (this.world && this.world.sound) {
                this.world.sound.playSound(this.world.sound.hurtSound);
            }
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        return timePassed < 500;
    }

    isDead() {
        return this.energy <= 0;
    }
}