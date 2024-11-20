import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiBaseUrl } from '../../../utils/url';
import './ForumPostsCard.css';
import { FaHeart, FaComment } from 'react-icons/fa';

const ForumPostsCard = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/forum/users/me/posts`, {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError('Failed to load posts');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, []);

  return (
    <section className='forum-posts'>
      <div className='forum-header'>
        <h2 className='section-title'>Forum Posts</h2>
        <Link to='/forum'>
          <button className='view-forum-btn'>View All Forum Posts</button>
        </Link>
      </div>

      {loading ? (
        <p className='message'>Loading posts...</p>
      ) : error ? (
        <p className='message error'>{error}</p>
      ) : posts.length === 0 ? (
        <p className='message'>You haven't created any posts yet.</p>
      ) : (
        <div className='posts-container'>
          {posts.slice(0, 15).map((post) => (
            <div key={post._id} className='posts'>
              <div className='content'>
                <h4>{post.title}</h4>
                <p>{post.content}</p>
              </div>
              <div className='actions'>
                <div className='post-stats'>
                  <span className='stat'>
                    <FaHeart className='icon' /> {post.likes.length}
                  </span>
                  <span className='stat'>
                    <FaComment className='icon' /> {post.comments?.length || 0}
                  </span>
                </div>
                <Link to='/forum' className='view-link'>
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ForumPostsCard;
