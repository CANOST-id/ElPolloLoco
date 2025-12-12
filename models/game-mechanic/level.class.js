/** * Level class representing a game level with its elements.
 */
class Level {
    enemies = [];
    clouds = [];
    backgroundObjects = [];
    coins = [];
    bottles = [];
    level_end_x = 2100;

    /** * Creates a level with specified game elements.
     * @param {Array} enemies - Array of enemy objects in the level
     * @param {Array} clouds - Array of cloud objects in the level
     * @param {Array} backgroundObjects - Array of background object elements in the level
     * @param {Array} coins - Array of coin objects in the level
     * @param {Array} bottles - Array of bottle objects in the level
     */
    constructor(enemies, clouds, backgroundObjects, coins = [], bottles = []) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}