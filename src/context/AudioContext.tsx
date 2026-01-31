import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface AudioContextType {
    isMuted: boolean;
    toggleMute: () => void;
    playSFX: (soundFile: string) => void;
    startMusic: () => void;
    isMusicPlaying: boolean;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isMuted, setIsMuted] = useState(() => {
        const saved = localStorage.getItem('doza_audio_muted');
        return saved === 'true';
    });
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const musicRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Initialize background music
        musicRef.current = new Audio('/pharaonic-music.mp3');
        musicRef.current.loop = true;
        musicRef.current.volume = 0.4; // Slightly quieter for background

        return () => {
            if (musicRef.current) {
                musicRef.current.pause();
                musicRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (musicRef.current) {
            musicRef.current.muted = isMuted;
            localStorage.setItem('doza_audio_muted', String(isMuted));
        }
    }, [isMuted]);

    const toggleMute = () => {
        setIsMuted(prev => !prev);
    };

    const playSFX = (soundFile: string) => {
        if (isMuted) return;
        const sfx = new Audio(soundFile);
        sfx.volume = 0.5;
        sfx.play().catch(e => console.log('Audio playback prevented:', e));
    };

    const startMusic = () => {
        if (musicRef.current && !isMusicPlaying) {
            musicRef.current.play().then(() => {
                setIsMusicPlaying(true);
            }).catch(e => console.log('Music playback prevented:', e));
        }
    };

    return (
        <AudioContext.Provider value={{ isMuted, toggleMute, playSFX, startMusic, isMusicPlaying }}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) throw new Error('useAudio must be used within AudioProvider');
    return context;
};
