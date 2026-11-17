import { FiSearch } from 'react-icons/fi'
import './Navbar.css'

function Navbar({ value = '', onChange }) {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="brand-block">
        <a href="/" className="brand-name">
          Recipe Finder
        </a>
      </div>

      <div className="nav-links" aria-label="Navigation links">
        <a href="/">Home</a>
        <a href="/">Discover</a>
        <a href="/">Favorites</a>
      </div>

      <label className="search-box" aria-label="Search recipe input">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search recipes"
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
        />
      </label>
    </nav>
  )
}

export default Navbar

