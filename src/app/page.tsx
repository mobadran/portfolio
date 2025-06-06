'use client';
import Loading from '@/components/Loading';
import Header from '@/components/Header';
import MainGUI from '@/components/MainGUI';
import { LoadingProvider, useLoading } from '@/context/LoadingContext';
import { useEffect, useState } from 'react';

export default function Home() {
  return (
    <LoadingProvider>
      <HomeContent />
    </LoadingProvider>
  );
}

function HomeContent() {
  const { shouldBeLoading } = useLoading();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && shouldBeLoading) {
      const hasLoadedInSession = sessionStorage.getItem('hasLoadedInSession');
      if (hasLoadedInSession !== 'true') {
        sessionStorage.setItem('hasLoadedInSession', 'true');
      }
    }
  }, [isClient, shouldBeLoading]);

  return (
    <div className="flex h-screen flex-col">
      <Header showSwitch={!shouldBeLoading} />

      {isClient && (shouldBeLoading ? <Loading /> : <MainGUI />)}
    </div>
  );
}
