import { NavLink } from "react-router-dom";
import './Home.css';
import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/user.services";
import { getAllPosts } from "../../services/posts.service";

export default function Home() {
const [users, setUsers] = useState([]);
const [posts, setPosts] = useState([]);

useEffect (() => {
    getAllUsers()
    .then(usersSnapshot => {
        if (usersSnapshot.exists()) {
          const usersData = Object.values(usersSnapshot.val());
          setUsers(usersData);
        }
      })
      .catch(error => {
        console.error("Error fetching users:", error);
      });

    getAllPosts()
    .then(postsData => {
        setPosts(postsData);
      })
      .catch(error => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
            <div className="home-div">
                <h1 id="heading-one">Welcome to the forum focused on topics about fitness, food and lifestyle.</h1>
                <div className="line"></div>
                <div className="user-count">
                    <h2>Current Active Users: {users.length}</h2>
                </div>
                <div className="post-count">
                    <h2>Total Number of Posts: {posts.length}</h2>
                </div>
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