import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import { AppContext } from "../../state/app.context";
import { logoutUser } from "../../services/authenticate-service";

export default function Header() {

    const { user, userData, setAppState } = useContext(AppContext);
    const navigate = useNavigate();
  
    const logout = async () => {
      await logoutUser();
      setAppState({ user: null, userData: null });
      navigate('/login');
    };
    
    return (
        <>
        <div id="header-div">
      <h1>Fitness Food and Lifestyle</h1>
      <input type="text" name="search" id="search"></input>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="fitness">Fitness</NavLink>
        <NavLink to="/food">Food</NavLink>
        <NavLink to="/lifestyle">Lifestyle</NavLink>
        {user && (<>
          <NavLink to="/posts">All posts</NavLink>
          <NavLink to="/createPost">CreatePost</NavLink>
        </>)}
        {!user && <NavLink to="/login">Login</NavLink>}
        {!user && <NavLink to="/register">Register</NavLink>}
        {user && <button onClick={logout}>Logout</button>}
        {userData && <span>Welcome, {userData.handle}</span>}
      </nav>
      </div>
      </>
    )
}