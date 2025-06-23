import { useState } from 'react';
import Modal from '@/components/Modal';
import { PiReadCvLogoBold } from 'react-icons/pi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';

const ContactButton = () => {
  const [warningShown, setWarningShown] = useState(false);
  return (
    <>
      {warningShown && (
        <Modal
          message={
            <ul className="flex flex-col gap-2 text-xl text-white/40" id="socialLinks">
              <li className="transition-colors duration-200 hover:text-white" title="Github">
                <a
                  className="flex items-center gap-2"
                  target="_blank"
                  href="https://github.com/mobadran"
                  aria-label="github"
                >
                  <FaGithub />
                  <b>github.com/mobadran</b>
                </a>
              </li>
              <li className="transition-colors duration-200 hover:text-white" title="Linkedin">
                <a
                  className="flex items-center gap-2"
                  target="_blank"
                  href="https://linkedin.com/in/badraan"
                  aria-label="linkedin"
                >
                  <FaLinkedin />
                  <b>linkedin.com/in/badraan</b>
                </a>
              </li>
              <li className="transition-colors duration-200 hover:text-white" title="Email">
                <a
                  className="flex items-center gap-2"
                  target="_blank"
                  href="mailto:badraanmo@gmail.com"
                  aria-label="email"
                >
                  <IoMdMail />
                  <b>badraanmo@gmail.com</b>
                </a>
              </li>
              <li className="transition-colors duration-200 hover:text-white" title="Resume">
                <a className="flex items-center gap-2" target="_blank" href="resume.pdf" aria-label="resume">
                  <PiReadCvLogoBold />
                  <b>resume</b>
                </a>
              </li>
            </ul>
          }
          onClose={() => setWarningShown(false)}
        />
      )}

      <button
        className="rounded-2xl bg-emerald-600 px-4 py-2 text-emerald-50 transition-colors duration-250 hover:cursor-pointer hover:bg-emerald-500 hover:text-emerald-100"
        onClick={() => setWarningShown(true)}
      >
        Contact Me!
      </button>
    </>
  );
};

export default ContactButton;
