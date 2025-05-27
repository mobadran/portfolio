'use client';
import { useClock } from '@/hooks/useClock';
import {
  MdBattery6Bar,
  MdOutlineBluetooth,
  MdOutlineSignalWifiStatusbar4Bar,
} from 'react-icons/md';

const Header = () => {
  const date = useClock();

  return (
    <header className="flex h-14 items-center justify-between bg-neutral-900/60 px-8 py-1">
      {/* Badraan */}
      <div className="text-2xl font-bold text-white">Badraan</div>

      {/* Date & Time */}
      <div className="flex h-full items-center gap-2 rounded-full px-3 text-sm text-white hover:bg-white/10">
        <span className="font-bold">
          {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
        <span>•</span>
        <span className="text-white/70">
          {date.toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
          })}
        </span>
      </div>

      {/* Wifi, Bluetooth */}
      <div className="flex h-full items-center space-x-4 rounded-full bg-white/5 px-4 hover:bg-white/10">
        <MdBattery6Bar />
        <MdOutlineBluetooth />
        <MdOutlineSignalWifiStatusbar4Bar />
      </div>
    </header>
  );
};

export default Header;
