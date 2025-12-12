/** * Represents a chicken enemy in the game, extending the MovableObject class.
 * @extends {MovableObject} 
 */
class Chicken extends MovableObject {
    speed = 0.25;
    energy = 20;

    chicken_walk_images = [
        'assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    small_chicken_walk_images = [
        'assets/img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'assets/img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'assets/img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    /** * Creates a new Chicken instance.
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
     */
    startMovement() {
        this.gameStarted = true;
    }

    /** * Reduces the chicken's energy when hit and triggers death animation if energy depletes.
     * @param {number} damage - The amount of damage to inflict on the chicken
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
     * @returns {boolean} - returns that the chicken is dead
     */
    isDead() {
        return this.energy <= 0;
    }

    /** * Returns the hitbox margins for collision detection.
     * @returns {Object} - An object containing the top, bottom, left, and right margins
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
 * @extends {Chicken} 
 */
class SmallChicken extends Chicken {
    constructor() {
        super();
        this.loadImage('assets/img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png');
        this.loadImages(this.small_chicken_walk_images);
        this.y = 365;
        this.height = 55;
        this.width = 55;
    }

    /** * Animates the small chicken by moving it left and cycling through walk images.
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
     */
    chickenDeathAnimation() {
        clearInterval(this.animateChicken);
        this.loadImage('assets/img_pollo_locco/img/3_enemies_chicken/chicken_small/2_dead/dead.png');
    }

    /** * Returns the hitbox margins for collision detection.
     * @returns {Object} - An object containing the top, bottom, left, and right margins
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