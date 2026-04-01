import axios from "axios";
import { AppConfig } from "../config/AppConfig";

export const api = axios.create({
  baseURL: AppConfig.apiBaseUrl ?? "/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
