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
  const [comment, setComment] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/forum/posts/${id}`, {
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

  // like post
  const handleLike = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/forum/posts/${id}/like`, {
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

  // add comment to post
  const handleComment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${apiBaseUrl}/api/forum/posts/${id}/comments`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ content: comment }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to post comment');
      }

      const updatedPost = await response.json();
      setPost(updatedPost);
      setComment(''); // Clear comment input after posting
    } catch (err) {
      setError('Failed to post comment');
      console.error('Error posting comment:', err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className='thread-error'>{error}</div>;
  }

  return (
    <>
      <LoggedInNavbar />
      <div className='thread-container'>
        <button onClick={handleBack} className='thread-back-button'>
          Back to Forum
        </button>

        {post && (
          <div className='thread-post-content'>
            <h1>{post.title}</h1>
            <p className='thread-post-category'>Category: {post.category}</p>
            <p className='thread-post-author'>
              Posted by: {post.userId.username}
            </p>
            <p className='thread-post-date'>
              Posted on: {new Date(post.createdAt).toLocaleString()}
            </p>
            <div className='thread-post-body'>{post.content}</div>
            <div className='thread-post-stats'>
              <button onClick={handleLike} className='thread-like-button'>
                {post.likes && post.likes.length > 0 ? (
                  <>
                    <FaHeart className='thread-icon' /> {post.likes.length}
                  </>
                ) : (
                  <>
                    <FaHeart className='thread-icon' /> 0
                  </>
                )}
              </button>
              <span className='thread-comment-count'>
                <FaComment className='thread-icon' />{' '}
                {post.comments?.length || 0}
              </span>
            </div>

            <div className='thread-comments-section'>
              <h2>Comments</h2>
              <form onSubmit={handleComment} className='thread-comment-form'>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder='Write a comment...'
                  required
                />
                <button type='submit'>Post Comment</button>
              </form>

              <div className='thread-comments-list'>
                {post.comments &&
                  post.comments.map((comment, index) => (
                    <div key={index} className='thread-comment'>
                      <p className='thread-comment-author'>
                        {comment.userId.username}
                      </p>
                      <p className='thread-comment-content'>
                        {comment.content}
                      </p>
                      <p className='thread-comment-date'>
                        {new Date(comment.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ForumThread;
