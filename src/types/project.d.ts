export type ProjectData = {
  image: string;
  name: string;
  description: string;
  technologies: string[];
  liveSite?: string;
  github?: string;
};

export type ProjectDataWithImageObject = Omit<ProjectData, 'image'> & {
  image: {
    url: string;
  };
  description: array;
};
