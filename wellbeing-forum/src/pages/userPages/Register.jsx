import { useContext, useState } from "react";
import { AppContext } from "../../state/app.context";
import { useNavigate } from "react-router-dom";
import { createUserHandle, getUserByHandle } from "../../services/user.services";
import { registerUser } from "../../services/authenticate-service";

export default function Register() {
  const [user, setUser] = useState({
    handle: '',
    email: '',
    password: '',
    passwordCheck: ''
  });
  const { setAppState } = useContext(AppContext);
  const navigate = useNavigate();

  const updateUser = prop => e => {
    setUser({
      ...user,
      [prop]: e.target.value,
    })
  };

  const handleLoginNavigation = () => {
    navigate('/Login');
  };

  const register = async (e) => {
    e.preventDefault();
    if (!user.email || !user.password) {
      return alert('No credentials provided!');
    }
    if (user.password !== user.passwordCheck) {
      return alert("Password doesn't match");
    }

    try {
      const userFromDB = await getUserByHandle(user.handle);
      if (userFromDB) {
        return alert(`User {${user.handle}} already exists!`);
      }
      const credential = await registerUser(user.email, user.password);
      await createUserHandle(user.handle, credential.user.uid, user.email);
      setAppState({ user: credential.user, userData: null });
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (<form className="register-from">
    <h2>Register Form</h2>
    <label htmlFor="handle" className="username-label">username:
      <input type="text" name="handle" id="handle"
        placeholder="Enter username here..."
        value={user.handle} onChange={updateUser('handle')} />
    </label><br />
    <br />
    <label htmlFor="email" className="email-label">email:
      <input type="text" name="email" id="email"
        placeholder="Enter email here..."
        value={user.email} onChange={updateUser('email')} />
    </label><br />
    <br />
    <label htmlFor="password" className="password-label">password:
      <input type="password" name="password" id="password"
        placeholder="Enter password here..."
        value={user.password} onChange={updateUser('password')} />
    </label><br />
    <br />
    <label className="confirm-password-label">confirm password:
      <input type="password"
        placeholder="confirm password"
        value={user.passwordCheck} onChange={updateUser('passwordCheck')} />
    </label><br />
    <br />
    <button onClick={register}>Register</button>
    <button onClick={handleLoginNavigation}>Log In</button>
  </form>);
}