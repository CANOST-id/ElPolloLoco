/** * DrawableObject class representing a basic drawable game element.
 */
class DrawableObject {
    img;
    imageCache = [];
    imageChickenCache = [];
    currentImageIndex = 0;

    /**
     * Loads an image from the specified path.
     * @param {string} path - The path to the image file
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images from the specified array of paths.
     * @param {string[]} arr - An array of image file paths
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Loads multiple chicken images from the specified array of paths.
     * @param {string[]} arr - An array of chicken image file paths
     */
    loadChickenImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageChickenCache[path] = img;
        });
    }

    /**
     *  Draws the object on the given canvas context.
     *  @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}