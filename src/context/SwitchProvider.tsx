'use client';
import { useState } from 'react';
import { SwitchContext } from './SwitchContext';

export function SwitchProvider({ children }: { children: React.ReactNode }) {
  const [checked, setIsChecked] = useState(false);

  return <SwitchContext.Provider value={{ checked, setIsChecked }}>{children}</SwitchContext.Provider>;
}
