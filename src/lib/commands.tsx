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
    onDestroy: (id: number) => void;
    id: number;
  }
) => ReactNode;

export function getCommands(context: {
  vfs: Directory | null;
  setVfs: (v: Directory) => void;
  currentPath: string[];
  setCurrentPath: (p: string[]) => void;
  setTerminalHistory: React.Dispatch<React.SetStateAction<CommandBlockProps[]>>;
  history: string[];
  onDestroy: (id: number) => void;
  id: number;
}): Record<string, CommandFunction> {
  const { vfs, setVfs, currentPath, setCurrentPath, setTerminalHistory, history, onDestroy, id } = context;
  const commands: Record<string, CommandFunction> = {
    '': () => <p></p>,
    clear: (args: string[]) => {
      if (args.length) return <p>Invalid clear command. Usage: clear</p>;
      setTerminalHistory([]);
      return <p></p>;
    },
    echo: (args: string[]) =>
      args.length === 1 ? (
        <p>Badraan Says: {args.join(' ')}</p>
      ) : (
        <p>Invalid echo command. Usage: echo &lt;message&gt;</p>
      ),
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
    help: () => (
      <div>
        <p>
          <b>Essential navigation commands:</b> <br />
          <code>ls</code>, <code>cd</code>, <code>pwd</code>, <code>cat</code>, <code>mkdir</code>, <code>clear</code>,{' '}
          <code>exit</code>
        </p>
        <div className="mt-2">
          <b>Hotkeys:</b>
          <ul className="ml-6 list-disc">
            <li>
              <kbd>ALT</kbd> + <kbd>T</kbd>: Spawn another terminal
            </li>
            <li>
              <kbd>ALT</kbd> + <kbd>Q</kbd>: Terminate the focused terminal
            </li>
            <li>
              <kbd>ALT</kbd> + <kbd>S</kbd>: Switch to the Home screen
            </li>
          </ul>
        </div>
        <p className="mt-2">
          For a full list of commands and usage, type <code>`commands`</code>
        </p>
      </div>
    ),
    commands: () => (
      <div>
        <p>
          <b>All available commands:</b>
        </p>
        <ul className="ml-6 list-disc">
          <li>
            <code>clear</code>: Clear the terminal
          </li>
          <li>
            <code>help</code>: Show essential navigation commands and hotkeys
          </li>
          <li>
            <code>commands</code>: List all available commands with usage
          </li>
          <li>
            <code>echo &lt;message&gt;</code>: Print a message
          </li>
          <li>
            <code>date</code>: Show the current date and time
          </li>
          <li>
            <code>whoami</code>: Show the current user
          </li>
          <li>
            <code>pwd</code>: Print working directory
          </li>
          <li>
            <code>uname</code>: Show system information
          </li>
          <li>
            <code>ls [directory]</code>: List files and directories
          </li>
          <li>
            <code>cd &lt;directory&gt;</code>: Change directory
          </li>
          <li>
            <code>mkdir &lt;directory&gt;</code>: Create a new directory
          </li>
          <li>
            <code>cat &lt;file&gt;</code>: Show file contents
          </li>
          <li>
            <code>open &lt;file&gt;</code>: Open a file or URL in a new tab
          </li>
          <li>
            <code>touch &lt;filename&gt;</code>: Create an empty file
          </li>
          <li>
            <code>history</code>: Show command history
          </li>
          <li>
            <code>exit</code>: Close the terminal
          </li>
        </ul>
      </div>
    ),
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
    exit: () => {
      onDestroy(id);
      return <></>;
    },
  };
  return commands;
}
