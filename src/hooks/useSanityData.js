import { useState, useEffect } from 'react'
import { client } from '../lib/sanity'

export function useSanityData (query, params = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const result = await client.fetch(query, params)
        setData(result)
      } catch (err) {
        setError(err)
        console.error('Sanity fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [query, JSON.stringify(params)])

  return { data, loading, error }
}
