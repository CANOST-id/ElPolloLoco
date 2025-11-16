class BackgroundObject extends MovableObject {

    constructor(imagePath) {
        super().loadImage(imagePath);
        this.y = 0;
        this.x = 0;
        this.width = 720;
        this.height = 480;
    }
}