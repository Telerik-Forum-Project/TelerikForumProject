import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AppContext } from '../../state/app.context';
import { dislikePost, likePost, updatePost, deletePost, addCommentToPost } from '../../services/posts.service';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getPostById } from '../../services/posts.service';

/**
 * 
 * @param {{ post: {
 *  id: string,
 *  author: string,
 *  title: string,
 *  content: string,
 *  createdOn: string,
 *  tags: string[]
 *  likedBy?: string[]
 * } }} props 
 * @returns 
 */
export default function Post({ post }) {
  const { userData } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    title: post.title,
    content: post.content,
    tags: post.tags.join(', '),
  });

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(post.comments || []);


  const navigate = useNavigate();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const updatedPost = await getPostById(post.id);
        setComments(updatedPost.comments || []); 
      } catch (error) {
        console.error("Failed to fetch comments:", error);
        setComments([]); 
      }
    };
  
    fetchComments();
  }, [post.id]);

  const toggleLike = async () => {
    if (!userData || !userData.handle) {
      alert('User is not logged in.');
      return;
    }

    const isLiked = post.likedBy.includes(userData.handle);
    try {
      if (isLiked) {
        await dislikePost(userData.handle, post.id);
      } else {
        await likePost(userData.handle, post.id);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditValues({
      ...editValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPost = {
      ...post,
      title: editValues.title,
      content: editValues.content,
      tags: editValues.tags.split(',').map(tag => tag.trim()),
    };
    try {
      await updatePost(post.id, updatedPost);
      setIsEditing(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(post.id);
        navigate('/posts');
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (comment.trim() === '') {
      alert('Comment cannot be empty');
      return;
    }

    if (!userData || !userData.handle) {
      alert('User is not logged in.');
      return;
    }

    const newComment = {
      author: userData.handle,
      content: comment,
      createdOn: new Date().toString(),
    };
    try {
      await addCommentToPost(post.id, newComment);
      setComments([...comments, newComment]);
      setComment('');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={editValues.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Content:</label>
            <textarea
              name="content"
              value={editValues.content}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Tags (comma separated):</label>
            <input
              type="text"
              name="tags"
              value={editValues.tags}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={toggleEdit}>Cancel</button>
          <button type="button" onClick={handleDelete}>Delete</button>
        </form>
       ) : (
        <>
          <h3>Title: {post.title}</h3>
          <p>Content: {post.content}</p>
          <p>Tags: {post.tags.join(' ')}</p>
          <p>Created on: {new Date(post.createdOn).toLocaleString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: false})}</p>
          <p>Created by: {post.author}</p>
          <button onClick={toggleLike}>{post.likedBy.includes(userData?.handle) ? 'Dislike' : 'Like'}</button>
          {userData.handle === post.author && (
            <button onClick={toggleEdit}>Edit</button>
          )}
          <h4>Comments:</h4>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index}>
                <p>Posted by: {comment.author}</p>
                <p>Comment: {comment.content}</p>
                <p>on date/time: {new Date(comment.createdOn).toLocaleString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: false})}</p>
                  <br/>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
          <form onSubmit={handleCommentSubmit}>
            <div>
              <label>Comment:</label>
              <input
                type="text"
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <button type="submit">Add Comment</button>
          </form>
        </>
      )}
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdOn: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    likedBy: PropTypes.arrayOf(PropTypes.string),
    comments: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdOn: PropTypes.string.isRequired,
    })),
  }).isRequired,
};
