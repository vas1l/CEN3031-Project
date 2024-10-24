import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { apiBaseUrl } from '../../../utils/url';

function LoginCard() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  // Redirect to dashboard page upon login success
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate('/dashboard');
      }, 250);
    }
  }, [success]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {
      const response = await fetch(`${apiBaseUrl}/api/user/login`, {
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
        console.log('Login successful', data);
      } else {
        setError(data.error);
        setSuccess(false);
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred');
    }
  };

  return (
    <div className='login-card'>
      <div className='title'>
        <h1>Log In</h1>
        <p>
          Don't have an account? <Link to='/signup'>Sign Up</Link>
        </p>
      </div>

      <form className='user-information' onSubmit={handleSubmit}>
        <label htmlFor='email'>Username</label>
        <input
          type='text'
          name='email'
          id='email'
          placeholder='example@email.com'
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          id='password'
          placeholder='password'
          value={formData.password}
          onChange={handleChange}
        />

        {/* Login help */}
        {/* <Link to='/login-help' className='login-help'>
            Forgot your username/password?
          </Link> */}

        <button>
          {!success ? (
            <div>Log In</div>
          ) : (
            <div>Log In Successful. Redirecting to dashboard.</div>
          )}
        </button>
      </form>

      {/* Error message */}
      {error && <p className='error-msg'>{error}</p>}
    </div>
  );
}

export default LoginCard;
