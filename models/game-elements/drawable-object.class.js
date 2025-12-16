/** * DrawableObject class representing a basic drawable game element.
 */
class DrawableObject {
    /** @type {HTMLImageElement} The main image element */
    img;
    /** @type {Object.<string, HTMLImageElement>} Cache for storing loaded images */
    imageCache = [];
    /** @type {Object.<string, HTMLImageElement>} Cache for storing loaded chicken images */
    imageChickenCache = [];
    /** @type {number} Index of the current image in animation sequences */
    currentImageIndex = 0;
    /** @type {number} X-coordinate position of the object */
    x;
    /** @type {number} Y-coordinate position of the object */
    y;
    /** @type {number} Width of the object in pixels */
    width;
    /** @type {number} Height of the object in pixels */
    height;

    /**
     * Loads an image from the specified path.
     * @param {string} path - The path to the image file
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images from the specified array of paths and stores them in the image cache.
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
     * Loads multiple chicken images from the specified array of paths and stores them in the chicken image cache.
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
     * Draws the object on the given canvas context at its current position and size.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}