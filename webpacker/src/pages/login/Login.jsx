import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context';
import { Link } from 'react-router-dom';
import '../../styles/FormsLogin.css';
import ErrorMessage from '../../components/ErrorMessage';

const Login = () => {
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  
  const handleLogin = async (e) => {
    e.preventDefault();

    const user = { email: email, password: password };

    try {
      const response = await axios.post('http://localhost:3000/login', { user }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response:', response);

      if (response.status === 200) {
        console.log('Login feito com sucesso');
        setCurrentUser(response.data.user);
        navigate('/');
      }
    } catch (error) {
      setErrorMessage('Informações incorreta.');
      setShowError(true);
      console.error('Error ao logar:', error);
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    }
  };

  const handleInputFocus = (field) => {
    if (field === 'password' && !password) {
      setShowPassword(false);
    }  
  };

  const handleInputBlur = (field) => {
    if (field === 'password' && !password) {
      setShowPassword(true);
    } 
  };

  return (
    <div class="container-form ">
       <form onSubmit={handleLogin}>
      <div class="card-form">
        <h2 className='title'>Login</h2>
        {showError && (
            <ErrorMessage message={errorMessage} onClose={() => setShowError(false)} />
          )}
        <div class="input-email">
          <input
            type="email"
            placeholder=""
            required="required"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span class="user">Email</span>
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
        <div>
          <Link to="/signup" className="link">
            Cadastre-se
          </Link>
        </div>
        <button className='enter' type="submit">Enter</button>
      </div>
    </form>
    </div>
  );
};

export default Login;
