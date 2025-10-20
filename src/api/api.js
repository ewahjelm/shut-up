import axios from "axios";

const api = axios.create({
  baseURL: "https://chatify-api.up.railway.app",
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // om servern sätter cookies
});

// Interceptor – JWT skickas alltid om den finns
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Hämta CSRF-token
export async function getCsrfToken() {
  const { data } = await api.patch("/csrf", {});
  return data.csrfToken;
}

// Login
export async function fetchJwtToken(username, password, csrfToken) {
  const { data } = await api.post("/auth/token", {
    username,
    password,
    csrfToken,
  });
  return data; // jwt
}

// Registrera ny användare
export async function registerUser(username, email, password, avatar, csrfToken) {
  const { data, status } = await api.post("/auth/register", {
    username,
    password,
    email,
    avatar,
    csrfToken,
  });
  return { data, status };
}

export default api;
