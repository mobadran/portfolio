import Header from '@/components/Header';
import { CmsContentProvider } from '@/context/CmsContentContext';
import { getContent } from '@/lib/sanity';

export default async function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cmsContent = await getContent();
  return (
    <CmsContentProvider value={cmsContent}>
      <main className="flex min-h-screen flex-col transition-colors duration-600">
        <Header showSwitch={true} content={cmsContent?.header || null} />
        {children}
      </main>
    </CmsContentProvider>
  );
}
