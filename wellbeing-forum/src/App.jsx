import './App.css';
import Home from './pages/mainPages/Home';
import Header from './components/mainComponents/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from '../src/pages/mainPages/About';
import Fitness from '../src/pages/mainPages/Fitness';
import Food from '../src/pages/mainPages/Food';
import Lifestyle from '../src/pages/mainPages/Lifestyle';
import Footer from './components/mainComponents/Footer';
import CreatePost from '../src/pages/postPages/CreatePost';
import Register from './pages/userPages/Register';
import { AppContext } from './state/app.context';
import { useState } from 'react';


  function App() {  

    const [appState, setAppState] = useState ({
      user: null,
      userData: null
    });

  return (
    <>
    <AppContext.Provider value = {{... appState, setContext: setAppState}}>
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

    </AppContext.Provider>

      <Footer />
    </>
  )
}

export default App
