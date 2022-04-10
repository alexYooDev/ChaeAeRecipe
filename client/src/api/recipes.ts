import axios from 'axios';
import Cookies from 'universal-cookie';

/* 개발용 url */
// const BASE_URL = 'http://localhost:3000/api';

export const sendIngredientPhoto = (formData: FormData) => {
  return axios.post(
    `https://chae-recipe.koreacentral.cloudapp.azure.com/api`,
    formData
  );
};

export const fetchIngredientsFromImage = (formData: FormData) => {
  return axios.post(
    `https://chae-recipe.koreacentral.cloudapp.azure.com/api/ingredients/image/search`,
    formData
  );
};

export const fetchWordSearchResult = (
  query: string,
  pageParams: number = 1
) => {
  return axios.get(
    `https://chae-recipe.koreacentral.cloudapp.azure.com/api/recipes/word-search?ing=${query}&page=${pageParams}`
  );
};

export const fetchImageSearchResult = (
  query: string,
  pageParams: number = 1
) => {
  return axios.get(
    `https://chae-recipe.koreacentral.cloudapp.azure.com/api/recipes/image-search?ing=${query}&page=${pageParams}`
  );
};

export const fetchDetailInfo = (params: string | undefined) => {
  return axios.get(
    `https://chae-recipe.koreacentral.cloudapp.azure.com/api/recipes/${params}`
  );
};

export const registerRecipe = (formData: FormData) => {
  const cookie = new Cookies().get('access_token');
  const header = axios.create({
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });
  return header.post(
    `https://chae-recipe.koreacentral.cloudapp.azure.com/api/recipe-board/register`,
    formData
  );
};

export const deleteRecipe = (params: string | undefined) => {
  const cookie = new Cookies().get('access_token');
  const header = axios.create({
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });

  return header.delete(
    `https://chae-recipe.koreacentral.cloudapp.azure.com/api/recipe-board/delete/${params}`
  );
};

export const updateRecipe = (params: string | undefined) => {
  const cookie = new Cookies().get('access_token');
  const header = axios.create({
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });
  return header.get(
    `https://chae-recipe.koreacentral.cloudapp.azure.com/api/recipe-board/update/${params}`
  );
};

export const sendUpdatedRecipe = (
  params: string | undefined,
  formData: FormData
) => {
  const cookie = new Cookies().get('access_token');
  const header = axios.create({
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
  });
  return header.post(
    `https://chae-recipe.koreacentral.cloudapp.azure.com/api/recipe-board/update/${params}`,
    formData
  );
};
