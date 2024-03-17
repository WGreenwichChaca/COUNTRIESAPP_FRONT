// Detail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './Detail.css'

const Detail = () => {
  const { id } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchCountryDetail = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/countries/${id}`);
          setCountry(response.data);
        } catch (error) {
          console.error('Error fetching Country details:', error);
        }
      };
  
      fetchCountryDetail();
    }, [id]);

    if (!country) {
        return <div>Loading...</div>;
      }

  return (
    <div className='detail-container'>
      <h1>Detail</h1>
      <Link to="/home">
      <button>Volver</button>
        </Link>
        <div>
          <img src={country.flags} alt={country.name} />
          <h2>{country.name}</h2>
          <p>ID: {country.id}</p>
          <p>Continente: {country.continents}</p>
          <p>Capital: {country.capital}</p>
          <p>Subregión: {country.subregion}</p>
          <p>Área: {country.area} km²</p>
          <p>Población: {country.population}</p>
        </div>
    </div>
  );
};

export default Detail;
