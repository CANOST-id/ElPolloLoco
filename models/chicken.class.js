class Chicken extends MovableObject {
    speed = 0.25;
    energy = 20;

    chicken_walk_images = [
        'assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    small_chicken_walk_images = [
        'assets/img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'assets/img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'assets/img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('assets/img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');
        this.loadImages(this.chicken_walk_images);
        this.y = 340;
        this.x = 600 + Math.random() * 1000;
        this.height = 80;
        this.width = 80;
        this.speed = 0.25 + Math.random() * 0.6;
        this.energy = 20;
        this.gameStarted = false;
        this.animateChicken();
    }

    animateChicken() {
        this.moveLeft();
        this.walkInterval = setInterval(() => {
            if (this.gameStarted && !this.isDead()) {
                this.playAnimation(this.chicken_walk_images);
            }
        }, 1000 / 10);
    }
    startMovement() {
        this.gameStarted = true;
    }

    hit(damage = 20) {
        this.energy -= damage;
        if (this.energy <= 0) {
            this.energy = 0;
            this.speed = 0;
            this.chickenDeathAnimation();
        }
    }

    isDead() {
        return this.energy <= 0;
    }

    getHitboxMargins() {
        return { 
            top: 10,
            bottom: 0,   
            left: 18,    
            right: 18    
        };
    }
}

class SmallChicken extends Chicken {
    constructor() {
        super();
        this.loadImage('assets/img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png');
        this.loadImages(this.small_chicken_walk_images);
        this.y = 365;
        this.height = 55;
        this.width = 55;
    }

    animateChicken() {
        this.moveLeft();
        this.walkInterval = setInterval(() => {
            if (this.gameStarted && !this.isDead()) {
                this.playAnimation(this.small_chicken_walk_images);
            }
        }, 1000 / 10);
    }

    chickenDeathAnimation() {
        clearInterval(this.animateChicken);
        this.loadImage('assets/img_pollo_locco/img/3_enemies_chicken/chicken_small/2_dead/dead.png');
    }

    getHitboxMargins() {
        return { 
            top: 8,
            bottom: 0,   
            left: 12,    
            right: 12    
        };
    }
}