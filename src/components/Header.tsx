import { useClock } from '@/hooks/useClock';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { PiReadCvLogoBold } from 'react-icons/pi';
import Switch from '@/components/Switch';
import type { ContentType } from '@/types/sanity';

const Header = ({ content }: { content: ContentType['header'] | null }) => {
  const date = useClock();

  return (
    <header className="flex h-14 items-center justify-between bg-neutral-900/60 px-8 py-1">
      {/* Skip Button or Switch */}
      <Switch />

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
          <a target="_blank" href={content?.github} aria-label="github">
            <FaGithub />
          </a>
        </li>
        <li className="transition-colors duration-200 hover:text-white" title="Linkedin">
          <a target="_blank" href={content?.linkedin} aria-label="linkedin">
            <FaLinkedin />
          </a>
        </li>
        <li className="transition-colors duration-200 hover:text-white" title="Email">
          <a target="_blank" href={'mailto:' + content?.email} aria-label="email">
            <IoMdMail />
          </a>
        </li>
        <li className="transition-colors duration-200 hover:text-white" title="Resume">
          <a target="_blank" href={content?.resume} aria-label="resume">
            <PiReadCvLogoBold />
          </a>
        </li>
      </ul>
    </header>
  );
};

export default Header;
