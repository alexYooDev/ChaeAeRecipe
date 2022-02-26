import axios from 'axios';

export const sendIngredientPhoto = (formData: FormData) => {
  return axios.post(`${process.env.REACT_APP_BASE_URL}/`, formData);
};

export const fetchDetailInfo = (params: string | undefined) => {
  return axios.get(`${process.env.REACT_APP_BASE_URL}/recipes/${params}`);
};

export const registerRecipe = (JSON: {}) => {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/recipe-board/register`,
    JSON
  );
};
