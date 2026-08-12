import GalleryInput from "../components/GalleryInput";

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
      validation: (Rule) =>
        Rule.required().error("Generate a slug before publishing"),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ["flyer", "church", "social", "event branding"] },
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
      description:
        "Upload a batch of project designs here (use 'Upload multiple images', or drag files in). Separate from the Featured Image.",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      options: { layout: "grid" },
      components: { input: GalleryInput },
    },
    { name: "client", title: "Client Name", type: "string" },
    { name: "year", title: "Year", type: "string" },
    {
      name: "collaborators",
      title: "Collaborators",
      type: "array",
      of: [{ type: "string" }],
      description: "Names of people who worked on this (team) project",
    },
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
