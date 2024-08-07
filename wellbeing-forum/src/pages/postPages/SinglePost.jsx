import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { onValue, ref } from "firebase/database";
import { db } from "../../config/firebase-config";
import Post from "../../components/postComponents/Post";

export default function SinglePost() {
    const [post, setPost] = useState(null);
    const { id } = useParams();
  
    useEffect(() => {
      return onValue(ref(db, `Posts/${id}`), snapshot => {
        const updatedPost = snapshot.val();
        setPost({
          ...updatedPost,
          likedBy: Object.keys(updatedPost.likedBy ?? {}),
        });
      });
    }, [id]);
  
    return (
      <div>
        <h1>Single post</h1>
        { post && <Post post={post}/> }
      </div>
    )
  }