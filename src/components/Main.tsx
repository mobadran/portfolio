'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { Terminal } from './Terminal';
import { initVFS, Directory } from '@/lib/vfs';

export default function Main() {
  const [terminalIds, setTerminalIds] = useState<number[]>([0]);
  const nextId = useRef(1);

  // Global VFS state
  const [vfs, setVfs] = useState<Directory | null>(null);

  useEffect(() => {
    initVFS().then(setVfs);
  }, []);

  function useAltTListener(onAltT: () => void) {
    useEffect(() => {
      function handleKeyDown(event: KeyboardEvent) {
        if (event.altKey && event.key.toLowerCase() === 't') {
          event.preventDefault();
          onAltT();
        }
      }
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onAltT]);
  }

  function spawnTerminal() {
    setTerminalIds((prev) => {
      if (prev.includes(nextId.current)) return prev;
      return [...prev, nextId.current];
    });
    console.log(`Terminal ${nextId.current} spawned`);
    console.log('terminalIds:', terminalIds);
    nextId.current += 1;
  }

  const destroyTerminal = useCallback((id: number) => {
    setTerminalIds((prev) => prev.filter((tid) => tid !== id));
    console.log(`Terminal ${id} destroyed`);
    // focusNextElement(id);
  }, []);

  // function focusNextElement(id: number) {
  //   // Focus the next terminal or input element
  //   console.log('terminalIds:', terminalIds);
  //   for (const i of terminalIds) {
  //     console.log('Checking terminal:', i);
  //     if (i > id) {
  //       const nextTerminal = document.querySelector(`#terminal-${i}`) as HTMLDivElement;
  //       console.log('Focusing next terminal:', nextTerminal);
  //       if (nextTerminal) {
  //         // nextTerminal.focus();
  //         nextTerminal.click();
  //         return;
  //       }
  //     }
  //   }
  //   // const allInputs = document.querySelectorAll('input');
  //   // if (allInputs.length > 0) {
  //   //   const nextInput = allInputs[Math.floor(Math.random() * allInputs.length)] as HTMLInputElement;
  //   //   nextInput.focus();
  //   // }
  // }

  useAltTListener(spawnTerminal);

  return (
    <main className='grow p-4 overflow-hidden gap-2 grid auto-cols-2 auto-rows-2'>
      {terminalIds.map((id) => (
        <Terminal key={id} id={id} vfs={vfs} setVfs={setVfs} onDestroy={() => destroyTerminal(id)} />
      ))}
    </main>
  );
}
