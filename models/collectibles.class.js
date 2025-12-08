class Collectibles extends MovableObject {
    constructor(x, y, imagePath) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
    }
}

class Coin extends Collectibles {
    IMAGES = [
        'assets/img_pollo_locco/img/8_coin/coin_1.png',
        'assets/img_pollo_locco/img/8_coin/coin_2.png'
    ];
    
    constructor(x, y) {
        super(x, y, 'assets/img_pollo_locco/img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.animate();
        this.originalY = y;
        this.floatOffset = 0;
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
            this.floatAnimation();
        }, 200);
    }

    floatAnimation() {
        this.floatOffset += 0.1;
        this.y = this.originalY + Math.sin(this.floatOffset) * 15;
    }
}

class SalsaBottle extends Collectibles {
    constructor(x, y) {
        super(x, y, 'assets/img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.y = 335;
    }
}