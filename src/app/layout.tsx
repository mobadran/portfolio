import { SwitchProvider } from '@/context/SwitchProvider';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Badraan&apos; s Terminal</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <SwitchProvider>{children}</SwitchProvider>
      </body>
    </html>
  );
}
