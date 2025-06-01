import { FaGithub, FaGlobe, FaReact } from 'react-icons/fa';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
import { SiExpress, SiMongodb, SiNextdotjs, SiTypescript } from 'react-icons/si';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react.es';
import { useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import Image from 'next/image';
import { GrMysql } from 'react-icons/gr';
import Spotlight from '@/components/Spotlight';
import Attribution from '@/components/Attribution';
import { motion } from 'framer-motion';
import { useScreen } from '@/context/ScreenContext';

function MainGUI() {
  const [showHighlight, setShowHighlight] = useState(false);
  const { setScreen } = useScreen();
  const [sliderRef, instanceRef] = useKeenSlider({ loop: true });
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetch('/projects.json')
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);
  useEffect(() => {
    instanceRef.current?.update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);

  // Switch to CLI
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.altKey && event.key.toLowerCase() === 's') {
        event.preventDefault();
        setScreen('cli');
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setScreen]);

  return (
    <motion.div
      className="flex grow flex-col"
      initial={{ opacity: 0, backgroundColor: 'rgba(0, 0, 0, 0)' }}
      animate={{ opacity: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      exit={{ opacity: 0, backgroundColor: 'rgba(0, 0, 0, 0)' }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex grow flex-col items-center justify-evenly gap-8 p-8 pb-0">
        {showHighlight && <Spotlight targetSelector="#socialLinks" onClose={() => setShowHighlight(false)} />}
        {/* Role, Name */}
        <section className="flex max-w-250 flex-col items-center gap-4">
          <span className="glow text-center text-2xl font-bold text-white/80 lg:text-5xl">Full Stack Developer</span>
          <h1 className="animate-gradient bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 bg-[length:200%_200%] bg-clip-text text-center text-5xl font-bold text-transparent lg:text-8xl">
            Muhammad Badraan
          </h1>
          <p className="text-center text-lg text-white/80 lg:text-2xl">
            <strong>MERN Stack</strong> Developer with experience in <strong>Next.js</strong> and <strong>MySQL</strong>
            . Looking for opportunities to grow as a developer and contribute to solid teams. Also, I love{' '}
            <strong>cats!</strong> 😸
          </p>
          <button
            className="rounded-2xl bg-emerald-600 px-4 py-2 text-emerald-50 transition-colors duration-250 hover:cursor-pointer hover:bg-emerald-500 hover:text-emerald-100"
            onClick={() => setShowHighlight(true)}
          >
            Contact Me!
          </button>
        </section>

        <hr />

        {/* Skills */}
        <section className="container flex justify-center">
          <ul className="mx-auto flex flex-wrap justify-center gap-14 text-5xl text-white/40">
            <li className="flex flex-col items-center gap-2 transition-colors duration-250 hover:cursor-pointer hover:text-white">
              <SiMongodb title="MongoDB" />
              <span className="text-lg">MongoDB</span>
            </li>
            <li className="flex flex-col items-center gap-2 transition-colors duration-250 hover:cursor-pointer hover:text-white">
              <SiExpress title="Express.js" />
              <span className="text-lg">Express.js</span>
            </li>
            <li className="flex flex-col items-center gap-2 transition-colors duration-250 hover:cursor-pointer hover:text-white">
              <FaReact title="React.js" />
              <span className="text-lg">React.js</span>
            </li>
            <li className="flex flex-col items-center gap-2 transition-colors duration-250 hover:cursor-pointer hover:text-white">
              <SiNextdotjs title="Next.js" />
              <span className="text-lg">Next.js</span>
            </li>
            <li className="flex flex-col items-center gap-2 transition-colors duration-250 hover:cursor-pointer hover:text-white">
              <SiTypescript title="TypeScript" />
              <span className="text-lg">TypeScript</span>
            </li>
            <li className="flex flex-col items-center gap-2 transition-colors duration-250 hover:cursor-pointer hover:text-white">
              <GrMysql title="MySQL" />
              <span className="text-lg">MySQL</span>
            </li>
          </ul>
        </section>
        <hr />

        {/* Projects */}
        <section className="w-full lg:max-w-200">
          <div className="flex items-stretch">
            <button
              onClick={() => instanceRef.current?.prev()}
              aria-label="Previous Slide"
              className="rounded-l-2xl bg-[#0d0d0d]/60 p-0.25 text-white hover:cursor-pointer hover:bg-[#0d0d0d]/80 sm:p-2"
            >
              <IoMdArrowDropleft />
            </button>
            <div ref={sliderRef} className="keen-slider bg-[#0d0d0d]/80 backdrop-blur-sm">
              {projects.length > 0 ? (
                projects.map((project, index) => <Project key={index} data={project} />)
              ) : (
                <p>No projects found</p>
              )}
            </div>
            <button
              onClick={() => instanceRef.current?.next()}
              aria-label="Next Slide"
              className="rounded-r-2xl bg-[#0d0d0d]/60 p-0.25 text-white hover:cursor-pointer hover:bg-[#0d0d0d]/80 sm:p-2"
            >
              <IoMdArrowDropright />
            </button>
          </div>
        </section>
      </div>
      <Attribution />
    </motion.div>
  );
}

function Project({
  data,
}: {
  data: {
    image: string;
    name: string;
    description: string;
    technologies: string[];
    liveSite?: string;
    github?: string;
  };
}) {
  const [liveSitePortfolio, setLiveSitePortfolio] = useState(false);
  const techTags = [
    { name: 'TypeScript', bg: '#3178C6', text: '#FFFFFF' },
    { name: 'React', bg: '#61DAFB', text: '#000000' },
    { name: 'Next.js', bg: '#000000', text: '#FFFFFF' },
    { name: 'Express', bg: '#000000', text: '#FFFFFF' },
    { name: 'MongoDB', bg: '#47A248', text: '#FFFFFF' },
    { name: 'Tailwind CSS', bg: '#06B6D4', text: '#FFFFFF' },
    { name: 'React Native', bg: '#61DAFB', text: '#000000' },
    { name: 'Expo', bg: '#000020', text: '#FFFFFF' },
  ];

  return (
    <div className="keen-slider__slide flex w-full flex-col justify-center">
      <div className="flex flex-col items-stretch lg:flex-row">
        <div className="relative h-50 max-h-full w-50 flex-shrink-0">
          <Image src={data.image} alt={data.name} fill className="max-h-full rounded-r-lg object-contain shadow-lg" />
        </div>
        <div className="flex grow flex-col justify-between gap-4 p-4">
          <div className="flex justify-between">
            <div className="flex flex-col items-baseline gap-4 sm:flex-row">
              <h2 className="text-xl">{data.name}</h2>
              {/* Technologies */}
              <ul className="flex gap-2">
                {data.technologies.map((technology, index) => {
                  const tech = techTags.find((tag) => tag.name === technology);
                  console.log(tech);
                  return (
                    <li
                      key={index}
                      className="rounded px-2 py-1 text-sm"
                      style={{ backgroundColor: tech?.bg, color: tech?.text }}
                    >
                      {technology}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Description */}
          <p>{data.description}</p>
          {/* Links */}
          <div className="flex flex-wrap items-center gap-6 text-white/50">
            {data.github && (
              <a className="hover:text-white" href={data.github} target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
            )}
            {data.liveSite &&
              (data.liveSite === 'portfolio' ? (
                <button
                  className={`hover:cursor-pointer hover:text-white ${liveSitePortfolio && 'text-white hover:cursor-default'}`}
                  onClick={() => {
                    setLiveSitePortfolio(true);
                  }}
                  aria-label="Live site portfolio button"
                >
                  {liveSitePortfolio ? (
                    <TypeAnimation
                      sequence={[
                        'You are already here? 🤨',
                        2000,
                        'Anyways, Have Fun! 😅',
                        3000,
                        '',
                        () => setLiveSitePortfolio(false),
                      ]}
                      cursor={false}
                      speed={60}
                    />
                  ) : (
                    <FaGlobe />
                  )}
                </button>
              ) : (
                <a className="hover:text-white" href={data.liveSite} target="_blank" rel="noopener noreferrer">
                  <FaGlobe />
                </a>
              ))}
            {data.github && <p className="w-full text-sm text-white/50">Leave a star in the repo if you like it! 🌟</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainGUI;
