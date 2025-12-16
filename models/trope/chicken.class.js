/** * Represents a chicken enemy in the game, extending the MovableObject class.
 * @extends {MovableObject} 
 */
class Chicken extends MovableObject {
    /** @type {number} Movement speed of the chicken */
    speed = 0.25;
    /** @type {number} Health points of the chicken */
    energy = 20;
    /** @type {boolean} Flag indicating if the game has started */
    gameStarted = false;
    /** @type {number} Interval ID for walk animation */
    walkInterval;

    /** @type {string[]} Image paths for chicken walking animation */
    chicken_walk_images = [
        'assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    /** @type {string[]} Image paths for small chicken walking animation */
    small_chicken_walk_images = [
        'assets/img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'assets/img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'assets/img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    /** * Creates a new Chicken instance.
     * Initializes position, size, speed, and starts animation.
     */
    constructor() {
        super().loadImage('assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');
        this.loadImages(this.chicken_walk_images);
        this.y = 340;
        this.x = 600 + Math.random() * 1000;
        this.height = 80;
        this.width = 80;
        this.speed = 0.25 + Math.random() * 0.6;
        this.energy = 20;
        this.gameStarted = false;
        this.animateChicken();
    }

    /** * Animates the chicken by moving it left and cycling through walk images.
     * Sets up interval for continuous walking animation at 10 FPS.
     */
    animateChicken() {
        this.moveLeft();
        this.walkInterval = setInterval(() => {
            if (this.gameStarted && !this.isDead()) {
                this.playAnimation(this.chicken_walk_images);
            }
        }, 1000 / 10);
    }

    /** * Starts the movement of the chicken when the game begins.
     * Enables the chicken's animation and movement.
     */
    startMovement() {
        this.gameStarted = true;
    }

    /** * Reduces the chicken's energy when hit and triggers death animation if energy depletes.
     * @param {number} [damage=20] - The amount of damage to inflict on the chicken
     */
    hit(damage = 20) {
        this.energy -= damage;
        if (this.energy <= 0) {
            this.energy = 0;
            this.speed = 0;
            this.chickenDeathAnimation();
        }
    }

    /** * Checks if the chicken is dead.
     * @returns {boolean} True if the chicken's energy is zero or below, false otherwise
     */
    isDead() {
        return this.energy <= 0;
    }

    /** * Plays the death animation for the chicken.
     * Clears the animation interval and loads the dead chicken image.
     */
    chickenDeathAnimation() {
        clearInterval(this.walkInterval);
        this.loadImage('assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
    }

    /** * Returns the hitbox margins for collision detection.
     * @returns {Object} An object containing the top, bottom, left, and right margins
     * @returns {number} returns.top - Top margin in pixels (10)
     * @returns {number} returns.bottom - Bottom margin in pixels (0)
     * @returns {number} returns.left - Left margin in pixels (18)
     * @returns {number} returns.right - Right margin in pixels (18)
     */
    getHitboxMargins() {
        return { 
            top: 10,
            bottom: 0,   
            left: 18,    
            right: 18    
        };
    }
}

/** * Represents a small chicken enemy in the game, extending the Chicken class.
 * Smaller version of the regular chicken with adjusted size and hitbox.
 * @extends {Chicken} 
 */
class SmallChicken extends Chicken {
    
    /** * Creates a new SmallChicken instance.
     * Inherits from Chicken but with smaller dimensions and different sprites.
     */
    constructor() {
        super();
        this.loadImage('assets/img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png');
        this.loadImages(this.small_chicken_walk_images);
        this.y = 365;
        this.height = 55;
        this.width = 55;
    }

    /** * Animates the small chicken by moving it left and cycling through walk images.
     * Overrides parent method to use small chicken specific images.
     */
    animateChicken() {
        this.moveLeft();
        this.walkInterval = setInterval(() => {
            if (this.gameStarted && !this.isDead()) {
                this.playAnimation(this.small_chicken_walk_images);
            }
        }, 1000 / 10);
    }

    /** * Plays the death animation for the small chicken.
     * Clears the animation interval and loads the small dead chicken image.
     */
    chickenDeathAnimation() {
        clearInterval(this.walkInterval);
        this.loadImage('assets/img_pollo_locco/img/3_enemies_chicken/chicken_small/2_dead/dead.png');
    }

    /** * Returns the hitbox margins for collision detection.
     * Adjusted margins for the smaller chicken size.
     * @returns {Object} An object containing the top, bottom, left, and right margins
     * @returns {number} returns.top - Top margin in pixels (8)
     * @returns {number} returns.bottom - Bottom margin in pixels (0)
     * @returns {number} returns.left - Left margin in pixels (12)
     * @returns {number} returns.right - Right margin in pixels (12)
     */
    getHitboxMargins() {
        return { 
            top: 8,
            bottom: 0,   
            left: 12,    
            right: 12    
        };
    }
}