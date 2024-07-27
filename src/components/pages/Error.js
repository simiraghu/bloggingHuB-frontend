import React from 'react';
import './ErrorPage.css';
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
    const navigate = useNavigate()
    return (
        <div className="error-page">
            <div className="error-container">
                <h1 className="error-title">Oops!</h1>
                <p className="error-message">Something went wrong. Please try again later.</p>
                <button className="error-button" onClick={() => navigate('/')}>Go to home page</button>
            </div>
        </div>
    );
};

export default ErrorPage;
