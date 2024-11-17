import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import './landing_page/css/navbar.css';
import { apiBaseUrl } from '../../utils/url';

function LoggedInNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef(null);
  const navigate = useNavigate();

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
        {/* Put logo */}
        <h1>GatorGrind</h1>
      </Link>

      {/* Mobile menu button */}
      <div className='mobile-menu-button'>
        <button onClick={toggleMenu} className='menu-button'>
          {isOpen ? <HiX size={30} /> : <HiMenu size={30} />}
        </button>
      </div>

      {/* Menu for larger screens */}
      <ul className='menu'>
        <Link to='/dashboard' className='menu-item'>
          Dashboard
        </Link>
        <Link to='/albert' className='menu-item'>
          Chat with Albert
        </Link>
        <Link to='/' onClick={handleLogout} className='menu-item nav-button'>
          Sign Out
        </Link>
      </ul>

      {/* Dropdown menu for mobile screens */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <ul>
          <Link to='/dashboard' className='menu-item' onClick={closeMenu}>
            Dashboard
          </Link>
          <Link to='/albert' className='menu-item' onClick={closeMenu}>
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