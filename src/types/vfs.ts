type File = { type: 'file'; content: string };
export type Directory = { type: 'dir'; children: Record<string, FileOrDir> };
export type FileOrDir = File | Directory;
export type lsOutput = {
  content: string;
  type: 'dir' | 'file';
}[];
