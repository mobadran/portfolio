'use client';
import Header from '@/components/Header';
import MainGUI from '@/components/MainGUI';
import { useEffect, useState } from 'react';

import { getContent } from '@/lib/sanity';
import { CmsContentProvider, CmsContent } from '@/context/CmsContentContext';

export default function Home() {
  return <HomeContent />;
}

function HomeContent() {
  const [cmsContent, setCmsContent] = useState<CmsContent | undefined>();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    getContent().then((content) => {
      setCmsContent(content);
    });
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!cmsContent) {
    return null;
  }

  return (
    <CmsContentProvider value={cmsContent}>
      <div className="flex h-screen flex-col">
        <Header showSwitch={true} content={cmsContent?.header || null} />
        {isClient && <MainGUI content={cmsContent?.header || null} projects={cmsContent?.projects || null} />}
      </div>
    </CmsContentProvider>
  );
}
