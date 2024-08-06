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
import { useState, useEffect } from 'react';
import Login from './pages/userPages/Login';
import { getUserData } from './services/user.services';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase-config';
import SinglePost from './pages/postPages/SinglePost';
import AllPosts from './pages/postPages/AllPosts';


function App() {
  const [appState, setAppState] = useState({
    user: null,
    userData: null,
  });
  const [user] = useAuthState(auth);

  if (appState.user !== user) {
    setAppState({...appState, user });
  }

  useEffect(() => {
    if (!user) return;

    getUserData(appState.user.uid)
      .then(data => {
        const userData = data[Object.keys(data)[0]];
        setAppState({...appState, userData});
      });
  }, [user]);

  return (
    <>
    <AppContext.Provider value = {{... appState, setAppState}}>
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/fitness' element={<Fitness />} />
        <Route path='/food' element={<Food />} />
        <Route path='/lifestyle' element={<Lifestyle />} />
        <Route path='/posts' element={<AllPosts />} />
        <Route path='/singlepost/:id' element={<SinglePost />} />
        <Route path='/createPost' element={<CreatePost />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
      </Routes>
    </BrowserRouter>
    </AppContext.Provider>
      <Footer />
    </>
  )
}

export default App

//<Route path='/posts-create' element={<SinglePost />} />
