/** * Represents the endboss character in the game, extending the MovableObject class.
 * @extends {MovableObject}
  */
class Endboss extends MovableObject {
    currentImageIndex = 0;
    energy = 100;
    isHurting = false;
    isDying = false;
    isAttacking = false;
    animationInterval;
    movementInterval;
    isMoving = false;

    /** * Creates a new Endboss instance.
     */
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

    /** * Performs an attack action by the endboss.
     * @param {number} energy - The current energy level of the endboss
     * @param {boolean} isAttacking - Indicates if the endboss is currently attacking
     * @returns {boolean} - True if the attack was initiated, false otherwise
     */
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

    /** * Reduces the endboss's energy when hit and triggers hurt or death animations.
     * @param {number} damage - The amount of damage to inflict on the endboss
     */
    hit(damage = 20) {
        if (this.isDead()) return;
        this.energy -= damage;
        if (this.energy <= 0) {
            this.energy = 0;
            this.stopMovement();
        } else {
            this.endbossIsHurting();
            this.world.sound.playSound(this.world.sound.endbossHurtSound);
            setTimeout(() => {
                this.isHurting = false;
            }, 600);
        }
    }

    /** * Sets the endboss to a hurting state and records the last hit time.
     */
    endbossIsHurting() {
        this.isHurting = true;
        this.lastHit = new Date().getTime();
    }

    /** * Starts the endboss moving towards the character.
     */
    startMovingToCharacter() {
        this.isMoving = true;
        this.speed = 3;
        this.moveLeftToCharacter();
    }

    /** * Moves the endboss left towards the character.
     */
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

    /** * Checks the distance to the character and initiates movement or attack as needed.
     */
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

    /** * Starts the endboss attacking the character.
     */
    startAttacking() {
        this.isAttacking = true;
        this.isMoving = false;
    }

    /** * Stops the endboss attacking the character.
     */
    stopAttacking() {
        this.isAttacking = false;
        this.isMoving = true;
    }

    /** * Stops the endboss's movement.
     */
    stopMovement() {
        this.isMoving = false;
        if (this.movementInterval) {
            clearInterval(this.movementInterval);
            this.movementInterval = null;
        }
    }

    /** * Animates the endboss by checking its state and playing the appropriate animation.
     */
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

    /** * Plays the death animation for the endboss.
     */
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

    /** * Checks if the endboss is dead.
     * @returns {boolean} - True if the endboss's energy is 0 or less, false otherwise
     */
    isDead() {
        return this.energy <= 0;
    }

    /** * Returns the hitbox margins for collision detection.
     * @returns {Object} - An object containing the top, bottom, left, and right margins
     */
    getHitboxMargins() {
        return {
            top: 90,
            bottom: 50,
            left: 40,
            right: 40
        };
    }
}