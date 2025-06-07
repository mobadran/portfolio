import { FaReact } from 'react-icons/fa';
import { SiExpress, SiMongodb, SiNextdotjs, SiTypescript } from 'react-icons/si';
import { GrMysql } from 'react-icons/gr';
import Attribution from '@/components/Attribution';
import ProjectSlider from '@/components/ProjectSlider';
import { SpotlightButton } from './SpotlightButton';
import projects from '@/data/projects.json';

function MainGUI() {
  return (
    <div className="flex grow flex-col" id="mainGUI">
      <div className="flex grow flex-col items-center justify-evenly gap-8 p-8 pb-0">
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
          <SpotlightButton />
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
          <ProjectSlider projects={projects} />
        </section>
      </div>
      <Attribution />
    </div>
  );
}

export default MainGUI;
