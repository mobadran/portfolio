import Header from '@/components/Header';

export default function PagesLayout({
  // Renamed for clarity
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen flex-col transition-colors duration-600">
      <Header showSwitch={true} />
      {children}
    </main>
  );
}
