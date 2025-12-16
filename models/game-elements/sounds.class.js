/**  * Sounds class to manage game audio elements.
 */
class Sounds {
    /** @type {Object} Object storing original volume levels for each sound */
    originalVolumes = {};
    /** @type {Audio} Background chicken sound */
    chickenBackgroundSound;
    /** @type {Audio} Sound when endboss gets hurt */
    endbossHurtSound;
    /** @type {Audio} Sound when character dies */
    deadCharacterSound;
    /** @type {Audio} Main game background sound */
    gameSound;
    /** @type {Audio} Sound when character gets hurt */
    hurtSound;
    /** @type {Audio} Sound during idle state */
    idleSound;
    /** @type {Audio} Sound when character jumps */
    jumpSound;
    /** @type {Audio} Sound when game is over */
    gameOverSound;
    /** @type {Audio} Sound when character is running */
    runingSound;
    /** @type {Audio} Sound when player wins */
    winSound;
    /** @type {Audio} Sound when character is snoring */
    snoringSound;
    /** @type {Audio} Sound when collecting bottles */
    bottleCollectSound;
    /** @type {Audio} Sound when bottles splash/break */
    bottleSplashSound;
    /** @type {Audio} Sound when collecting coins */
    coinCollectSound;
    /** @type {Audio} Sound when chickens die */
    chickenDeadSound;

    /**
     * Creates a Sounds instance, loads all sounds, sets up their settings, and loads mute state.
     */
    constructor() {
        this.originalVolumes = {};
        this.loadAllSounds();
        this.setupSoundSettings();
        this.loadMuteState();
    }

    /**
     * Loads all sound files into Audio objects.
     */
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
        this.bottleCollectSound = new Audio('assets/sounds/bottle-collect.mp3');
        this.bottleSplashSound = new Audio('assets/sounds/bottle-splash.mp3');
        this.coinCollectSound = new Audio('assets/sounds/coin-collect.mp3');
        this.chickenDeadSound = new Audio('assets/sounds/chicken-dead.mp3');
    }

    /** 
     * Sets up sound settings including volume levels and looping behavior.
     */
    setupSoundSettings() {
        this.setupOriginalVolumes();
        this.soundState();
        this.gameSound.loop = true;
        this.chickenBackgroundSound.loop = true;
        this.runingSound.loop = true;
        this.snoringSound.loop = true;
        this.bottleSplashSound.loop = false;
        this.bottleCollectSound.loop = false;
        this.coinCollectSound.loop = false;
        this.chickenDeadSound.loop = false;
    }

    /** 
     * Initializes the original volume levels for each sound.
     */
    setupOriginalVolumes() {
        this.originalVolumes = {
            gameSound: 0.1,
            jumpSound: 0.5,
            hurtSound: 0.6,
            deadCharacterSound: 0.7,
            chickenBackgroundSound: 0.1,
            idleSound: 0.2,
            runingSound: 0.2,
            gameOverSound: 0.3,
            winSound: 0.4,
            snoringSound: 0.3,
            endbossHurtSound: 0.5,
            bottleCollectSound: 0.2,
            bottleSplashSound: 0.2,
            coinCollectSound: 0.2,
            chickenDeadSound: 0.2
        };
    }

    /** 
     * Plays the specified sound, applying mute settings if necessary.
     * @param {Audio} sound - The sound to be played
     */
    playSound(sound) {
        if (sound) {
            this.checkAndApplyMute();
            sound.currentTime = 0;
            sound.play();
        }
    }

    /**
     * Checks the mute state from local storage and applies it to all sounds.
     */
    checkAndApplyMute() {
        let isMuted = localStorage.getItem('gameIsMuted') === 'true';
        if (isMuted) {
            this.muteState();
        } else {
            this.soundState();
        }
    }

    /** 
     * Starts the background music when game starts.
     */
    startBackgroundMusic() {
        this.playSound(this.gameSound);
        this.playSound(this.chickenBackgroundSound);
    }

    /**  * Stops all sounds in the game.
     */
    stopAllSounds() {
        Object.values(this).forEach(sound => {
            if (sound instanceof Audio) {
                sound.pause();
                sound.currentTime = sound.duration;
            }
        });
    }

    /** 
     * Sets the global mute state and updates local storage.
     * @param {boolean} isMuted - Indicates whether to mute or unmute the sounds
     */
    setGlobalMute(isMuted) {
        localStorage.setItem('gameIsMuted', isMuted.toString());

        if (isMuted) {
            this.muteState();
        } else {
            this.soundState();
        }
    }

    /** 
     * Stops all sounds except the main game sound.
     */
    stopAllExceptGameSound() {
        this.chickenBackgroundSound.pause();
        this.endbossHurtSound.pause();
        this.deadCharacterSound.pause();
        this.hurtSound.pause();
        this.idleSound.pause();
        this.jumpSound.pause();
        this.runingSound.pause();
        this.snoringSound.pause();
    }

    /**  * Sets all sound volumes to zero (mute state).
     */
    muteState() {
        this.charactermMuteState();
        this.chickenMuteState();
        this.collectablesMuteState();
        this.gameMuteState();
    }

    /**
     * Mutes all game-related sounds (background music, game over, win, start).
     */
    gameMuteState() {
        this.gameSound.volume = 0;
        this.chickenBackgroundSound.volume = 0;
        this.gameOverSound.volume = 0;
        this.winSound.volume = 0;
    }

    /**
     * Mutes all character-related sounds (jump, hurt, death, idle, running, snoring).
     */
    charactermMuteState() {
        this.jumpSound.volume = 0;
        this.hurtSound.volume = 0;
        this.deadCharacterSound.volume = 0;
        this.idleSound.volume = 0;
        this.runingSound.volume = 0;
        this.snoringSound.volume = 0;

    }

    /**
     * Mutes all chicken-related sounds (endboss hurt, chicken death).
     */
    chickenMuteState() {
        this.endbossHurtSound.volume = 0;
        this.chickenDeadSound.volume = 0;
    }

    /**
     * Mutes all collectible-related sounds (bottle collect, coin collect, bottle splash).
     */
    collectablesMuteState() {
        this.bottleCollectSound.volume = 0;
        this.coinCollectSound.volume = 0;
        this.bottleSplashSound.volume = 0;
    }

    /** 
     * Restores all sound volumes to their original levels (unmute state).
     */
    soundState() {
        this.characterSoundState();
        this.chickenSoundState();
        this.collectablesSoundState();
        this.gameSoundState();
    }

    /**
     * Restores game-related sounds to their original volume levels.
     */
    gameSoundState() {
        this.gameSound.volume = this.originalVolumes.gameSound;
        this.chickenBackgroundSound.volume = this.originalVolumes.chickenBackgroundSound;
        this.gameOverSound.volume = this.originalVolumes.gameOverSound;
        this.winSound.volume = this.originalVolumes.winSound;
    }

    /**
     * Restores character-related sounds to their original volume levels.
     */
    characterSoundState() {
        this.jumpSound.volume = this.originalVolumes.jumpSound;
        this.hurtSound.volume = this.originalVolumes.hurtSound;
        this.deadCharacterSound.volume = this.originalVolumes.deadCharacterSound;
        this.idleSound.volume = this.originalVolumes.idleSound;
        this.runingSound.volume = this.originalVolumes.runingSound;
        this.snoringSound.volume = this.originalVolumes.snoringSound;
    }

    /**
     * Restores chicken-related sounds to their original volume levels.
     */
    chickenSoundState() {
        this.chickenDeadSound.volume = this.originalVolumes.chickenDeadSound;
        this.endbossHurtSound.volume = this.originalVolumes.endbossHurtSound;
    }

    /**
     * Restores collectible-related sounds to their original volume levels.
     */
    collectablesSoundState() {
        this.bottleCollectSound.volume = this.originalVolumes.bottleCollectSound;
        this.coinCollectSound.volume = this.originalVolumes.coinCollectSound;
        this.bottleSplashSound.volume = this.originalVolumes.bottleSplashSound;
    }

    /**
     * Loads the mute state from local storage and applies it to the sounds.
     */
    loadMuteState() {
        const savedState = localStorage.getItem('gameIsMuted');
        if (savedState === 'true') {
            this.setGlobalMute(true);
        }
    }

    /** 
     * Toggles the mute state and updates local storage.
     * @returns {boolean} The new mute state (true if now muted, false if now unmuted)
     */
    toggleMute() {
        const currentlyMuted = localStorage.getItem('gameIsMuted') === 'true';
        this.setGlobalMute(!currentlyMuted);
        return !currentlyMuted;
    }
}