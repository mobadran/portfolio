export default {
  name: 'header',
  title: 'Header Content',
  type: 'document',
  __experimental_actions: ['update', 'publish' /* 'create', 'delete' */],
  fields: [
    {
      name: 'github',
      type: 'url',
    },
    {
      name: 'linkedin',
      type: 'url',
    },
    {
      name: 'email',
      type: 'string',
    },
    {
      name: 'resume',
      type: 'file',
    },
  ],
}
