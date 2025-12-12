/**
 * Base class for status bars in the game.
 * Inherits from DrawableObject.
 * @extends {DrawableObject}
 */
class StatusBar extends DrawableObject {
    percentage = 100;
    width = 200;
    height = 60;

    /** * Creates a status bar with specified images and position.
     * @param {string[]} images - Array of image paths for different status levels
     * @param {number} x - The x-coordinate position of the status bar
     * @param {number} y - The y-coordinate position of the status bar
     */
    constructor(images, x, y) {
        super();
        this.images = images;
        this.x = x;
        this.y = y;
        this.loadImages(this.images);
        this.setPercentage(100);
    }

    /** * Sets the current percentage and updates the displayed image accordingly.
     * @param {number} percentage - The current percentage value to set
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.images[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /** * Resolves the image index based on the current percentage.
     * @returns {number} - The index of the image corresponding to the current percentage
     */
    resolveImageIndex() {
        if (this.percentage >= 100) return 5;
        if (this.percentage >= 80) return 4;
        if (this.percentage >= 60) return 3;
        if (this.percentage >= 40) return 2;
        if (this.percentage >= 20) return 1;
        return 0;
    }
}

/**
 * HealthBar class representing the player's health status bar.
 * Inherits from StatusBar.
 * @extends {StatusBar}
 */
class HealthBar extends StatusBar {

    /** * Creates a health bar at the specified position.
     * @param {number} x - The x-coordinate position of the health bar
     * @param {number} y - The y-coordinate position of the health bar
     */
    constructor(x = 60, y = -10) {
        const images = [
            'assets/img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
            'assets/img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
            'assets/img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
            'assets/img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
            'assets/img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
            'assets/img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
        ];
        super(images, x, y);
    }
}


/** * CoinBar class representing the coin status bar.
 * Inherits from StatusBar.
 * @extends {StatusBar}
 */
class CoinBar extends StatusBar {
    coins = 0;

    /** * Creates a coin bar at the specified position.
     * @param {number} x - The x-coordinate position of the coin bar
     * @param {number} y - The y-coordinate position of the coin bar
     */
    constructor(x = 30, y = 20) {
        const images = [
            'assets/img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
            'assets/img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
            'assets/img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
            'assets/img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
            'assets/img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
            'assets/img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
        ];
        super(images, x, y);
    }
}

/** * BottleBar class representing the bottle status bar.
 * Inherits from StatusBar.
 * @extends {StatusBar}
 */
class BottleBar extends StatusBar {
    bottles = 0;

    /** * Creates a bottle bar at the specified position.
     * @param {number} x - The x-coordinate position of the bottle bar
     * @param {number} y - The y-coordinate position of the bottle bar
     */
    constructor(x = 10, y = 50) {
        const images = [
            'assets/img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
            'assets/img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
            'assets/img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
            'assets/img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
            'assets/img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
            'assets/img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
        ];
        super(images, x, y);
        this.setBottles(0);
    }

    /** * Sets the number of bottles and updates the bottle bar percentage.
     * @param {number} bottles - The current number of bottles
     */
    setBottles(bottles) {
        this.bottles = bottles;

        let percentage = Math.min((this.bottles / 7) * 100, 100);
        this.setPercentage(percentage);
    }
}

/** * BossHealthBar class representing the boss's health status bar.
 * Inherits from StatusBar.
 * @extends {StatusBar}
 */
class BossHealthBar extends StatusBar {

    /** * Creates a boss health bar at the specified position.
     */
    constructor() {
        const images = [
            'assets/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/green/green0.png',
            'assets/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/green/green20.png',
            'assets/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/green/green40.png',
            'assets/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/green/green60.png',
            'assets/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/green/green80.png',
            'assets/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/green/green100.png'
        ];
        super(images, 0, 0);
    }

    /** * Associates the boss health bar with a specific endboss object.
     * @param {Endboss} endboss - The endboss object to track
     */
    setEndboss(endboss) {
        this.endboss = endboss;
    }

    /** * Sets the position of the boss health bar relative to the endboss.
     * @param {number} x - The x-coordinate position
     * @param {number} y - The y-coordinate position
     */
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    /** * Updates the position of the boss health bar based on the endboss's position.
     * @param {number} x - The x-coordinate position plus 50 pixels
     * @param {number} y - The y-coordinate position minus 20 pixels
     */
    updatePosition() {
        if (this.endboss) {
            this.x = this.endboss.x + 50;
            this.y = this.endboss.y - 20;
        }
    }
}