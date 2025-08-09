import React from 'react';
import './Header.css';
import myImage from './resources/logo1.png';
import profileimg from './resources/profile.png';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

const Header = ({ isAuthenticated, onLogout, requestLogin, setIsLoginPage, onSearch }) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    if (!isAuthenticated) {
      setIsLoginPage(true);
      requestLogin('/');
    }
  };

  const handleServicesClick = () => {
    navigate('/');
    setTimeout(() => {
      const servicesSection = document.getElementById('services-section');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  };
  const handleAboutUsClick = () => {
  navigate('/');
  setTimeout(() => {
    const section = document.getElementById('about-us-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }, 0);
 };
  const handleContactUsClick = () => {
   navigate('/');
   setTimeout(() => {
    const section = document.getElementById('contact-us-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
     }
   }, 0);
  };

  const handleAllProductsClick = () => {
    navigate('/all-products');
  };

  const handleHomepage = () => {
    navigate('/');
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      setIsLoginPage(true);
      requestLogin('/profile');
    }
  };

  return (
    <header className="site-header">
      {/* Logo Section */}
      <div className="logo-container">
        <img src={myImage} alt="Company Logo" className="logo" />
        <div className="company-name-wrapper">
          <h1 className="company-name">H</h1>
          <h2 className="company-name1">omiGo</h2>
        </div>
      </div>

      {/* Search Bar */}
      <SearchBar onSearch={onSearch} />

      {/* Navigation Links */}
      <div className="nav-links">
        <h2 className="About-us" onClick={handleAboutUsClick}>About Us</h2>
        <h2 className="contact" onClick={handleContactUsClick}>Contact Us</h2>
        <h2 className="service" onClick={handleServicesClick}>
          Explore Services
        </h2>
        <h2 className="all-products" onClick={handleAllProductsClick}>
          All Services
        </h2>
        <h2 className="cart" onClick={handleHomepage}>
          Home
        </h2>
        <nav>
          {isAuthenticated ? (
             <h2 className="nav-link-logout" onClick={onLogout}>Logout</h2>
          ) : (
            <h2 className="sign-up" onClick={handleLoginClick}>
              Login
            </h2>
          )}
        </nav>
        <img
          src={profileimg}
          alt="Profile Icon"
          className="profile-img"
          onClick={handleProfileClick}
        />
      </div>
    </header>
  );
};

export default Header;