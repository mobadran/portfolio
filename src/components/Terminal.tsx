'use client';
import { cat, cd, ls, mkdir, pwd, Directory, touch } from '@/lib/vfs';
import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

type CommandBlockProps = {
  prompt: ReactNode;
  command: string;
  output: ReactNode;
};

type TerminalProps = {
  vfs: Directory | null;
  id: number;
  setVfs: (v: Directory) => void;
  onDestroy: () => void;
};

export function Terminal({ vfs, id, setVfs, onDestroy }: TerminalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState<CommandBlockProps[]>([]);
  // Per-terminal session currentPath
  const [currentPath, setCurrentPath] = useState<string[]>(['/', 'home', 'badraan']);

  const [prompt, setPrompt] = useState(
    <>
      ~<span className='text-white'>&nbsp;👉</span>
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
    uname: () => <p>Linux badraan 5.15.0-67-generic #74~20.04.1-Ubuntu SMP Thu Aug 10 16:08:59 UTC 2023 x86_64 x86_64 x86_64 GNU/Linux</p>,
    ls: () => ls(vfs, currentPath),
    cd: (args: string[]) => {
      if (args.length === 0) return <p>Invalid cd command. Usage: cd &lt;directory&gt;</p>;
      const output = cd(vfs, currentPath, setCurrentPath, args[0]);
      if (output) return <p>{output}</p>;
      return <></>;
    },
    pwd: () => <p>{pwd(currentPath)}</p>,
    cat: (args: string[]) => <p>{cat(vfs, currentPath, args[0])}</p>,
    mkdir: (args: string[]) => {
      const output = mkdir(vfs, setVfs, currentPath, args[0]);
      return <p>{output}</p>;
    },
    help: () => <p>Available commands: clear, help, echo, date, whoami, pwd, uname, ls, cd, mkdir, cat, open</p>,
    open: (args: string[]) => {
      if (!args[0]) return <p>Invalid open command. Usage: open &lt;file&gt;</p>;
      const content = cat(vfs, currentPath, args[0]);
      if (!content) return <p>File not found or empty.</p>;
      // Simple URL check
      try {
        const url = new URL(content, window.location.origin);
        // If it's an absolute URL or a root-relative path
        if (/^https?:\/\//.test(content) || content.startsWith('/')) {
          setTimeout(() => {
            window.open(url.href, '_blank', 'noopener,noreferrer');
          }, 500);
          return (
            <p>
              <span className='text-gray-300'>Opening: </span>
              <a href={url.href} target='_blank' rel='noopener noreferrer' className='text-blue-400 underline'>
                {args[0]}
              </a>
            </p>
          );
        }
      } catch {
        // Not a valid URL, fall through
      }
      // Not a URL, just show content
      return <p>{content}</p>;
    },
    touch: (args: string[]) => {
      if (args.length === 0) return <p>Invalid touch command. Usage: touch &lt;filename&gt;</p>;
      const output = touch(vfs, setVfs, currentPath, args[0]);
      return <p>{output}</p>;
    },
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
    const promptStr = pwd(currentPath).replace('/home/badraan', '~');
    const output = handleCommand(command);
    if (command.trim().startsWith('clear')) return;
    setHistory((prev) => [...prev, { prompt: promptStr, command, output }]);
  }

  useEffect(() => {
    inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    setPrompt(
      <>
        {pwd(currentPath).replace('/home/badraan', '~')}
        <span className='text-white'>&nbsp;👉</span>
      </>
    );
  }, [history, currentPath]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div
      id={`terminal-${id}`}
      className={`bg-black/60 overflow-auto rounded-md p-3 font-mono text-sm shadow border-gray-700 border-2 hover:cursor-text ${isFocused ? 'ring-2 ring-blue-400' : ''}`}
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
      }}>
      {/* Command History */}
      {history.map((commandBlock, index) => (
        <CommandBlock
          key={index}
          commandLine={
            <>
              <span className='text-green-400'>{commandBlock.prompt}</span>
              <span className='text-white'>&nbsp;👉</span> <span>{commandBlock.command}</span>
            </>
          }
          output={commandBlock.output}
        />
      ))}
      {/* Prompt + Command Line */}
      <div className='flex gap-2 items-center'>
        <span className='text-green-400'>{prompt}</span>
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
