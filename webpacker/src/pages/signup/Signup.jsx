import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context';
import { Link } from 'react-router-dom';
import '../../styles/FormsLogin.css';
import './Signup.css';
import ErrorMessage from '../../components/ErrorMessage';

const Signup = () => {
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);

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

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem.');
      setShowError(true);
      return;
    }

    const user = { email: email, password: password };

    try {
      const response = await axios.post('http://localhost:3000/signup', { user }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setCurrentUser(response.data.user);
        navigate('/');
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
    }
  };

  return (
    <div className="container-form">
      <form onSubmit={handleSignup}>
        <div className="card-form">
          <h2 className='title'>Novo Perfil</h2>
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
          <div>
            <Link to="/login" className="link">Já tem uma conta? Faça o login.</Link>
          </div>
          <button className='enter' type="submit">Enter</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
