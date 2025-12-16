
import axios from "axios";

const Api = axios.create({
    baseURL: "http://localhost:5000"
})
console.log("🔥 VITE_API_URL:", import.meta.env.VITE_API_URL); 
console.log("🔥 Final baseURL:", Api.defaults.baseURL);

export default Api;