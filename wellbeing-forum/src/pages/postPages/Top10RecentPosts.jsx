import { useEffect, useState } from "react";
import { getRecentPostsRealtime } from "../../services/posts.service";
import { Link } from "react-router-dom";

export default function Top10RecentPosts() {
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    getRecentPostsRealtime(setRecentPosts);
  }, []);

  return (
    <>
      <div id="recentPosts-container">
        <h1>Latest Posts</h1>
        <div>
          {recentPosts.map(post => (
            <div key={post.id}>
              <h2> <Link to={`/singlepost/${post.id}`}>{post.title}</Link></h2>
              <p>{new Date(post.createdOn).toLocaleString()}</p>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
