import { useState, useEffect } from "react";
import useAdmin from '../../hooks/useAdmin';
import { searchUsers, toggleUserBlock } from "../../services/user.services";
import { getAllPosts, deletePost } from "../../services/posts.service";
import './AdminPanel.css'

export default function AdminPanel() {
  const { loading, isAdminUser } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      searchUsers(searchQuery).then(setUsers);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (isAdminUser) {
      getAllPosts().then(setPosts);
    }
  }, [isAdminUser]);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleBlockUser = async (handle, block) => {
    await toggleUserBlock(handle, block);
    const updatedUsers = users.map(user => user.handle === handle ? { ...user, isBlocked: block } : user);
    setUsers(updatedUsers);
  };

  const handleDeletePost = async (postId) => {
    await deletePost(postId);
    setPosts(posts.filter(post => post.id !== postId));
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
      </div>
    </div>
  );
}
