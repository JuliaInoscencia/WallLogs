import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context';
import Modal from 'react-modal';
//import './NewComment.css'; 

const NewComment = ({ isOpen, onRequestClose, postId, addCommentToList }) => {
  const navigate = useNavigate();
  const { currentUser, isLogged } = useAuth();
  const [conteudo, setConteudo] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false); 
  const [loginAlertVisible, setLoginAlertVisible] = useState(false); 

  const handleConteudoChange = (e) => {
    setConteudo(e.target.value);
  };

  const handleCreateComment = async () => {
    if (!isLogged) {
      setLoginAlertVisible(true);
      setTimeout(() => {
        setLoginAlertVisible(false);
      },); 
      navigate('/login');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/api/posts/${postId}/comentarios`,
        {
          comentario: {
            conteudo,
            user_id: currentUser.id,
            post_id: postId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      if (response.status === 201) {
        const newComment = response.data.data;
        setIsAlertVisible(true);
        setTimeout(() => {
          setIsAlertVisible(false);
        },);
        setConteudo('');
        onRequestClose();
        addCommentToList(newComment);
      }
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Novo Comentário"
    >
      <div className='modal-header'>
        <h2 className='modal-title'>Novo Comentário</h2>
        <button className="btn-form button-icon" onClick={onRequestClose}>
          <svg
            width="24"
            viewBox="0 0 24 24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0V0z"></path>
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
          </svg>
        </button>
      </div>
      <div className='modal-content'>
        <textarea className='modal-txt' value={conteudo} onChange={handleConteudoChange} />
      </div>
      <button className='btn-form button--primary' onClick={handleCreateComment}>Criar Comentário</button>

      {isAlertVisible && (
        <div className="success-alert">
          Comentário criado com sucesso.
        </div>
      )}

      {loginAlertVisible && (
        <div className="login-alert">
          Você precisa estar logado para criar um comentário.
        </div>
      )}
    </Modal>
  );
};

export default NewComment;
