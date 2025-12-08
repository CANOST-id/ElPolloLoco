class Sounds {
    constructor() {
        this.loadAllSounds();
        this.setupSoundSettings();
    }

    loadAllSounds() {
        this.chickenBackgroundSound = new Audio('assets/sounds/chicken-background-sound.mp3');
        this.endbossHurtSound = new Audio('assets/sounds/chicken-hurt-sound.mp3');
        this.deadCharacterSound = new Audio('assets/sounds/dead-sound.mp3');
        this.gameSound = new Audio('assets/sounds/game-sound.mp3');
        this.hurtSound = new Audio('assets/sounds/hurt-sound.mp3');
        this.idleSound = new Audio('assets/sounds/idle-sound.mp3');
        this.jumpSound = new Audio('assets/sounds/jump-sound.mp3');
        this.gameOverSound = new Audio('assets/sounds/lose-sound.mp3');
        this.runingSound = new Audio('assets/sounds/runing-sound.mp3');
        this.winSound = new Audio('assets/sounds/win-sound.mp3');
        this.snoringSound = new Audio('assets/sounds/snoring-sound.mp3');
        this.startSound = new Audio('assets/sounds/start-sound.mp3');
    }

    setupSoundSettings() {
        this.gameSound.loop = true;
        this.gameSound.volume = 0.1;
        this.jumpSound.volume = 0.5;
        this.hurtSound.volume = 0.6;
        this.deadCharacterSound.volume = 0.7;
        this.chickenBackgroundSound.loop = true;
        this.chickenBackgroundSound.volume = 0.2;
        this.idleSound.volume = 0.2;
        this.runingSound.loop = true;
        this.runingSound.volume = 0.2;
        this.gameOverSound.volume = 0.5;
        this.winSound.volume = 0.5;
        this.startSound.loop = true;
        this.startSound.volume = 0.4;
        this.snoringSound.loop = true;
        this.snoringSound.volume = 0.3;
    }

    playSound(sound) {
        if (sound) {
            sound.currentTime = 0;
            sound.play();
        }
    }

    startBackgroundMusic() {
        this.playSound(this.gameSound);
    }

    startStartSound() {
        this.playSound(this.startSound);
    }

    stopStartSound() {
        this.startSound.pause();
        this.startSound.currentTime = 0;
    }

    stopAllSounds() {
        Object.values(this).forEach(sound => {
            if (sound instanceof Audio) {
                sound.pause();
                sound.currentTime = sound.duration;
            }
        });
    }
}