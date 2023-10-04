import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context';
import Modal from 'react-modal';

const EditComment = ({ isOpen, onRequestClose, postId, commentId, addCommentToList, comments, setComments }) => {
  const { currentUser, token } = useAuth();
  const [conteudo, setConteudo] = useState('');
  const [comentarioAuthorId, setComentarioAuthorId] = useState('');
  const [hasPermission, setHasPermission] = useState(true); 
  
  useEffect(() => {
    if (!commentId) {
      return;
    }

    const fetchComentarioDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/posts/${postId}/comentarios/${commentId}`
        );
        const comentarioData = response.data.data;
        setConteudo(comentarioData.conteudo);
        setComentarioAuthorId(comentarioData.user_id);

        if (currentUser.id !== comentarioData.user_id) {
          setHasPermission(false);
        }
      } catch (error) {
        console.error('Error fetching comentario details:', error);
      }
    };

    fetchComentarioDetails();
  }, [postId, commentId, comments, setComments, currentUser]);

  const handleConteudoChange = (e) => {
    setConteudo(e.target.value);
  };

  const handleEditComentario = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/posts/${postId}/comentarios/${commentId}`,
        {
          comentario: {
            conteudo,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedCommentsResponse = await axios.get(`http://localhost:3000/api/posts/${postId}/comentarios`);
        const updatedComments = updatedCommentsResponse.data.data;

        setComments(updatedComments);
        onRequestClose();
      }
    } catch (error) {
      console.error('Error editing comentario:', error);
    }
  };

  if (!hasPermission) {
    return <div>You do not have permission to edit this comentario.</div>;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Editar Comentário"
    >
      <div className='modal-header'>
        <h2 className='modal-title'>Editar Comentário</h2>
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
      <button className='btn-form button--primary' onClick={handleEditComentario}>Salvar mudanças</button>
    </Modal>
  );
};

export default EditComment;
