import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://product-recomendations-server.onrender.com",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
