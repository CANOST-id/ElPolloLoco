class MovableObject {
    x = 120;
    y = 250;
    height = 150;
    width = 80;
    img;

    imageCache = [];
    imageChickenCache = [];

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

    moveRight() {
    }

    moveLeft() {
    }
}