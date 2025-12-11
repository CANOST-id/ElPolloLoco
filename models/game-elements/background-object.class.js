/**
 * BackgroundObject class representing a movable background element in the game.
 * Inherits from MovableObject.
 * @extends {MovableObject}
 */
class BackgroundObject extends MovableObject {

    /**
     * Creates a background object with specified image and position.
     * Background objects have a size of 720x480 pixels.
     * @param {string} imagePath - The path to the background image file
     * @param {number} x - The x-coordinate position of the background object
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.y = 0;
        this.x = x;
        this.width = 720;
        this.height = 480;
    }
}