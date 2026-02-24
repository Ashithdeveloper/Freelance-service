import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
console.log("API_URL",API_URL);

const userLogin = async (username, password) => {
  try {
    console.log("username and password", username, password);
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    
    return response.data; 
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

export default userLogin;
