import type { ProjectData } from '@/types/project';

export type ContentType = {
  header: {
    github: string;
    linkedin: string;
    email: string;
    resume: string;
  };
  projects: ProjectData[];
};
