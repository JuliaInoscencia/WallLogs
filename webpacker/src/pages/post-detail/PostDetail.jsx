import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context';
import './Post.css';
import NewComment from '../../components/NewComment';
import EditComment from '../../components/EditComment';

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const { isLogged, currentUser } = useAuth();
  const [showMore, setShowMore] = useState({});
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isEditCommentModalOpen, setIsEditCommentModalOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  const addCommentToList = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/posts/${id}`)
      .then((response) => {
        setPost(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching post:', error);
      });

    axios
      .get(`http://localhost:3000/api/posts/${id}/comentarios`)
      .then((response) => {
        setComments(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  }, [id]);

  if (!post) {
    return <div>Post</div>;
  }

  const handleEditComment = (commentId) => {
    if (commentId !== null && commentId !== undefined) {
      setSelectedCommentId(commentId);
      setIsEditCommentModalOpen(true);
    }
  };

  const handleDeleteComment = (commentId) => {
    if (id && commentId) {
      const shouldDelete = window.confirm('Você tem certeza que deseja excluir este comentário?');
      if (shouldDelete) {
        navigate(`/destroy-comment/${id}/${commentId}`);
      }
    }
  };

  const toggleShowText = (commentId) => {
    setShowMore((prevShowMore) => ({
      ...prevShowMore,
      [commentId]: !prevShowMore[commentId],
    }));
  };

  const handleNewComment = () => {
    setIsCommentModalOpen(true);
  };

  return (
    <div className="container-post">
      <div className="content-wrapper">
        <h1 className="title-post">{post.titulo}</h1>
        <p className="content-post">{post.conteudo}</p>
        <h2 className="title-comment">Comentários</h2>
        <div className="container-comment">
          {comments.map((comment) => (
            <div key={comment.id} className="card-comment">
              <p className={`content-comment ${showMore[comment.id] ? '' : 'hidden-text'}`}>
                {comment.conteudo}
              </p>
              {comment.conteudo.split('\n').length > 3 && (
                <button onClick={() => toggleShowText(comment.id)} className="btn show-more">
                  {showMore[comment.id] ? 'Mostrar Menos' : 'Leia Mais'}
                </button>
              )}
              {currentUser && currentUser.id === comment.user_id && (
                <div className="container-comment-btn">
                  <button
                    onClick={() => handleEditComment(comment.id)}
                    className="btn btn-primary btn-comment"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="btn btn-danger btn-comment"
                  >
                    Excluir
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        {isLogged && (
          <button onClick={handleNewComment} className="btn btn-primary btn-comment-new">
            Novo Comentário
          </button>
        )}
        <NewComment
          isOpen={isCommentModalOpen}
          onRequestClose={() => setIsCommentModalOpen(false)}
          postId={id}
          addCommentToList={addCommentToList}
        />
        <EditComment
  isOpen={isEditCommentModalOpen}
  onRequestClose={() => {
    setIsEditCommentModalOpen(false);
    setSelectedCommentId(null);
  }}
  postId={id}
  commentId={selectedCommentId}
  comments={comments} // Certifique-se de passar comments aqui
  setComments={setComments} // Certifique-se de passar setComments aqui
  addCommentToList={addCommentToList}
/>

      </div>
    </div>
  );
};

export default PostDetail;
