// sound-effects.js
class SoundManager {
    constructor() {
        // Create audio context
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Pre-load different sound effects
        this.sounds = {
            click: this.createSound(440, 0.1),  // A4 note, short duration
            ripple: this.createSound(523.25, 0.2),  // C5 note, medium duration
            splash: this.createSound(587.33, 0.3)  // D5 note, longer duration
        };
    }

    // Create a sound with specific frequency and duration
    createSound(frequency, duration) {
        return {
            play: (x, y) => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                // Set up oscillator
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
                
                // Add some variation based on click position
                const panNode = this.audioContext.createStereoPanner();
                const xPos = (x / window.innerWidth) * 2 - 1; // Convert to -1 to 1 range
                panNode.pan.setValueAtTime(xPos, this.audioContext.currentTime);
                
                // Connect nodes
                oscillator.connect(panNode);
                panNode.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                // Play sound
                oscillator.start();
                
                // Fade out
                gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
                
                // Stop after duration
                oscillator.stop(this.audioContext.currentTime + duration);
            }
        };
    }

    // Play sound based on click type and position
    playSound(type, x, y) {
        if (this.sounds[type]) {
            this.sounds[type].play(x, y);
        }
    }
}