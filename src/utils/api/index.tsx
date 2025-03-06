import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000,
});

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      gcTime: 60000,
    },
  },
});