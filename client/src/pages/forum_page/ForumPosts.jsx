import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiBaseUrl } from '../../../utils/url';
import './ForumPosts.css';

function ForumPosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/forum/get-all-posts`, {
          credentials: 'include',
        });

        const data = await response.json();

        setPosts(data);
      } catch (err) {
        setError('Failed to fetch posts');
        console.error('Error fetching posts:', err);
      }
    };

    fetchPosts();
  }, []);

  // like/unlike post
  const handleLike = async (postId) => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/forum/like/${postId}`, {
        method: 'PUT',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to like post');
      }

      const updatedPost = await response.json();

      // update posts state with the updated post
      setPosts(
        posts.map((post) =>
          post._id === postId ? { ...updatedPost, userId: post.userId } : post
        )
      );
    } catch (err) {
      setError('Failed to like post');
      console.error('Error liking post:', err);
    }
  };

  const categories = [
    'All',
    'General',
    'Academic',
    'Mental Health',
    'Social',
    'Financial',
    'Other',
  ];

  const filteredPosts =
    selectedCategory === 'All'
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  return (
    <div className='forum-posts-container'>
      <h1>Community Forum</h1>
      <Link to='/forum/create-post'>
        <button>Create New Post</button>
      </Link>

      <div>
        <label htmlFor='category'>Filter by Category: </label>
        <select
          id='category'
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {error && <p className='error'>{error}</p>}

      <div>
        {filteredPosts.map((post) => (
          <div key={post._id}>
            <h2>{post.title}</h2>
            <p>Category: {post.category}</p>
            <p>Posted by: {post.userId.username}</p>
            <p>{post.content}</p>
            <p>Posted on: {new Date(post.createdAt).toLocaleDateString()}</p>
            <div>
              <button onClick={() => handleLike(post._id)}>
                {post.likes && post.likes.length > 0
                  ? `❤️ ${post.likes.length}`
                  : '🤍 0'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForumPosts;
