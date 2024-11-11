// AudioContext.js
import React, { createContext, useState } from 'react';
import comedownstudio from '../audio_clips/come_down_studio.wav';
import pinkponystudio from '../audio_clips/pink_pony_studio.wav';
import zombiegirltd from '../audio_clips/zombie_girl_td.wav';
import comedowntd from '../audio_clips/come_down_td.wav';
import pinkponytd from '../audio_clips/pink_pony_td.wav';
import zombiegirlstudio from '../audio_clips/zombie_girl_studio.wav';
import { SelectOrder } from './SelectOrder.js';

export const AudioContext = createContext();

const originalAudios = [
  { id: "A", name: 'Pink Pony Club', version: 'Studio', url: pinkponystudio },
  { id: "B", name: 'Come Down', version: 'Studio', url: comedownstudio },
  { id: "C'", name: 'Zombie Girl', version: 'Tiny Desk', url: zombiegirltd },
  { id: "A'", name: 'Pink Pony Club', version: 'Tiny Desk', url: pinkponytd },
  { id: "B'", name: 'Come Down', version: 'Tiny Desk', url: comedowntd },
  { id: "C", name: 'Zombie Girl', version: 'Studio', url: zombiegirlstudio },
];

const audios = SelectOrder(originalAudios);

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
