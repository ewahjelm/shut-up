import { createContext, useContext, useState, useEffect } from "react";
import { getCsrfToken, fetchJwtToken, registerUser } from "../api";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [csrfToken, setCsrfToken] = useState(null);

  // Hämtar CSRF när appen laddas + kollar sessionStorage
  useEffect(() => {
    async function initAuth() {
      try {
        const csrf = await getCsrfToken();
        setCsrfToken(csrf);
      } catch (err) {
        console.error("Failed to get CSRF:", err);
      }

      const storedToken = sessionStorage.getItem("token");
      if (storedToken) {
        try {
          const decoded = jwtDecode(storedToken);
          setUser(decoded); // decoded innehåller info från payload
          setToken(storedToken);
        } catch (err) {
          console.error("Invalid stored token:", err);
          sessionStorage.removeItem("token");
        }
      }
    }
    initAuth();
  }, []);

  // Synkar med sessionStorage
  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", token);
    } else {
      sessionStorage.removeItem("token");
    }
  }, [token]);

  // Login
  const login = async (username, password) => {
    if (!csrfToken) {
      console.error("CSRF-token not loaded yet");
      return false;
    }
    try {
      const data = await fetchJwtToken(username, password, csrfToken);
      const decoded = jwtDecode(data.token);

      setUser(decoded);
      setToken(data.token);

      return true;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  };

const register = async (username, email, password, avatar) => {
  if (!csrfToken) {
    return { success: false, status: 0, message: "CSRF missing" };
  } 

  try {
    const { data, status } = await registerUser(username, email, password, avatar, csrfToken);

    if (status === 201) {
      return { success: true, status, message: "Registrering lyckades!" };
    }
    return { success: false, status, message: data?.error || "Okänt fel" };
  } catch (err) {
    const status = err.response?.status || 500;
    const message = err.response?.data?.error || "Serverfel";
    return { success: false, status, message };
  }
};


  const logout = () => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      csrfToken, 
      login, 
      logout, 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
