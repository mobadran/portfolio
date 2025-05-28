'use client';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import TerminalGrid from '@/components/TerminalGrid';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
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
    <>
      <Header />
      <main>
        {isLoading ? (
          <Loading
            unmount={() => {
              setIsLoading(false);
            }}
          />
        ) : (
          <TerminalGrid ref={childRef} />
        )}
      </main>
      <p className="mx-auto mb-2 text-center text-xs text-gray-500">
        Photo by <a href="https://unsplash.com/@betagamma?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Daniil Silantev</a> on{' '}
        <a href="https://unsplash.com/photos/mountains-are-silhouetted-against-a-vibrant-sunrise-6VhIHgqo5qI?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
      </p>
    </>
  );
}
