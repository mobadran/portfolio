'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { getCommands } from '@/lib/commands';
import { pwd } from '@/lib/vfs';
import type { ReactNode } from 'react';
import type { CommandBlockProps, TerminalProps } from '@/types/terminal';
import CommandBlock from './CommandBlock';

// const initialCompletionState: CompletionState = {
//   baseWord: '',
//   matches: [],
//   index: 0,
// };

// function completionReducer(state: CompletionState, action: Action): CompletionState {
//   switch (action.type) {
//     case 'START_CYCLE':
//       action.function(action.matches[state.index]);
//       return {
//         ...state,
//         baseWord: action.baseWord,
//         matches: action.matches,
//         index: 1,
//       };
//     case 'NEXT_MATCH':
//       if (state.index >= state.matches.length) {
//         action.function(state.baseWord); // Reset to base word if no matches left
//         return { ...state, index: 0 };
//       }
//       action.function(state.matches[state.index]);
//       return {
//         ...state,
//         index: state.index + 1,
//       };
//     default:
//       return state;
//   }
// }

export function Terminal({ vfs, id, setVfs, onDestroy, history, setHistory }: TerminalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<CommandBlockProps[]>([]);
  const [currentPath, setCurrentPath] = useState<string[]>(['/', 'home', 'badraan']);
  const [currentSelectedHistoryIndex, setCurrentSelectedHistoryIndex] = useState(0);
  // const [completion, dispatch] = useReducer(completionReducer, initialCompletionState);
  const [prompt, setPrompt] = useState(
    <>
      ~<span className="text-white">&nbsp;👉</span>
    </>
  );

  const context = {
    vfs,
    setVfs,
    currentPath,
    setCurrentPath,
    setTerminalHistory,
    history,
    onDestroy,
  };
  const commands = getCommands(context);

  function addToHistory(command: string) {
    setHistory((prev: string[]) => {
      const newHistory = [...prev, command];
      if (newHistory.length > 100) {
        newHistory.shift(); // Keep history size manageable
      }
      return newHistory;
    });
  }

  function handleCommand(fullCommand: string): ReactNode {
    const command = fullCommand.trim().split(' ');
    if (command[0] === '') return '';

    if (command[0] in commands) {
      const commandFunc = commands[command[0]];
      return commandFunc(command.slice(1), context);
    }
    return 'Command not found: ' + command[0];
  }

  function enterCommand(command: string) {
    addToHistory(command);
    setInputValue('');
    const promptStr = pwd(currentPath).replace('/home/badraan', '~');
    const output = handleCommand(command);
    if (command.trim().startsWith('clear')) return;
    setTerminalHistory((prev) => [...prev, { prompt: promptStr, command, output }]);
  }

  // function handleTabCompletion() {
  //   const words = inputValue.split(' ');
  //   const baseWord = words[words.length - 1];
  //   const isCommand = words.length === 1 && inputValue[inputValue.length - 1] !== ' ';
  //   const candidates = isCommand ? Object.keys(commands) : ls(vfs, currentPath)?.map((item) => item.content);
  //   if (!candidates) return;
  //   const matches = candidates.filter((cmd) => cmd.startsWith(baseWord));
  //   if (completion.index === 0) {
  //     dispatch({
  //       type: 'START_CYCLE',
  //       baseWord,
  //       matches,
  //       function: setInputValue,
  //     });
  //   } else {
  //     dispatch({
  //       type: 'NEXT_MATCH',
  //       function: (string) => setInputValue(words.slice(0, -1).join(' ') + ' ' + string),
  //     });
  //   }
  // }

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
          onDestroy();
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
      <div className="flex items-center gap-2">
        <span className="text-green-400">{prompt}</span>
        <input
          type="text"
          className={`grow border-none bg-transparent outline-none ${inputValue.trim().split(' ')[0] in commands ? 'text-white' : 'text-gray-500'}`}
          ref={inputRef}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
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
            //  else if (e.key === 'Tab') {
            //   e.preventDefault();
            //   handleTabCompletion();
            // }
          }}
        />
      </div>
    </motion.div>
  );
}
