class StatusBar extends DrawableObject {
    percentage = 100;
    width = 200;
    height = 60;

    constructor(images, x, y) {
        super();
        this.images = images;
        this.x = x;
        this.y = y;
        this.loadImages(this.images);
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.images[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage >= 100) return 5;
        if (this.percentage >= 80) return 4;
        if (this.percentage >= 60) return 3;
        if (this.percentage >= 40) return 2;
        if (this.percentage >= 20) return 1;
        return 0;
    }
}

class HealthBar extends StatusBar {
    constructor(x = 60, y = -10) {
        const images = [
            'assets/img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
            'assets/img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
            'assets/img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
            'assets/img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
            'assets/img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
            'assets/img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
        ];
        super(images, x, y);
    }
}

class CoinBar extends StatusBar {
    constructor(x = 30, y = 20) {
        const images = [
            'assets/img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
            'assets/img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
            'assets/img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
            'assets/img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
            'assets/img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
            'assets/img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
        ];
        super(images, x, y);
    }
}

class BottleBar extends StatusBar {
    constructor(x = 10, y = 50) {
        const images = [
            'assets/img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
            'assets/img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
            'assets/img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
            'assets/img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
            'assets/img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
            'assets/img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
        ];
        super(images, x, y);
    }
}

class BossHealthBar extends StatusBar {
    constructor() {
        const images = [
            'assets/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/green/green0.png',
            'assets/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/green/green20.png',
            'assets/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/green/green40.png',
            'assets/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/green/green60.png',
            'assets/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/green/green80.png',
            'assets/img_pollo_locco/img/7_statusbars/2_statusbar_endboss/green/green100.png'
        ];
        super(images, 0, 0);
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
}