class MovableObject extends DrawableObject {

    speed = 0.5;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.5;
    energy = 100;
    lastHit = 0;


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
        return this.y < 164;
        }
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
            if (this.x < -720) {
                this.x = 600;
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

    playAnimation(images) {
        let i = this.currentImageIndex % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImageIndex++;
    }

    jump() {
        if (this.isAboveGround()) return;
        this.speedY = 20;
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.x < mo.x + mo.width &&
            this.y + this.height > mo.y &&
            this.y < mo.y + mo.height;
    }

    hit() {
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
            this.energy -= 5;
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        return timePassed < 500;
    }

    isDead() {
        return this.energy == 0;
    }
}