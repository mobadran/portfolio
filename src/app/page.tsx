'use client';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import MainGUI from '@/components/MainGUI';
import TerminalGrid from '@/components/TerminalGrid';
import { useSwitch } from '@/context/SwitchContext';
import { useEffect, useRef, useState } from 'react';
import { useScreen } from '@/context/ScreenContext';
import { AnimatePresence } from 'framer-motion';

export default function Home() {
  const { screen, setScreen } = useScreen();
  const childRef = useRef<{
    childMethod: () => void;
    spawnTerminal?: () => void;
  }>(null);
  const [terminalExiting, setTerminalExiting] = useState(false);
  const isTerminal = useSwitch();
  function handleTerminalGridExited() {
    setScreen('gui');
    setTerminalExiting(false);
  }

  // Hotkey handler
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.altKey && event.key.toLowerCase() === 't') {
        event.preventDefault();
        childRef.current?.spawnTerminal?.();
      }
      if (event.altKey && event.key.toLowerCase() === 's') {
        event.preventDefault();
        isTerminal.setIsChecked?.((prev) => !prev);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTerminal]);

  // Handle entering terminal screen
  useEffect(() => {
    if (screen !== 'loading' && isTerminal.checked && screen !== 'cli') {
      setScreen('cli');
      setTerminalExiting(false);
    }
  }, [isTerminal.checked, screen, setScreen]);

  // Handle exiting terminal screen
  useEffect(() => {
    if (screen === 'cli' && !isTerminal.checked && !terminalExiting) {
      setTerminalExiting(true);
    }
  }, [isTerminal.checked, screen, terminalExiting]);

  return (
    <div className="flex min-h-screen flex-col transition-colors duration-600">
      <Header />
      <main className="flex flex-col">
        <AnimatePresence>{screen === 'loading' && <Loading />}</AnimatePresence>
        {screen === 'gui' && <MainGUI />}
        {screen === 'cli' && (
          <TerminalGrid ref={childRef} exiting={terminalExiting} onExited={handleTerminalGridExited} />
        )}
      </main>
    </div>
  );
}
