import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/pages/Navbar';
import Footer from './components/pages/Footer';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import Create_blogs from './components/Blogs/Create_blogs';
import Your_blogs from './components/Blogs/Your_blogs';
import All_blogs from './components/Blogs/All_blogs';
import Blog_detail from './components/Blogs/Blog_detail';
import User_profile from './components/user/User_profile';
import Update_blog from './components/Blogs/Update_blog';
import Change_password from './components/user/Change_password';
import Error from './components/pages/Error';
import Contact from './components/pages/Contact';
import About from './components/pages/About';
import Privacy from './components/pages/Privacy';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/privacy' element={<Privacy />} />
        <Route path='/about' element={<About />} />
        <Route path='/' element={<Home />} />
        <Route path='/create_blogs' element={<Create_blogs />} />
        <Route path='/your_blogs' element={<Your_blogs />} />
        <Route path='/all_blogs' element={<All_blogs />} />
        <Route path='/blog_detail/:id' element={<Blog_detail />} />
        <Route path='/user_profile' element={<User_profile />} />
        <Route path='/update_blog/:id' element={<Update_blog />} />
        <Route path='/change_password' element={<Change_password />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
