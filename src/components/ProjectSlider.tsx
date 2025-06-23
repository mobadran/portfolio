'use client';
import { ProjectData } from '@/types/project';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useState } from 'react';
import Image from 'next/image';
import { FaGithub, FaGlobe } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';
import { Navigation } from 'swiper/modules';

function ProjectSlider({ projects }: { projects: ProjectData[] }) {
  return (
    <div className="flex items-stretch">
      <button
        aria-label="Previous Slide"
        className="rounded-l-2xl bg-[#0d0d0d]/60 p-0.25 text-white hover:cursor-pointer hover:bg-[#0d0d0d]/80 sm:p-2"
        id="prev-button"
      >
        <IoMdArrowDropleft />
      </button>
      <Swiper
        className="bg-[#0d0d0d]/80"
        modules={[Navigation]}
        navigation={{
          nextEl: '#next-button',
          prevEl: '#prev-button',
        }}
        spaceBetween={16}
        slidesPerView={1}
        loop={true}
      >
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <SwiperSlide key={index} className="p-4">
              <Project data={project} />
            </SwiperSlide>
          ))
        ) : (
          <p>No projects found</p>
        )}
      </Swiper>
      <button
        aria-label="Next Slide"
        className="rounded-r-2xl bg-[#0d0d0d]/60 p-0.25 text-white hover:cursor-pointer hover:bg-[#0d0d0d]/80 sm:p-2"
        id="next-button"
      >
        <IoMdArrowDropright />
      </button>
    </div>
  );
}

function Project({ data }: { data: ProjectData }) {
  const [liveSitePortfolio, setLiveSitePortfolio] = useState(false);

  return (
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
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <h2 className="text-2xl">{data.name}</h2>
            {/* Technologies */}
            <ul className="flex flex-wrap gap-2">
              {data.technologies.map((technology, index) => {
                return (
                  <li key={index} className="rounded bg-stone-900 px-2 py-1 text-sm">
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
            (data.liveSite === 'https://badraan.is-a.dev' ? (
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
                    className="mb-0"
                  />
                ) : (
                  <FaGlobe className="inline h-4 w-4 align-text-bottom" />
                )}
              </button>
            ) : (
              <a className="hover:text-white" href={data.liveSite} target="_blank" rel="noopener noreferrer">
                <FaGlobe className="inline h-4 w-4 align-text-bottom" />
              </a>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectSlider;
