import { FiClock, FiHeart, FiStar } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import './RecipieCard.css'

function RecipieCard({ recipe }) {
  return (
    <article className="recipe-card" aria-label={`Recipe: ${recipe.title}`}>
      <Link to={`/recipe/${recipe.id}`} className="recipe-card__link">
        <div
          className="recipe-card__image"
          style={{ backgroundImage: `url(${recipe.image})` }}
        >
          <div className="recipe-card__topbar">
            <span className="recipe-card__badge">{recipe.category}</span>
            <button type="button" className="recipe-card__favorite" aria-label="Save recipe">
              <FiHeart className="favorite-icon" />
            </button>
          </div>
        </div>

        <div className="recipe-card__body">
          <div className="recipe-card__meta">
            <span className="meta-item">
              <FiClock className="meta-icon" />
              {recipe.time}
            </span>
            <span className="meta-item rating-item">
              <FiStar className="meta-icon" />
              {recipe.rating}
            </span>
          </div>

          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>

          <div className="recipe-card__footer">
            <span>{recipe.difficulty}</span>
            <span className="recipe-card__cta">View recipe</span>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default RecipieCard
