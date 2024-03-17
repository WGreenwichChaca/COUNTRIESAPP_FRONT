import React from "react";
import './Card.css'; 
const Card = ({ flags, name, continents }) => {
    return (
        <div className="card">
            <img src={flags} alt="img no found" />
            <h3>{name}</h3>
            <h5>{continents}</h5>
        </div>
    );
}

export default Card;
