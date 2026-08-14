// Local backup of the Joshua Udom portfolio Sanity dataset.
//
// Exports every document (published + drafts) and all assets (images/files)
// into a single timestamped .tar.gz archive under /backups.
//
// Usage:
//   SANITY_AUTH_TOKEN=xxxx node scripts/backup-local.js
// or, easier:
//   bash scripts/backup-local.sh
//
// Get a read-only token at https://www.sanity.io/manage -> API -> Tokens
// (role "viewer" is enough — export only reads).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";
import exportDataset from "@sanity/export";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const backupsDir = path.resolve(__dirname, "../backups");

// Public identifiers for this project (not secrets).
const PROJECT_ID = process.env.SANITY_PROJECT_ID || "rklan5yk";
const DATASET = process.env.SANITY_DATASET || "production";
const API_VERSION = process.env.SANITY_API_VERSION || "2024-01-01";

function timestamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return (
    `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}` +
    `-${pad(now.getHours())}${pad(now.getMinutes())}`
  );
}

function formatBytes(bytes) {
  const mb = bytes / (1024 * 1024);
  if (mb >= 1024) return `${(mb / 1024).toFixed(2)} GB`;
  return `${mb.toFixed(1)} MB`;
}

async function main() {
  if (!process.env.SANITY_AUTH_TOKEN) {
    console.error(
      "Error: SANITY_AUTH_TOKEN is not set.\n" +
        "  1. Get a read-only token at https://www.sanity.io/manage -> API -> Tokens\n" +
        "  2. Run:  SANITY_AUTH_TOKEN=xxxx bash scripts/backup-local.sh",
    );
    process.exit(1);
  }

  if (!fs.existsSync(backupsDir)) {
    fs.mkdirSync(backupsDir, { recursive: true });
  }

  const outputPath = path.join(backupsDir, `production-${timestamp()}.tar.gz`);

  const client = createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: API_VERSION,
    token: process.env.SANITY_AUTH_TOKEN,
    useCdn: false,
  });

  console.log(`Backing up ${DATASET} (${PROJECT_ID}) ...`);
  let progress = 0;

  await exportDataset({
    client,
    dataset: DATASET,
    outputPath,
    assets: true,
    drafts: true,
    compress: true,
    assetConcurrency: 12,
    onProgress: ({ step, current, total }) => {
      // Only print at most one progress line per step to keep output readable.
      if (current !== total && Math.floor(current / 10) === progress) {
        progress = Math.floor(current / 10);
        console.log(`  ${step}: ${current}/${total ?? "?"}`);
      }
    },
  });

  const stats = fs.statSync(outputPath);
  console.log(`Done: ${outputPath} (${formatBytes(stats.size)})`);
}

main().catch((err) => {
  console.error("Backup failed:", err.message || err);
  process.exit(1);
});
