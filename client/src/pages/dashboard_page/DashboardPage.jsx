import { useState, useEffect } from 'react';
import { apiBaseUrl } from '../../../utils/url';
import './DashboardPage.css';

import ProfileCard from '../../components/dashboard_page/ProfileCard';
import MoodTrackerCard from '../../components/dashboard_page/MoodTrackerCard';
import ForumPostsCard from '../../components/dashboard_page/ForumPostsCard';
import LoggedInNavbar from '../../components/loggedInNavbar';

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

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <LoggedInNavbar />
      <h1 className='Title'>Dashboard</h1>
      <h1 className='welcome'>
        {`Welcome ${userData.firstname} ${userData.lastname}`}
      </h1>
      <div className='dashboard-organization'>
        <MoodTrackerCard userId={userData._id} />
        <ProfileCard userData={userData} />
        <ForumPostsCard userData={userData} />
      </div>
    </div>
  );
}

export default DashboardPage;
