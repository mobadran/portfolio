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
    // This effect runs when isClient is true or shouldBeLoading changes.
    // If we are on the client and the loading screen is supposed to be active
    // (meaning LoadingProvider determined it's the first load in this session),
    // then we mark this session in sessionStorage to remember that loading has occurred.
    if (isClient && shouldBeLoading) {
      const hasLoadedInSession = sessionStorage.getItem('hasLoadedInSession');
      if (hasLoadedInSession !== 'true') {
        sessionStorage.setItem('hasLoadedInSession', 'true');
      }
    }
  }, [isClient, shouldBeLoading]);

  return (
    <div className="flex h-screen flex-col">
      {/* Ensure Header's showSwitch logic is safe for SSR or defaults appropriately */}
      {/* For example, only show switch on client: showSwitch={isClient ? !shouldBeLoading : false} */}
      {/* Keeping original for now, assuming Header is robust: */}
      <Header showSwitch={!shouldBeLoading} />
      {/* Conditional rendering based on client status and loading state from context */}
      {isClient && (
        shouldBeLoading ? <Loading /> : <MainGUI />
      )}
      {/* If !isClient (SSR), neither Loading nor MainGUI will render here, preventing hydration issues for them. */}
      {/* The initial server render will be consistent with the client's first paint before this logic runs. */}
    </div>
  );
}
