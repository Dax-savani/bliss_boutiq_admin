import axios from "axios";

const token = localStorage.getItem("token");
console.log(token,"ddddddddddddddddddd");

const axiosInstance = axios.create({
  baseURL: "https://blissboutiq-backend.onrender.com",
  headers: {
    // athorName: "syket",
    token: `Bearer ${token}`,
  },
});

export default axiosInstance;
