import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { onValue, ref } from "firebase/database";
import { db } from "../../config/firebase-config";
import Post from "../../components/postComponents/Post";
import "./SinglePost.css";
import '../../components/postComponents/Post.css'

export default function SinglePost() {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const postRef = ref(db, `Posts/${id}`);
    const unsubscribe = onValue(postRef, snapshot => {
      const updatedPost = snapshot.val();
      if (updatedPost) {
        setPost({
          ...updatedPost,
          likedBy: Object.keys(updatedPost.likedBy ?? {}),
          comments: Array.isArray(updatedPost.comments) ? updatedPost.comments : [],
        });
      }
    });

  
    return () => unsubscribe();
  }, [id]);

  return (
    <div id="single-container">
      {post ? <Post post={post} /> : <p>Loading...</p>}
    </div>
  );
}
