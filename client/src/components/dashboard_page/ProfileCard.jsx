import './ProfileCard.css';

const ProfileCard = ({ userData }) => {
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
          <p className='personal-info'>
            {userData ? `${userData.firstname} ${userData.lastname}` : 'Error'}
          </p>
        </div>

        <div className='info-row'>
          <p className='heading'>Mobile:</p>
          <p className='personal-info'>123-456-7890</p>
        </div>

        <div className='info-row'>
          <p className='heading'>Email:</p>
          <p className='personal-info'>
            {userData ? `${userData.email}` : 'Error'}
          </p>
        </div>

        <div className='info-row'>
          <p className='heading'>Location:</p>
          <p className='personal-info'>Sample, Location</p>
        </div>

        <div className='info-row'>
          <p className='heading'>Social Media:</p>
          <p className='personal-info'>Instagram: @sample</p>
        </div>
      </div>
    </section>
  );
};

export default ProfileCard;
