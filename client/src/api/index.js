import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});
const token = localStorage.getItem("id_token");
const config = { headers: { Authorization: `Bearer ${token}` } };

export const insertMovie = (payload) => api.post(`/movie`, payload, config);
export const getAllMovies = () => api.get(`/user`);
export const updateMovieById = (id, payload) =>
  api.put(`/movie/${id}`, payload, config);
export const deleteMovieById = (id) => api.delete(`/movie/${id}`, config);
export const getUserMovies = () => api.get("/user/movies", config);
export const insertUser = (payload) => api.post("user", payload);
export const getUser = (payload) => api.post("getUser", payload);

const apis = {
  insertMovie,
  getAllMovies,
  updateMovieById,
  deleteMovieById,
  getUserMovies,
  insertUser,
  getUser,
};

export default apis;
