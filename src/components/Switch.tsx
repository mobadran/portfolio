import { useScreen } from '@/context/ScreenContext';
import { FaHome, FaTerminal } from 'react-icons/fa';

function Switch() {
  const { screen, setScreen } = useScreen();
  return (
    <div className="flex items-center">
      <label htmlFor="hs-large-soft-switch-with-icons" className="relative inline-block h-8 w-15 cursor-pointer">
        <input
          checked={screen === 'cli'}
          onChange={(e) => setScreen(e.target.checked ? 'cli' : 'gui')}
          type="checkbox"
          id="hs-large-soft-switch-with-icons"
          className="peer sr-only"
        />
        <span className="absolute inset-0 rounded-full bg-neutral-800 transition-colors duration-200 ease-in-out peer-checked:bg-neutral-900 peer-disabled:pointer-events-none peer-disabled:opacity-50"></span>
        <span className="absolute start-0.5 top-1/2 size-7 -translate-y-1/2 rounded-full bg-white/10 shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full peer-checked:bg-white/5"></span>
        {/* <!-- Left Icon (Off) --> */}
        <span className="absolute start-1.5 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center text-white transition-colors duration-200 peer-checked:text-white/50">
          <FaHome />
        </span>
        {/* <!-- Right Icon (On) --> */}
        <span className="absolute end-1.5 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center text-white/50 transition-colors duration-200 peer-checked:text-white">
          <FaTerminal />
        </span>
      </label>
    </div>
  );
}

export default Switch;
