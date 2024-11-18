import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiBaseUrl } from '../../../../utils/url';
import LoggedInNavbar from '../../../components/loggedInNavbar';
import './ForumThread.css';
import { FaHeart, FaComment } from 'react-icons/fa';

const ForumThread = () => {
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/forum/get-post/${id}`, {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }

        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError('Failed to load post');
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleBack = () => {
    navigate('/forum');
  };

  const handleLike = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/forum/like/${id}`, {
        method: 'PUT',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to like post');
      }

      const updatedPost = await response.json();
      setPost({ ...updatedPost, userId: post.userId });
    } catch (err) {
      setError('Failed to like post');
      console.error('Error liking post:', err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <LoggedInNavbar />
      <div className='forum-thread-container'>
        <button onClick={handleBack} className='back-button'>
          Back to Forum
        </button>

        {post && (
          <div className='post-content'>
            <h1>{post.title}</h1>
            <p className='post-category'>Category: {post.category}</p>
            <p className='post-author'>Posted by: {post.userId.username}</p>
            <p className='post-date'>
              Posted on: {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <div className='post-body'>{post.content}</div>
            <div className='post-stats'>
              <button onClick={handleLike}>
                {post.likes && post.likes.length > 0 ? (
                  <>
                    <FaHeart className='icon' /> {post.likes.length}
                  </>
                ) : (
                  <>
                    <FaHeart className='icon' /> 0
                  </>
                )}
              </button>
              <span>
                <FaComment className='icon' /> {post.comments?.length || 0}
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ForumThread;
