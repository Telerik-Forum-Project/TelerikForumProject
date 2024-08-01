import './App.css';
import Home from './Pages/MainPages/Home';
import Header from './Components/MainComponents/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from '../src/Pages/MainPages/About';
import Fitness from '../src/Pages/MainPages/Fitness';
import Food from '../src/Pages/MainPages/Food';
import Lifestyle from '../src/Pages/MainPages/Lifestyle';
import Footer from './Components/MainComponents/Footer';
import CreatePost from '../src/Pages/PostPages/CreatePost';
import Register from './Pages/UserPages/Register';

function App() {

  return (
    <>
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/fitness' element={<Fitness />} />
        <Route path='/food' element={<Food />} />
        <Route path='/lifestyle' element={<Lifestyle />} />
        <Route path='/CreatePost' element={<CreatePost />} />
        <Route path='/Register' element={<Register />} />
        
      </Routes>
    </BrowserRouter>
      <Footer />
    </>
  )
}

export default App