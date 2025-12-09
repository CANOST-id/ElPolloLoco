class Sounds {
    constructor() {
        this.originalVolumes = {};
        this.loadAllSounds();
        this.setupSoundSettings();
        this.loadMuteState();
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
        this.originalVolumes = {
            gameSound: 0.1,
            jumpSound: 0.5,
            hurtSound: 0.6,
            deadCharacterSound: 0.7,
            chickenBackgroundSound: 0.2,
            idleSound: 0.2,
            runingSound: 0.2,
            gameOverSound: 0.5,
            winSound: 0.5,
            startSound: 0.4,
            snoringSound: 0.3,
            endbossHurtSound: 0.5
        };

        this.gameSound.loop = true;
        this.gameSound.volume = this.originalVolumes.gameSound;
        this.jumpSound.volume = this.originalVolumes.jumpSound;
        this.hurtSound.volume = this.originalVolumes.hurtSound;
        this.deadCharacterSound.volume = this.originalVolumes.deadCharacterSound;
        this.chickenBackgroundSound.loop = true;
        this.chickenBackgroundSound.volume = this.originalVolumes.chickenBackgroundSound;
        this.idleSound.volume = this.originalVolumes.idleSound;
        this.runingSound.loop = true;
        this.runingSound.volume = this.originalVolumes.runingSound;
        this.gameOverSound.volume = this.originalVolumes.gameOverSound;
        this.winSound.volume = this.originalVolumes.winSound;
        this.startSound.loop = true;
        this.startSound.volume = this.originalVolumes.startSound;
        this.snoringSound.loop = true;
        this.snoringSound.volume = this.originalVolumes.snoringSound;
        this.endbossHurtSound.volume = this.originalVolumes.endbossHurtSound;
    }

    playSound(sound) {
        if (sound) {
            this.checkAndApplyMute();
            sound.currentTime = 0;
            sound.play().catch(e => {
                if (!e.message.includes('NotAllowedError')) {
                    console.log('Sound play failed:', e);
                }
            });
        }
    }

    checkAndApplyMute() {
        let isMuted = localStorage.getItem('gameIsMuted') === 'true';
        if (isMuted) {
            this.muteState();
        } else {
            this.soundState();
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

    setGlobalMute(isMuted) {
        localStorage.setItem('gameIsMuted', isMuted.toString());

        if (isMuted) {
            this.muteState();
        } else {
            this.soundState();
        }
    }

    muteState() {
        this.gameSound.volume = 0;
        this.jumpSound.volume = 0;
        this.hurtSound.volume = 0;
        this.deadCharacterSound.volume = 0;
        this.chickenBackgroundSound.volume = 0;
        this.idleSound.volume = 0;
        this.runingSound.volume = 0;
        this.gameOverSound.volume = 0;
        this.winSound.volume = 0;
        this.startSound.volume = 0;
        this.snoringSound.volume = 0;
        this.endbossHurtSound.volume = 0;
    }

    soundState() {
        this.gameSound.volume = this.originalVolumes.gameSound;
        this.jumpSound.volume = this.originalVolumes.jumpSound;
        this.hurtSound.volume = this.originalVolumes.hurtSound;
        this.deadCharacterSound.volume = this.originalVolumes.deadCharacterSound;
        this.chickenBackgroundSound.volume = this.originalVolumes.chickenBackgroundSound;
        this.idleSound.volume = this.originalVolumes.idleSound;
        this.runingSound.volume = this.originalVolumes.runingSound;
        this.gameOverSound.volume = this.originalVolumes.gameOverSound;
        this.winSound.volume = this.originalVolumes.winSound;
        this.startSound.volume = this.originalVolumes.startSound;
        this.snoringSound.volume = this.originalVolumes.snoringSound;
        this.endbossHurtSound.volume = this.originalVolumes.endbossHurtSound;
    }

    loadMuteState() {
        const savedState = localStorage.getItem('gameIsMuted');
        if (savedState === 'true') {
            this.setGlobalMute(true);
        }
    }

    toggleMute() {
        const currentlyMuted = localStorage.getItem('gameIsMuted') === 'true';
        this.setGlobalMute(!currentlyMuted);
        return !currentlyMuted;
    }
}