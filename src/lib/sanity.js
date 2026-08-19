import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01'
})

const builder = imageUrlBuilder(client)

export function urlFor (source) {
  return builder.image(source)
}

// Returns a URL string or null when the source has no resolvable asset
// (e.g. a gallery image that was uploaded without a reference).
export function urlForOrNull (source, opts = {}) {
  if (!source || !source.asset || !source.asset._ref) return null
  try {
    let builder = urlFor(source)
    if (opts.width) builder = builder.width(opts.width)
    if (opts.height) builder = builder.height(opts.height)
    if (opts.quality) builder = builder.quality(opts.quality)
    if (opts.fit) builder = builder.fit(opts.fit)
    if (opts.format !== false) builder = builder.auto('format')
    return builder.url()
  } catch {
    return null
  }
}
