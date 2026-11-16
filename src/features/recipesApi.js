import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const mapMeal = (meal) => ({
  id: meal.idMeal,
  title: meal.strMeal,
  category: meal.strCategory || 'Recipe',
  time: '25 min',
  difficulty: 'Easy',
  rating: '4.8',
  servings: '2 servings',
  description:
    meal.strInstructions?.slice(0, 120) +
      (meal.strInstructions?.length > 120 ? '...' : '') ||
    'A delicious recipe worth trying.',
  image: meal.strMealThumb,
})

const mapMealDetail = (meal) => {
  const ingredients = []

  for (let i = 1; i <= 20; i += 1) {
    const ingredient = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]

    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure ? `${measure} ` : ''}${ingredient}`.trim())
    }
  }

  const steps = meal.strInstructions
    ?.split(/\r\n|\n|\.)\s+/)
    .map((step) => step.trim())
    .filter(Boolean)
    .slice(0, 5) || ['No instructions available.']

  return {
    id: meal.idMeal,
    title: meal.strMeal,
    category: meal.strCategory || 'Recipe',
    rating: '4.8',
    time: '25 min',
    difficulty: 'Easy',
    servings: '2 servings',
    description:
      meal.strInstructions?.slice(0, 170) +
        (meal.strInstructions?.length > 170 ? '...' : '') ||
      'A delicious recipe to try.',
    image: meal.strMealThumb,
    ingredients,
    steps,
    nutrition: [
      { label: 'Calories', value: '480 kcal' },
      { label: 'Protein', value: '18g' },
      { label: 'Carbs', value: '52g' },
      { label: 'Fiber', value: '6g' },
    ],
  }
}

export const recipeApi = createApi({
  reducerPath: 'recipeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.themealdb.com/api/json/v1/1/',
  }),
  endpoints: (builder) => ({
    getRecipes: builder.query({
      query: () => 'search.php?s=',
      transformResponse: (response) => (response.meals || []).slice(0, 6).map(mapMeal),
    }),
    getRecipeById: builder.query({
      query: (id) => `lookup.php?i=${id}`,
      transformResponse: (response) => {
        const meal = response.meals?.[0]
        return meal ? mapMealDetail(meal) : null
      },
    }),
  }),
})

export const { useGetRecipesQuery, useGetRecipeByIdQuery } = recipeApi
