import { useState, useEffect } from "react";
import useAdmin from '../../hooks/useAdmin';
import { searchUsers, toggleUserBlock } from "../../services/user.services";
import { getAllPosts, deletePost } from "../../services/posts.service";
import './AdminPanel.css';

export default function AdminPanel() {
  const { loading, isAdminUser } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [postSearchQuery, setPostSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      searchUsers(searchQuery).then(setUsers);
    } else {
      setUsers([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (isAdminUser) {
      getAllPosts().then(allPosts => {
        if (postSearchQuery) {
          setFilteredPosts(allPosts.filter(post => post.title.toLowerCase().includes(postSearchQuery.toLowerCase())));
        } else {
          setFilteredPosts([]);
        }
        setPosts(allPosts);
      });
    }
  }, [isAdminUser, postSearchQuery]);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handlePostSearchChange = (e) => setPostSearchQuery(e.target.value);

  const handleBlockUser = async (handle, block) => {
    await toggleUserBlock(handle, block);
    const updatedUsers = users.map(user => user.handle === handle ? { ...user, isBlocked: block } : user);
    setUsers(updatedUsers);
  };

  const handleDeletePost = async (postId) => {
    await deletePost(postId);
    setPosts(posts.filter(post => post.id !== postId));
    setFilteredPosts(filteredPosts.filter(post => post.id !== postId));
  };

  if (loading) {
    return null; 
  }

  if (!isAdminUser) {
    return null; 
  }

  return (
    <div className="admin-popup">
      <h4>Admin Panel</h4>
      <div>
        <h3>Search Users</h3>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by username, last name, or name"
        />
        {searchQuery && (
          <ul>
            {users.map(user => (
              <li key={user.handle}>
                {user.firstName} {user.lastName} - {user.email}
                <button onClick={() => handleBlockUser(user.handle, !user.isBlocked)}>
                  {user.isBlocked ? 'Unblock' : 'Block'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h3>Search Posts</h3>
        <input
          type="text"
          value={postSearchQuery}
          onChange={handlePostSearchChange}
          placeholder="Search by post title"
        />
        {postSearchQuery && (
          <ul>
            {filteredPosts.map(post => (
              <li key={post.id}>
                {post.title} - {post.author}
                <button onClick={() => handleDeletePost(post.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
