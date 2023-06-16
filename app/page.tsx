'use client'

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

import Grilla from '@/components/Grilla';
import grillaControls from '@/controls/GrillaControls';
import Teclado from '@/components/Teclado/Teclado';

// MODALS
import ModalInfo from '@/components/ModalInfo';
import ModalStats from '@/components/ModalStats';

export default function Home() {
  const store = grillaControls;

  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prevMode) => !prevMode);
  }, []);

  useEffect(() => {
    store.iniciar();
    const handleKeyup = (event: KeyboardEvent) => {
      store.handleKeyUp(event);
    };
    window.addEventListener('keydown', handleKeyup);

    return () => {
      window.removeEventListener('keydown', handleKeyup);
    };
  }, []);

  const [seconds, setSeconds] = useState(300);
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        store.iniciar();
        clearInterval(countdownInterval);
        setSeconds(300);
      }
    }, 500);

    return () => clearInterval(countdownInterval);
  }, [seconds]);

  const formatTime = useCallback(() => {
    const minutes = Math.floor(seconds / 60);
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const remainingSeconds = seconds % 60;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  }, [seconds]);
  return (
    <div className={`m-auto flex h-screen w-full flex-col items-center justify-center ${isDarkMode ? 'dark' : 'light'}`}>
      <div className='w-1/3 xs:w-full flex flex-col items-center justify-center'>
        <header className={`w-full xs:w-10/12 rounded-lg flex items-center justify-center mb-4 ${isDarkMode ? 'bg-[#DADCE008] text-[#DADCE0]' : 'bg-[#F3F3F3] text-[#202537]'}`}>
          <div className='w-11/12 py-1 flex flex-row items-center justify-between '>
            <ModalInfo dark={isDarkMode} />
            <h1 className='w-6/12 font-bold text-2xl text-center'>WORDLE</h1>
            <ModalStats className='w-2/12' tiempo={formatTime()} dark={isDarkMode} intentos={store.intentos} victorias={store.userGanados} dataModal={store.modal} dataPalabra={store.palabra} />
            <Image className='w-1.5/12 transition duration-300' src={isDarkMode ? '/icon-dark.png' : '/icon-light.png'} width={45} height={65} alt='DarkMode' onClick={toggleDarkMode} />
          </div>
        </header>

        {grillaControls.userPalabras.map((_, letwords) => (
          <Grilla
            key={letwords}
            palabra={grillaControls.palabra}
            userPalabra={grillaControls.userPalabras[letwords]}
            palabraAcertada={letwords < grillaControls.userIntentos}
          />
        ))}
        {(grillaControls.ganar || grillaControls.perder) && (
          <button onClick={grillaControls.iniciar}>Reiniciar juego</button>
        )}
        <Teclado />
      </div>
    </div>
  );
}
