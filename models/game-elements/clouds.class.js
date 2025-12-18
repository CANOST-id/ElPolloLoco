/**
 * Cloud class representing cloud elements in the game.
 * Inherits from MovableObject.
 * @extends {MovableObject}
 */
class Cloud extends MovableObject {
    speed = 0.15;

    /**
     * Creates a cloud object at a random horizontal position.
     * Clouds have a size of 720x480 pixels.
     */
    constructor() {
        super().loadImage('assets/img_pollo_locco/img/5_background/layers/4_clouds/1.png');
        this.y = 0;
        this.x = Math.random() * 1800 - 200;
        this.animate();
        this.width = 720;
        this.height = 480;
    }

    /**
     * Animates the cloud by moving it to the left.
     */
    animate() {
        this.moveLeft();
    }
}