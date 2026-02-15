import React, { useEffect } from "react";
import useAuth from "./useAuth";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://product-recomendations-server.onrender.com",
});

const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();

  useEffect(() => {
    const reqInterceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        if (user) {
          const token = await user.getIdToken();

          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
    );

    const resInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          signOutUser()
            .then(() => console.log("signOutUser"))
            .catch((err) => console.log(err));
        }
      },
    );

    return () => {
      axiosInstance.interceptors.request.eject(reqInterceptor);
      axiosInstance.interceptors.response.eject(resInterceptor);
    };
  }, [user, signOutUser]);

  return axiosInstance;
};

export default useAxiosSecure;
