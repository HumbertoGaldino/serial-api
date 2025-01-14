import axios from "axios";

export const apiKey = process.env.API_KEY;

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});
