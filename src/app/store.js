import { configureStore } from '@reduxjs/toolkit'
import { recipeApi } from '../features/recipesApi'

export const store = configureStore({
  reducer: {
    [recipeApi.reducerPath]: recipeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(recipeApi.middleware),
})
