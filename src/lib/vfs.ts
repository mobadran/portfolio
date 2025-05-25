// vfs.ts

type File = { type: 'file'; content: string };
type Directory = { type: 'dir'; children: Record<string, FileOrDir> };
type FileOrDir = File | Directory;

const vfs: Directory = {
  type: 'dir',
  children: {
    home: {
      type: 'dir',
      children: {
        desktop: {
          type: 'dir',
          children: {
            projects: {
              type: 'dir',
              children: {
                'athar.app': {
                  type: 'file',
                  content: 'https://athar-server-production.up.railway.app',
                },
                'age-calculator.git': {
                  type: 'file',
                  content: 'https://github.com/mobadran/age-calculator',
                },
              },
            },
            my_github: {
              type: 'file',
              content: 'https://github.com/mobadran',
            },
          },
        },
        documents: {
          type: 'dir',
          children: {
            'resume.pdf': {
              type: 'file',
              content: '/public/resume.pdf',
            },
          },
        },
        downloads: {
          type: 'dir',
          children: {
            'random_file_from_the_internet.txt': {
              type: 'file',
              content: "Well, I just don't know what to put here. Maybe you can help me out? 😅",
            },
          },
        },
        music: {
          type: 'dir',
          children: {
            'i_dont_hear_music.mp3': {
              type: 'file',
              content: 'What did you expect? I am a terminal, not a music player! 🎵',
            },
          },
        },
        pictures: {
          type: 'dir',
          children: {
            'cat.png': {
              type: 'file',
              content: '/public/cat.png',
            },
          },
        },
        videos: {
          type: 'dir',
          children: {
            'funny_video.mp4': {
              type: 'file',
              content: 'https://www.youtube.com/watch?v=xvFZjo5PgG0',
            },
            'octocat.mp4': {
              type: 'file',
              content: 'https://www.youtube.com/watch?v=EZy1Dl5KJNg',
            },
          },
        },
      },
    },
  },
};

let currentPath: string[] = ['/home', 'badraan'];

function getCurrentDir(): Directory | null {
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

function resolvePath(path: string): string[] {
  const parts = path.startsWith('/') ? path.split('/').filter(Boolean) : [...currentPath.slice(1), ...path.split('/').filter(Boolean)];

  const stack: string[] = [];
  for (const part of parts) {
    if (part === '..') stack.pop();
    else if (part !== '.') stack.push(part);
  }
  return ['/', ...stack];
}

// -------------------- Commands --------------------

export function ls(): string {
  const dir = getCurrentDir();
  if (!dir) return 'Invalid directory.';
  return Object.keys(dir.children).join('  ');
}

export function cd(path: string): string {
  const resolved = resolvePath(path);
  let node: FileOrDir = vfs;
  for (const part of resolved.slice(1)) {
    if (node.type === 'dir' && node.children[part]) {
      node = node.children[part];
    } else {
      return `cd: no such directory: ${path}`;
    }
  }
  if (node.type !== 'dir') return `cd: not a directory: ${path}`;
  currentPath = resolved;
  return '';
}

export function mkdir(name: string): string {
  const dir = getCurrentDir();
  if (!dir) return 'mkdir: current directory not found';
  if (dir.children[name]) return `mkdir: cannot create directory '${name}': File exists`;

  dir.children[name] = { type: 'dir', children: {} };
  return '';
}

export function touch(name: string): string {
  const dir = getCurrentDir();
  if (!dir) return 'touch: current directory not found';
  if (dir.children[name]) return `touch: cannot create file '${name}': File exists`;

  dir.children[name] = { type: 'file', content: '' };
  return '';
}

export function cat(name: string): string {
  const dir = getCurrentDir();
  if (!dir) return 'cat: current directory not found';

  const node = dir.children[name];
  if (!node) return `cat: ${name}: No such file`;
  if (node.type !== 'file') return `cat: ${name}: Is a directory`;

  return node.content;
}
