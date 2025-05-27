import type { ReactNode } from 'react';
import { cat, cd, ls, pwd, touch, mkdir } from './vfs';
import type { Directory } from '@/types/vfs';

type CommandBlockProps = {
  prompt: ReactNode;
  command: string;
  output: ReactNode;
};

type CommandFunction = (
  args: string[],
  context: {
    vfs: Directory | null;
    setVfs: (v: Directory) => void;
    currentPath: string[];
    setCurrentPath: (p: string[]) => void;
    setTerminalHistory: React.Dispatch<React.SetStateAction<CommandBlockProps[]>>;
    history: string[];
  }
) => ReactNode;

export function getCommands(context: {
  vfs: Directory | null;
  setVfs: (v: Directory) => void;
  currentPath: string[];
  setCurrentPath: (p: string[]) => void;
  setTerminalHistory: React.Dispatch<React.SetStateAction<CommandBlockProps[]>>;
  history: string[];
}): Record<string, CommandFunction> {
  const { vfs, setVfs, currentPath, setCurrentPath, setTerminalHistory, history } = context;
  const commands: Record<string, CommandFunction> = {
    '': () => <p></p>,
    clear: (args: string[]) => {
      if (args.length) return <p>Invalid clear command. Usage: clear</p>;
      setTerminalHistory([]);
      return <p></p>;
    },
    echo: (args: string[]) => (args.length === 1 ? <p>Badraan Says: {args.join(' ')}</p> : <p>Invalid echo command. Usage: echo &lt;message&gt;</p>),
    whoami: (args: string[]) => {
      if (args.length) return <p>Invalid whoami command. Usage: whoami</p>;
      <p>badraan</p>;
    },
    date: (args: string[]) => {
      if (args.length) return <p>Invalid date command. Usage: date</p>;
      <p>{new Date().toLocaleString()}</p>;
    },
    ls: (args: string[]) => {
      const output = ls(vfs, currentPath, args[0]);
      if (!output) return <p>ls: no such directory</p>;
      return (
        <ul>
          {output.map((item, index) => (
            <li key={index}>
              {item.type === 'dir' ? '📁' : '📄'} {item.content}
            </li>
          ))}
        </ul>
      );
    },
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
              <span className="text-gray-300">Opening: </span>
              <a href={url.href} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
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
    history: () => {
      return (
        <ul>
          {history.map((cmd, index) => (
            <li key={index + 1}>
              {index + 1} {cmd}
            </li>
          ))}
        </ul>
      );
    },
  };
  return commands;
}
