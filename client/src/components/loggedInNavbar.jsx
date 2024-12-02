import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import './landing_page/css/navbar.css';
import { apiBaseUrl } from '../../utils/url';

function LoggedInNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation(); // get the current pathname to show active class on current page link

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/user/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        navigate('/');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <nav ref={navbarRef} className='navbar'>
      <Link to='/dashboard'>
        <h1>GatorGrind</h1>
      </Link>

      <div className='mobile-menu-button'>
        <button onClick={toggleMenu} className='menu-button'>
          {isOpen ? <HiX size={30} /> : <HiMenu size={30} />}
        </button>
      </div>

      <ul className='menu'>
        <Link
          to='/dashboard'
          className={`menu-item ${
            location.pathname === '/dashboard' ? 'active' : ''
          }`}
        >
          Dashboard
        </Link>
        <Link
          to='/albert'
          className={`menu-item ${
            location.pathname === '/albert' ? 'active' : ''
          }`}
        >
          Chat with Albert
        </Link>
        <Link
          to='/forum'
          className={`menu-item ${
            location.pathname === '/forum' ? 'active' : ''
          }`}
        >
          Community Forum
        </Link>
        <Link to='/' onClick={handleLogout} className='menu-item nav-button'>
          Sign Out
        </Link>
      </ul>

      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <ul>
          <Link
            to='/dashboard'
            className={`menu-item ${
              location.pathname === '/dashboard' ? 'active' : ''
            }`}
            onClick={closeMenu}
          >
            Dashboard
          </Link>
          <Link
            to='/albert'
            className={`menu-item ${
              location.pathname === '/albert' ? 'active' : ''
            }`}
            onClick={closeMenu}
          >
            Chat with Albert
          </Link>
          <Link
            to='/'
            onClick={() => {
              handleLogout();
              closeMenu();
            }}
            className='menu-item nav-button'
          >
            Sign Out
          </Link>
        </ul>
      </div>
    </nav>
  );
}

export default LoggedInNavbar;
