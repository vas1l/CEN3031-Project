import './MoodTrackerCard.css';

const MoodTrackerCard = () => {
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

export default MoodTrackerCard;
