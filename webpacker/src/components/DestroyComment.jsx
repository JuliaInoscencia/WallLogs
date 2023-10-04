import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context';

const DestroyComment = () => {
  const navigate = useNavigate();
  const { currentUser, token } = useAuth();
  const { post_id, comment_id } = useParams();

  const deleteComment = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/posts/${post_id}/comentarios/${comment_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 204) {
        alert('Comentário excluído com sucesso!');
        navigate(`/posts/${post_id}`);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  // eslint-disable-next-line
  useEffect(() => {
    deleteComment();  
  }, []);

  if (!currentUser) {
    return <div>You must be logged in to delete comments.</div>;
  }

  return <></>;
};

export default DestroyComment;
