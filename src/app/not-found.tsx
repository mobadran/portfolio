import Image from 'next/image';

function NotFound() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-20 bg-black/50 p-4">
      <Image src="/not-found.webp" alt="Not Found" width={300} height={300} />
      <p className="text-center text-4xl font-bold text-white">404 - Page Not Found</p>
    </main>
  );
}

export default NotFound;
