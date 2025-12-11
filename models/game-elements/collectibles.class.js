/**
 * Collectibles classes representing collectible items in the game.
 * Inherits from MovableObject.
 * @extends {MovableObject}
 */
class Collectibles extends MovableObject {

    /**
     * Creates a collectible object at the specified position with the given image.
     * @param {number} x - The x-coordinate position of the collectible
     * @param {number} y - The y-coordinate position of the collectible
     * @param {string} imagePath - The path to the collectible image file
     */
    constructor(x, y, imagePath) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
    }
}

/**
 * Coin class representing coin collectibles in the game.
 * Inherits from Collectibles.
 * @extends {Collectibles}
 */
class Coin extends Collectibles {

    /** * Image paths for coin collectibles.
     */
    IMAGES = [
        'assets/img_pollo_locco/img/8_coin/coin_1.png',
        'assets/img_pollo_locco/img/8_coin/coin_2.png'
    ];

    /**
     * Creates a coin collectible at the specified position.
     * @param {number} x - The x-coordinate position of the coin
     * @param {number} y - The y-coordinate position of the coin
     */
    constructor(x, y) {
        super(x, y, 'assets/img_pollo_locco/img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.animate();
        this.originalY = y;
        this.floatOffset = 0;
    }

    /** * Animates the coin by cycling through images and applying a floating effect.
    */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
            this.floatAnimation();
        }, 200);
    }

    /** * Applies a floating animation effect to the coin.
     */
    floatAnimation() {
        this.floatOffset += 0.1;
        this.y = this.originalY + Math.sin(this.floatOffset) * 15;
    }
}

/**
 * SalsaBottle class representing salsa bottle collectibles in the game.
 * Inherits from Collectibles.
 * @extends {Collectibles}
 */
class SalsaBottle extends Collectibles {

    /**
     * Creates a salsa bottle collectible at the specified position.
     * @param {number} x - The x-coordinate position of the salsa bottle
     * @param {number} y - The y-coordinate position of the salsa bottle
     */
    constructor(x, y) {
        super(x, y, 'assets/img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.y = 335;
    }
}