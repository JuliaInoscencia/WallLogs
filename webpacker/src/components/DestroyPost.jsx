import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context';

const DestroyPost = () => {
  const navigate = useNavigate();
  const { currentUser, token } = useAuth();
  const { id } = useParams();
  const [postAuthorId, setPostAuthorId] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/posts/${id}`);
        const postData = response.data.data;
        console.log('Post Data:', postData);
        setPostAuthorId(postData.user_id);
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchPostDetails();
  }, [id]);

  const handleDestroyPost = async () => {
    try {
      if (currentUser && currentUser.id === postAuthorId) {
        const response = await axios.delete(
          `http://localhost:3000/api/posts/${id}`,
          //`http://localhost:3000/api/posts/${id}?current_user_id=${currentUser.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log('Resposta de exclusão:', response);

        if (response.status === 204) {
          console.log('Post excluído com sucesso');
          navigate('/');
        }
      } else {
        console.error('Você não tem permissão para excluir este post.');
      }
    } catch (error) {
      console.error('Erro ao excluir o post:', error);
    }
  };

  if (!currentUser) {
    alert('Você deve estar logado para excluir posts.');
    navigate('/login');
    return;
  }

  return (
    <div>
      <h2>Delete Post</h2>
      <p>Tem certeza de que deseja excluir este post?</p>
      <button onClick={handleDestroyPost}>Excluir</button>
    </div>
  );
};

export default DestroyPost;
