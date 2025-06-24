'use client';
import Loading from '@/components/Loading';
import Header from '@/components/Header';
import MainGUI from '@/components/MainGUI';
import { LoadingProvider, useLoading } from '@/context/LoadingContext';
import { useEffect, useState } from 'react';
import { getContent } from '@/lib/sanity';

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
  const [content, setContent] = useState<ContentType | null>(null);

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

  useEffect(() => {
    const fetchContent = async () => {
      const fetchedContent = await getContent();
      setContent(fetchedContent);
    };
    fetchContent();
  }, []);

  return (
    <div className="flex h-screen flex-col">
      <Header showSwitch={!shouldBeLoading} content={content?.header || null} />

      {isClient && (shouldBeLoading ? <Loading /> : <MainGUI projects={content?.projects || null} />)}
    </div>
  );
}
