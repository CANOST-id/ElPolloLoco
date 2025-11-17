class BackgroundObject extends MovableObject {

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.y = 0;
        this.x = x;
        this.width = 720;
        this.height = 480;
    }
}