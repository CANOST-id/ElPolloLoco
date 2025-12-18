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
     * Initializes position, size, images, and starts animation.
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
     * Initiates attack state and temporarily disables movement.
     * @returns {boolean} True if the attack was initiated, false if already dead or attacking
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
     * @param {number} [damage=20] - The amount of damage to inflict on the endboss
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
     * Sets up movement interval and handles boundary checking.
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
     * Handles proximity-based behavior changes.
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
     * Clears movement intervals and resets movement flags.
     */
    stopMovement() {
        this.isMoving = false;
        if (this.movementInterval) {
            clearInterval(this.movementInterval);
            this.movementInterval = null;
        }
    }

    /** * Animates the endboss by checking its state and playing the appropriate animation.
     * Runs at 5 FPS (every 200ms) and handles state-based animation switching.
     */
    animateEndboss() {
        this.animationInterval = setInterval(() => {
            this.processEndbossFrame();
        }, 200);
    }

    /**
     * Processes a single animation frame for the endboss.
     * Checks collisions and determines which animation to play based on current state.
     */
    processEndbossFrame() {
        this.checkCharacterCollision();
        this.selectEndbossAnimation();
    }

    /**
     * Selects and plays the appropriate animation based on the endboss's current state.
     * Prioritizes death, attack, hurt, movement, and alert animations.
     */
    selectEndbossAnimation() {
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
    }

    /** * Plays the death animation for the endboss.
     * Stops movement, clears intervals, and cycles through death images.
     * @returns {boolean} Always returns true after setting isDying flag
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
            }}, 200);
        return this.isDying = true;
    }

    /** * Checks if the endboss is dead.
     * @returns {boolean} True if the endboss's energy is 0 or less, false otherwise
     */
    isDead() {
        return this.energy <= 0;
    }

    /** * Returns the hitbox margins for collision detection.
     * @returns {Object} An object containing the top, bottom, left, and right margins
     * @returns {number} returns.top - Top margin in pixels (90)
     * @returns {number} returns.bottom - Bottom margin in pixels (50)
     * @returns {number} returns.left - Left margin in pixels (40)
     * @returns {number} returns.right - Right margin in pixels (40)
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