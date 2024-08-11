import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getAllPosts, sortPostsByCommentCount } from "../../services/posts.service";

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
                        <div key={post.id}>
                            <h2> <Link to={`/singlepost/${post.id}`}>{post.title}</Link></h2>
                            <p>Comments: {post.commentCount}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
