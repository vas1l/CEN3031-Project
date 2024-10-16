import { Link } from 'react-router-dom';

function SignupCard() {
  return (
    <div className='signup-card'>
      <div className='title'>
        <h1>Sign Up</h1>
        <p>
          Already have an account? <Link to='/login'>Log In</Link>
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

        <label htmlFor='full-name'>Full Name</label>
        <input
          type='text'
          name='full-name'
          id='full-name'
          placeholder='John Doe'
        />

        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          id='email'
          placeholder='user@email.com'
        />

        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          id='password'
          placeholder='password'
        />

        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupCard;
