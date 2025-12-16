/**
 * CollisionManager handles all collision detection logic for the game world.
 * Manages character-enemy collisions, collectible pickups, and projectile impacts.
 */
class CollisionManager {

    /** * Creates a new CollisionManager instance.
     * @param {World} world - Reference to the game world
     */
    constructor(world) {
        this.world = world;
    }

    /** * Checks all collision types in the game.
     */
    checkAllCollisions() {
        this.checkCharacterEnemyCollisions();
        this.checkCollectibleCollisions();
        this.checkBottleEnemyCollisions();
    }

    /** * Checks collisions between the character and all enemies.
     */
    checkCharacterEnemyCollisions() {
        if (this.world.character.isDead()) return;

        this.world.level.enemies.forEach(enemy => {
            if (enemy.isDead() || !this.world.character.isColliding(enemy)) return;

            if (this.isCharacterJumpingOnEnemy(enemy)) {
                this.handleJumpAttack(enemy);
            } else {
                this.handleNormalCollision(enemy);
            }
        });
    }

    /** * Determines if the character is jumping on an enemy for a jump attack.
     * @param {MovableObject} enemy - The enemy object to check against
     * @returns {boolean} True if character is performing a jump attack
     */
    isCharacterJumpingOnEnemy(enemy) {
        let charMargins = this.world.character.getHitboxMargins();
        let enemyMargins = enemy.getHitboxMargins();
        let characterBottom = this.world.character.y + this.world.character.height - charMargins.bottom;
        let enemyTop = enemy.y + enemyMargins.top;
        return characterBottom + this.world.character.speedY < enemyTop;
    }

    /** * Handles jump attack mechanics when character lands on enemy.
     * @param {MovableObject} enemy - The enemy being attacked
     */
    handleJumpAttack(enemy) {
        enemy.hit(20);
        this.world.character.speedY = -15;
    }

    /** * Handles normal collision between character and enemy.
     * @param {MovableObject} enemy - The enemy colliding with the character
     */
    handleNormalCollision(enemy) {
        if (enemy instanceof Endboss) {
            this.applyBounceBack(this.world.character, enemy);
            enemy.performAttack();
            this.world.character.hitBoss();
        } else {
            this.world.character.hit();
        }
        this.world.statusBarHealth.setPercentage(this.world.character.energy);
    }

    /** * Applies bounce-back physics between character and endboss.
     * @param {Character} character - The character object
     * @param {Endboss} endboss - The endboss object
     */
    applyBounceBack(character, endboss) {
        let characterCenter = character.x + (character.width / 2);
        let endbossCenter = endboss.x + (endboss.width / 2);

        if (characterCenter < endbossCenter) {
            endboss.x += 100;
        }
        endboss.x = Math.max(100, Math.min(endboss.x, this.world.level.level_end_x - endboss.width));
    }

    /** * Checks collisions with all collectible items.
     */
    checkCollectibleCollisions() {
        this.checkCoinCollisions();
        this.checkBottleCollisions();
    }

    /** * Handles collision detection and collection of coins.
     */
    checkCoinCollisions() {
        this.world.coins.forEach((coin, index) => {
            if (this.world.character.isColliding(coin)) {
                this.world.coins.splice(index, 1);
                this.world.collectedCoins += 1;
                this.world.statusBarCoins.setPercentage((this.world.collectedCoins / 8) * 100);
            }
        });
    }

    /** * Handles collision detection and collection of bottles.
     */
    checkBottleCollisions() {
        this.world.bottles.forEach((bottle, index) => {
            if (this.world.character.isColliding(bottle)) {
                this.world.bottles.splice(index, 1);
                this.world.collectedBottles++;
                this.world.statusBarBottles.setBottles(this.world.collectedBottles);
            }
        });
    }

    /** * Handles collision detection between thrown bottles and enemies.
     */
    checkBottleEnemyCollisions() {
        this.world.throwableObjects.forEach((bottle, bottleIndex) => {
            this.world.level.enemies.forEach(enemy => {
                if (!enemy.isDead() && bottle.isColliding(enemy)) {
                    bottle.hitEnemy(enemy);
                    if (enemy instanceof Endboss) {
                        this.world.statusBarBossHealth.setPercentage(enemy.energy);
                        this.world.sound.playSound(this.world.sound.endbossHurtSound);
                    }
                }
            });
            this.world.spliceBottle(bottle, bottleIndex);
        });
    }
}