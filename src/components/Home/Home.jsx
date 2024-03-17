// Home.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, filterByContinent, orderByName, orderByPopulation } from '../../actions';
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import './Home.css'
import Paginado from '../Paginado/Paginado'
import SearchBar from "../SearchBar/SearchBar";

const Home = () => {
    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.allCountries);
    const countries = useSelector((state) => state.countries);

    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage] = useState(10);
    const [order, setOrder] = useState('')
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch]);

    const handleClick = () => {
        dispatch(getCountries());
        setCurrentPage(1);
    };

    const handleSortByName = (order) => {
        dispatch(orderByName(order));
        setCurrentPage(1);
        setOrder(`Ordenado por Nombre ${order}`);
    };

    const handleSortByPopulation = (order) => {
        console.log('Ordenando por población:', order);


        const sortOrder = order === 'mayor' ? 'desc' : 'asc';

        dispatch(orderByPopulation(sortOrder));
        setCurrentPage(1);
        setOrder(`Ordenado por Población ${order}`);
    };

    const handleFilterContinent = (e) => {
        const selectedContinent = e.target.value;
        dispatch(filterByContinent(selectedContinent));
        setCurrentPage(1);
    };

    
    return (
        <div className="home">
            <div className="home-content">
                <div>
                    <h1>Home</h1>
                    <Link to='/activities'>
                        <button className="home-button">Crear Actividad</button>
                    </Link>
                    <h2> Actividades para los Countries</h2>
                    <button className="home-button" onClick={handleClick}>
                        Volver a cargar todos los paises
                    </button>
                </div>

                <div className="filters">
                    <div className="filter-section">
                        <h3>Ordenar por Nombre:</h3>
                        <button onClick={() => handleSortByName("asc")}>Ascendente</button>
                        <button onClick={() => handleSortByName("desc")}>Descendente</button>
                    </div>

                    <div className="filter-section">
                        <h3>Ordenar por Población:</h3>
                        <select onChange={(e) => handleSortByPopulation(e.target.value)}>
                            <option value="mayor">Mayor</option>
                            <option value="menor">Menor</option>
                        </select>
                    </div>

                    <div className="filter-section">
                        <h3>Filtrar por Continente:</h3>
                        <select onChange={handleFilterContinent}>
                            <option value="All">Todos</option>
                            <option value="Americas">America</option>
                            <option value="Asia">Asia</option>
                            <option value="Africa">África</option>
                            <option value="Europe">Europa</option>
                            <option value="Oceania">Oceanía</option>
                            <option value="Antarctic">Antártica</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="home-content">
                <Paginado
                    countriesPerPage={countriesPerPage}
                    allCountries={countries.length}
                    paginado={paginado}
                />

                <SearchBar/>

                <div className="card-container">
                    {allCountries.length > 0 &&
                        currentCountries.map((c) => (
                            <div key={c.id}>
                                <Link to={"/home/" + c.id}>
                                    <Card flags={c.flags} name={c.name} continents={c.continents} />
                                </Link>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
