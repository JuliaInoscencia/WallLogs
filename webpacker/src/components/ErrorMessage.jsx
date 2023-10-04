import React from 'react';
import '../styles/Styles.css';

const ErrorMessage = ({ message, onClose }) => {

  const closeError = () => {
    console.log('Clicou no ícone de fechamento.');
    onClose(); 
  };

  return (
    <div className="error">
      <div className="error-icon">
        <div style={{ width: '25px', height: '25px', marginRight: '8px' }}>
          <lord-icon
            src="https://cdn.lordicon.com/bmnlikjh.json"
            trigger="loop"
            delay="2000"
            colors="primary:#da5162"
            state="hover-1"
            style={{ width: '100%', height: '100%' }}
          >
          </lord-icon>
        </div>
      </div>
      <div className="error-message">
        {message}
      </div>
      <div className="error-close" onClick={closeError}>
        <svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
          <path d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z" fill="#71192F"></path>
        </svg>
      </div>
    </div>
  );
};

export default ErrorMessage;
