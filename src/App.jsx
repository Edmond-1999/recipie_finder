import { useEffect, useMemo, useState } from 'react'
import './App.css'

const defaultSearch = 'chicken'
const categoryList = ['All', 'Chicken', 'Dessert', 'Seafood', 'Vegetarian', 'Breakfast', 'Pasta']

function getIngredients(meal) {
  const ingredients = []

  for (let i = 1; i <= 8; i += 1) {
    const ingredient = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]

    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure ? `${measure.trim()} ` : ''}${ingredient.trim()}`)
    }
  }

  return ingredients
}

function App() {
  const [query, setQuery] = useState(defaultSearch)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [recipes, setRecipes] = useState([])
  const [selectedRecipeId, setSelectedRecipeId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchRecipes = async (term = defaultSearch) => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(term)}`,
      )

      if (!response.ok) {
        throw new Error('Unable to load recipes')
      }

      const data = await response.json()
      const meals = Array.isArray(data.meals) ? data.meals : []

      const normalized = meals.slice(0, 8).map((meal) => ({
        ...meal,
        ingredients: getIngredients(meal),
        cookTime: `${Math.floor(Math.random() * 25) + 20} min`,
        difficulty: ['Easy', 'Medium', 'Chef level'][Math.floor(Math.random() * 3)],
      }))

      setRecipes(normalized)
      setSelectedRecipeId(normalized[0]?.idMeal ?? null)
    } catch (loadError) {
      console.error(loadError)
      setError('We could not fetch recipes right now. Please try another dish.')
      setRecipes([])
      setSelectedRecipeId(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchRecipes(defaultSearch)
    }, 0)

    return () => window.clearTimeout(timer)
  }, [])

  const filteredRecipes = useMemo(() => {
    if (selectedCategory === 'All') {
      return recipes
    }

    return recipes.filter((meal) => meal.strCategory === selectedCategory)
  }, [recipes, selectedCategory])

  const selectedRecipe =
    filteredRecipes.find((meal) => meal.idMeal === selectedRecipeId) ?? filteredRecipes[0] ?? null

  const handleSearch = (event) => {
    event.preventDefault()
    fetchRecipes(query.trim() || defaultSearch)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-block">
          <span className="brand-mark">R</span>
          <div>
            <p className="eyebrow">Recipe finder</p>
            <h1>Kitchen Pulse</h1>
          </div>
        </div>

        <nav className="main-nav" aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#recipes">Recipes</a>
          <a href="#planner">Planner</a>
        </nav>
      </header>

      <main className="content">
        <section className="hero-panel">
          <div className="hero-copy">
            <p className="eyebrow accent">Fresh picks</p>
            <h2>Find the perfect meal for every mood.</h2>
            <p className="hero-text">
              Explore comforting classics, quick weekday dinners, and chef-worthy plates from
              around the world.
            </p>

            <form className="search-bar" onSubmit={handleSearch}>
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search for a recipe"
                aria-label="Search for a recipe"
              />
              <button type="submit">Search</button>
            </form>

            <div className="hero-stats">
              <div>
                <strong>1200+</strong>
                <span>recipes</span>
              </div>
              <div>
                <strong>4.9/5</strong>
                <span>rating</span>
              </div>
              <div>
                <strong>15 min</strong>
                <span>average prep</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card">
              <img
                src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80"
                alt="Prepared bowl of food"
              />
              <div className="floating-tag">Popular today</div>
            </div>
          </div>
        </section>

        <section className="category-strip" aria-label="Recipe categories">
          {categoryList.map((category) => (
            <button
              key={category}
              type="button"
              className={category === selectedCategory ? 'category active' : 'category'}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </section>

        <section className="recipe-layout" id="recipes">
          <div className="recipe-list">
            {loading ? (
              <div className="status-card">Loading recipes...</div>
            ) : error ? (
              <div className="status-card error">{error}</div>
            ) : filteredRecipes.length === 0 ? (
              <div className="status-card">No recipes found. Try another search.</div>
            ) : (
              filteredRecipes.map((meal) => (
                <button
                  key={meal.idMeal}
                  type="button"
                  className={selectedRecipe?.idMeal === meal.idMeal ? 'recipe-card active' : 'recipe-card'}
                  onClick={() => setSelectedRecipeId(meal.idMeal)}
                >
                  <img src={meal.strMealThumb} alt={meal.strMeal} className="recipe-image" />
                  <div className="recipe-body">
                    <div className="recipe-meta-top">
                      <span>{meal.strCategory || 'Meal'}</span>
                      <span>{meal.cookTime}</span>
                    </div>
                    <h3>{meal.strMeal}</h3>
                    <div className="recipe-meta-bottom">
                      <span>{meal.difficulty}</span>
                      <span>{meal.ingredients.length} ingredients</span>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>

          {selectedRecipe && (
            <aside className="detail-panel" aria-live="polite">
              <div className="detail-media">
                <img src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal} />
              </div>

              <div className="detail-content">
                <div className="detail-header">
                  <div>
                    <p className="eyebrow">Featured recipe</p>
                    <h3>{selectedRecipe.strMeal}</h3>
                  </div>
                  <span className="chip">{selectedRecipe.strArea || 'Global'}</span>
                </div>

                <div className="detail-stats">
                  <span>{selectedRecipe.strCategory || 'Meal'}</span>
                  <span>{selectedRecipe.cookTime}</span>
                  <span>{selectedRecipe.difficulty}</span>
                </div>

                <div className="ingredient-list">
                  <h4>Ingredients</h4>
                  <ul>
                    {selectedRecipe.ingredients.map((ingredient) => (
                      <li key={ingredient}>{ingredient}</li>
                    ))}
                  </ul>
                </div>

                <div className="instruction-block">
                  <h4>How to prepare</h4>
                  <p>{selectedRecipe.strInstructions?.slice(0, 260) || 'No instructions listed for this recipe.'}</p>
                </div>
              </div>
            </aside>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
