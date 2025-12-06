class DrawableObject {
    img;
    imageCache = [];
    imageChickenCache = [];
    currentImageIndex = 0;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    loadChickenImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageChickenCache[path] = img;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}