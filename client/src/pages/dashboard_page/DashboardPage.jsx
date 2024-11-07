import { useState, useEffect } from 'react';
import { apiBaseUrl } from '../../../utils/url';
import './DashboardPage.css';
import './MoodTracker.css';
import './ForumPosts.css';
import './Profile.css';

function DashboardPage() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/user/getbyjwt`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        return response.json();
      })
      .then((data) => setUserData(data))
      .catch((error) => {
        setError(error.message);
        console.error(error.message);
      });
  }, []);

  return (
    <div>
      <h1 className='Title'>Dashboard</h1>

      {userData ? userData : error}

      <div className='dashboard-organization'>
        <MoodTracker />
        <Profile />
        <ForumPosts />
      </div>
    </div>
  );
}

const MoodTracker = () => {
  return (
    <section className='mood-tracker'>
      <h2 className='section-title'>How are you feeling today?</h2>

      <div className='mood-rating'>
        <button className='mood-button'>1</button>
        <button className='mood-button'>2</button>
        <button className='mood-button'>3</button>
        <button className='mood-button'>4</button>
        <button className='mood-button'>5</button>
        <button className='mood-button'>6</button>
        <button className='mood-button'>7</button>
        <button className='mood-button'>8</button>
        <button className='mood-button'>9</button>
        <button className='mood-button'>10</button>
      </div>

      <div className='mood-help'>
        <p>
          Try meditating to help improve your mood:{' '}
          <a href='#' className='meditation'>
            Meditation
          </a>
        </p>

        <p>
          Or talk to others:{' '}
          <a href='#' className='talk-to-albert'>
            Talk to Albert
          </a>{' '}
          <a href='#' className='forum-link'>
            Forum
          </a>
        </p>
      </div>
    </section>
  );
};

const Profile = () => {
  return (
    <section className='profile'>
      <h2 className='section-title'>Profile Information</h2>

      <p className='about-me'>
        Hi, my name is Diksha Gupta, and I love Snoopy. If you don't love
        Snoopy, we're gonna have a problem.
      </p>

      <div className='profile-info'>
        <div className='info-row'>
          <p className='heading'>Full Name:</p>
          <p className='personal-info'>Diksha Gupta</p>
        </div>

        <div className='info-row'>
          <p className='heading'>Mobile:</p>
          <p className='personal-info'>123-456-7890</p>
        </div>

        <div className='info-row'>
          <p className='heading'>Email:</p>
          <p className='personal-info'>diksha230604@gmail.com</p>
        </div>

        <div className='info-row'>
          <p className='heading'>Location:</p>
          <p className='personal-info'>Gainesville, Florida</p>
        </div>

        <div className='info-row'>
          <p className='heading'>Social Media:</p>
          <p className='personal-info'>Instagram: diksha.gupt.a</p>
        </div>
      </div>
    </section>
  );
};

const ForumPosts = () => {
  return (
    <section className='forum-posts'>
      <h2 className='section-title'>Forum Posts</h2>

      <div className='posts'>
        <div className='content'>
          <h4>How to hate on Shlok?</h4>
          <p>Hi! I need more information on...</p>
        </div>
        <a href='#' className='view-link'>
          View
        </a>
      </div>

      <div className='posts'>
        <div className='content'>
          <h4>Why am I depressed?</h4>
          <p>Because Shlok is on this team</p>
        </div>
        <a href='#' className='view-link'>
          View
        </a>
      </div>

      <div className='posts'>
        <div className='content'>
          <h4>How to fix unproductivity?</h4>
          <p>Gaslight Shlok</p>
        </div>
        <a href='#' className='view-link'>
          View
        </a>
      </div>

      <div className='posts'>
        <div className='content'>
          <h4>How to stay happy?</h4>
          <p>Don't meet Shlok...</p>
        </div>
        <a href='#' className='view-link'>
          View
        </a>
      </div>
    </section>
  );
};

export default DashboardPage;
