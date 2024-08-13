import PropTypes from 'prop-types';
import { useContext, useState, useEffect, useRef } from 'react';
import { AppContext } from '../../state/app.context';
import { dislikePost, likePost, updatePost, deletePost, addCommentToPost, deleteComment, updateComment } from '../../services/posts.service';
import { useNavigate } from 'react-router-dom';
import { getPostById, getUniqueCommentId } from '../../services/posts.service';
import './Post.css';

/**
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
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [commentEditValues, setCommentEditValues] = useState({});

  const navigate = useNavigate();

  const sessionStartTime = useRef(new Date().getTime());

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

    const newCommentId = getUniqueCommentId();

    const newComment = {
      id: newCommentId,
      author: userData.handle,
      content: comment,
      createdOn: new Date().toString(),
    };
    try {
      await addCommentToPost(post.id, newComment);
      setComments(prevComments => [...prevComments, newComment]);
      setComment('');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEditComment = (commentId, content) => {
    setEditingCommentId(commentId);
    setCommentEditValues(prev => ({
      ...prev,
      [commentId]: content,
    }));
  };

  const handleSubmitCommentEdit = async (commentId) => {
    const commentToUpdate = comments.find(comment => comment.id === commentId);
  
    if (!commentToUpdate) {
      alert('Comment not found');
      return;
    }

    const updatedComment = {
      ...commentToUpdate,
      content: commentEditValues[commentId] || commentToUpdate.content,
    };
  
    console.log('Updating comment:', updatedComment); 
  
    try {
      await updateComment(post.id, commentId, updatedComment);
      setComments(prevComments =>
        prevComments.map(comment =>
          comment.id === commentId ? updatedComment : comment
        )
      );
      setEditingCommentId(null);
    } catch (error) {
      alert('Failed to update the comment: ' + error.message);
      console.error('Update error:', error); 
    }
  };

  const handleCommentChange = (commentId, e) => {
    const { value } = e.target;
    setCommentEditValues(prev => ({
      ...prev,
      [commentId]: value,
    }));
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await deleteComment(post.id, commentId);
        setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
      } catch (error) {
        alert('Failed to delete the comment: ' + error.message);
      }
    }
  };

  return (
    <div className="post-container">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="edit-form">
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
          <button type="submit" className="edit-button">Save</button>
          <button type="button" className="edit-button" onClick={toggleEdit}>Cancel</button>
          <button type="button" className="delete-button" onClick={handleDelete}>Delete</button>
        </form>
      ) : (
        <>
          <h3 className="post-title">     {post.title}
          {post.tags.map(tag => (
            <span key={tag} className="post-tag"> #{tag}</span>
          ))}</h3>
          <div className="post-meta-container">
            <p className="post-content">{post.content}</p>
            <p className="bordered">Created on: {new Date(post.createdOn).toLocaleString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false
            })}</p>
            <p className="bordered">Created by: {post.author}</p>
          </div>
          <div className="post-actions">
            <button className={`like-button ${userData?.handle && post.likedBy.includes(userData.handle) ? 'liked' : ''}`} onClick={toggleLike}>
              {userData?.handle && post.likedBy.includes(userData.handle) ? 'Dislike' : 'Like'}
            </button>
            {userData?.handle === post.author && (
              <button className="edit-button" onClick={toggleEdit}>Edit</button>
            )}
          </div>
          <h4>Comments:</h4>
          {comments.length > 0 ? (
            comments.map(comment => {
              const commentCreationTime = new Date(comment.createdOn).getTime();
              const isNewComment = commentCreationTime >= sessionStartTime.current;

              return (
                <div key={comment.id}>
                  {editingCommentId === comment.id ? (
                    <div>
                      <textarea
                        value={commentEditValues[comment.id] || comment.content}
                        onChange={(e) => handleCommentChange(comment.id, e)}
                      />
                      <button onClick={() => handleSubmitCommentEdit(comment.id)}>Save</button>
                      <button onClick={() => setEditingCommentId(null)}>Cancel</button>
                    </div>
                  ) : (
                    <div>
                      <p>Posted by: {comment.author}</p>
                      <p>Comment: {comment.content}</p>
                      <p>
                        on date/time: {new Date(comment.createdOn).toLocaleString('en-US', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                          hour12: false
                        })}
                      </p>
                      {userData?.handle === comment.author && !isNewComment && (
                        <>
                          <button onClick={() => handleEditComment(comment.id, comment.content)}>Edit</button>
                          <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                        </>
                      )}
                      <br />
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p>No comments yet.</p>
          )}
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
