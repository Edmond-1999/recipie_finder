import { FiSearch } from 'react-icons/fi'
import './Navbar.css'

function Navbar(){
    return (
        <nav className="navbar">
            <div className="big-div">
                <a href="/" className="logo">Recipe Finder</a>
            </div>


            <div className="search-wrapper">
                <FiSearch className="search-icon" />
                <input type="text" placeholder="Search for a recipe" className="search-input" />
            </div>

        </nav>
    )
}

