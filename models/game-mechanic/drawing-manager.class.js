/**
 * DrawingManager handles all rendering operations for the game world.
 * Manages canvas drawing, object rendering, and visual effects.
 */
class DrawingManager {
    world;
    ctx;

    /**
     * Creates a new DrawingManager instance.
     * @param {World} world - Reference to the game world
     */
    constructor(world) {
        this.world = world;
        this.ctx = world.ctx;
    }

    /**
     * Main drawing function that renders all game elements using requestAnimationFrame.
     */
    draw() {
        this.drawBackground();
        this.drawStatusBars();
        this.drawMovingElements();
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Renders the background elements (background objects and clouds) with camera translation.
     */
    drawBackground() {
        this.ctx.clearRect(0, 0, this.world.canvas.width, this.world.canvas.height);
        this.ctx.translate(this.world.camera_x, 0);
        this.addObjectsToMap(this.world.level.backgroundObjects);
        this.addObjectsToMap(this.world.level.clouds);
        this.ctx.translate(-this.world.camera_x, 0);
    }

    /**
     * Renders all moving game elements (character, enemies, objects) with camera translation.
     */
    drawMovingElements() {
        this.ctx.translate(this.world.camera_x, 0);
        this.addToMap(this.world.character);
        this.addObjectsToMap(this.world.level.enemies);
        this.addObjectsToMap(this.world.throwableObjects);
        this.addObjectsToMap(this.world.coins);
        this.addObjectsToMap(this.world.bottles);
        this.ctx.translate(-this.world.camera_x, 0);
    }

    /**
     * Renders all UI status bars (health, bottles, coins, boss health).
     */
    drawStatusBars() {
        this.addToMap(this.world.statusBarHealth);
        this.addToMap(this.world.statusBarBottles);
        this.addToMap(this.world.statusBarCoins);
        this.drawBossHealthBar();
    }

    /**
     * Renders the boss health bar when the endboss is active and damaged.
     */
    drawBossHealthBar() {
        let endboss = this.world.level.enemies.find(enemy => enemy instanceof Endboss);
        if (endboss && endboss.energy < 100) {
            this.world.statusBarBossHealth.setPosition(
                endboss.x + this.world.camera_x + 150,
                endboss.y - 20
            );
            this.addToMap(this.world.statusBarBossHealth);
        }
    }

    /**
     * Draws an array of objects to the canvas.
     * @param {MovableObject[]} objects - Array of objects to render
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Draws a single movable object to the canvas with proper image flipping if needed.
     * @param {MovableObject} mo - The movable object to render
     */
    addToMap(mo) {
        if (!mo.img || !mo.img.complete || mo.img.naturalWidth === 0) {
            return;
        }
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips an image horizontally for rendering (e.g., character facing left).
     * @param {MovableObject} mo - The moveable object to flip
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the image to its original orientation after flipping.
     * @param {MovableObject} mo - The moveable object to restore
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Draws hitboxes for all game objects for debugging purposes.
     */
    drawHitboxes() {
        this.ctx.strokeStyle = 'red';
        this.ctx.lineWidth = 2;
        this.createCharacterHitbox();
        this.createEnemyHitboxes();
    }

    /**
     * Creates and draws the hitbox for the main character.
     */
    createCharacterHitbox() {
        let charMargins = this.world.character.getHitboxMargins();
        this.ctx.strokeRect(
            this.world.character.x + charMargins.left,
            this.world.character.y + charMargins.top,
            this.world.character.width - charMargins.left - charMargins.right,
            this.world.character.height - charMargins.top - charMargins.bottom
        );
    }

    /**
     * Creates and draws hitboxes for all enemies in the level.
     */
    createEnemyHitboxes() {
        this.world.level.enemies.forEach(enemy => {
            let enemyMargins = enemy.getHitboxMargins();
            this.ctx.strokeRect(
                enemy.x + enemyMargins.left,
                enemy.y + enemyMargins.top,
                enemy.width - enemyMargins.left - enemyMargins.right,
                enemy.height - enemyMargins.top - enemyMargins.bottom
            );
        });
    }
}