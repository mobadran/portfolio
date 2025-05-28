import type { ReactNode } from 'react';

function CommandBlock({ commandLine, output }: { commandLine: ReactNode; output: ReactNode }) {
  return (
    <div className="mb-2">
      <div>{commandLine}</div>
      <div className="text-gray-300">{output}</div>
    </div>
  );
}

export default CommandBlock;
