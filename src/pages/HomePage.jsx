// This page loads the recipes and shows them on the home screen.
import { useEffect, useState } from 'react'
import RecipieCard from '../components/RecipieCard'
import { getRecipes } from '../features/recipesApi'
import './HomePage.css'

function HomePage({ searchTerm = '' }) {
  const [recipeCollections, setRecipeCollections] = useState({
    allRecipes: [],
    groupedRecipes: {},
    categories: [],
  })
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadRecipes() {
      setIsLoading(true)
      setError('')

      try {
        const result = await getRecipes(searchTerm)

        if (isMounted) {
          setRecipeCollections(result)
        }
      } catch {
        if (isMounted) {
          setError('Failed to load recipes')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
          setSelectedCategory('all')
        }
      }
    }

    loadRecipes()

    return () => {
      isMounted = false
    }
  }, [searchTerm])

  const categories = recipeCollections.categories || []
  const visibleRecipes =
    selectedCategory === 'all'
      ? recipeCollections.allRecipes || []
      : recipeCollections.groupedRecipes?.[selectedCategory] || []

  const categoryOptions = [
    { label: 'All products', value: 'all' },
    ...categories.map(({ name }) => ({ label: name, value: name })),
  ]

  return (
    <main className="homepage" aria-label="Recipe list section">
      <div className="section-heading">
        <p className="section-heading__eyebrow">Popular picks</p>
        <h2>{searchTerm ? `Results for “${searchTerm}”` : 'Fresh favorites this week'}</h2>
      </div>

      {isLoading && <p className="status-message">Loading recipes...</p>}
      {error && <p className="status-message error">{error}</p>}

      {!isLoading && !error && (
        <>
          <div className="category-tabs" aria-label="Recipe categories">
            {categoryOptions.map((category) => (
              <button
                key={category.value}
                type="button"
                className={`category-tab ${selectedCategory === category.value ? 'is-active' : ''}`}
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.label}
              </button>
            ))}
          </div>

          {visibleRecipes.length === 0 ? (
            <p className="status-message">No recipes found for this search.</p>
          ) : selectedCategory === 'all' ? (
            <div className="recipe-grid">
              {visibleRecipes.map((recipe) => (
                <RecipieCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <section className="recipe-category">
              <div className="section-heading">
                <p className="section-heading__eyebrow">Category</p>
                <h2>{selectedCategory}</h2>
              </div>

              <div className="recipe-grid">
                {visibleRecipes.map((recipe) => (
                  <RecipieCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </main>
  )
}

export default HomePage
