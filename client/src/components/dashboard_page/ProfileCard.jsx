import './ProfileCard.css';

const ProfileCard = () => {
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

export default ProfileCard;
