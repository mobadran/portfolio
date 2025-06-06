import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LoadingContextType {
  shouldBeLoading: boolean;
  setShouldBeLoading: (value: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [shouldBeLoading, setShouldBeLoading] = useState(true);

  return (
    <LoadingContext.Provider value={{ shouldBeLoading, setShouldBeLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
