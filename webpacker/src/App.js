import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context';
import Home from './pages/home/Home';
import PostDetail from './pages/post-detail/PostDetail';
import Navbar from './components/Navbar';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import NewPost from './pages/post-new/NewPost';
import EditPost from './pages/post-edit/EditPost';
import DestroyPost from './components/DestroyPost';
import ProfileUser from './components/ProfileUSer';
import NewComment from './components/NewComment';
import EditComment from './components/EditComment';
import DestroyComment from './components/DestroyComment'; 

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthenticated(true);
    }
  }, []);

  return (
    <AuthProvider authenticated={authenticated}>
      <Router>
        <div>
          <Navbar />
          <div className="content-container"> 
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/posts/:id" element={<PostDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/new-post" element={<NewPost />} />
              <Route path="/edit-post/:id" element={<EditPost />} />
              <Route path="/destroy-post/:id" element={<DestroyPost />} />
              <Route path="/profile/:id" element={<ProfileUser />} />
              <Route path="/new-comment/:postId" element={<NewComment />} />
              <Route path="/edit-comment/:postId/:commentId" element={<EditComment />} />
              <Route path="/destroy-comment/:post_id/:comment_id" element={<DestroyComment />} /> 
          </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
