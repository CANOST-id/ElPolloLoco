class StatusBar extends DrawableObject {
    images_health = [
        'assets/img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'assets/img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'assets/img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'assets/img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'assets/img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'assets/img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];
    images_coins = [
        'assets/img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'assets/img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'assets/img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'assets/img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'assets/img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'assets/img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];
    images_bottles = [
        'assets/img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'assets/img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'assets/img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'assets/img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'assets/img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'assets/img_pollo_locco/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    percentage = 100;
    bottles = 0;
    coins = 0;
    x;
    y;
    width = 200;
    height = 60;

    
    constructor() {
        super();
        this.loadImages(this.images_health);
        this.loadImages(this.images_coins);
        this.loadImages(this.images_bottles);
        this.setPercentage(this.percentage);
        this.x = 1;
        this.y = -15;
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        this.path = this.images_health[this.resolveImageIndex()];
        this.img = this.imageCache[this.path];
    }



    resolveImageIndex() {
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}