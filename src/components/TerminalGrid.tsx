'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Terminal from '@/components/Terminal';
import { initVFS } from '@/lib/vfs';
import type { Directory } from '@/types/vfs';
import Modal from '@/components/Modal';
import { AnimatePresence } from 'framer-motion';
import { useScreen } from '@/context/ScreenContext';

const TerminalGrid = () => {
  const nextId = useRef(1);
  const [terminalIds, setTerminalIds] = useState<number[]>([nextId.current]);
  const [warningShown, setWarningShown] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [vfs, setVfs] = useState<Directory | null>(null);
  const [history, setHistory] = useLocalStorage<string[]>('history', []);
  const { setScreen } = useScreen();

  function showWarning(message: string) {
    setWarningMessage(message);
    setWarningShown(true);
  }

  const spawnTerminal = useCallback(() => {
    if (terminalIds.length >= 4) {
      showWarning('Maximum number of terminals reached (4)');
      return;
    }
    setTerminalIds((prev) => {
      if (prev.includes(nextId.current)) return prev;
      return [...prev, nextId.current];
    });
    nextId.current += 1;
  }, [terminalIds.length]);

  useEffect(() => {
    initVFS().then(setVfs);
  }, []);

  const destroyTerminal = useCallback(
    (id: number) => {
      // Focus on next terminal if possible, otherwise focus on previous terminal
      const nextTerminal = terminalIds[terminalIds.indexOf(id) + 1];
      if (nextTerminal) {
        const nextTextarea = document.querySelector<HTMLTextAreaElement>(`#terminal-${nextTerminal} textarea`);
        nextTextarea?.focus();
      } else {
        const prevTerminal = terminalIds[terminalIds.indexOf(id) - 1];
        const prevTextarea = document.querySelector<HTMLTextAreaElement>(`#terminal-${prevTerminal} textarea`);
        prevTextarea?.focus();
      }
      setTerminalIds((prev) => prev.filter((i) => i !== id));
    },
    [terminalIds, setTerminalIds]
  );

  // Spawn Terminal on ALT+T
  // Switch to GUI on ALT+S by destroying all terminals
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.altKey && event.key.toLowerCase() === 't') {
        event.preventDefault();
        spawnTerminal();
      }
      if (event.altKey && event.key.toLowerCase() === 's') {
        event.preventDefault();
        terminalIds.forEach((id) => destroyTerminal(id));
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [spawnTerminal, terminalIds, destroyTerminal]);

  // Switch to GUI after all terminals are destroyed
  useEffect(() => {
    if (terminalIds.length === 0) {
      setTimeout(() => {
        setScreen('gui');
      }, 200);
    }
  }, [terminalIds, setScreen]);

  return (
    <div className="grow" id="terminalGrid">
      {warningShown && <Modal message={warningMessage} onClose={() => setWarningShown(false)} />}
      <AnimatePresence>
        {terminalIds.map((id) => (
          <Terminal
            key={id}
            id={id}
            vfs={vfs}
            setVfs={setVfs}
            history={history}
            setHistory={setHistory}
            onDestroy={destroyTerminal}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TerminalGrid;
