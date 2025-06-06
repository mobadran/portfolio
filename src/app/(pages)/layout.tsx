import Header from '@/components/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen flex-col transition-colors duration-600">
          <Header showSwitch={true} />
          {children}
        </main>
      </body>
    </html>
  );
}
