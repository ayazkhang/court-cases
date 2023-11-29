import axios from 'axios';

const url = "http://localhost:3000/api/case";

export const getCase = () => async (dispatch) => {
  try {
    const response = await axios.get(url);
    dispatch({
      type: 'GET_CASE',
      payload: response.data.data,
    });
  } catch (error) {

    dispatch({
      type: 'GET_CASE',
      payload: [],
    });
    console.error('Error fetching case data:', error);
  }
};

export const addCase = (caseData) => async (dispatch) => {
  try {
    const response = await axios.post(url, caseData);
    console.log(response);
    dispatch({
      type: 'ADD_CASE',
      payload: response.data.data,
    });
  } catch (error) {
    console.error('Error adding case:', error);
  }
};

export const updateCase = (id, caseData) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${url}/${id}`, caseData);
      dispatch({
        type: 'UPDATE_CASE',
        payload: { id, caseData: response.data },
      });
    } catch (error) {
      console.error('Error updating case:', error);
    }
  };
};

export const deleteCase = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${url}/${id}`);
      dispatch({
        type: 'DELETE_CASE',
        payload: { id },
      });
    } catch (error) {
      console.error('Error deleting case:', error);
    }
  };
};