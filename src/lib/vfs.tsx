import type { ReactNode } from 'react';

export type File = { type: 'file'; content: string };
export type Directory = { type: 'dir'; children: Record<string, FileOrDir> };
export type FileOrDir = File | Directory;

// Fetch and return the initial VFS (Directory)
export async function initVFS(): Promise<Directory> {
  if (typeof window === 'undefined') throw new Error('Not in browser');
  const url = new URL('/vfs.json', window.location.origin);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch vfs.json: ${response.statusText}`);
  return JSON.parse(await response.text());
}

// Get the current directory node for a given path
export function getCurrentDir(vfs: Directory | null, currentPath: string[]): Directory | null {
  if (!vfs) return null;
  let node: FileOrDir = vfs;
  for (const segment of currentPath.slice(1)) {
    if (node.type === 'dir' && node.children[segment]) {
      node = node.children[segment];
    } else {
      return null;
    }
  }
  return node.type === 'dir' ? node : null;
}

// Resolve a path string to an absolute path array
export function resolvePath(currentPath: string[], path: string): string[] {
  const parts = path.startsWith('/') ? path.split('/').filter(Boolean) : [...currentPath.slice(1), ...path.split('/').filter(Boolean)];

  const stack: string[] = [];
  for (const part of parts) {
    if (part === '..') stack.pop();
    else if (part !== '.') stack.push(part);
  }
  return ['/', ...stack];
}

// Change directory: updates currentPath via setCurrentPath
export function cd(vfs: Directory | null, currentPath: string[], setCurrentPath: (p: string[]) => void, path: string): string {
  if (!vfs) return 'cd: virtual file system not initialized';
  const resolved = resolvePath(currentPath, path);
  let node: FileOrDir = vfs;
  for (const part of resolved.slice(1)) {
    if (node.type === 'dir' && node.children[part]) {
      node = node.children[part];
    } else {
      return `cd: no such directory: ${path}`;
    }
    if (node.type !== 'dir') {
      return `cd: not a directory: ${path}`;
    }
  }
  setCurrentPath(resolved);
  return '';
}

// List directory contents
export function ls(vfs: Directory | null, currentPath: string[]): ReactNode {
  const dir = getCurrentDir(vfs, currentPath);
  if (!dir) return <p>Invalid directory.</p>;
  const formatted_children = Object.entries(dir.children).map(([name, node]) => (
    <span key={name} className={node.type === 'dir' ? 'text-blue-400' : ''}>
      {name}&nbsp;&nbsp;
    </span>
  ));
  return <p>{formatted_children}</p>;
}

// Print working directory
export function pwd(currentPath: string[]): string {
  return currentPath.join('/').replace('//', '/').replace('/~', '~');
}

// Make directory: clones VFS, updates, and calls setVfs
export function mkdir(vfs: Directory | null, setVfs: (v: Directory) => void, currentPath: string[], name: string): string {
  if (!vfs) return 'mkdir: current directory not found';
  const dir = getCurrentDir(vfs, currentPath);
  if (!dir) return 'mkdir: current directory not found';
  if (dir.children[name]) return `mkdir: cannot create directory '${name}': File exists`;

  // Deep clone vfs to avoid mutating state directly
  const newVfs = structuredClone(vfs) as Directory;
  let node: Directory = newVfs;
  for (const segment of currentPath.slice(1)) {
    node = node.children[segment] as Directory;
  }
  node.children[name] = { type: 'dir', children: {} };
  setVfs(newVfs);
  return `mkdir: created directory '${name}'`;
}

// Create file: clones VFS, updates, and calls setVfs
export function touch(vfs: Directory | null, setVfs: (v: Directory) => void, currentPath: string[], name: string): string {
  if (!vfs) return 'touch: current directory not found';
  const dir = getCurrentDir(vfs, currentPath);
  if (!dir) return 'touch: current directory not found';
  if (dir.children[name]) return `touch: cannot create file '${name}': File exists`;

  const newVfs = structuredClone(vfs) as Directory;
  let node: Directory = newVfs;
  for (const segment of currentPath.slice(1)) {
    node = node.children[segment] as Directory;
  }
  node.children[name] = { type: 'file', content: '' };
  setVfs(newVfs);
  return `touch: created file '${name}'`;
}

// Show file contents
export function cat(vfs: Directory | null, currentPath: string[], name: string): string {
  const dir = getCurrentDir(vfs, currentPath);
  if (!dir) return 'cat: current directory not found';

  const node = dir.children[name];
  if (!node) return `cat: ${name}: No such file`;
  if (node.type !== 'file') return `cat: ${name}: Is a directory`;

  return node.content;
}
