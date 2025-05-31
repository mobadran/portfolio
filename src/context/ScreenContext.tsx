'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

export type ScreenType = 'loading' | 'gui' | 'cli';

interface ScreenContextProps {
  screen: ScreenType;
  setScreen: (screen: ScreenType) => void;
}

const ScreenContext = createContext<ScreenContextProps | undefined>(undefined);

export const ScreenProvider = ({ children }: { children: ReactNode }) => {
  const [screen, setScreen] = useState<ScreenType>('loading');

  return <ScreenContext.Provider value={{ screen, setScreen }}>{children}</ScreenContext.Provider>;
};

export const useScreen = () => {
  const context = useContext(ScreenContext);
  if (!context) throw new Error('useScreen must be used within a ScreenProvider');
  return context;
};
