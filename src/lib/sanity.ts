import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: '7w3883rc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

const query = `*[_type == "project"]`;

export async function getProjects() {
  const projects = await client.fetch(query);
  return projects;
}

export function urlFor(source: object) {
  return imageUrlBuilder(client).image(source);
}
