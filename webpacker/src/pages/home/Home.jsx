import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/posts')
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setPosts(response.data.data);
        } else {
          console.error('Data received is not an array:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  const handleCreateNewPost = () => {
    navigate('/new-post');
  };

  const handleEditPost = (postId) => {
    navigate(`/edit-post/${postId}`);
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('Tem certeza de que deseja excluir este post?')) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/posts/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );

        if (response.status === 204) {
          console.log('Post excluído com sucesso');
          // Atualize a lista de posts após a exclusão bem-sucedida
          const updatedPosts = posts.filter((post) => post.id !== postId);
          setPosts(updatedPosts);
        }
      } catch (error) {
        console.error('Erro ao excluir o post:', error);
      }
    }
  };

  return (
    <div className='container'>
      <h1 className='titulo'>Posts</h1>
      <div className="card-container">
        {posts.map((post) => (
          <Link to={`/posts/${post.id}`} key={post.id} className='card-link'>
            <div className='card'>
              <div className="content">
                <h2 className='card-title'>{post.titulo}</h2>
                <p className='card-content'>{post.conteudo.slice(0, 100)}...</p>
                {currentUser && currentUser.id === post.user_id && (
                  <div className='card-buttons'>
                    <button onClick={(e) =>{e.preventDefault(); handleEditPost(post.id)}} className='edit-button card-btn'>Edit</button>
                    <button onClick={(e) => {e.preventDefault(); handleDeletePost(post.id)}} className='delete-button card-btn'>Excluir</button>
                  </div>
                )}
                <div class="go-corner">
                  <div class="go-arrow">→</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
        {currentUser && ( 
          <Link to="/new-post" className="card-link">
            <div className='card create-post-card'>
              <div class="content create-post-content">
                <h2 className='card-title create-post-title'>Novo Post</h2>
              </div>
              <button onClick={handleCreateNewPost} className='create-post-button card-button'>
                Create
              </button>
              <div class="go-corner">
                <div class="go-arrow">→</div>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );   
};

export default Home;
