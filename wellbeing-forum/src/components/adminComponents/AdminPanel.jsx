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
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [filterType, setFilterType] = useState('users');
  const [sortCriteria, setSortCriteria] = useState('');
  const [filterCriteria, setFilterCriteria] = useState('');
 
  useEffect(() => {
    if (searchQuery) {
      searchUsers(searchQuery).then(allUsers => {
        setFilteredUsers(allUsers);
        setUsers(allUsers);
      });
    } else {
      setUsers([]);
      setFilteredUsers([]);
    }
  }, [searchQuery]);
 
  useEffect(() => {
    if (isAdminUser) {
      getAllPosts().then(allPosts => {
        let filtered = allPosts;
        if (postSearchQuery) {
          filtered = filtered.filter(post => post.title.toLowerCase().includes(postSearchQuery.toLowerCase()));
        }
        if (filterCriteria) {
          filtered = filtered.filter(post => post.category === filterCriteria);
        }
        if (sortCriteria) {
          filtered = filtered.sort((a, b) => {
            if (sortCriteria === 'title') {
              return a.title.localeCompare(b.title);
            } else if (sortCriteria === 'date') {
              return new Date(b.date) - new Date(a.date);
            }
            return 0;
          });
        }
        setFilteredPosts(filtered);
        setPosts(allPosts);
      });
    }
  }, [isAdminUser, postSearchQuery, sortCriteria, filterCriteria]);
 
  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handlePostSearchChange = (e) => setPostSearchQuery(e.target.value);
  const handleSortChange = (e) => setSortCriteria(e.target.value);
  const handleFilterChange = (e) => setFilterCriteria(e.target.value);
 
  const handleBlockUser = async (handle, block) => {
    await toggleUserBlock(handle, block);
    const updatedUsers = users.map(user => user.handle === handle ? { ...user, isBlocked: block } : user);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };
 
  const handleDeletePost = async (postId) => {
    await deletePost(postId);
    setPosts(posts.filter(post => post.id !== postId));
    setFilteredPosts(filteredPosts.filter(post => post.id !== postId));
  };
 
  const togglePanel = () => setIsPanelOpen(!isPanelOpen);
 
  if (loading) {
    return null; 
  }
 
  if (!isAdminUser) {
    return null; 
  }
 
  return (
    <>
      <button className="admin-panel-toggle" onClick={togglePanel}>
        {isPanelOpen ? 'Close Admin Panel' : 'Open Admin Panel'}
      </button>
      {isPanelOpen && (
        <div className="admin-popup">
          <h4>Admin Panel</h4>
          <div>
            <h3>Search</h3>
            <div>
              <button onClick={() => setFilterType('users')}>Search Users</button>
              <button onClick={() => setFilterType('posts')}>Search Posts</button>
            </div>
            {filterType === 'users' && (
              <>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search by username, last name or name"
                />
                {filteredUsers.length > 0 ? (
                  <ul>
                    {filteredUsers.map(user => (
                      <li key={user.handle}>
                        {user.firstName} {user.lastName} - {user.email}
                        <button onClick={() => handleBlockUser(user.handle, !user.isBlocked)}>
                          {user.isBlocked ? 'Unblock' : 'Block'}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No users found</p>
                )}
              </>
            )}
            {filterType === 'posts' && (
              <>
                <input
                  type="text"
                  value={postSearchQuery}
                  onChange={handlePostSearchChange}
                  placeholder="Search by post title or content"
                />
                <div>
                  <label>Sort by: </label>
                  <select value={sortCriteria} onChange={handleSortChange}>
                    <option value="">None</option>
                    <option value="title">Title</option>
                    <option value="date">Date</option>
                  </select>
                </div>
                <div>
                  <label>Filter by category: </label>
                  <select value={filterCriteria} onChange={handleFilterChange}>
                    <option value="">None</option>
                    <option value="fitness">Fitness</option>
                    <option value="health">Health</option>
                    <option value="lifestyle">Lifestyle</option>
                  </select>
                </div>
                {filteredPosts.length > 0 ? (
                  <ul className="admin-post-list" >
                    {filteredPosts.map(post => (
                      <li key={post.id}>
                        {post.title} - {post.content}
                        <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No posts found</p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}