import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

export const insertMovie = (payload) => api.post(`/movie`, payload);
export const getAllMovies = () => api.get(`/user`);
export const updateMovieById = (id, payload) =>
  api.put(`/movie/${id}`, payload);
export const deleteMovieById = (id) => api.delete(`/movie/${id}`);
export const getMovieById = (id) => api.get(`/movie/${id}`);
export const insertUser = (payload) => api.post("user" , payload);
export const checkUser = (payload) => api.post("loginUser" , payload);


const apis = {
  insertMovie,
  getAllMovies,
  updateMovieById,
  deleteMovieById,
  getMovieById,
  insertUser,
  checkUser
};

export default apis;
