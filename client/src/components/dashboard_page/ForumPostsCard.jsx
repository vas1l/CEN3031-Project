import './ForumPostsCard.css';

const ForumPostsCard = () => {
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

export default ForumPostsCard;
