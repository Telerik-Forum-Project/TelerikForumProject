import { NavLink } from "react-router-dom";
import './Home.css';

export default function Home() {
  return (
            <div className="home-div">
                <h1 id="heading-one">Welcome to the forum focused on topics about fitness, food and lifestyle.</h1>
                <div className="line"></div>
                <div className="nav-div">
                    <div className="nav-message">
                        <span>Be sure to check out our trending and newest posts:</span>
                    </div>
                    <div>
                    <nav className="nav-anchors">
                        <NavLink className="nav-link" to="/mostCommented">Top 10 Most Commented Posts</NavLink>
                        <NavLink className="nav-link" to="mostRecent">Top 10 Most Recent Posts</NavLink>
                    </nav>
                    </div>
                </div>
            </div>
);
}