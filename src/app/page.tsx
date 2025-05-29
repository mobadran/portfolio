'use client';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import MainGUI from '@/components/MainGUI';
import TerminalGrid from '@/components/TerminalGrid';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  // ! Don't forget to make isHome initial state false
  const [currentScreen, setCurrentScreen] = useState<0 | 1 | 2>(0);
  const childRef = useRef<{
    childMethod: () => void;
    spawnTerminal?: () => void;
  }>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.altKey && event.key.toLowerCase() === 't') {
        event.preventDefault();
        childRef.current?.spawnTerminal?.();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      className={`flex min-h-screen flex-col transition-colors duration-600 ${currentScreen === 1 ? 'bg-black/80' : 'bg-black/0'}`}
    >
      <Header />
      <main className="flex flex-col">
        {currentScreen === 0 ? (
          <Loading
            unmount={() => {
              setCurrentScreen(1);
            }}
          />
        ) : currentScreen === 1 ? (
          <MainGUI />
        ) : (
          <TerminalGrid ref={childRef} />
        )}
      </main>
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
