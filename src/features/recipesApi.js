// This file handles the API calls in a simple way.
// Beginners can understand each step: fetch -> wait -> convert -> return.
const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1/'

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
    ?.split(/\r\n|\n|\.\s+/)
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

export const groupRecipesByCategory = (recipes = []) => {
  const groupedRecipes = {}

  recipes.forEach((recipe) => {
    const category = recipe.category || 'Other'

    if (!groupedRecipes[category]) {
      groupedRecipes[category] = []
    }

    groupedRecipes[category].push(recipe)
  })

  const categories = Object.entries(groupedRecipes).map(([name, items]) => ({
    name,
    recipes: items,
  }))

  return {
    allRecipes: recipes,
    groupedRecipes,
    categories,
  }
}

export async function getRecipes(searchTerm = '') {
  const cleanedSearch = searchTerm.trim()
  const url = `${API_BASE_URL}search.php?s=${encodeURIComponent(cleanedSearch)}`

  const response = await fetch(url)
  const data = await response.json()
  const recipes = (data.meals || []).map(mapMeal)

  return groupRecipesByCategory(recipes)
}

export async function getRecipeById(recipeId) {
  const url = `${API_BASE_URL}lookup.php?i=${recipeId}`

  const response = await fetch(url)
  const data = await response.json()
  const meal = data.meals?.[0]

  return meal ? mapMealDetail(meal) : null
}
