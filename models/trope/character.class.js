/**
 * Character class representing the main playable character in the game.
 * Inherits from MovableObject and handles player input, animations, and interactions.
 * @extends {MovableObject}
 */
class Character extends MovableObject {

    /** @type {number} Y-coordinate position of the character */
    y = 50;
    /** @type {number} X-coordinate position of the character */
    x = 50;
    /** @type {number} Height of the character in pixels */
    height = 250;
    /** @type {number} Width of the character in pixels */
    width = 100;
    /** @type {World} Reference to the game world object */
    world;
    /** @type {number} Interval ID for animation loop */
    animationInterval;
    /** @type {number} Interval ID for movement loop */
    movementInterval;
    /** @type {boolean} Flag indicating if character is currently dying */
    isDying = false;
    /** @type {number} Time counter for idle state in seconds */
    idleTime = 0;
    /** @type {boolean} Flag indicating if idle sound is currently playing */
    isPlayingIdleSound = false;
    /** @type {boolean} Flag indicating if snoring sound is currently playing */
    isPlayingSnoringSound = false;
    /** @type {boolean} Flag indicating if running sound is currently playing */
    isPlayingRunningSound = false;

    /**
     * Creates a new Character instance.
     * Initializes the character with default image, loads all character images,
     * applies gravity, and starts animation loops.
     */
    constructor() {
        super().loadImage(CHARACTER_IMAGES.images_standing[0]);
        this.characterImagesLoaded();
        this.applyGravity();
        this.animate();
    }

    /**
     * Loads all character image sets for different animation states.
     * Preloads walking, jumping, hurt, dead, standing, and sleeping animations.
     */
    characterImagesLoaded() {
        this.loadImages(CHARACTER_IMAGES.images_walking);
        this.loadImages(CHARACTER_IMAGES.images_jumping);
        this.loadImages(CHARACTER_IMAGES.images_hurt);
        this.loadImages(CHARACTER_IMAGES.images_dead);
        this.loadImages(CHARACTER_IMAGES.images_standing);
        this.loadImages(CHARACTER_IMAGES.images_sleeping);
    }

    /**
     * Starts the main animation and movement loops for the character.
     */
    animate() {
        this.animateInterval();
        this.moveInterval();
    }

    /**
     * Sets up the animation interval loop.
     * Handles death animation, character animations, and jump input at 10 FPS.
     */
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

    /**
     * Handles jump input from keyboard.
     * Triggers jump when SPACE or UP key is pressed and resets idle time.
     */
    handleJump() {
        if (this.world.keyboard.SPACE || this.world.keyboard.UP) {
            this.jump();
            this.resetIdleTime();
        }
    }

    /**
     * Sets up the movement interval loop.
     * Handles left/right movement and running sounds at 60 FPS.
     */
    moveInterval() {
        this.movementInterval = setInterval(() => {
            if (!this.isDead()) {
                let isWalking = (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) ||
                    (this.world.keyboard.LEFT && this.x > 70);
                if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                    if (this.canMoveRight()) {
                        this.moveRight();
                    }
                }
                if (this.world.keyboard.LEFT && this.x > 70) {
                    if (this.canMoveLeft()) {
                        this.moveCharacterLeft();
                    }
                }
                this.handleRunningSound(isWalking);
            }
        }, 1000 / 60);
    }

    /**
     * Determines and plays the appropriate character animation based on current state.
     * Prioritizes hurt, jumping, and movement animations.
     */
    playCharacterAnimation() {
        if (this.isHurt()) {
            this.playHurtAnimation();
        } else if (this.isAboveGround()) {
            this.playJumpAnimation();
        } else {
            this.checkMovement();
        }
    }

    /**
     * Plays the death animation sequence and cleans up intervals.
     * Cycles through death images and stops all animations when complete.
     */
    playDeathAnimation() {
        let deathAnimationIndex = 0;
        let deathAnimationInterval = setInterval(() => {
            this.processDeathFrame(deathAnimationIndex, deathAnimationInterval);
            deathAnimationIndex++;
        }, 150);
    }

    /**
     * Processes a single frame of the death animation.
     * Updates the character image or cleans up when animation is complete.
     * @param {number} frameIndex - The current frame index in the death animation
     * @param {number} intervalId - The interval ID for the death animation
     */
    processDeathFrame(frameIndex, intervalId) {
        if (frameIndex < CHARACTER_IMAGES.images_dead.length) {
            this.updateDeathImage(frameIndex);
        } else {
            this.cleanupCharacterAnimations(intervalId);
        }
    }

    /**
     * Updates the character image to the current death animation frame.
     * @param {number} frameIndex - The frame index to display
     */
    updateDeathImage(frameIndex) {
        let path = CHARACTER_IMAGES.images_dead[frameIndex];
        this.img = this.imageCache[path];
    }

    /**
     * Cleans up all character animation intervals when death animation is complete.
     * @param {number} deathIntervalId - The death animation interval to clear
     */
    cleanupCharacterAnimations(deathIntervalId) {
        clearInterval(deathIntervalId);
        clearInterval(this.animationInterval);
        clearInterval(this.movementInterval);
    }

    /**
     * Plays the hurt animation and resets idle time.
     */
    playHurtAnimation() {
        this.playAnimation(CHARACTER_IMAGES.images_hurt);
        this.resetIdleTime();
    }

    /**
     * Plays the jumping animation and resets idle time.
     */
    playJumpAnimation() {
        this.playAnimation(CHARACTER_IMAGES.images_jumping);
        this.resetIdleTime();
    }

    /**
     * Handles the character's idle state progression.
     * Transitions from standing to sleeping state based on idle time.
     */
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

    /**
     * Handles the sleeping state animation and sound.
     * Plays sleeping animation and snoring sound after 5 seconds of idle time.
     */
    handleSleepingState() {
        this.playAnimation(CHARACTER_IMAGES.images_sleeping);
        if (!this.isPlayingSnoringSound && this.world && this.world.sound) {
            this.world.sound.playSound(this.world.sound.snoringSound);
            this.isPlayingSnoringSound = true;
            this.isPlayingIdleSound = false;
        }
    }

    /**
     * Handles the standing idle state animation and sound.
     * Plays standing animation and idle sound after 2 seconds of idle time.
     */
    handleStandingIdleState() {
        this.playAnimation(CHARACTER_IMAGES.images_standing);
        if (!this.isPlayingIdleSound && this.world && this.world.sound) {
            this.world.sound.playSound(this.world.sound.idleSound);
            this.isPlayingIdleSound = true;
            this.isPlayingSnoringSound = false;
        }
    }

    /**
     * Handles the early idle state (less than 2 seconds).
     * Plays standing animation without sound.
     */
    handleEarlyIdleState() {
        this.playAnimation(CHARACTER_IMAGES.images_standing);
        this.isPlayingIdleSound = false;
        this.isPlayingSnoringSound = false;
    }

    /**
     * Checks character movement input and plays appropriate animations.
     * Handles walking animation, running sounds, and idle state transitions.
     */
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

    /**
     * Manages the running sound based on walking state.
     * Plays or pauses running sound depending on whether character is walking.
     * @param {boolean} isWalking - Whether the character is currently walking
     */
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

    /**
     * Stops the running sound and sets the flag to false.
     */
    stopRunningSound() {
        if (this.world && this.world.sound) {
            this.world.sound.runingSound.pause();
            this.isPlayingRunningSound = false;
        }
    }

    /**
     * Resets the idle time counter and stops all idle-related sounds.
     */
    resetIdleTime() {
        this.idleTime = 0;
        this.stopIdleSounds();
        this.stopRunningSound();
    }

    /**
     * Stops all idle-related sounds (snoring and idle sounds).
     * Resets sound positions and flags.
     */
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

    /**
     * Checks if the character can move right without colliding with the endboss.
     * @returns {boolean} True if character can move right, false otherwise
     */
    canMoveRight() {
        let endboss = this.world.level.enemies.find(enemy => enemy instanceof Endboss);
        if (!endboss || endboss.isDead()) return true;
        
        let charMargins = this.getHitboxMargins();
        let endbossMargins = endboss.getHitboxMargins();
        
        let charRightEdge = this.x + this.width - charMargins.right + 7;
        let endbossLeftEdge = endboss.x + endbossMargins.left;
        return charRightEdge < endbossLeftEdge + 60 || this.x > endboss.x;
    }

    /**
     * Checks if the character can move left without colliding with the endboss.
     * @returns {boolean} True if character can move left, false otherwise
     */
    canMoveLeft() {
        let endboss = this.world.level.enemies.find(enemy => enemy instanceof Endboss);
        if (!endboss || endboss.isDead()) return true;
        let charMargins = this.getHitboxMargins();
        let endbossMargins = endboss.getHitboxMargins();
        let charLeftEdge = this.x + charMargins.left - 7;
        let endbossRightEdge = endboss.x + endboss.width - endbossMargins.right;
        return charLeftEdge > endbossRightEdge - 60 || this.x < endboss.x;
    }

    /**
     * Returns the hitbox margins for collision detection.
     * @returns {Object} An object containing the top, bottom, left, and right margins
     * @returns {number} returns.top - Top margin in pixels (110)
     * @returns {number} returns.bottom - Bottom margin in pixels (20)
     * @returns {number} returns.left - Left margin in pixels (30)
     * @returns {number} returns.right - Right margin in pixels (30)
     */
    getHitboxMargins() {
        return {
            top: 110,
            bottom: 20,
            left: 30,
            right: 30
        };
    }
}