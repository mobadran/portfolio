'use client';
import { useClock } from '@/hooks/useClock';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { PiReadCvLogoBold } from 'react-icons/pi';
import Switch from './Switch';

const Header = ({ SkipButton }: { SkipButton: React.ReactNode | null }) => {
  const date = useClock();

  return (
    <header className="flex h-14 items-center justify-between bg-neutral-900/60 px-8 py-1">
      {/* Badraan */}
      {/* <div className="text-2xl font-bold text-white">Badraan</div> */}
      {SkipButton ? SkipButton : <Switch />}

      {/* Date & Time */}
      <div className="hidden h-full items-center gap-2 rounded-full px-3 text-sm text-white transition-colors duration-500 hover:bg-white/10 sm:flex">
        <span className="font-bold">{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        <span>•</span>
        <span className="text-white/70">
          {date.toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
          })}
        </span>
      </div>

      {/* Social Links */}
      <ul className="flex gap-5 text-xl text-white/40" id="socialLinks">
        <li className="transition-colors duration-200 hover:text-white" title="Github">
          <a target="_blank" href="https://github.com/mobadran">
            <FaGithub />
          </a>
        </li>
        <li className="transition-colors duration-200 hover:text-white" title="Linkedin">
          <a target="_blank" href="https://linkedin.com/in/badraan">
            <FaLinkedin />
          </a>
        </li>
        <li className="transition-colors duration-200 hover:text-white" title="Email">
          <a target="_blank" href="mailto:badraanmo@gmail.com">
            <IoMdMail />
          </a>
        </li>
        <li className="transition-colors duration-200 hover:text-white" title="Resume">
          <a target="_blank" href="resume.pdf">
            <PiReadCvLogoBold />
          </a>
        </li>
      </ul>
    </header>
  );
};

export default Header;
