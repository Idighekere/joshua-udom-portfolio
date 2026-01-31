import { queries } from '../lib/queries'
import { useSanityData } from './useSanityData'

export function useProjects () {
  const { data: projects, loading, error } = useSanityData(queries.projects)
  return { projects, loading, error }
}

export function useProject (slug) {
  const {
    data: project,
    loading,
    error
  } = useSanityData(queries.projectBySlug, { slug })
  return { project, loading, error }
}
