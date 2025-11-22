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
        if (this.gameStarted) {
        setInterval(() => {
            this.x -= this.speed;
            if (this.x < -720) {
                this.x = 600;
            }
        }, 1000 / 60);
        } else {
            this.gameStarted = false;
            return;
        }
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
        this.speedY = 20;
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
            this.energy -= 1;
        }
    }

    hitBoss() {
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
            this.energy -= 20;
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