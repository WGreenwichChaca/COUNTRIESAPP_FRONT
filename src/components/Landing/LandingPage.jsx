import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'

const LandingPage = () => {
    return (
        <div className="landing-container">
            <div className="landing-content">
                <h1>Bienvenido a Country App</h1>
                <Link to='/home'>
                    <button className="landing-button">
                        Ingresar
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;
