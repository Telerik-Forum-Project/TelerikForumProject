import { NavLink } from "react-router-dom";

export default function Home() {
    return (
        <>
        <div id="home-container">
            <h1>Welcome to our forum about fitness and wellbeing</h1>
                <div id="nav-container">
                </div>
        </div>
        <h3>Fitness Food and Lifestyle</h3>
      <nav>
        <NavLink to="/mostCommented">Top 10 Most Commented Posts</NavLink>
        <NavLink to="mostRecent">Top 10 Most Recent Posts</NavLink>
      </nav>
        </>
    )
}