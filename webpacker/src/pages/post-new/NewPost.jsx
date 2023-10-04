import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context';
import '../../styles/Forms.css';

const NewPost = () => {
  const navigate = useNavigate();
  const { currentUser, isLogged} = useAuth();
  const [titulo, setTitle] = useState('');
  const [conteudo, setContent] = useState('');
  //console.log(currentUser);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleCreatePost = async () => {
    if(!isLogged){
      alert('Você precisa estar logado para criar um post');
      navigate('/login')
      return;
    }
     
    try {
      const response = await axios.post(
        'http://localhost:3000/api/posts',
        {
          post: {
            titulo,
            conteudo,
            user_id: currentUser.id,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      if (response.status === 201) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="container-page">
      <div className="card-form-modal">
        <div className="form-header">
          <h1 className="form-title">Novo Post</h1>
          <button className="btn-form button-icon" onClick={() => navigate('/')}>
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
        <div className="form-body">
          <div className="input">
            <label className="input-form">Título:</label>
            <input
              className="input-field"
              type="text"
              value={titulo}
              onChange={handleTitleChange}
            />
            <p className="input-description">
              O título deve conter no mínimo 3 caracteres
            </p>
          </div>
          <div className="input">
            <label className="input-form">Conteúdo:</label>
            <textarea
              className="input-field input-textarea"
              value={conteudo}
              onChange={handleContentChange}
            ></textarea>
          </div>
        </div>
        <div className="form-footer">
          <button
            className="btn-form button--primary"
            onClick={handleCreatePost}
          >
            Criar Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPost;

