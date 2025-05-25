'use client';
import { useClock } from '@/hooks/useClock';
import { MdBattery6Bar, MdOutlineBluetooth, MdOutlineSignalWifiStatusbar4Bar } from 'react-icons/md';

const Header = () => {
  const date = useClock();

  return (
    <header className='flex bg-neutral-900/60 justify-between items-center px-8 py-1 h-14'>
      {/* Badraan */}
      <div className='text-white text-2xl font-bold'>Badraan</div>

      {/* Date & Time */}
      <div className='flex gap-2 text-white text-sm rounded-full px-3 h-full items-center hover:bg-white/10'>
        <span className='font-bold'>{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        <span>•</span>
        <span className='text-white/70'>{date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
      </div>

      {/* Wifi, Bluetooth */}
      <div className='flex items-center space-x-4 rounded-full bg-white/5 hover:bg-white/10 px-4 h-full'>
        <MdBattery6Bar />
        <MdOutlineBluetooth />
        <MdOutlineSignalWifiStatusbar4Bar />
      </div>
    </header>
  );
};

export default Header;
