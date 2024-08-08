import PropType from 'prop-types';
import { useContext } from 'react';
import { AppContext } from '../../state/app.context';
import { dislikePost, likePost, updatePost, deletePost } from '../../services/posts.service';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate(); 

  const toggleLike = async () => {
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
          <p>Comment: {post.content}</p>
          <p>Tags: {post.tags.join(' ')}</p>
          <p>Created on: {new Date(post.createdOn).toLocaleDateString()}</p>
          <p>Created by: {post.author}</p>
          <button onClick={toggleLike}>{post.likedBy.includes(userData?.handle) ? 'Dislike' : 'Like'}</button>
          <button onClick={toggleEdit}>Edit</button>
          <button>Comment</button>
        </>
      )}
    </div>
  );
}

Post.propTypes = {
  post: PropType.shape({
    id: PropType.string,
    author: PropType.string,
    title: PropType.string,
    content: PropType.string,
    createdOn: PropType.string,
    tags: PropType.arrayOf(PropType.string),
    likedBy: PropType.arrayOf(PropType.string),
  })
}



// return (
//   <div>
//     <h3>Title: {post.title}</h3>
//     <p>Comment: {post.content}</p>
//     <p>Tags: {post.tags.join(" ")}</p>
//     <p>Created on: {new Date(post.createdOn).toLocaleDateString()}</p>
//     <p>Created by: {post.author}</p>
//     <button onClick={toggleLike}>{post.likedBy.includes(userData?.handle) ? 'Dislike' : 'Like'}</button>
//   </div>
// )

// import PropTypes from 'prop-types'

// export default function Post({ title, content, author, date, likes }) {


//     return (
//       <div className="post">
//         <h2>{title}</h2>
//         <p>{content}</p>
//         <small>Posted by {author} on {date}</small>
//         <div>
//           <span>{likes} Likes</span>
//           {/* LikeButton */}
//         </div>
//       </div>
//     );
//   }

// Post.propTypes = {
//     title: PropTypes.string.isRequired,
//     content: PropTypes.string.isRequired,
//     author: PropTypes.string.isRequired,
//     date: PropTypes.string.isRequired,
//     likes: PropTypes.number.isRequired,
// };