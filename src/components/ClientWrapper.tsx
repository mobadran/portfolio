'use client';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  // Switch to CLI/GUI
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.altKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        if (pathname === '/gui') router.push('/cli');
        else router.push('/gui');
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [pathname, router]);

  return (
    <div className="flex min-h-screen flex-col transition-colors duration-600">
      <main className="flex flex-col">{children}</main>
    </div>
  );
};
