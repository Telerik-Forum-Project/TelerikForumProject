import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { AppContext } from "../../state/app.context";
import { logoutUser } from "../../services/authenticate-service"
import './Header.css';
 
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
      <div className="header-div">
          <div className="h1-div">
              <h1>Fitness Food and Lifestyle</h1>
          </div>
          <div className="nav-container">
              <div className="nav-buttons">
                  <button className="button" onClick={() => navigate('/')}>Home</button>
                  <button className="button" onClick={() => navigate('/about')}>About</button>
                  {user && (
                      <>
                        <button className="button" onClick={() => navigate('/posts')}>All posts</button>
                        <button className="button" onClick={() => navigate('/createPost')}>CreatePost</button>
                      </>
                  )}
              </div>
          </div>
          <nav>
              <div className="user-section">
                  {userData ? (
                      <>
                          <span>Welcome,</span>
                          <button className="button" onClick={detailUser}>{userData.handle}</button>
                          <button className="button" onClick={logout}>Logout</button>
                      </>
                  ) : (
                      <>
                          <span>To see more:</span>
                          <button className="button" onClick={() => navigate('/login')}>Login</button>
                          <button className="button" onClick={() => navigate('/register')}>Register</button>
                      </>
                  )}
              </div>
          </nav>
      </div>
  );
}