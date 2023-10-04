import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context';
import axios from 'axios';
import './../styles/Styles.css';

const Navbar = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (currentUser) {
      const userEmail = currentUser.email;
      const [userNamePart] = userEmail.split('@');
      setUserName(userNamePart);
    } else {
      setUserName('');
    }
  }, [currentUser]);

  const handleSignInClick = () => {
    navigate('/login');
  };

  const handleSignOutClick = async () => {
    try {
      await axios.delete('http://localhost:3000/users/sign_out');
      console.log('User signed out.');
      setCurrentUser(null);
      setUserName('');
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  console.log('Current User:', currentUser);

  const handleProfileClick = () => {
    const userId = currentUser?.id;
    navigate(`/profile/${userId}`);
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-default">
      <div className="nav-container">
      <input type="checkbox" id="check"/>
      <label for="check" class="checkbtn">
        <i class="fas fa-bars"></i>
      </label>
          <a className="tracking-in-expand navbar-title" href="/" onClick={handleHomeClick}>
            Wall_logs
          </a>
        <ul className="collapse navbar-collapse">
          {currentUser ? (
            <>              
              <li>
                <button className="btn navbar-btn" onClick={handleProfileClick}>
                  Perfil
                </button>
              </li>
              <li>
              <button className="btn navbar-btn" onClick={handleSignOutClick}>
                Sair
              </button>
              </li>
              <li>
            <div className="navbar-text">Boas vindas, {userName}</div>
            </li>
            </>
          ) : (
            <li>
              <button className="btn navbar-btn" onClick={handleSignInClick}>
                Entrar
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
