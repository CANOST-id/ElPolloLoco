class MovableObject {
    x = 120;
    y = 250;
    height = 150;
    width = 80;
    speed = 0.5;
    img;
    imageCache = [];
    imageChickenCache = [];
    otherDirection = false;

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

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
            if (this.x < -720) {
                this.x = 600;
            }
        }, 1000 / 60);
    }

    playAnimation(images) {
        let i = this.currentImageIndex % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImageIndex++;
    }
}