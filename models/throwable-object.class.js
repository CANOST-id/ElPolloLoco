class ThrowableObject extends MovableObject {
    speedY = 0;
    speedX = 0;
    hasCollided = false;

    images_splash = [
        'assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    images_rotation = [
        'assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img_pollo_locco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    constructor(x, y) {
        super();
        this.loadImage('assets/img_pollo_locco/img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.images_rotation);
        this.loadImages(this.images_splash);
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 100;
        this.energy = 20;
        this.throw();
        this.animate();
    }

    throw() {
        this.speedY = 20;
        this.speedX = 5;
        this.applyGravity();
        setInterval(() => {
            if (!this.hasCollided) {
                this.x += this.speedX;
            }
            if (this.y > 340) {
                this.hitGround();
            }
        }, 25);
    }

    animate() {
        this.rotationInterval = setInterval(() => {
            if (!this.hasCollided) {
                this.playAnimation(this.images_rotation);
            }
        }, 100);
    }

    hitGround() {
        this.hasCollided = true;
        this.speedX = 0;
        this.speedY = 0;
        clearInterval(this.rotationInterval);
        this.playSplashAnimation();
    }

    hitEnemy(enemy) {
        if (this.hasCollided) return;
        this.hasCollided = true;
        this.speedX = 0;
        this.speedY = 0;
        if (enemy instanceof Endboss) {
            enemy.hit(20);
        } else {
            enemy.hit(20);
        }
        clearInterval(this.rotationInterval);
        this.playSplashAnimation();
    }

    playSplashAnimation() {
        let splashIndex = 0;
        this.splashInterval = setInterval(() => {
            if (splashIndex < this.images_splash.length) {
                let path = this.images_splash[splashIndex];
                this.img = this.imageCache[path];
                splashIndex++;
            } else {
                this.energy = 0;
                clearInterval(this.splashInterval);
                this.removeBottle = true;
            }
        }, 100);
    }

    isColliding(enemy) {
        if (this.isDead() || enemy.isDead()) {
            return false;
        }
        let thisMargins = this.getHitboxMargins();
        let otherMargins = enemy.getHitboxMargins();
        
        return this.x + thisMargins.left < enemy.x + enemy.width - otherMargins.right &&
            this.x + this.width - thisMargins.right > enemy.x + otherMargins.left &&
            this.y + thisMargins.top < enemy.y + enemy.height - otherMargins.bottom &&
            this.y + this.height - thisMargins.bottom > enemy.y + otherMargins.top;
    }

    getHitboxMargins() {
        return {
            top: 5,
            bottom: 5,
            left: 5,
            right: 5
        };
    }
}