'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { Terminal } from './Terminal';

export default function Main() {
  const [terminalIds, setTerminalIds] = useState<number[]>([0]);
  const nextId = useRef(1); // Always unique id generator

  function useAltTListener(onAltT: () => void) {
    useEffect(() => {
      function handleKeyDown(event: KeyboardEvent) {
        if (event.altKey && event.key.toLowerCase() === 't') {
          event.preventDefault(); // prevent browser default (optional)
          onAltT();
        }
      }

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, [onAltT]);
  }

  function spawnTerminal() {
    setTerminalIds((prev) => {
      // Prevent duplicate ids
      if (prev.includes(nextId.current)) {
        // Optionally log for debugging
        console.warn('Duplicate terminal id detected:', nextId.current, prev);
        return prev;
      }
      return [...prev, nextId.current];
    });
    nextId.current += 1;
  }

  // Remove a terminal by its id
  const destroyTerminal = useCallback((id: number) => {
    setTerminalIds((prev) => prev.filter((tid) => tid !== id));
    focusNextElement(); // Focus next element after terminal is removed
  }, []);

  function focusNextElement() {
    const allInputs = document.querySelectorAll('input');
    if (allInputs.length > 0) {
      const nextInput = allInputs[Math.floor(Math.random() * allInputs.length)] as HTMLInputElement;
      nextInput.focus();
    }
  }

  useAltTListener(spawnTerminal);

  return (
    <main className='grow p-4 overflow-hidden gap-2 grid auto-cols-2 auto-rows-2'>
      {terminalIds.map((id) => (
        <Terminal key={id} onDestroy={() => destroyTerminal(id)} />
      ))}
    </main>
  );
}
