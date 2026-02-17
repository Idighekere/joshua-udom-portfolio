import { useState, useEffect } from 'react'
import { client } from '../lib/sanity'

// In-memory cache: key -> { data, timestamp }
const cache = new Map()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

function getCacheKey (query, params) {
  return query + '::' + JSON.stringify(params)
}

export function prefetch (query, params = {}) {
  const key = getCacheKey(query, params)
  // Don't refetch if cached and fresh
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) return

  client
    .fetch(query, params)
    .then((result) => {
      cache.set(key, { data: result, timestamp: Date.now() })
    })
    .catch((err) => console.error('Sanity prefetch error:', err))
}

export function useSanityData (query, params = {}) {
  const key = getCacheKey(query, params)
  const cached = cache.get(key)

  const [data, setData] = useState(cached?.data ?? null)
  const [loading, setLoading] = useState(!cached)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    const fetchData = async () => {
      try {
        // If we have cached data, show it immediately but still revalidate
        if (!cached) setLoading(true)

        const result = await client.fetch(query, params)

        if (!cancelled) {
          cache.set(key, { data: result, timestamp: Date.now() })
          setData(result)
          setLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err)
          setLoading(false)
          console.error('Sanity fetch error:', err)
        }
      }
    }

    // If cache is fresh, skip the fetch entirely
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      setData(cached.data)
      setLoading(false)
      return
    }

    fetchData()

    return () => {
      cancelled = true
    }
  }, [query, JSON.stringify(params)])

  return { data, loading, error }
}
