import { NavLink, useNavigate } from "react-router-dom"

export default function Header() {
    
    
    return (
        <>
      <h1>Fitness Food and Lifestyle</h1>
      <input type="text" name="search" id="search"></input>
      <nav>
        <NavLink to="/">Home</NavLink><br/>
        <NavLink to="/about">About</NavLink><br/>
        <NavLink to="fitness">Fitness</NavLink><br/>
        <NavLink to="/food">Food</NavLink><br/>
        <NavLink to="/lifestyle">Lifestyle</NavLink><br/>
      </nav>
      </>
    )
}