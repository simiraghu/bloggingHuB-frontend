import React from 'react'
import blog from '../../assets/main_blog.jpg'
import writing from '../../assets/blog_writing.jpg'
import camera from '../../assets/camera_blog.jpg'
import { useNavigate } from 'react-router-dom';
import './Home.css' 

const Home = () => {

  const navigate = useNavigate()

  const handleGetStart = () => {
    localStorage?.getItem('token') ? navigate('/all_blogs') : navigate('/login')
  }

  return (
    <div className="home-container">
      <div className="left-side">
        <h1>Ink Your Imagination: Discover a World of Writing</h1>
        <p>Welcome to our Writing Blog, a dedicated space for writers of all levels to share their craft.
          Whether you're penning your first story or polishing your latest manuscript, our platform offers the tools and community you need to thrive.
          Engage with fellow writers, discover new perspectives, and find inspiration for your next masterpiece.
          Join us today and embark on your writing journey with a supportive and creative community.</p>
        <button
          className="btn"
          type="submit"
          onClick={() => handleGetStart()}
        >Get started</button>
      </div>

      <div className="right-side">
        <img src={blog} alt="" className="circle-img" />
        <img src={writing} alt="" className="circle-img middle-img" />
        <img src={camera} alt="" className="circle-img " />
      </div>
    </div>
  )
}

export default Home
