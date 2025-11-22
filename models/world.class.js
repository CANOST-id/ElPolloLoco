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
    throwableObjects = [];
    bottleThrown = false;
    gameRunning = true;
    gameInterval;

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx = canvas.getContext('2d');
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        this.gameInterval = setInterval(() => {
            if (!this.gameRunning) return;
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkGameEnd();
        }, 1000 / 25);
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
            clearInterval(enemy.animateChicken);
            enemy.speed = 0;
            enemy.speedY = 0;
        }
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
        if (this.keyboard.D && !this.bottleThrown) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 80);
            this.throwableObjects.push(bottle);
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

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.drawStatusBars();
        requestAnimationFrame(() => this.draw());
    }

    drawStatusBars() {
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarCoins);
        this.drawBossHealthBar();
    }

    drawBossHealthBar() {
        let endbossX = 1600;
        let endbossY = 50;
        this.statusBarBossHealth.setPosition(
            endbossX + this.camera_x + 150,
            endbossY - 20
        );
        this.addToMap(this.statusBarBossHealth);
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
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
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
}