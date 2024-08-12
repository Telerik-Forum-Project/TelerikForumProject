import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import { AppContext } from "../../state/app.context";
import { logoutUser } from "../../services/authenticate-service"

export default function Header() {

  const { user, userData, setAppState } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = async () => {
    await logoutUser();
    setAppState({ user: null, userData: null });
    navigate('/login');
  };

  const detailUser = () => {
    navigate('userdetails');
  }

  return (
    <>
      <div className="header-div">
        <h1>Fitness Food and Lifestyle</h1>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/posts">All posts</NavLink>
          {user && (<>
            <NavLink to="/createPost">CreatePost</NavLink>
          </>)}
          <NavLink to="/about">About</NavLink>
          {!user && <NavLink to="/login">Login</NavLink>}
          {!user && <NavLink to="/register">Register</NavLink>}
          {user && <button onClick={logout}>Logout</button>}
          {userData && <span>Welcome, {userData.handle}</span>}
          {userData && <button onClick={detailUser}>{userData.handle}</button>}
        </nav>
      </div>
    </>
  )
}