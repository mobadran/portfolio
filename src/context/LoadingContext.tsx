import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface LoadingContextType {
  shouldBeLoading: boolean;
  setShouldBeLoading: (value: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize with a consistent value for SSR and initial client render
  const [shouldBeLoading, setShouldBeLoading] = useState(true);

  useEffect(() => {
    // This effect runs only on the client after hydration
    const hasLoadedInSession = sessionStorage.getItem('hasLoadedInSession');
    if (hasLoadedInSession === 'true') {
      setShouldBeLoading(false); // Update state based on sessionStorage
    }
  }, []); // Empty dependency array ensures it runs once on mount

  return <LoadingContext.Provider value={{ shouldBeLoading, setShouldBeLoading }}>{children}</LoadingContext.Provider>;
};

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
