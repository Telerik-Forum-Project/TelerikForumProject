import { useContext, useState } from "react";
import { AppContext } from "../../state/app.context";
import { useNavigate } from "react-router-dom";
import { createUserHandle, getUserByHandle } from "../../services/user.services";
import { registerUser } from "../../services/authenticate-service";
import './Register.css';

export default function Register() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '', 
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
    if (!user.firstName || user.firstName.length < 4 || user.firstName.length > 32){
      return alert("Invalid first name");
    }
    if (!user.lastName || user.lastName.length < 4 || user.lastName.length > 32){
      return alert("Invalid last name");
    }

    try {
      const userFromDB = await getUserByHandle(user.handle);
      if (userFromDB) {
        return alert(`User {${user.handle}} already exists!`);
      }
      const credential = await registerUser(user.email, user.password);
      await createUserHandle(user.handle, credential.user.uid, user.email, user.firstName, user.lastName);
      setAppState({ user: credential.user, userData: null });
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form className="register-form">
      <h1>Register</h1>
      <label htmlFor="firstName">First Name: </label>
      <input value={user.firstName} onChange={updateUser('firstName')} type="text" name="firstName" id="firstName" /><br /><br />
      <label htmlFor="lastName">Last Name: </label>
      <input value={user.lastName} onChange={updateUser('lastName')} type="text" name="lastName" id="lastName" /><br /><br />
      <label htmlFor="email">Email: </label>
      <input value={user.email} onChange={updateUser('email')} type="text" name="email" id="email" /><br /><br />
      <label htmlFor="password">Password: </label>
      <input value={user.password} onChange={updateUser('password')} type="password" name="password" id="password" /><br /><br />
      <label htmlFor="passwordCheck">Confirm Password: </label>
      <input value={user.passwordCheck} onChange={updateUser('passwordCheck')} type="password" name="passwordCheck" id="passwordCheck" /><br /><br />
      <button className="register-button" onClick={register}>Register</button>
      <button className="register-button" onClick={handleLoginNavigation}>Login</button>
    </form>
  );
}