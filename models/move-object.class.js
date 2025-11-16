class MovableObject {
    x = 120;
    y = 250;
    height = 150;
    width = 80;
    img;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
    }

    moveLeft() {
    }
}