import './App.css'
import './scss/main.scss'
import './components/Header'
import Protected from './components/Protected'
import Navigation from './components/Nav'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Doctor from './components/Doctor'

function App() {

  return (
    <>
      <Navigation />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/protected" element={<Protected />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
