import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context';
import '../styles/FormsLogin.css';
import '../pages/signup/Signup.css';
import ErrorMessage from '../components/ErrorMessage';

const ProfileUser = () => {
  const { currentUser, setCurrentUser } = useAuth(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setCurrentUser(currentUser);
  }, [currentUser, setCurrentUser]);

  const handleUpdateProfile = async () => {
    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem.');
      setShowError(true);
      return;
    }

    try {
      const token = currentUser.token; 

      const response = await axios.patch(
        `http://localhost:3000/profile/${id}`, 
        {
          user: {
            email,
            password,
            password_confirmation: confirmPassword,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      if (response.status === 200) {
        alert('Perfil atualizado com sucesso.');
        setCurrentUser({ ...currentUser, email });
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleInputFocus = (field) => {
    if (field === 'password' && !password) {
      setShowPassword(false);
    } else if (field === 'confirmPassword' && !confirmPassword) {
      setShowConfirmPassword(false);
    }
  };

  const handleInputBlur = (field) => {
    if (field === 'password' && !password) {
      setShowPassword(true);
    } else if (field === 'confirmPassword' && !confirmPassword) {
      setShowConfirmPassword(true);
    }
  };

  const handleConfirmPasswordPasteCopy = (e) => {
    e.preventDefault();
  };
  
  const handleDeleteAccount = async () => {
    if (window.confirm('Tem certeza de que deseja excluir sua conta?')) {
      try {
        const token = currentUser.token; 
        const response = await axios.delete(`http://localhost:3000/profile/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        if (response.status === 200) {
          alert('Conta excluída com sucesso.');
          navigate('/login');
        }
      } catch (error) {
        console.error('Erro ao excluir conta:', error);
      }
    }
  };

  return (
    <div className="container-form">
      <div className="center-content">
        
      </div>
      <div className="card-form">
        <h2 className='title'>Editar Perfil</h2>
          {showError && (
            <ErrorMessage message={errorMessage} onClose={() => setShowError(false)} />
          )}
        <div className="input-email">
        <input
              type="email"
              placeholder=""
              required="required"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="input-span">Email</span>
        </div>
        <div className="input-password password-field">
        <input
              type={showPassword && password ? "text" : "password"}
              placeholder=""
              required="required"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => handleInputFocus('password')}
              onBlur={() => handleInputBlur('password')}
            />
            <span className="input-span">Senha</span>
            <button
              type="button"
              className="toggle-password-button"
              onClick={() => togglePasswordVisibility('password')}
            >
              {password && <i className={showPassword ? "gg-eye-alt" : "gg-eye"}></i>}
            </button>
        </div>
        <div className="input-confirm password-field">
            <input
              type={showConfirmPassword && confirmPassword ? "text" : "password"}
              placeholder=""
              required="required"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => handleInputFocus('confirmPassword')}
              onBlur={() => handleInputBlur('confirmPassword')}
              onPaste={handleConfirmPasswordPasteCopy}
              onCopy={handleConfirmPasswordPasteCopy}
            />
            <span className="input-span">Confirmar senha</span>
            <button
              type="button"
              className="toggle-password-button"
              onClick={() => togglePasswordVisibility('confirmPassword')}
            >
              {confirmPassword && <i className={showConfirmPassword ? "gg-eye-alt" : "gg-eye"}></i>}
            </button>
          </div>
        <button className='enter' onClick={handleUpdateProfile}>Atualizar</button>
      </div>
      
    </div>
  );
};

export default ProfileUser;
