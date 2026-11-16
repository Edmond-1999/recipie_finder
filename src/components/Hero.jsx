import { FiArrowRight, FiPlay } from 'react-icons/fi'
import './Hero.css'

const stats = [
  { value: '1200+', label: 'Recipes' },
  { value: '4.9/5', label: 'Average rating' },
  { value: '25 min', label: 'Average cook time' },
]

function Hero() {
  return (
    <section className="hero" aria-label="Recipe hero section">
      <div className="hero__content">
        <span className="hero__eyebrow">Fresh ideas for every craving</span>

        <h1>Find recipes that feel like home.</h1>

        <p className="hero__copy">
          Discover quick weeknight meals, comforting classics, and vibrant dishes
          that turn everyday ingredients into something memorable.
        </p>

        <div className="hero__actions">
          <button type="button" className="hero__button hero__button--primary">
            Explore recipes
            <FiArrowRight className="button-icon" />
          </button>

          <button type="button" className="hero__button hero__button--secondary">
            <span className="play-badge">
              <FiPlay className="play-icon" />
            </span>
            How it works
          </button>
        </div>

        <div className="hero__stats" aria-label="Recipe stats">
          {stats.map((item) => (
            <div className="stat-item" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
