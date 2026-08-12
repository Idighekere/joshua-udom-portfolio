// One-off migration for the Joshua Udom portfolio Sanity dataset.
//
// What it does (non-destructive — only sets category and slug, never
// touches images, gallery, case study, or any other field):
//   1. Renames category "branding" -> "event branding"
//   2. Backfills a slug for any project missing one (slugify of title)
//
// Usage:
//   SANITY_WRITE_TOKEN=xxxx bun run scripts/migrate-projects.js
//
// Get a write token at https://www.sanity.io/manage -> API -> Tokens.
// If you prefer not to run this, do the same manually in Studio:
//   - open each project, change Category dropdown to "Event Branding"
//   - click "Generate" on the Slug field, then publish.

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || "rklan5yk",
  dataset: process.env.SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function main() {
  if (!process.env.SANITY_WRITE_TOKEN) {
    console.error(
      "Error: SANITY_WRITE_TOKEN environment variable is required.",
    );
    process.exit(1);
  }

  const docs = await client.fetch(
    `*[_type == "project" && (category == "branding" || !defined(slug.current))]{ _id, title, category, slug }`,
  );

  console.log(`Found ${docs.length} project(s) to migrate.`);

  for (const doc of docs) {
    const patch = client.patch(doc._id);
    let changed = false;

    if (doc.category === "branding") {
      patch.set({ category: "event branding" });
      console.log(`  • ${doc.title}: category "branding" -> "event branding"`);
      changed = true;
    }

    if (!doc.slug?.current && doc.title) {
      const generated = slugify(doc.title);
      patch.set({ slug: { _type: "slug", current: generated } });
      console.log(`  • ${doc.title}: backfilled slug "${generated}"`);
      changed = true;
    }

    if (changed) await patch.commit();
  }

  console.log("Migration complete.");
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
