import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1 className="about-title">About Us</h1>
        <p className="about-description">
          Welcome to our blogging HuB! We are a passionate group of writers dedicated to bringing you the latest insights, tips, and stories across various topics. Our mission is to provide valuable content that inspires, informs, and entertains our readers.
        </p>
        <p className="about-description">
          Our team consists of experienced writers and industry experts who share a common goal: to create a community where ideas can be exchanged and knowledge can be shared. Whether you're looking for in-depth articles, how-to guides, or personal stories, you'll find something that piques your interest on our platform.
        </p>
        <p className="about-description">
          Thank you for visiting our website. We hope you enjoy reading our posts as much as we enjoy writing them. If you have any questions, suggestions, or feedback, feel free to reach out to us. Happy reading!
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
