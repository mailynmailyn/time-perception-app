// AudioContext.js
import React, { createContext, useState } from 'react';
import comedownstudio from '../audio_clips/come_down_studio.wav';
import pinkponystudio from '../audio_clips/pink_pony.wav';
import zombiegirltd from '../audio_clips/zombie_girl_td.wav';

export const AudioContext = createContext();

const audios = [
  { id: 'Audio A', name: 'Pink Pony Club', version: 'Studio', url: pinkponystudio },
  { id: 'Audio B', name: 'Come Down', version: 'Studio', url: comedownstudio },
  { id: 'Audio C', name: 'Zombie Girl', version: 'Tiny Desk', url: zombiegirltd },
];

const username = crypto.randomUUID();

export const AudioProvider = ({ children }) => {
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);

  const handleNextAudio = () => {
    setCurrentAudioIndex((prevIndex) => (prevIndex + 1) % audios.length);
  };

  return (
    <AudioContext.Provider
      value={{
        username,
        audios,
        currentAudioIndex,
        handleNextAudio,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
