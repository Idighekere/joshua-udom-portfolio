export default {
  name: "project",
  title: "Design Project",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ["flyer", "church", "social", "branding"] },
    },
    {
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "image" }],
    },
    { name: "client", title: "Client Name", type: "string" },
    { name: "year", title: "Year", type: "string" },
    { name: "description", title: "Short Description", type: "text" },
    {
      name: "caseStudy",
      title: "Case Study",
      type: "array",
      of: [{ type: "block" }, { type: "image" }],
    },
    { name: "featured", title: "Featured on Homepage", type: "boolean" },
    { name: "order", title: "Display Order", type: "number" },
  ],
};
