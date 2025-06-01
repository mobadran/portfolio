import { ClientWrapper } from '@/components/ClientWrapper';
import Header from '@/components/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientWrapper>
          <Header showSwitch={true} />
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
