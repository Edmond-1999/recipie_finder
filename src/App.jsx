// This is the main app file.
// It keeps the page layout simple and easy to follow.
import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HomePage from './pages/HomePage'
import RecipieDetail from './pages/RecipieDetail'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar value={searchTerm} onChange={setSearchTerm} />
        <Hero />

        <Routes>
          <Route path="/" element={<HomePage searchTerm={searchTerm} />} />
          <Route path="/recipe/:recipeId" element={<RecipieDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
