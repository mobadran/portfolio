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
        <meta
          name="description"
          content="Muhammad Badraan's interactive terminal-style portfolio showcasing MERN stack development skills, projects, and experience. Features a unique terminal interface with multiple windows and keyboard navigation."
        />

        <title>Badraan&apos; s Terminal</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <SwitchProvider>{children}</SwitchProvider>
      </body>
    </html>
  );
}
