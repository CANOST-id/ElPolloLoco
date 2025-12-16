/** * Level class representing a game level with its elements.
 * Contains all game objects like enemies, clouds, background elements, and collectibles.
 */
class Level {
    enemies = [];
    clouds = [];
    backgroundObjects = [];
    coins = [];
    bottles = [];
    level_end_x = 2100;

    /** * Creates a level with specified game elements.
     * @param {Array<MovableObject>} enemies - Array of enemy objects in the level
     * @param {Array<Cloud>} clouds - Array of cloud objects in the level
     * @param {Array<BackgroundObject>} backgroundObjects - Array of background object elements in the level
     * @param {Array<Coin>} coins - Array of coin objects in the level (optional)
     * @param {Array<Bottle>} bottles - Array of bottle objects in the level (optional)
     */
    constructor(enemies, clouds, backgroundObjects, coins = [], bottles = []) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}