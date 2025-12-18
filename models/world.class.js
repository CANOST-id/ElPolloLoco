/**
 * World class that manages the game world, including characters, enemies, objects, and game logic.
 * Handles rendering, collision detection, game state, and audio management.
 */
class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new HealthBar();
    statusBarBottles = new BottleBar();
    statusBarCoins = new CoinBar();
    statusBarBossHealth = new BossHealthBar();
    coins = [];
    bottles = [];
    throwableObjects = [];
    bottleThrown = false;
    gameRunning = true;
    gameInterval;
    buttons;
    collectedCoins = 0;
    collectedBottles = 0;
    sound = new Sounds();
    collisionManager;
    drawingManager;

    /**
     * Creates a new World instance and initializes the game.
     * @param {HTMLCanvasElement} canvas - The canvas element for rendering
     * @param {Keyboard} keyboard - The keyboard input handler
     * @param {Buttons} [existingButtons=null] - Optional existing button instance
     */
    constructor(canvas, keyboard, existingButtons = null) {
        this.initializeCanvas(canvas, keyboard, existingButtons);
        this.initializeGame();
    }

    /**
     * Initializes canvas, keyboard and button references.
     * @param {HTMLCanvasElement} canvas - The canvas element for rendering
     * @param {Keyboard} keyboard - The keyboard input handler
     * @param {Buttons} [existingButtons=null] - Optional existing button instance
     */
    initializeCanvas(canvas, keyboard, existingButtons = null) {
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx = canvas.getContext('2d');
        this.buttons = existingButtons;
    }

    /**
     * Initializes game components and starts the game loop.
     */
    initializeGame() {
        this.drawingManager = new DrawingManager(this);
        this.drawingManager.draw();
        this.setWorld();
        this.run();
        this.startEnemyMovement();
        this.createCoins();
        this.createBottles();
        this.collisionManager = new CollisionManager(this);
    }

    /**
     * Sets world reference for character and enemies to enable cross-object communication.
     */
    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => {
            enemy.world = this;
        });
    }

    /**
     * Starts the main game loop with collision detection, object handling, and game state checks.
     * Runs at 25 FPS.
     */
    run() {
        this.collisionInterval = setInterval(() => {
            if (!this.gameEnded) {
                this.collisionManager.checkAllCollisions();
            }
        }, 1000 / 60);
        this.gameInterval = setInterval(() => {
            if (!this.gameRunning) return;
            this.checkThrowObjects();
            this.checkGameEnd();
        }, 1000 / 25);
    }

    /**
     * Creates and initializes coin collectibles at random positions across the level.
     * Distributes coins evenly across the level width with random position variations.
     */
    createCoins() {
        const startX = 200;
        const endX = 1200;
        let spacing = (endX - startX) / 7;
        for (let i = 0; i < 8; i++) {
            let x = startX + (i * spacing) + (Math.random() * 100 - 50);
            let y = 100 + Math.random() * 120;
            this.coins.push(new Coin(x, y));
        }
    }

    /**
     * Creates and initializes bottle collectibles at random positions across the level.
     * Distributes bottles evenly across the level width with random position variations.
     */
    createBottles() {
        const startX = 250;
        const endX = 1150;
        let spacing = (endX - startX) / 6;
        for (let i = 0; i < 7; i++) {
            let x = startX + (i * spacing) + (Math.random() * 60 - 30);
            this.bottles.push(new SalsaBottle(x, 315));
        }
    }

    /**
     * Starts movement for all enemies in the level that have a startMovement method.
     */
    startEnemyMovement() {
        this.level.enemies.forEach(enemy => {
            if (enemy.startMovement) {
                enemy.startMovement();
            }
        });
    }

    /**
     * Checks win/loss conditions and triggers game end if conditions are met.
     */
    checkGameEnd() {
        if (this.character.isDead()) {
            this.endGame(false);
            return;
        }
        let endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        if (endboss && endboss.isDead()) {
            this.endGame(true);
            return;
        }
    }

    /**
     * Ends the game with win/loss state and shows appropriate screen and sounds.
     * @param {boolean} isWin - Whether the game was won (true) or lost (false)
     */
    endGame(isWin) {
        this.gameRunning = false;
        clearInterval(this.gameInterval);
        this.stopAllCharacterSounds();
        if (isWin) {
            this.sound.playSound(this.sound.winSound);
        } else {
            this.sound.playSound(this.sound.gameOverSound);
        }
        setTimeout(() => {
            this.stopAllAnimations();
            new Endscreen(this.canvas, isWin);
        }, 1000);
    }

    /**
     * Stops all character-related sound effects (walking, jumping, hurt sounds).
     */
    stopAllCharacterSounds() {
        this.sound.chickenBackgroundSound.pause();
        this.sound.chickenBackgroundSound.currentTime = 0;
        this.sound.runingSound.pause();
        this.sound.runingSound.currentTime = 0;
        this.sound.idleSound.pause();
        this.sound.idleSound.currentTime = 0;
        this.sound.snoringSound.pause();
        this.sound.snoringSound.currentTime = 0;
    }

    /**
     * Handles bottle throwing mechanics and input detection.
     */
    checkThrowObjects() {
        this.handleBottleThrow();
        this.resetBottleThrown();
        this.bottleEnemyCollision();
    }

    /**
     * Creates and throws a new bottle if conditions are met.
     */
    handleBottleThrow() {
        if (this.keyboard.D && !this.bottleThrown && this.collectedBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 80);
            bottle.world = this;
            this.throwableObjects.push(bottle);
            this.collectedBottles -= 1;
            this.statusBarBottles.setBottles(this.collectedBottles);
            this.bottleThrown = true;
        }
    }

    /**
     * Resets bottle throw flag when D key is released.
     */
    resetBottleThrown() {
        if (!this.keyboard.D) {
            this.bottleThrown = false;
        }
    }

    /**
     * Removes a bottle from the game when it's destroyed or expired.
     * @param {ThrowableObject} bottle - The bottle object to check for removal
     * @param {number} bottleIndex - The index of the bottle in the array
     */
    spliceBottle(bottle, bottleIndex) {
        if (bottle.energy <= 0) {
            this.throwableObjects.splice(bottleIndex, 1);
        }
    }

    /**
     * Handles collision detection between thrown bottles and enemies.
     */
    bottleEnemyCollision() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach(enemy => {
                if (!enemy.isDead() && bottle.isColliding(enemy)) {
                    bottle.hitEnemy(enemy);
                    if (enemy instanceof Endboss) {
                        this.statusBarBossHealth.setPercentage(enemy.energy);
                        this.sound.playSound(this.sound.endbossHurtSound);
                    }
                }
            });
            this.spliceBottle(bottle, bottleIndex);
        });
    }

    /**
     * Checks if the character is dead (energy depleted).
     * @returns {boolean} True if character has no energy left
     */
    isDead() {
        return this.character.energy <= 0;
    }

    /**
     * Stops all running animation intervals to prevent memory leaks.
     */
    stopAllAnimations() {
        this.stopCharacterAnimations();
        this.stopEnemyAnimations();
        this.stopBottleAnimations();
    }

    /**
     * Stops all character-related animation intervals and sounds.
     */
    stopCharacterAnimations() {
        clearInterval(this.character.animationInterval);
        clearInterval(this.character.movementInterval);
        this.character.stopIdleSounds();
        this.character.stopRunningSound();
    }

    /**
     * Stops all enemy animation intervals in the level.
     */
    stopEnemyAnimations() {
        this.level.enemies.forEach(enemy => {
            this.stopEnemieAnimations(enemy);
        });
    }

    /**
     * Stops all throwable bottle rotation intervals.
     */
    stopBottleAnimations() {
        this.throwableObjects.forEach(bottle => {
            if (bottle.rotationInterval) {
                clearInterval(bottle.rotationInterval);
            }
        });
    }

    /**
     * Stops all animation intervals for a specific enemy to prevent memory leaks.
     * @param {MovableObject} enemy - The enemy object whose animations to stop
     */
    stopEnemieAnimations(enemy) {
        if (enemy.animationInterval) {
            clearInterval(enemy.animationInterval);
        }
        if (enemy.walkInterval) {
            clearInterval(enemy.walkInterval);
        }
        if (enemy.moveInterval) {
            clearInterval(enemy.moveInterval);
        }
        enemy.gameStarted = false;
        enemy.speed = 0;
        enemy.speedY = 0;
    }
}