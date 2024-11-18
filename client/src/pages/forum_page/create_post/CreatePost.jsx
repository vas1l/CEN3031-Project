import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiBaseUrl } from '../../../../utils/url';
import './CreatePost.css';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiBaseUrl}/api/forum/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title,
          content,
          category,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      navigate('/forum');
    } catch (err) {
      setError(err.message);
      console.error('Error creating post:', err);
    }
  };

  const handleBack = () => {
    navigate('/forum');
  };

  return (
    <div className='create-post-container'>
      <button id='back-to-forum-btn' onClick={handleBack}>Back to Forum</button>
      <h1>Create New Post</h1>
      {error && <p className='error'>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>Title: </label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            minLength={3}
            maxLength={100}
          />
        </div>

        <div>
          <label htmlFor='category'>Category: </label>
          <select 
            id='custom-label-select'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value='General'>General</option>
            <option value='Academic'>Academic</option>
            <option value='Mental Health'>Mental Health</option>
            <option value='Social'>Social</option>
            <option value='Financial'>Financial</option>
            <option value='Other'>Other</option>
          </select>
        </div>

        <div>
          <label htmlFor='content'>Content: </label>
          <textarea
            id='content'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            minLength={10}
            maxLength={2000}
            rows={10}
          />
        </div>

        <button id = 'back-to-forum-btn' type='submit'>Create Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
