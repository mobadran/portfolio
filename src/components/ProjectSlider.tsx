'use client';
import { ProjectData } from '@/types/project';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaGithub, FaGlobe } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';

function ProjectSlider({ projects }: { projects: ProjectData[] }) {
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
      spacing: 16,
    },
    created() {
      setLoaded(true);
    },
  });

  // To solve the issue of the slider's width being the old width (before the loaded state is set to true)
  useEffect(() => {
    if (loaded && instanceRef.current) {
      instanceRef.current.update(); // Force recalculation
    }
  }, [loaded, instanceRef]);

  return (
    <div className="flex items-stretch">
      {loaded && (
        <button
          onClick={() => instanceRef.current?.prev()}
          aria-label="Previous Slide"
          className="rounded-l-2xl bg-[#0d0d0d]/60 p-0.25 text-white hover:cursor-pointer hover:bg-[#0d0d0d]/80 sm:p-2"
        >
          <IoMdArrowDropleft />
        </button>
      )}
      <div
        ref={sliderRef}
        className={`keen-slider flex-1 bg-[#0d0d0d]/80 backdrop-blur-sm ${!loaded ? 'opacity-0' : ''}`}
      >
        {projects.length > 0 ? (
          projects.map((project, index) => <Project key={index} data={project} />)
        ) : (
          <p>No projects found</p>
        )}
      </div>
      {loaded && (
        <button
          onClick={() => instanceRef.current?.next()}
          aria-label="Next Slide"
          className="rounded-r-2xl bg-[#0d0d0d]/60 p-0.25 text-white hover:cursor-pointer hover:bg-[#0d0d0d]/80 sm:p-2"
        >
          <IoMdArrowDropright />
        </button>
      )}
    </div>
  );
}

function Project({ data }: { data: ProjectData }) {
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
    <div className="keen-slider__slide p-4">
      <div className="flex h-full flex-col items-stretch gap-4 lg:flex-row">
        <div className="relative h-50 w-full flex-shrink-0 lg:w-50">
          <Image
            src={data.image}
            alt={data.name}
            fill
            className="rounded-lg object-contain shadow-lg"
            sizes="(max-width: 1023px) 100vw, 200px"
          />
        </div>
        <div className="flex grow flex-col justify-between gap-4">
          <div className="flex justify-between">
            <div className="flex flex-col items-baseline gap-4 sm:flex-row">
              <h2 className="text-xl">{data.name}</h2>
              {/* Technologies */}
              <ul className="flex flex-wrap gap-2">
                {data.technologies.map((technology, index) => {
                  const tech = techTags.find((tag) => tag.name === technology);
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

export default ProjectSlider;
