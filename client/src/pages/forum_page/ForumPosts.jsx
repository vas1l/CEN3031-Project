import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiBaseUrl } from '../../../utils/url';
import './ForumPosts.css';
import './Createpostbutton.css';
import { FaHeart, FaComment } from 'react-icons/fa';

function ForumPosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

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

  const handleLike = async (e, postId) => {
    e.stopPropagation();
    try {
      const response = await fetch(`${apiBaseUrl}/api/forum/like/${postId}`, {
        method: 'PUT',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to like post');
      }

      const updatedPost = await response.json();

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

  const handlePostClick = (postId) => {
    navigate(`/forum/post/${postId}`);
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
        <button id='create-post-btn'>Create New Post</button>
      </Link>

      <div className='category-filter'>
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
          <div
            key={post._id}
            onClick={() => handlePostClick(post._id)}
            className='post-item'
            style={{ cursor: 'pointer' }}
          >
            <div className='post-header'>
              <h2>{post.title}</h2>
              <span className='category-tag'>{post.category}</span>
            </div>
            <div className='post-metadata'>
              <span className='author'>By {post.userId.username}</span>
              <span className='date'>
                {new Date(post.createdAt).toLocaleString()}
              </span>
            </div>
            <p className='post-content'>{post.content}</p>
            <div className='post-interactions'>
              <button
                className='like-button'
                onClick={(e) => handleLike(e, post._id)}
              >
                <FaHeart className='icon' />
                {post.likes?.length || 0}
              </button>
              <span className='comment-count'>
                <FaComment className='icon' />
                {post.comments?.length || 0}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForumPosts;
