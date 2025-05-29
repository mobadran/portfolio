'use client';
import { createContext, useContext } from 'react';

type SwitchContextType = {
  checked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SwitchContext = createContext<SwitchContextType | undefined>(undefined);

export const useSwitch = () => {
  const ctx = useContext(SwitchContext);
  if (!ctx) throw new Error('useSwitch must be used within a SwitchProvider');
  return ctx;
};
