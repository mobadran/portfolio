import { useQueries, useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { loadImage, loadFonts } from '../lib/loaders';

interface LoaderProps {
  imageUrls: string[];
}

export function Loader({ imageUrls }: LoaderProps) {
  // Load images
  const imageQueries = useQueries({
    queries: imageUrls.map((src) => ({
      queryKey: ['image', src],
      queryFn: () => loadImage(src),
      retry: 1,
    })),
  });

  // Load fonts
  const { isLoading: fontsLoading } = useQuery({
    queryKey: ['fonts'],
    queryFn: () => loadFonts(),
  });

  // Compute progress
  const total = imageQueries.length + 1; // +1 for fonts
  const done = imageQueries.filter((q) => q.isSuccess).length + (fontsLoading ? 0 : 1);

  const isLoading = done < total;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loader fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900 text-gray-100"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Spinning icon */}
          <motion.div
            className="mb-6"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          >
            <svg
              className="h-12 w-12 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v4m0 8v4m8-8h-4M4 12H0" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
