/** * Level 1 configuration including enemies, clouds, background objects, and collectibles.
 * Creates the first level of the game with a balanced set of challenges.
 * @type {Level}
 */
const level1 = new Level(
    /** 
     * Array of enemy objects for level 1.
     * @type {MovableObject[]} 
     */
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new SmallChicken(),
        new SmallChicken(),
        new Endboss()
    ],
    /** 
     * Array of cloud objects for atmospheric effect.
     * @type {Cloud[]} 
     */
    [
        new Cloud(),
        new Cloud(),
        new Cloud()
    ],
    /** 
     * Array of background objects creating the layered parallax background.
     * Includes multiple layers (air, third, second, first) repeated across the level width.
     * @type {BackgroundObject[]} 
     */
    [
        // First background section (x: 0)
        new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/air.png', 0),
        new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/1_first_layer/1.png', 0),

        // Second background section (x: 720)
        new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/air.png', 720),
        new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/3_third_layer/2.png', 720),
        new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/2_second_layer/2.png', 720),
        new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/1_first_layer/2.png', 720),

        // Third background section (x: 1440)
        new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/air.png', 1440),
        new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/3_third_layer/1.png', 1440),
        new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/2_second_layer/1.png', 1440),
        new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/1_first_layer/1.png', 1440),

        // Fourth background section (x: 2160)
        new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/air.png', 2160),
        new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/3_third_layer/2.png', 2160),
        new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/2_second_layer/2.png', 2160),
        new BackgroundObject('assets/img_pollo_locco/img/5_background/layers/1_first_layer/2.png', 2160),
    ],
    /** 
     * Array of collectible objects (coins and bottles) for level 1.
     * @type {Collectibles[]} 
     */
    [
        new Coin(400, 200),
        new Coin(600, 150),
        new Coin(1000, 180),
        new Coin(1300, 220),
        new SalsaBottle(500, 335),
        new SalsaBottle(800, 335),
        new SalsaBottle(1200, 335),
        new SalsaBottle(1600, 335)
    ]
);