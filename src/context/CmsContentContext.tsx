'use client';

import React, { createContext, useContext } from 'react';

export type CmsContent = {
  header: {
    email: string;
    github: string;
    linkedin: string;
    resume: string;
  };
  projects: {
    _createdAt: string;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: string;
    description: string;
    image: string;
    liveSite: string;
    name: string;
    technologies: string[];
  }[];
};

const CmsContentContext = createContext<CmsContent | undefined>(undefined);

export const CmsContentProvider = ({ value, children }: { value: CmsContent; children: React.ReactNode }) => (
  <CmsContentContext.Provider value={value}>{children}</CmsContentContext.Provider>
);

export function useCmsContent() {
  const context = useContext(CmsContentContext);
  if (context === undefined) {
    throw new Error('useCmsContent must be used within a CmsContentProvider');
  }
  return context;
}
