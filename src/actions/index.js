import axios from 'axios';

const GET_COUNTRIES = 'GET_COUNTRIES';
const FILTER_BY_CONTINENT = 'FILTER_BY_CONTINENT';
const ORDER_BY_NAME = 'ORDER_BY_NAME';
const ORDER_BY_POPULATION = 'ORDER_BY_POPULATION';
const GET_NAME_COUNTRIES = 'GET_NAME_COUNTRIES';
const POST_ACTIVITY = 'POST_ACTIVITY';
const GET_ACTIVITIES = 'GET_ACTIVITIES';
const GET_DETAIL = 'GET_DETAIL';

const getCountries = () => {
  return async function (dispatch) {
    try {
      const responseFromDb = await axios.get('/countries/');
      const countries = responseFromDb.data; // Extraer la propiedad 'data'

      dispatch({
        type: GET_COUNTRIES,
        payload: countries, // Utilizar el array de países directamente
      });
    } catch (error) {
      console.error('Error al obtener países:', error.message);
    }
  };
};

const getNameCountries = (name) => {
  return async function (dispatch) {
    try {
      const responseFromDb = await axios.get('/countries/name?name=' + name);
      return dispatch ({
        type: GET_NAME_COUNTRIES,
        payload: responseFromDb.data
      })
    } catch (error) {
      console.error('Error al buscar países:', error.message);
    }
  }
}

const orderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload
  };
};

const orderByPopulation = (payload) => {
  const sortOrder = payload === 'asc' ? 'asc' : 'desc';
  return {
    type: ORDER_BY_POPULATION,
    payload: sortOrder,
  };
};

const filterByContinent = (payload) => {
  return {
    type: FILTER_BY_CONTINENT,
    payload
  };
};

const postActivity = (payload) => {
  return async function (dispatch) {
    try {
      const response = await axios.post('/activities', payload);
      console.log(response);
      return dispatch({
        type: POST_ACTIVITY,
        payload: response.data, 
      });
    } catch (error) {
      console.error('Error al realizar la acción:', error.message);
      throw error;
    }
  };
};

const getActivities = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get('/activities');
      dispatch({
        type: GET_ACTIVITIES,
        payload: response.data,
      });
    } catch (error) {
      console.error('Error al obtener actividades:', error.message);
    }
  };
};

const getDetail = (id) => {
  return async function (dispatch) {
      const responseDetail = await axios.get(`/countries/${id}`);

        return dispatch({
          type: GET_DETAIL,
          payload: responseDetail.data,
        });
      }
};




export {
  GET_COUNTRIES,
  getCountries,
  FILTER_BY_CONTINENT,
  filterByContinent,
  ORDER_BY_NAME,
  orderByName,
  ORDER_BY_POPULATION,
  orderByPopulation,
  GET_NAME_COUNTRIES,
  getNameCountries,
  POST_ACTIVITY,
  postActivity,
  GET_ACTIVITIES,
  getActivities,
  GET_DETAIL,
  getDetail,
};
