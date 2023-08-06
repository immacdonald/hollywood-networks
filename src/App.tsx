import './App.css'
import { Link, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Test from './components/Test';

function App() {
  return (
    <div className="App">
      <nav>
        <div className="menu">
          <Link to="/">Home</Link>
          <Link to="/test">Test</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/test" Component={Test} />
      </Routes>
    </div>
  )
}

export default App
