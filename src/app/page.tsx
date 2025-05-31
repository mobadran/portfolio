'use client';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import MainGUI from '@/components/MainGUI';
import TerminalGrid from '@/components/TerminalGrid';
import { useSwitch } from '@/context/SwitchContext';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<0 | 1 | 2>(0);
  const childRef = useRef<{
    childMethod: () => void;
    spawnTerminal?: () => void;
  }>(null);
  const [terminalExiting, setTerminalExiting] = useState(false);
  const isTerminal = useSwitch();
  const [stopLoading, setStopLoading] = useState(false);
  function handleTerminalGridExited() {
    setCurrentScreen(1);
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
    if (currentScreen !== 0 && isTerminal.checked && currentScreen !== 2) {
      setCurrentScreen(2);
      setTerminalExiting(false);
    }
  }, [isTerminal.checked, currentScreen]);

  // Handle exiting terminal screen
  useEffect(() => {
    if (currentScreen === 2 && !isTerminal.checked && !terminalExiting) {
      setTerminalExiting(true);
    }
  }, [isTerminal.checked, currentScreen, terminalExiting]);

  return (
    <div
      // className={`flex min-h-screen flex-col transition-colors duration-600 ${currentScreen === 1 ? 'bg-black/80' : 'bg-black/0'}`}
      className={`flex min-h-screen flex-col transition-colors duration-600`}
    >
      <Header SkipButton={currentScreen === 0 ? <SkipButton setStopLoading={setStopLoading} /> : null} />
      {currentScreen === 0 && <Loading unmount={() => setCurrentScreen(1)} stopLoading={stopLoading} />}
      {currentScreen === 1 && <MainGUI />}
      {currentScreen === 2 && (
        <TerminalGrid ref={childRef} exiting={terminalExiting} onExited={handleTerminalGridExited} />
      )}
      {/* Attribution */}
      <p className="mx-auto pb-2 text-center text-xs text-gray-500">
        Photo by{' '}
        <a href="https://unsplash.com/@betagamma?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
          Daniil Silantev
        </a>{' '}
        on{' '}
        <a href="https://unsplash.com/photos/mountains-are-silhouetted-against-a-vibrant-sunrise-6VhIHgqo5qI?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
          Unsplash
        </a>
      </p>
    </div>
  );
}

function SkipButton({ setStopLoading }: { setStopLoading: (value: boolean) => void }) {
  return (
    <button
      className="border-gradient-animated rounded-full bg-black/60 px-3 py-1 text-white transition hover:cursor-pointer hover:bg-black/80"
      onClick={() => setStopLoading(true)}
      type="button"
    >
      Skip
    </button>
  );
}
