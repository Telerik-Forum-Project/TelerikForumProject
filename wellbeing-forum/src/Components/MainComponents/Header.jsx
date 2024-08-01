import { NavLink } from "react-router-dom"

export default function Header() {
    
    
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
        <NavLink to="/createPost">CreatePost</NavLink>
        <NavLink to="/register">Register</NavLink>
      </nav>
      </div>
      </>
    )
}