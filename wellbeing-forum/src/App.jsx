import './App.css';
import Home from './pages/mainPages/Home';
import Header from './components/mainComponents/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from '../src/pages/mainPages/About';
import Footer from './components/mainComponents/Footer';
import CreatePost from '../src/pages/postPages/CreatePost';
import Register from './pages/userPages/Register';
import { AppContext } from './state/app.context.jsx';
import { useState, useEffect } from 'react';
import Login from './pages/userPages/Login';
import { getUserData } from './services/user.services';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase-config';
import SinglePost from './pages/postPages/SinglePost';
import AllPosts from './pages/postPages/AllPosts';
import useAdmin from './hooks/useAdmin';
import AdminPanel from './components/adminComponents/AdminPanel';
import EditUser from './pages/userPages/EditUser';
import MostCommented10Posts from './pages/postPages/MostCommented10Posts';
import Top10RecentPosts from './pages/postPages/Top10RecentPosts';
import UserDetails from './pages/userPages/UserDetails';
import Authenticated from './hoc/Authenticated.jsx';

function App() {
  const [appState, setAppState] = useState({
    user: null,
    userData: null,
  });
  const [user] = useAuthState(auth);
  const { isAdminUser, loading } = useAdmin();

  // useEffect(() => {
  //   if (user) {
  //     setAppState(prevState => ({ ...prevState, user }));
  //   }
  // }, [user]);

if (appState.user !== user) {
  setAppState({...appState, user})
}

  useEffect(() => {
    if (user) {
      getUserData(user.uid).then(data => {
        const userData = data ? data[Object.keys(data)[0]] : null;
        setAppState(prevState => ({ ...prevState, userData }));
      });
    }
  }, [user]);

  return (
    <AppContext.Provider value={{ ...appState, setAppState }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/posts' element={<Authenticated><AllPosts /></Authenticated>} />
          <Route path='/singlepost/:id' element={<SinglePost />} />
          <Route path='/createPost' element={<Authenticated><CreatePost /></Authenticated>} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/mostCommented' element={<MostCommented10Posts/>} />
          <Route path='/mostRecent' element={<Top10RecentPosts />} />
          <Route path='/userdetails/edituser' element={<EditUser />} />
          <Route path='/userdetails' element={<Authenticated><UserDetails /></Authenticated>} />
        </Routes>
        {!loading && isAdminUser && <AdminPanel />}
        <Footer />
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;

