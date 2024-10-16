import { Link } from 'react-router-dom';
import { useState } from 'react';

function SignupCard() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5001/api/user/signup`, {
        // TODO: Change URL to work outside of
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        setError(null);
        console.log('Signup successful', data);
      } else {
        setError(data.error);
        setSuccess(false);
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred');
      setSuccess(false);
    }
  };

  return (
    <div className='signup-card'>
      <div className='title'>
        <h1>Sign Up</h1>
        <p>
          Already have an account? <Link to='/login'>Log In</Link>
        </p>
      </div>
      <form className='user-information' onSubmit={handleSubmit}>
        <label htmlFor='firstname'>First Name</label>
        <input
          type='text'
          name='firstname'
          id='firstname'
          placeholder='John'
          onChange={handleChange}
        />

        <label htmlFor='lastname'>Last Name</label>
        <input
          type='text'
          name='lastname'
          id='lastname'
          placeholder='Doe'
          onChange={handleChange}
        />

        <label htmlFor='username'>Username</label>
        <input
          type='text'
          name='username'
          id='username'
          placeholder='username'
          onChange={handleChange}
        />

        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          id='email'
          placeholder='user@email.com'
          onChange={handleChange}
        />

        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          id='password'
          placeholder='password'
          onChange={handleChange}
        />

        <button>
          {!success ? <div>Sign Up</div> : <div>Signup Successful</div>}
        </button>
      </form>
      {/* Error message */}
      {error && <p className='error-msg'>{error}</p>}
    </div>
  );
}

export default SignupCard;
