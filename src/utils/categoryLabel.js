const CATEGORY_LABELS = {
  flyer: "Flyer Design",
  church: "Church Design",
  social: "Social Media Design",
  "event branding": "Event Branding",
};

export const getCategoryLabel = (category) => {
  if (!category) return "";
  return CATEGORY_LABELS[category.trim().toLowerCase()] || category;
};