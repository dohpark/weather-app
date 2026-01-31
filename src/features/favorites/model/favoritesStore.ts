import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Favorite } from './types'

const MAX_FAVORITES = 6

interface FavoritesState {
  favorites: Favorite[]
  addFavorite: (favorite: Omit<Favorite, 'id'>) => boolean
  removeFavorite: (id: string) => void
  removeFavoriteByCoords: (lat: number, lon: number) => void
  updateFavoriteName: (id: string, name: string) => void
  isFavorite: (lat: number, lon: number) => boolean
  getFavoriteByCoords: (lat: number, lon: number) => Favorite | undefined
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (favorite) => {
        const state = get()
        if (state.favorites.length >= MAX_FAVORITES) return false
        if (state.favorites.some((f) => f.lat === favorite.lat && f.lon === favorite.lon)) {
          return false
        }

        const newFavorite: Favorite = {
          ...favorite,
          id: `${favorite.lat}-${favorite.lon}-${Date.now()}`,
        }

        set((state) => ({
          favorites: [...state.favorites, newFavorite],
        }))
        return true
      },

      removeFavorite: (id) => {
        set((state) => ({
          favorites: state.favorites.filter((f) => f.id !== id),
        }))
      },

      removeFavoriteByCoords: (lat, lon) => {
        set((state) => ({
          favorites: state.favorites.filter((f) => f.lat !== lat || f.lon !== lon),
        }))
      },

      updateFavoriteName: (id, name) => {
        set((state) => ({
          favorites: state.favorites.map((f) =>
            f.id === id ? { ...f, name } : f
          ),
        }))
      },

      isFavorite: (lat, lon) => {
        return get().favorites.some((f) => f.lat === lat && f.lon === lon)
      },

      getFavoriteByCoords: (lat, lon) => {
        return get().favorites.find((f) => f.lat === lat && f.lon === lon)
      },
    }),
    {
      name: 'weather-favorites',
    }
  )
)

