import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { TypeAnimation } from 'react-type-animation';
import CommandBlock from './CommandBlock';
import type { LoadingCommandBlockProps } from '@/types/loading';

const COMMANDS = [
  {
    command: 'git clone https://github.com/mobadran/portfolio .',
    output: [
      "Cloning into '.'...",
      'remote: Enumerating objects: 42, done.',
      'remote: Counting objects: 100% (42/42), done.',
      'remote: Compressing objects: 100% (36/36), done.',
      'Receiving objects: 100% (42/42), 12.34 KiB | 3.00 MiB/s, done.',
    ],
  },
  {
    command: 'npm install',
    output: ['Installing dependencies...', '✔ react@19.1.0', '✔ tailwindcss@3.4.1', '✔ @badraan/core@1.0.0'],
  },
  {
    command: 'npm start',
    output: ["Launching Badraan's Portfolio..."],
  },
];

export default function Loading({ unmount }: { unmount: () => void }) {
  const [currentOutput, setCurrentOutput] = useState<ReactNode>();
  const [terminalHistory, setTerminalHistory] = useState<LoadingCommandBlockProps[]>([]);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);

  const buildSequence = () => {
    let outputSoFar: ReactNode = '';
    const seq: (string | number | (() => void))[] = [
      500,
      COMMANDS[currentCommandIndex]?.command,
      500,
      () => {
        setCurrentOutput('');
        outputSoFar = '';
      },
    ];
    for (const outputLine of COMMANDS[currentCommandIndex].output) {
      seq.push(() => {
        outputSoFar = outputSoFar ? (
          <>
            {outputSoFar}
            <br />
            {outputLine}
          </>
        ) : (
          outputLine
        );
        setCurrentOutput(outputSoFar);
      });
      seq.push(50);
    }
    seq.push(() => {
      setTerminalHistory((prev) => [
        ...prev,
        {
          command: COMMANDS[currentCommandIndex].command,
          output: (
            <>
              {outputSoFar} <br />
              <br />
            </>
          ),
        },
      ]);
      setCurrentOutput('');
      if (COMMANDS[currentCommandIndex + 1]) {
        setCurrentCommandIndex((prev) => prev + 1);
      } else {
        setCurrentCommandIndex(-1);
      }
    });

    return seq;
  };

  useEffect(() => {
    if (currentCommandIndex === -1) {
      setTimeout(() => {
        unmount();
      }, 500);
    }
  }, [currentCommandIndex, unmount]);

  return (
    <>
      {/* History */}
      <div
        className={`overflow-auto rounded-md border-2 border-gray-700 bg-black/60 p-3 font-mono text-sm shadow ring-2 ring-blue-400 hover:cursor-text`}
      >
        {terminalHistory.map((commandBlock, index) => (
          <CommandBlock
            key={index}
            commandLine={
              <>
                <span className="text-green-400">
                  ~<span className="text-white">&nbsp;👉</span>
                </span>{' '}
                <span>{commandBlock.command}</span>
              </>
            }
            output={commandBlock.output}
          />
        ))}
        {/* Prompt + Command Line */}
        {currentCommandIndex !== -1 && (
          <div className="flex items-center gap-2">
            <span className="text-green-400">
              ~<span className="text-white">&nbsp;👉</span>
            </span>
            <pre>
              {currentCommandIndex === -1 ? null : (
                <TypeAnimation
                  key={currentCommandIndex}
                  sequence={buildSequence()}
                  wrapper="div"
                  speed={60}
                  cursor={true}
                  repeat={0}
                />
              )}
            </pre>
          </div>
        )}

        {/* Current Output */}
        <div>{currentOutput}</div>
      </div>
    </>
  );
}
