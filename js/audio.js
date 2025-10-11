// Sistema de efectos de audio para PhysicsLab Pro
class AudioManager {
    constructor() {
        this.audioContext = null;
        this.sounds = {};
        this.enabled = true;
        this.volume = 0.3;
        // No crear AudioContext automáticamente para evitar bloqueo por políticas de autoplay.
        // Se inicializará a la primera interacción del usuario mediante ensureAudioContext().
    }

    // Inicializar contexto de audio
    initAudio() {
        try {
            // Crear contexto de audio solo cuando el usuario interactúe
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.createSounds();
        } catch (error) {
            console.warn('Audio no disponible:', error);
            this.enabled = false;
        }
    }

    // Asegurar que exista un AudioContext y esté en estado 'running'.
    // Debe llamarse desde un handler de gesto del usuario (click, keydown, etc.).
    async ensureAudioContext() {
        if (!this.audioContext) {
            try {
                this.initAudio();
            } catch (e) {
                // ya manejado en initAudio
            }
        }

        if (this.audioContext && this.audioContext.state === 'suspended') {
            try {
                await this.audioContext.resume();
            } catch (e) {
                console.warn('No se pudo reanudar AudioContext:', e);
            }
        }
    }

    // Crear sonidos sintéticos usando Web Audio API
    createSounds() {
        if (!this.audioContext) return;

        // Sonido de cálculo exitoso - acorde futurista
        this.sounds.calculate = () => {
            const oscillator1 = this.audioContext.createOscillator();
            const oscillator2 = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator1.connect(gainNode);
            oscillator2.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator1.frequency.setValueAtTime(440, this.audioContext.currentTime); // A4
            oscillator2.frequency.setValueAtTime(550, this.audioContext.currentTime); // C#5
            
            oscillator1.type = 'sine';
            oscillator2.type = 'triangle';
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(this.volume * 0.3, this.audioContext.currentTime + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.5);
            
            oscillator1.start(this.audioContext.currentTime);
            oscillator2.start(this.audioContext.currentTime);
            oscillator1.stop(this.audioContext.currentTime + 0.5);
            oscillator2.stop(this.audioContext.currentTime + 0.5);
        };

        // Sonido de hover sobre botones - click suave
        this.sounds.hover = () => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(this.volume * 0.1, this.audioContext.currentTime + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.15);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.15);
        };

        // Sonido de error - disonante
        this.sounds.error = () => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(150, this.audioContext.currentTime + 0.3);
            oscillator.type = 'sawtooth';
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(this.volume * 0.2, this.audioContext.currentTime + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.4);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.4);
        };

        // Sonido de guardado - arpeggio ascendente
        this.sounds.save = () => {
            const frequencies = [261.63, 329.63, 392.00, 523.25]; // C, E, G, C
            
            frequencies.forEach((freq, index) => {
                setTimeout(() => {
                    const oscillator = this.audioContext.createOscillator();
                    const gainNode = this.audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(this.audioContext.destination);
                    
                    oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
                    oscillator.type = 'triangle';
                    
                    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
                    gainNode.gain.linearRampToValueAtTime(this.volume * 0.2, this.audioContext.currentTime + 0.05);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.3);
                    
                    oscillator.start(this.audioContext.currentTime);
                    oscillator.stop(this.audioContext.currentTime + 0.3);
                }, index * 100);
            });
        };

        // Sonido de cambio de sección - swoosh
        this.sounds.section = () => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            const filterNode = this.audioContext.createBiquadFilter();
            
            oscillator.connect(filterNode);
            filterNode.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.2);
            oscillator.type = 'sine';
            
            filterNode.type = 'lowpass';
            filterNode.frequency.setValueAtTime(2000, this.audioContext.currentTime);
            filterNode.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.3);
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(this.volume * 0.15, this.audioContext.currentTime + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.3);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.3);
        };

        // Sonido de carga/inicio - fanfare
        this.sounds.startup = () => {
            const frequencies = [130.81, 164.81, 196.00, 261.63]; // C3, E3, G3, C4
            
            frequencies.forEach((freq, index) => {
                setTimeout(() => {
                    const oscillator = this.audioContext.createOscillator();
                    const gainNode = this.audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(this.audioContext.destination);
                    
                    oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
                    oscillator.type = 'triangle';
                    
                    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
                    gainNode.gain.linearRampToValueAtTime(this.volume * 0.25, this.audioContext.currentTime + 0.1);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.8);
                    
                    oscillator.start(this.audioContext.currentTime);
                    oscillator.stop(this.audioContext.currentTime + 0.8);
                }, index * 150);
            });
        };
    }

    // Reproducir sonido
    play(soundName) {
        if (!this.enabled || !this.sounds[soundName]) {
            return;
        }

        try {
            // Reanudar contexto si está suspendido (política de browsers)
            if (this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
            
            this.sounds[soundName]();
        } catch (error) {
            console.warn(`Error reproduciendo sonido ${soundName}:`, error);
        }
    }

    // Alternar audio
    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    // Cambiar volumen
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
    }

    // Obtener estado
    isEnabled() {
        return this.enabled;
    }

    // Limpiar recursos
    destroy() {
        if (this.audioContext) {
            this.audioContext.close();
        }
    }
}

// Crear instancia global
const audioManager = new AudioManager();

// Exportar para uso global
window.audioManager = audioManager;