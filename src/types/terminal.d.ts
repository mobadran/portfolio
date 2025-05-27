import { Directory } from '@/lib/vfs';

export type CommandBlockProps = {
  prompt: ReactNode;
  command: string;
  output: ReactNode;
};

export type TerminalProps = {
  vfs: Directory | null;
  id: number;
  setVfs: (v: Directory) => void;
  onDestroy: () => void;
  history: string[];
  setHistory: (history: string[] | ((history: string[]) => string[])) => void;
};
