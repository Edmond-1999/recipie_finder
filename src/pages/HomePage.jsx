import RecipieCard from '../components/RecipieCard'
import { useGetRecipesQuery } from '../features/recipesApi'
import './HomePage.css'

function HomePage() {
  const { data: recipes = [], isLoading, error } = useGetRecipesQuery()

  return (
    <main className="homepage" aria-label="Recipe list section">
      <div className="section-heading">
        <p className="section-heading__eyebrow">Popular picks</p>
        <h2>Fresh favorites this week</h2>
      </div>

      {isLoading && <p className="status-message">Loading recipes...</p>}
      {error && <p className="status-message error">{'Failed to load recipes'}</p>}

      {!isLoading && !error && (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <RecipieCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </main>
  )
}

export default HomePage
