'use client';
import Loading from '@/components/Loading';
import Header from '@/components/Header';
import MainGUI from '@/components/MainGUI';
import { LoadingProvider, useLoading } from '@/context/LoadingContext';
import { useEffect, useState } from 'react';

import { getContent } from '@/lib/sanity';
import { CmsContentProvider, CmsContent } from '@/context/CmsContentContext';

export default function Home() {
  return (
    <LoadingProvider>
      <HomeContent />
    </LoadingProvider>
  );
}

function HomeContent() {
    const [cmsContent, setCmsContent] = useState<CmsContent | undefined>();
  const { shouldBeLoading } = useLoading();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    getContent().then((content) => {
      setCmsContent(content);
    });
  }, []);

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

  if (!cmsContent) {
    return <Loading />;
  }

  return (
    <CmsContentProvider value={cmsContent}>
      <div className="flex h-screen flex-col">
        <Header showSwitch={!shouldBeLoading} content={cmsContent?.header || null} />
        {isClient && (shouldBeLoading ? <Loading /> : <MainGUI projects={cmsContent?.projects || null} />)}
      </div>
    </CmsContentProvider>
  );
}
