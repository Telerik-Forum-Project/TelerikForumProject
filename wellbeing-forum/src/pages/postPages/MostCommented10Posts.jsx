import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPosts, sortPostsByCommentCount } from "../../services/posts.service";
import './MostCommented10Posts.css'

export default function MostCommented10Posts() {

    const [posts, setPosts] = useState([]);
    // const navigate = useNavigate();
    // const [searchParams, setSearchParams] = useSearchParams();
    // const search = searchParams.get('search') ?? '';
    //search as useEffect param

    useEffect(() => {
        getAllPosts()
            .then(posts => {
                const sortedPosts = sortPostsByCommentCount(posts);
                setPosts(sortedPosts.slice(0, 10));
            })
            .catch(error => alert(error.message));
    }, []);

    return (
        <>
            <div id="mostCommented-container">
                <h1>Most Commented</h1>
                <div>
                    {posts.map(post => (
                        <div key={post.id} className="post-item">
                            <h2> <Link to={`/singlepost/${post.id}`}>{post.title}</Link></h2>
                            <p>Comments: {post.commentCount}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
