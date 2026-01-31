import { defineCliConfig } from 'sanity/cli'
export default {
  api: {
    projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID || 'rklan5yk',
    dataset: import.meta.env.SANITY_STUDIO_DATASET || 'production'
  },
  studioHost: 'joshua-udom'
}
