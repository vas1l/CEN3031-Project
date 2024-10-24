import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import './css/navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef(null);

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

  return (
    <nav ref={navbarRef} className='navbar'>
      <Link to='/'>
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
        <Link to='/#about' className='menu-item'>
          About
        </Link>
        <Link to='/#services' className='menu-item'>
          Services
        </Link>
        <Link to='/login' className='menu-item nav-button'>
          Log In
        </Link>
        <Link to='/signup' className='menu-item nav-button'>
          Sign Up
        </Link>
      </ul>

      {/* Dropdown menu for mobile screens */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <ul>
          <Link to='/#about' className='menu-item' onClick={closeMenu}>
            About
          </Link>
          <Link to='/#services' className='menu-item' onClick={closeMenu}>
            Services
          </Link>
          <Link
            to='/signup'
            className='menu-item nav-button'
            onClick={closeMenu}
          >
            Sign Up
          </Link>
          <Link
            to='/login'
            className='menu-item nav-button'
            onClick={closeMenu}
          >
            Log In
          </Link>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
