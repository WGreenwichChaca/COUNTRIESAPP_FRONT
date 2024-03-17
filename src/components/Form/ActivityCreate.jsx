import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postActivity, getCountries } from '../../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import './ActivityCreate.css';

const validate = (input) => {
    let errors = {};
    const noWhiteSpaceRegex = /^\S*$/; 
    const noSpecialCharsRegex = /^[a-zA-Z0-9]*$/; 

    if (!input.name || !noWhiteSpaceRegex.test(input.name) || input.name.length > 20 || !noSpecialCharsRegex.test(input.name)) {
        errors.name = 'Se requiere un Nombre válido (sin espacios, máximo 20 caracteres y sin caracteres especiales)';
    }

    if (!input.difficulty || isNaN(input.difficulty) || input.difficulty < 1 || input.difficulty > 5) {
        errors.difficulty = 'Dificultad debe ser completada con un numero del 1 al 5';
    }

    if (!input.duration || isNaN(input.duration) || input.duration <= 0 || input.duration > 24) {
        errors.duration = 'Duración debe ser completada con un numero entre 1 y 24';
    }

    if (!input.season || !noSpecialCharsRegex.test(input.season) || !noWhiteSpaceRegex.test(input.season)) {
        errors.season = 'Temporada no debe contener espacios en blanco o caracteres especiales';
    } else if (!['Verano', 'Otoño', 'Invierno', 'Primavera'].includes(input.season)) {
        errors.season = 'Temporada debe ser completada con: Verano, Otoño, Invierno o Primavera';
    }

    return errors;
}

const ActivityCreate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const countries = useSelector((e) => e.countries);
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        countries: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput((prevInput) => ({
            ...prevInput,
            [name]: value,
        }));

        setErrors(validate({
            ...input,
            [name]: value,
        }));
    }

    const handleSelect = (e) => {
        const selectedCountryId = e.target.value;
        if (!input.countries.includes(selectedCountryId)) {
            setInput({
                ...input,
                countries: [...input.countries, selectedCountryId],
            });
        }
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value,
        }));
    };

    const handleNumberChange = (e) => {
        let newValue = parseInt(e.target.value, 10);
        newValue = isNaN(newValue) ? 0 : Math.max(0, Math.min(newValue, 24));

        setInput({
            ...input,
            [e.target.name]: newValue,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = validate(input);

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            const createdActivity = await dispatch(postActivity({
                ...input,
                countries: input.countries,
            }));
            alert("Actividad Creada!!");
            console.log('Activity created:', createdActivity);

            setInput({
                name: '',
                difficulty: '',
                duration: '',
                season: '',
                countries: [],
            });

            navigate('/home');
        } catch (error) {
            console.error('Error creating activity:', error.response ? error.response.data : error.message);
            alert('Error al crear la actividad. Por favor, inténtalo de nuevo.');
        }
    };

    const handleDelete = (el) => {
        setInput((prevInput) => ({
            ...prevInput,
            countries: prevInput.countries ? prevInput.countries.filter((country) => country !== el) : [],
        }));
    };

    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch]);

    return (
        <div className="activity-create">
            <Link to="/home">
                <button>Volver</button>
            </Link>
            <h1>Crea tu Actividad</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        value={input.name}
                        onChange={handleChange}
                    />
                    {errors.name && (
                        <p className='error'>{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Dificultad:</label>
                    <select
                        name="difficulty"
                        value={input.difficulty}
                        onChange={handleChange}
                    >
                        {[1, 2, 3, 4, 5].map((value) => (
                            <option key={value} value={value.toString()}>
                                {value}
                            </option>
                        ))}
                    </select>
                    {errors.difficulty && (
                        <p className='error'>{errors.difficulty}</p>
                    )}
                </div>
                <div>
                    <label>Duración:</label>
                    <input
                        type="number"
                        name="duration"
                        value={input.duration}
                        onChange={handleNumberChange}
                    />
                    {errors.duration && (
                        <p className='error'>{errors.duration}</p>
                    )}
                </div>
                <div>
                    <div>
                        <label>Temporada:</label>
                        <input
                            type="text"
                            name="season"
                            value={input.season}
                            onChange={handleChange}
                        />
                        {errors.season && (
                            <p className='error'>{errors.season}</p>
                        )}
                    </div>
                    <div>
                        <label>Paises:</label>
                        <select onChange={(e) => handleSelect(e)}>
                            {countries.map((country) => (
                                <option key={country.id} value={country.id}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                        <div>
                            <label>Paises seleccionados:</label>
                            <div>{input.countries.map((countryId) => countries.find((c) => c.id === countryId)?.name).join(', ')}</div>
                        </div>
                    </div>
                </div>
                <button type="submit">Crear Actividad</button>
            </form>
            {input.countries.map((el) => (
                <div key={el}>
                    <p>{el}</p>
                    <button onClick={() => handleDelete(el)}>x</button>
                </div>
            ))}
        </div>
    );
};

export default ActivityCreate;
