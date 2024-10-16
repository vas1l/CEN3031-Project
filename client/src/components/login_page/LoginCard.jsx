import { Link } from 'react-router-dom';

function LoginCard() {
  return (
    <div>
      <div className='login-card'>
        <div className='title'>
          <h1>Log In</h1>
          <p>
            Don't have an account? <Link to='/signup'>Sign Up</Link>
          </p>
        </div>
        <form className='user-information'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            name='username'
            id='username'
            placeholder='username'
          />

          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='password'
          />

          <Link to='/login-help' className='login-help'>
            Forgot your username/password?
          </Link>

          <button>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default LoginCard;
