import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "https://api.rebrandly.com/v1/";

const postData = async (endpoint, data) => {
  return await axios.post(API_URL + endpoint, data, { headers: authHeader() ,mode: 'cors'});
};

const logout = () => {
  localStorage.removeItem("user");
};
const httpService = {
  postData, 
  logout,
};
export default httpService;
