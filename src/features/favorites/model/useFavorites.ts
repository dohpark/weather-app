import { useFavoritesStore } from './favoritesStore'

const MAX_FAVORITES = 6

/**
 * 즐겨찾기 관리 훅 (zustand persist 기반)
 *
 * @example
 * const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites()
 */
export function useFavorites() {
  const favorites = useFavoritesStore((state) => state.favorites)
  const addFavorite = useFavoritesStore((state) => state.addFavorite)
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite)
  const isFavorite = useFavoritesStore((state) => state.isFavorite)
  const isFull = favorites.length >= MAX_FAVORITES

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    isFull,
  }
}
