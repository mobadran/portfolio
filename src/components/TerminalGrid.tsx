'use client';

import { useEffect, useState, useCallback, useRef, forwardRef, useImperativeHandle } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Terminal } from './Terminal';
import { initVFS } from '@/lib/vfs';
import type { Directory } from '@/types/vfs';
import Modal from './Modal';

const TerminalGrid = forwardRef((props, ref) => {
  const [terminalIds, setTerminalIds] = useState<number[]>([0]);
  const [warningShown, setWarningShown] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [vfs, setVfs] = useState<Directory | null>(null);
  const [history, setHistory] = useLocalStorage<string[]>('history', []);
  const nextId = useRef(1);

  function showWarning(message: string) {
    setWarningMessage(message);
    setWarningShown(true);
  }

  function spawnTerminal() {
    if (terminalIds.length >= 4) {
      showWarning('Maximum number of terminals reached (4)');
      return;
    }
    setTerminalIds((prev) => {
      if (prev.includes(nextId.current)) return prev;
      return [...prev, nextId.current];
    });
    nextId.current += 1;
  }

  const destroyTerminal = useCallback(
    (id: number) => {
      if (terminalIds.length <= 1) {
        showWarning('Cannot destroy the last terminal. Use Alt+S to go to home.');
        return;
      }
      const nextTerminal = terminalIds[terminalIds.indexOf(id) + 1] || terminalIds[terminalIds.indexOf(id) - 1];
      (document.querySelector(`#terminal-${nextTerminal} input`) as HTMLInputElement | null)?.focus();
      setTerminalIds((prev) => prev.filter((tid) => tid !== id));
    },
    [terminalIds]
  );

  useEffect(() => {
    initVFS().then(setVfs);
  }, []);

  useImperativeHandle(ref, () => ({
    spawnTerminal,
  }));

  return (
    //  className="auto-cols-2 auto-rows-2 grid gap-2 overflow-hidden p-4"
    <>
      {warningShown && <Modal message={warningMessage} onClose={() => setWarningShown(false)} />}
      {terminalIds.map((id) => (
        <Terminal
          key={id}
          id={id}
          vfs={vfs}
          setVfs={setVfs}
          onDestroy={() => destroyTerminal(id)}
          history={history}
          setHistory={setHistory}
        />
      ))}
    </>
  );
});

TerminalGrid.displayName = 'TerminalGrid';
export default TerminalGrid;
