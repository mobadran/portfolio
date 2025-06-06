'use client';
import Loading from '@/components/Loading';
import Header from '@/components/Header';
import MainGUI from '@/components/MainGUI';
import { LoadingProvider, useLoading } from '@/context/LoadingContext';
import { useEffect } from 'react';

export default function Home() {
  return (
    <LoadingProvider>
      <HomeContent />
    </LoadingProvider>
  );
}

function HomeContent() {
  const { shouldBeLoading, setShouldBeLoading } = useLoading();

  useEffect(() => {
    if (shouldBeLoading) {
      const hasLoadedInSession = sessionStorage.getItem('hasLoadedInSession');
      if (hasLoadedInSession === 'true') {
        setShouldBeLoading(false);
      } else {
        sessionStorage.setItem('hasLoadedInSession', 'true');
      }
    }
  }, [shouldBeLoading, setShouldBeLoading]);

  return (
    <div className="flex h-screen flex-col">
      <Header showSwitch={!shouldBeLoading} />
      {shouldBeLoading && sessionStorage.getItem('hasLoadedInSession') !== 'true' && <Loading />}
      {(!shouldBeLoading || sessionStorage.getItem('hasLoadedInSession') === 'true') && <MainGUI />}
    </div>
  );
}
