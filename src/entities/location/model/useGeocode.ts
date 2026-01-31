import { useMutation } from '@tanstack/react-query'
import { fetchGeocode } from '../api'

/**
 * Geocoding mutation hook
 *
 * @example
 * const { mutateAsync: geocode, isPending } = useGeocode()
 * const result = await geocode("경기도-안양시동안구-호계동")
 */
export function useGeocode() {
  return useMutation({
    mutationFn: fetchGeocode,
  })
}
