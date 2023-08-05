import './App.css'
import { Link, Routes, Route } from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <nav>
        <div className="menu">
          <Link to="/">Home</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" Component={Home} />
      </Routes>
    </div>
  )
}

export default App
