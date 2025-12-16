/** * Class representing a throwable object in the game, extending the MovableObject class.
 * @extends {MovableObject} 
 */
class ThrowableObject extends MovableObject {
    speedY = 0;
    speedX = 0;
    hasCollided = false;

    images_splash = [
        'assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    images_rotation = [
        'assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    /** 
     * Creates a throwable object at the specified position.
     * @param {number} x - The x-coordinate position of the throwable object
     * @param {number} y - The y-coordinate position of the throwable object
     */
    constructor(x, y) {
        super();
        this.loadImage('assets/img_pollo_locco/img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.images_rotation);
        this.loadImages(this.images_splash);
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 100;
        this.energy = 20;
        this.throw();
        this.animate();
    }

    /** * Initiates the throwing motion of the object with gravity and horizontal movement.
     * @param {number} speedY - The initial vertical speed of the throwable object
     * @param {number} speedX - The initial horizontal speed of the throwable object
     */
    throw() {
        this.setThrowSpeed();
        this.applyGravity();
        this.startMovementLoop();
    }

    /**
     * Sets the initial throwing speeds for the object.
     */
    setThrowSpeed() {
        this.speedY = 20;
        this.speedX = 5;
    }

    /**
     * Starts the movement and collision detection loop.
     */
    startMovementLoop() {
        setInterval(() => {
            if (!this.hasCollided) {
                this.x += this.speedX;
            }
            if (this.y > 340) {
                this.hitGround();
            }
        }, 25);
    }

    /** * Animates the throwable object by rotating it until it collides.
     */
    animate() {
        this.rotationInterval = setInterval(() => {
            if (!this.hasCollided) {
                this.playAnimation(this.images_rotation);
            }
        }, 200);
    }

    /** * Plays the splash animation when the object hits the ground or collides.
     */
    hitGround() {
        this.hasCollided = true;
        this.speedX = 0;
        this.speedY = 0;
        clearInterval(this.rotationInterval);
        this.playSplashAnimation();
    }

    /** * Handles the collision of the throwable object with an enemy.
     * @param {MovableObject} enemy - The enemy object that the throwable object collides with
     */
    hitEnemy(enemy) {
        if (this.hasCollided) return;
        this.hasCollided = true;
        this.speedX = 0;
        this.speedY = 0;
        if (enemy instanceof Endboss) {
            enemy.hit(20);
        } else {
            enemy.hit(20);
        }
        clearInterval(this.rotationInterval);
        this.playSplashAnimation();
    }

    /** * Plays the splash animation sequence for the throwable object.
     * @param {number} splashIndex - The current index of the bottle splash image
     */
    playSplashAnimation() {
        if (this.splashSoundPlayed) return;
        this.splashSoundPlayed = true;
        let splashIndex = 0;
        if (this.world && this.world.sound) {
            this.world.sound.playSound(this.world.sound.bottleSplashSound);
        }
        this.splashInterval = setInterval(() => {
            if (splashIndex < this.images_splash.length) {
                let path = this.images_splash[splashIndex];
                this.img = this.imageCache[path];
                splashIndex++;
            } else {
                this.energy = 0;
                clearInterval(this.splashInterval);
                this.removeBottle = true;
            }
        }, 100);
    }

    /** * Checks if this throwable object is colliding with another enemy object.
     * @param {MovableObject} enemy - The enemy object to check collision with
     * @returns {boolean} - True if the objects are colliding, false otherwise
     * @param {number} x - The current x-coordinate position of this object
     * @param {number} y - The current y-coordinate position of this object
     * @param {number} thisMargins - The hitbox margins of this object
     * @param {number} otherMargins - The hitbox margins of the other object
     * @returns {Parameters} - for collision detection
     */
    isColliding(enemy) {
        if (this.isDead() || enemy.isDead()) {
            return false;
        }
        let thisMargins = this.getHitboxMargins();
        let otherMargins = enemy.getHitboxMargins();
        
        return this.x + thisMargins.left < enemy.x + enemy.width - otherMargins.right &&
            this.x + this.width - thisMargins.right > enemy.x + otherMargins.left &&
            this.y + thisMargins.top < enemy.y + enemy.height - otherMargins.bottom &&
            this.y + this.height - thisMargins.bottom > enemy.y + otherMargins.top;
    }

    /** * Returns the hitbox margins for collision detection.
     * @returns {Object} - An object containing the top, bottom, left, and right margins
     */
    getHitboxMargins() {
        return {
            top: 5,
            bottom: 5,
            left: 5,
            right: 5
        };
    }
}