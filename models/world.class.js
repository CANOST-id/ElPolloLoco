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

    constructor(canvas, keyboard, existingButtons = null) {
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx = canvas.getContext('2d');
        this.buttons = existingButtons;
        this.draw();
        this.setWorld();
        this.run();
        this.startEnemyMovement();
        this.createCoins();
        this.createBottles();
        this.checkCollisionsCollectibles();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        this.gameInterval = setInterval(() => {
            if (!this.gameRunning) return;
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollisionsCollectibles();
            this.checkGameEnd();
        }, 1000 / 25);
    }

    draw() {
        this.drawBackground();
        this.drawStatusBars();
        this.drawMovingElements();
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

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

    drawBackground() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
    }

    drawMovingElements() {
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.bottles);
        this.ctx.translate(-this.camera_x, 0);
    }

    drawStatusBars() {
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarCoins);
        this.drawBossHealthBar();
    }

    drawBossHealthBar() {
        let endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        if (endboss && endboss.energy < 100) {
            this.statusBarBossHealth.setPosition(
                endboss.x + this.camera_x + 150,
                endboss.y - 20
            );
            this.addToMap(this.statusBarBossHealth);
        }
    }

    drawCollectibles() {
        this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.bottles);
    }

    createCoins() {
        const startX = 200;
        const endX = 1500;
        const spacing = (endX - startX) / 7;

        for (let i = 0; i < 8; i++) {
            let x = startX + (i * spacing) + (Math.random() * 100 - 50);
            let y = 100 + Math.random() * 120;
            this.coins.push(new Coin(x, y));
        }
    }

    createBottles() {
        const startX = 250;
        const endX = 1450;
        const spacing = (endX - startX) / 6;

        for (let i = 0; i < 7; i++) {
            let x = startX + (i * spacing) + (Math.random() * 60 - 30);
            this.bottles.push(new SalsaBottle(x, 315));
        }
    }

    startEnemyMovement() {
        this.level.enemies.forEach(enemy => {
            if (enemy.startMovement) {
                enemy.startMovement();
            }
        });
    }

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

    endGame(isWin) {
        this.gameRunning = false;
        clearInterval(this.gameInterval);
        setTimeout(() => {
            this.stopAllAnimations();
            new Endscreen(this.canvas, isWin);
        }, 2000);
    }

    checkCollisions() {
        if (this.character.isDead()) return;
        this.level.enemies.forEach(enemy => {
            if (!this.character.isColliding(enemy)) return;
            let characterBottom = this.character.y + this.character.height;
            let enemyTop = enemy.y;
            let characterIsAbove = characterBottom + this.character.speedY < enemyTop;
            if (characterIsAbove) {
                enemy.hit(20);
                this.character.speedY = -5;
            } else {
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy);
            }
        });
    }

    checkThrowObjects() {
        if (this.keyboard.D && !this.bottleThrown && this.collectedBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 80);
            this.throwableObjects.push(bottle);
            this.collectedBottles -= 1;
            this.statusBarBottles.setBottles(this.collectedBottles);
            this.bottleThrown = true;
        }
        if (!this.keyboard.D) {
            this.bottleThrown = false;
        }
        this.bottleEnemyCollision();
    }

    bottleEnemyCollision() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach(enemy => {
                if (bottle.isColliding(enemy)) {
                    bottle.hitEnemy(enemy);
                    if (enemy instanceof Endboss) {
                        this.statusBarBossHealth.setPercentage(enemy.energy);
                    }
                }
            });
            if (bottle.energy <= 0) {
                this.throwableObjects.splice(bottleIndex, 1);
            }
        });
    }

    checkCollisionsCollectibles() {
        this.checkCoinCollisions();
        this.checkBottleCollisions();
    }


    checkCoinCollisions() {
        this.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.coins.splice(index, 1);
                this.collectedCoins += 1;
                this.statusBarCoins.setPercentage((this.collectedCoins / 8) * 100);
            }
        });
    }

    checkBottleCollisions() {
        this.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.bottles.splice(index, 1);
                this.collectedBottles++;
                this.statusBarBottles.setBottles(this.collectedBottles);
            }
        });
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    isDead() {
        return this.character.energy <= 0;
    }

    stopAllAnimations() {
        clearInterval(this.character.animationInterval);
        clearInterval(this.character.movementInterval);
        this.level.enemies.forEach(enemy => {
            this.stopEnemieAnimations(enemy);
        });
        this.throwableObjects.forEach(bottle => {
            if (bottle.rotationInterval) {
                clearInterval(bottle.rotationInterval);
            }
        });
    }

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