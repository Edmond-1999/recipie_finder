import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HomePage from './pages/HomePage'
import RecipieDetail from './pages/RecipieDetail'
import { store } from './app/store'
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="app-shell">
          <Navbar />
          <Hero />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipe/:recipeId" element={<RecipieDetail />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
