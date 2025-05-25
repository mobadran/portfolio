'use client';
import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

type CommandBlockProps = {
  command: string;
  output: ReactNode;
};

export function Terminal({ onDestroy }: { onDestroy: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState<CommandBlockProps[]>([]);

  const [prompt, setPrompt] = useState(
    <>
      ~<br />
      <span className='text-white'>👉</span>
    </>
  );

  type CommandFunction = (args: string[]) => ReactNode;

  const commands: Record<string, CommandFunction> = {
    '': () => <p></p>,
    clear: () => {
      setHistory([]);
      return <p></p>;
    },
    echo: (args: string[]) => (args.length ? <p>Badraan Says: {args.join(' ')}</p> : <p>Invalid echo command. Usage: echo &lt;message&gt;</p>),
    whoami: () => <p>badraan</p>,
    date: () => <p>{new Date().toLocaleString()}</p>,
    pwd: () => <p>/home/badraan/</p>,
    uname: () => <p>Linux badraan 5.15.0-67-generic #74~20.04.1-Ubuntu SMP Thu Aug 10 16:08:59 UTC 2023 x86_64 x86_64 x86_64 GNU/Linux</p>,
    ls: (args: string[]) => {
      if (args.length) {
        switch (args[0]) {
          case 'Desktop':
            return <p>Projects&nbsp;&nbsp;Notes&nbsp;&nbsp;Resume.pdf</p>;
        }
      }
      return <p>Desktop&nbsp;&nbsp;Documents&nbsp;&nbsp;Downloads&nbsp;&nbsp;Music&nbsp;&nbsp;Pictures&nbsp;&nbsp;Videos</p>;
    },
    cd: (args: string[]) => (args.length ? <p>Sorry, you are not allowed to cd in my computer 😔. I may add it in the future, though. (You can use ls command)</p> : <p>Invalid cd command. Usage: cd &lt;directory&gt;</p>),
    help: () => <p>Available commands: clear, help, echo, date, whoami, pwd, uname, ls, cd</p>,
  };

  function handleCommand(fullCommand: string): ReactNode {
    const command = fullCommand.trim().split(' ');
    if (command[0] === '') return '';

    if (command[0] in commands) {
      const commandFunc = commands[command[0]];
      return commandFunc(command.slice(1));
    }
    return 'Command not found: ' + command[0];
  }

  function enterCommand(command: string) {
    setInputValue('');
    setHistory((prev) => [...prev, { command, output: handleCommand(command) }]);
  }

  useEffect(() => {
    inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [history]);

  return (
    <div
      className={`bg-black/60 overflow-auto rounded-md p-3 font-mono text-sm shadow border-gray-700 border-2 hover:cursor-text ${isFocused ? 'ring-2 ring-blue-400' : ''}`}
      onClick={() => inputRef.current?.focus()}
      onKeyDown={(e) => {
        if (e.key.toLowerCase() === 'q' && e.altKey && isFocused) {
          e.preventDefault();
          setIsFocused(false);
          inputRef.current?.blur();
          onDestroy(); // Call onDestroy if provided
        }
      }}>
      {/* Command History */}
      {history.map((commandBlock, index) => (
        <CommandBlock
          key={index}
          commandLine={
            <>
              <span className='text-green-400'>{prompt}</span> <span>{commandBlock.command}</span>
            </>
          }
          output={commandBlock.output}
        />
      ))}
      {/* Prompt + Command Line */}
      <div className='flex items-end gap-2'>
        <div className='text-green-400'>{prompt}</div>
        <input
          type='text'
          className={`bg-transparent border-none outline-none grow ${inputValue.trim().split(' ')[0] in commands ? 'text-white' : 'text-gray-500'}`}
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
            }
          }}
        />
      </div>
    </div>
  );
}

function CommandBlock({ commandLine, output }: { commandLine: ReactNode; output: ReactNode }) {
  return (
    <div className='mb-2'>
      <div>{commandLine}</div>
      <div className='text-gray-300'>{output}</div>
    </div>
  );
}
