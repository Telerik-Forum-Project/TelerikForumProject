import { useState, useContext } from "react";
import { AppContext } from "../../state/app.context";
import { createPost } from "../../services/posts.service";
import { useNavigate } from "react-router-dom";
import './CreatePost.css'

export default function CreatePost() {
    const [post, setPost] = useState({
        title: '',
        content: '',
        tags: '',
    });
    const { userData } = useContext(AppContext);
    const navigate = useNavigate();

    const updatePost = (key, value) => {
        setPost({
            ...post,
            [key]: value,
        });
    };

    const handleCreatePost = async () => {
        if (userData.isBlocked) {
            return alert('You are blocked from creating posts.');
        }

        if (post.title.length < 3) {
            return alert('Title too short!');
        }

        if (post.title.length > 64) {
            return alert('Title too long!');
        }

        if (post.content.length < 10) {
            return alert('Comment too short!');
        }

        if (post.content.length > 8192) {
            return alert('Comment too long!');
        }

        if (!post.tags.trim()) {
            return alert("You haven't written any tag!");
        }

        if (!userData || !userData.handle) {
            return alert('User data is not available');
        }

        const tagsArray = post.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);

        try {
            const postId = await createPost(userData.handle, post.title, post.content, tagsArray);
            setPost({ title: '', content: '', tags: '' });

            navigate(`/singlepost/${postId}`);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div id="createPost-container">
          <label htmlFor="title">Title: </label>
          <input
            value={post.title}
            onChange={e => updatePost('title', e.target.value)}
            type="text"
            name="title"
            id="title"
            placeholder="Enter the title of your post"
          /><br />
          <label htmlFor="content">Content: </label>
          <textarea
            value={post.content}
            onChange={e => updatePost('content', e.target.value)}
            name="content"
            id="content"
            placeholder="Write the content of your post"
          /><br /><br />
          <label htmlFor="tags">Tags (separated by commas): </label>
          <input
            value={post.tags}
            onChange={e => updatePost('tags', e.target.value)}
            type="text"
            name="tags"
            id="tags"
            placeholder="Enter tags separated by commas (e.g., Fitness, Health)"
          /><br />
          <button onClick={handleCreatePost}>Create Post</button>
        </div>
      );
}
