'use client';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import MainGUI from '@/components/MainGUI';
import TerminalGrid from '@/components/TerminalGrid';
import { useScreen } from '@/context/ScreenContext';
import { AnimatePresence } from 'framer-motion';

export default function Home() {
  const { screen } = useScreen();

  return (
    <div className="flex min-h-screen flex-col transition-colors duration-600">
      <Header />
      <main className="flex flex-col">
        <AnimatePresence mode="wait">
          {screen === 'loading' && <Loading key="loading" />}
          {screen === 'gui' && <MainGUI key="gui" />}
          {screen === 'cli' && <TerminalGrid key="cli" />}
        </AnimatePresence>
      </main>
    </div>
  );
}
