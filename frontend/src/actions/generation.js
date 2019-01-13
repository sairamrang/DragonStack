import { GENERATION } from './types';
import { BACKEND } from '../config';

export const fetchGeneration = () => dispatch => {
  dispatch({ type: GENERATION.FETCH });
  const url = `${BACKEND.ADDRESS}/generations`;
  return fetch(url)
    .then(response => response.json())
    .then(json => {
      if (json.type === 'error') {
        dispatch({
          type: GENERATION.FETCH_ERROR,
          message: json.message
        });
      } else {
        dispatch({
          type: GENERATION.FETCH_SUCCESS,
          generation: json.generation
        });
      }
    })
    .catch(error => dispatch({
      type: GENERATION.FETCH_ERROR,
      message: error.message
    }));
};