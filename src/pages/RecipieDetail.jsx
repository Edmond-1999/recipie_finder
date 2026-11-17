// This page shows one recipe in more detail.
import {
  FiArrowLeft,
  FiCheckCircle,
  FiClock,
  FiHeart,
  FiStar,
  FiUsers,
} from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getRecipeById } from '../features/recipesApi'
import './RecipieDetail.css'

function RecipieDetail() {
  const { recipeId } = useParams()
  const [recipe, setRecipe] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadRecipe() {
      setIsLoading(true)
      setError('')

      try {
        const data = await getRecipeById(recipeId)

        if (isMounted) {
          setRecipe(data)
        }
      } catch {
        if (isMounted) {
          setError('Recipe not found.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadRecipe()

    return () => {
      isMounted = false
    }
  }, [recipeId])

  if (isLoading) {
    return <main className="recipe-detail">Loading recipe...</main>
  }

  if (error || !recipe) {
    return <main className="recipe-detail">Recipe not found.</main>
  }

  return (
    <main className="recipe-detail" aria-label="Recipe detail page">
      <div className="recipe-detail__header">
        <Link to="/" className="back-button">
          <FiArrowLeft className="button-icon" />
          Back
        </Link>

        <button type="button" className="save-button">
          <FiHeart className="button-icon" />
          Save
        </button>
      </div>

      <section className="recipe-detail__hero">
        <div
          className="recipe-detail__image"
          style={{ backgroundImage: `url(${recipe.image})` }}
          aria-label="Featured recipe"
        />

        <div className="recipe-detail__content">
          <span className="recipe-detail__tag">{recipe.category}</span>
          <h1>{recipe.title}</h1>
          <p className="recipe-detail__description">{recipe.description}</p>

          <div className="recipe-detail__meta">
            <span>
              <FiClock className="meta-icon" />
              {recipe.time}
            </span>
            <span>
              <FiStar className="meta-icon" />
              {recipe.rating}
            </span>
            <span>
              <FiUsers className="meta-icon" />
              {recipe.servings}
            </span>
            <span>{recipe.difficulty}</span>
          </div>
        </div>
      </section>

      <section className="recipe-detail__grid">
        <div className="info-card">
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>
                <FiCheckCircle className="check-icon" />
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div className="info-card">
          <h2>Method</h2>
          <ol>
            {recipe.steps.map((step, index) => (
              <li key={step}>
                <span className="step-number">{index + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="nutrition-card" aria-label="Nutrition information">
        <h2>Nutrition</h2>
        <div className="nutrition-grid">
          {recipe.nutrition.map((item) => (
            <div className="nutrition-item" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default RecipieDetail
