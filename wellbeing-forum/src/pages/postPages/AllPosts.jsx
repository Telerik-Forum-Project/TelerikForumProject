import { useEffect, useState } from "react";
import { getAllPosts, searchPosts } from "../../services/posts.service";
import { useNavigate, useSearchParams } from "react-router-dom";
import './AllPosts.css'

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filter, setFilter] = useState('');
  const [searchType, setSearchType] = useState('content'); // New state for search type
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') ?? '';

  useEffect(() => {
    getAllPosts()
      .then(posts => {
        setPosts(posts);
        const filtered = searchPosts(posts, search, searchType);
        setFilteredPosts(filtered);
      })
      .catch(error => alert(error.message));
  }, [search, searchType]);

  const setSearch = (value) => {
    setSearchParams({ search: value });
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    applyFilter(value);
  };

  const applyFilter = (filter) => {
    const now = new Date();
    let filtered = searchPosts(posts, search, searchType);

    switch (filter) {
      case 'lastHour':
        filtered = filtered.filter(post => new Date(post.createdOn) >= new Date(now - 60 * 60 * 1000));
        break;
      case 'lastDay':
        filtered = filtered.filter(post => new Date(post.createdOn) >= new Date(now - 24 * 60 * 60 * 1000));
        break;
      case 'lastWeek':
        filtered = filtered.filter(post => new Date(post.createdOn) >= new Date(now - 7 * 24 * 60 * 60 * 1000));
        break;
      case 'lastMonth':
        filtered = filtered.filter(post => new Date(post.createdOn) >= new Date(now - 30 * 24 * 60 * 60 * 1000));
        break;
      case 'lastYear':
        filtered = filtered.filter(post => new Date(post.createdOn) >= new Date(now - 365 * 24 * 60 * 60 * 1000));
        break;
      case 'mostLikes':
        filtered = [...filtered].sort((a, b) => b.likeCount - a.likeCount);
        break;
      default:
        filtered = posts;
    }

    setFilteredPosts(filtered);
  };

  return (
    <div id="main-div">
      <h1 id="posts-title">Posts</h1>
      
      {/* Search and Filter Container */}
      <div className="search-container">
        {/* Search Type Selection */}
        <div className="search-by-buttons">
          <label>
            <input
              type="radio"
              value="content"
              checked={searchType === 'content'}
              onChange={() => setSearchType('content')}
            />
            Search by Content
          </label>
          <label>
            <input
              type="radio"
              value="tag"
              checked={searchType === 'tag'}
              onChange={() => setSearchType('tag')}
            />
            Search by Tag
          </label>
        </div>
  
        {/* Search Input */}
        <div className="search-bar">
          <label htmlFor="search">Search </label>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            type="text"
            name="search"
            id="search"
          />
        </div>
  
        {/* Filter Selection */}
        <div className="filter-selection">
          <label htmlFor="filter">Filter by: </label>
          <select id="filter" value={filter} onChange={handleFilterChange}>
            <option value="">None</option>
            <option value="lastHour">Last Hour</option>
            <option value="lastDay">Last Day</option>
            <option value="lastWeek">Last Week</option>
            <option value="lastMonth">Last Month</option>
            <option value="lastYear">Last Year</option>
            <option value="mostLikes">Most Likes</option>
          </select>
        </div>
      </div>
  
      <ul className="posts-list">
        {filteredPosts.length > 0
          ? filteredPosts.map(p => (
              <li key={p.id} className="post-item">
                {p.title} <button onClick={() => navigate(`/singlepost/${p.id}`)}>read more</button>
              </li>
            ))
          : 'No posts'
        }
      </ul>
    </div>
  );
}



