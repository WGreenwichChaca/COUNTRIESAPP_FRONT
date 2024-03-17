import {
    GET_COUNTRIES,
    FILTER_BY_CONTINENT,
    ORDER_BY_NAME,
    ORDER_BY_POPULATION,
    GET_NAME_COUNTRIES,
    POST_ACTIVITY,
    GET_ACTIVITIES,
} from '../actions'

const initialState = {
    allCountries: [], // Copia de todos los países originales
    countries: [], // Estado actual de los países después de aplicar los filtros
    order: '', // Almacena el orden actual
    activities: [],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                allCountries: action.payload,
                countries: action.payload, // Inicialmente, countries es igual a todos los países
                order: '', // Almacena el orden actual
            };

        case GET_NAME_COUNTRIES:
            return {
                ...state,
                countries: action.payload
            };

        case ORDER_BY_NAME:
            let sortedArr = action.payload === 'asc'
                ? [...state.countries].sort((a, b) => a.name.localeCompare(b.name))
                : [...state.countries].sort((a, b) => b.name.localeCompare(a.name));

            return {
                ...state,
                countries: sortedArr,
                order: action.payload, // Actualiza la propiedad de orden
            };

        case ORDER_BY_POPULATION:
            let sortedArrPop = action.payload === 'asc'
                ? [...state.countries].sort((a, b) => a.population - b.population)
                : [...state.countries].sort((a, b) => b.population - a.population);

            return {
                ...state,
                countries: sortedArrPop,
                order: action.payload,
            };

        case POST_ACTIVITY:
            return {
                ...state,
                activities: [...state.activities, action.payload],
            }

        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload,
            }

        case FILTER_BY_CONTINENT:
            const { allCountries, order } = state; 
            const continentFiltered =
                action.payload === 'All'
                    ? allCountries
                    : allCountries.filter((el) => el.continents === action.payload);

            // Aplicamos el ordenamiento después de aplicar el filtro por continente
            const sortedFilteredCountries = order === 'asc'
                ? [...continentFiltered].sort((a, b) => a.name.localeCompare(b.name))
                : [...continentFiltered].sort((a, b) => b.name.localeCompare(a.name));

            return {
                ...state,
                countries: sortedFilteredCountries,
            };

        default:
            return { ...state };
    }
}

export default rootReducer;