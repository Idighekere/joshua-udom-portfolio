export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    { name: 'name', title: 'Designer Name', type: 'string' },
    { name: 'title', title: 'Professional Title', type: 'string' },
    { name: 'tagline', title: 'Tagline', type: 'text' },
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'aboutText',
      title: 'About Text',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'tools',
      title: 'Tools',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Platform', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
            { name: 'icon', title: 'Icon Name', type: 'string' }
          ]
        }
      ]
    }
  ]
}
