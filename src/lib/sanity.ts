import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: '7w3883rc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

export async function getContent() {
  // const query = `{
  //   "header": *[_type == "header"][0] {
  //     ...,
  //     "resume": resume.asset->url
  //   },
  //   "projects": *[_type == "project"] {
  //     ...,
  //     "image": image.asset->url,
  //   }
  // }`;
  const query = `{
    "header": *[_type == "header"][0] {
      ...,
      "resume": resume.asset->url,
    },
    "projects": *[_type == "project"] {
      ...,
      "image": image.asset->url,
    }
  }`;

  try {
    const data = await client.fetch(query);
    console.log('Data:', data);
    return data;
  } catch (error) {
    console.error('Failed to fetch content:', error);
    return null;
  }
}
