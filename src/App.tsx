import style from './App.module.scss';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className={style.app}>
      <Header />
      <div className={style.content}>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/about" Component={About} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
