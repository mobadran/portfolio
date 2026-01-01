import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { getCommands } from '@/lib/commands';
import { pwd } from '@/lib/vfs';
import type { ReactNode } from 'react';
import type { CommandBlockProps, TerminalProps } from '@/types/terminal';
import CommandBlock from './CommandBlock';

function Terminal({ vfs, id, setVfs, history, setHistory, onDestroy }: TerminalProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const hasRunHelp = useRef(false);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<CommandBlockProps[]>([]);
  const [currentPath, setCurrentPath] = useState<string[]>(['/', 'home', 'badraan']);
  const [currentSelectedHistoryIndex, setCurrentSelectedHistoryIndex] = useState(0);

  const [prompt, setPrompt] = useState(
    <>
      ~<span className="text-white">&nbsp;👉</span>
    </>
  );

  const context = useMemo(
    () => ({
      vfs,
      setVfs,
      currentPath,
      setCurrentPath,
      setTerminalHistory,
      history,
      onDestroy,
      id,
    }),
    [vfs, setVfs, currentPath, setCurrentPath, setTerminalHistory, history, onDestroy, id]
  );
  const commands = useMemo(() => getCommands(context), [context]);

  const addToHistory = useCallback(
    (command: string) => {
      setHistory((prev: string[]) => {
        const newHistory = [...prev, command];
        if (newHistory.length > 100) {
          newHistory.shift(); // Keep history size manageable
        }
        return newHistory;
      });
    },
    [setHistory]
  );

  const handleCommand = useCallback(
    (fullCommand: string): ReactNode => {
      const command = fullCommand.trim().split(' ');
      if (command[0] === '') return '';

      if (command[0] in commands) {
        const commandFunc = commands[command[0]];
        return commandFunc(command.slice(1), context);
      }
      return 'Command not found: ' + command[0];
    },
    [commands, context]
  );

  const enterCommand = useCallback(
    (command: string) => {
      if (command.trim() !== '' && command.trim() !== terminalHistory[terminalHistory.length - 1]?.command) {
        addToHistory(command);
      }
      setInputValue('');
      const promptStr = pwd(currentPath).replace('/home/badraan', '~');
      const output = handleCommand(command);
      if (command.trim().startsWith('clear')) return;
      setTerminalHistory((prev) => [...prev, { prompt: promptStr, command, output }]);
    },
    // eslint-disable-next-line
    [addToHistory, currentPath, handleCommand, setInputValue, setTerminalHistory]
  );

  useEffect(() => {
    inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    setPrompt(
      <>
        {pwd(currentPath).replace('/home/badraan', '~')}
        <span className="text-white">&nbsp;👉</span>
      </>
    );
  }, [terminalHistory, currentPath]);

  useEffect(() => {
    if (!hasRunHelp.current) {
      enterCommand('help');
      hasRunHelp.current = true;
    }
  }, [enterCommand]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      style={{ transformOrigin: '50% 50%' }}
      className={`overflow-auto rounded-md border-2 border-gray-700 bg-black/60 p-3 font-mono text-sm shadow hover:cursor-text ${isFocused ? 'ring-2 ring-blue-400' : ''}`}
      id={`terminal-${id}`}
      onMouseDown={(e) => {
        if (document.activeElement === inputRef.current) return;
        e.preventDefault();
        inputRef.current?.focus();
      }}
      onKeyDown={(e) => {
        if (e.key.toLowerCase() === 'q' && e.altKey && isFocused) {
          e.preventDefault();
          setIsFocused(false);
          inputRef.current?.blur();
          onDestroy(id);
        }
      }}
    >
      {/* Command History */}
      {terminalHistory.map((commandBlock, index) => (
        <CommandBlock
          key={index}
          commandLine={
            <>
              <span className="text-green-400">{commandBlock.prompt}</span>
              <span className="text-white">&nbsp;👉</span> <span>{commandBlock.command}</span>
            </>
          }
          output={commandBlock.output}
        />
      ))}
      {/* Prompt + Command Line */}
      <div className="flex items-start gap-2">
        <span className="text-green-400">{prompt}</span>
        <textarea
          className={`grow resize-none border-none bg-transparent outline-none ${inputValue.trim().split(' ')[0] in commands ? 'text-white' : 'text-gray-500'}`}
          ref={inputRef}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={inputValue}
          rows={1}
          style={{ height: 'auto', minHeight: '1.5em' }}
          onChange={(e) => {
            setInputValue(e.target.value);
            // Auto-resize the textarea
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              enterCommand(inputValue);
            } else if (e.key === 'ArrowUp') {
              const prevCommand = history[history.length - 1 - currentSelectedHistoryIndex];
              if (prevCommand || prevCommand === '') {
                setInputValue(prevCommand);
                setCurrentSelectedHistoryIndex((prev) => prev + 1);
              }
            } else if (e.key === 'ArrowDown') {
              if (currentSelectedHistoryIndex > 0) {
                setCurrentSelectedHistoryIndex((prev) => prev - 1);
                const nextCommand = history[history.length - 1 - currentSelectedHistoryIndex + 1];
                if (nextCommand || nextCommand === '') {
                  setInputValue(nextCommand);
                } else {
                  setInputValue('');
                }
              }
            }
          }}
        />
      </div>
    </motion.div>
  );
}
export default Terminal;
