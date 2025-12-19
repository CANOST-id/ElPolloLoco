/**
 * MovableObject class that extends DrawableObject to include movement mechanics.
 * Inherits from DrawableObject.
 * @extends {DrawableObject}
 */
class MovableObject extends DrawableObject {

    static GROUND_LEVEL = 168;
    speed = 0.5;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.5;
    energy = 100;
    lastHit = 0;
    currentImageIndex = 0;
    gameStarted = true;

    /** * Applies gravity to the object, affecting its vertical position over time.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 35);
    }

    /** * Checks if the object is above the ground level.
     * @returns {boolean} True if the object is above ground
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < MovableObject.GROUND_LEVEL;
        }
    }

    /** * Moves the object to the left continuously.
     */
    moveLeft() {
        this.moveInterval = setInterval(() => {
            if (this.gameStarted && !this.isDead()) {
                this.x -= this.speed;
                if (this.x < -720) {
                    this.x = 400;
                }
            }
        }, 1000 / 60);
    }

    /** * Moves the character to the left, updating its position and camera view.
     */
    moveCharacterLeft() {
        this.x = this.x - 7;
        this.world.camera_x = this.world.camera_x + 7;
        this.otherDirection = true;
    }

    /** * Moves the character to the right, updating its position and camera view.
     */
    moveRight() {
        this.x = this.x + 7;
        this.world.camera_x = this.world.camera_x - 7;
        this.otherDirection = false;
    }

    /** * Makes the object jump by setting its vertical speed.
     */
    jump() {
        if (this.isAboveGround()) return;
        this.currentImageIndex = 0;
        this.speedY = 18;
        this.world.sound.playSound(this.world.sound.jumpSound);
    }

    /** * Plays an animation by cycling through a set of images.
     * @param {Array<string>} images - Array of image paths for the animation
     */
    playAnimation(images) {
        let i = this.currentImageIndex % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImageIndex++;
    }

    /** * Plays the death animation for a chicken enemy.
     */
    chickenDeathAnimation() {
        clearInterval(this.animateChicken);
        this.loadImage('assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
    }

    /** * Checks if this object is colliding with another movable object.
     * @param {MovableObject} mo - The other movable object to check collision with
     * @returns {boolean} True if the objects are colliding, false otherwise
     */
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

    /** * Returns the hitbox margins for collision detection.
     * @returns {Object} An object containing the top, bottom, left, and right margins
     */
    getHitboxMargins() {
        return { top: 10, bottom: 10, left: 10, right: 10 };
    }

    /** * Reduces the energy of the object when hit and plays corresponding sounds.
     */
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

    /** * Reduces the energy of the character when hit by boss and plays corresponding sounds.
     */
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

    /** * Checks if the object is currently hurt based on the last hit time.
     * @returns {boolean} True if the object is hurt, false otherwise
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        return timePassed < 500;
    }

    /** * Checks if the object is dead based on its energy level.
     * @returns {boolean} True if the object is dead
     */
    isDead() {
        return this.energy <= 0;
    }
}