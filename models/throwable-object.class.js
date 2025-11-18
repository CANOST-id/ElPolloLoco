class ThrowableObject extends MovableObject {
    speedY = 0;
    speedX = 0;

    constructor(x, y) {
        super();
        this.loadImage('assets/img_pollo_locco/img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 80;
        this.throw();
    }

    throw() {
        this.speedY = 20;
        this.applyGravity();
        
        setInterval(() => {
            this.x += 5;
        }, 25);
    }
}