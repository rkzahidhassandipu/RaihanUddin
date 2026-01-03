// app/lib/axiosSecure.ts
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "/", // or full URL for dev
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosSecure;
