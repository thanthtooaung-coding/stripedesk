import axios from "axios";
import { AppConfig } from "../config/AppConfig";

export const api = axios.create({
  baseURL: AppConfig.apiBaseUrl ?? "/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
