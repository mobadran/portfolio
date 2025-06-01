import './globals.css';
import { ScreenProvider } from '@/context/ScreenContext';

export const metadata = {
  title: "Badraan's Land",
  description:
    "Muhammad Badraan's interactive terminal-style portfolio showcasing MERN stack development skills, projects, and experience. Features a unique terminal interface with multiple windows and keyboard navigation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ScreenProvider>{children}</ScreenProvider>
      </body>
    </html>
  );
}
