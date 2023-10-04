import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context';
import '../../styles/Forms.css';

const EditPost = () => {
  const navigate = useNavigate();
  const { currentUser, token } = useAuth();
  const { id } = useParams();
  const [titulo, setTitle] = useState('');
  const [conteudo, setContent] = useState('');
  const [postAuthorId, setPostAuthorId] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/posts/${id}`);
        const postData = response.data.data;
        setTitle(postData.titulo);
        setContent(postData.conteudo);
        setPostAuthorId(postData.user_id);
        console.log('Post Data:', postData);
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchPostDetails();
  }, [id]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleEditPost = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/posts/${id}`,
        {
          post: {
            titulo,
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
        navigate('/');
      }
    } catch (error) {
      console.error('Error editing post:', error);
    }
  };

  if (!currentUser) {
    return <div>You must be logged in to edit posts.</div>;
  }

  if (currentUser.id !== postAuthorId) {
    return <div>You do not have permission to edit this post.</div>;
  }

  return (
    <div className="container-page">
      <div className="card-form-modal">
        <div className="form-header">
          <h1 className="form-title">Editar Post</h1>
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
            onClick={handleEditPost}
          >
            Salvar Alterações
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
