class Character extends MovableObject {

    constructor() {
        super().loadImage('assets/img_pollo_locco/img/2_character_pepe/2_walk/W-21.png');

        this.height = 250;
        this.width = 100;
        this.y = 175;
        this.x = 100;
    }

    jump() {
    }
}