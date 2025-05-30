import { FaGithub, FaGlobe, FaReact } from 'react-icons/fa';
// import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
import { SiExpress, SiMongodb, SiNextdotjs, SiTypescript } from 'react-icons/si';
// import 'keen-slider/keen-slider.min.css';
// import { useKeenSlider } from 'keen-slider/react.es'; // import from 'keen-slider/react.es' for to get an ES module
import { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import Image from 'next/image';
import { GrMysql } from 'react-icons/gr';
import { motion } from 'framer-motion';
import Spotlight from './Spotlight';

function MainGUI() {
  const [showHighlight, setShowHighlight] = useState(false);
  const [liveSitePortfolio, setLiveSitePortfolio] = useState(false);
  // const [sliderRef, instanceRef] = useKeenSlider({
  //   slideChanged() {
  //     console.log('slide changed');
  //   },
  //   loop: true,
  // });
  return (
    <main className="flex flex-col">
      <motion.div
        className="relative flex grow flex-col items-center justify-evenly gap-8 p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
      >
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
            {/* <br /> */}
            {/* Ready to transform your Mona Lisa into a functional eye-catching website?{' '} */}
          </p>
          <button
            className="rounded-2xl bg-emerald-600 px-4 py-2 hover:cursor-pointer hover:bg-emerald-500"
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
            {/* <button
            onClick={() => instanceRef.current?.prev()}
            aria-label="Previous Slide"
            className="rounded-l-2xl bg-[#0d0d0d]/60 p-0.25 text-white hover:cursor-pointer hover:bg-[#0d0d0d]/80 sm:p-2"
          >
            <IoMdArrowDropleft />
          </button> */}
            {/* <div ref={sliderRef} className="keen-slider bg-[#0d0d0d]/80 backdrop-blur-sm"> */}
            <div className="keen-slider bg-[#0d0d0d]/80 backdrop-blur-sm">
              <div className="keen-slider__slide w-full">
                <div className="flex flex-col items-center lg:flex-row">
                  <div>
                    <Image
                      src="/portfolio-image.png"
                      alt="Screenshot of my portfolio"
                      width={1000}
                      height={1000}
                      className="w-64 rounded-r-lg object-cover shadow-lg sm:w-100 md:w-125"
                      priority
                    />
                  </div>
                  <div className="flex flex-col justify-between gap-4 p-4">
                    <div className="flex justify-between">
                      <div className="flex flex-col items-baseline gap-4 sm:flex-row">
                        <h2 className="text-xl">My Portfolio</h2>
                        {/* Technologies */}
                        <ul className="flex gap-2">
                          <li className="rounded bg-neutral-900 px-2 py-1 text-sm text-white">Next.js</li>
                          <li className="rounded bg-cyan-900/40 px-2 py-1 text-sm text-cyan-300">TailwindCSS</li>
                        </ul>
                      </div>
                    </div>

                    {/* Description */}
                    <p>A Project that took 4 days to complete and showed my creativity and React skills.</p>
                    {/* Links */}
                    <div className="flex flex-wrap items-center gap-6 text-white/50">
                      <a className="hover:text-white" href="https://github.com/mobadran/portfolio" target="_blank">
                        <FaGithub />
                      </a>
                      <button
                        className={`hover:cursor-pointer hover:text-white ${liveSitePortfolio && 'text-white hover:cursor-default'}`}
                        onClick={() => {
                          setLiveSitePortfolio(true);
                        }}
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
                      <span className="text-sm text-white/50">Leave a star in the repo if you like it! 🌟</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <button
            onClick={() => instanceRef.current?.next()}
            aria-label="Next Slide"
            className="rounded-r-2xl bg-[#0d0d0d]/60 p-0.25 text-white hover:cursor-pointer hover:bg-[#0d0d0d]/80 sm:p-2"
          >
            <IoMdArrowDropright />
          </button> */}
          </div>
        </section>
      </motion.div>
    </main>
  );
}

export default MainGUI;
