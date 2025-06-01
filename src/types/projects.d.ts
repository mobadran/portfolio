export type Project = {
  image: string;
  name: string;
  description: string;
  technologies: string[];
  liveSite: string;
  github: string;
};

declare module '@/data/projects.json' {
  const value: Project[];
  export default value;
}
