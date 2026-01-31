export const queries = {
  projects: `*[_type == "project"] | order(order asc) {
    _id,
    title,
    slug,
    category,
    featuredImage,
    description,
    featured
  }`,
  projectBySlug: `*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    category,
    featuredImage,
    gallery,
    client,
    year,
    description,
    caseStudy,
    tools,
    featured
  }`,
  siteSettings: `*[_type == "siteSettings"][0]`,
  categories: `*[_type == "category"]`
}
