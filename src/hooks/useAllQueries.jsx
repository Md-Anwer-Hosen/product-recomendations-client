import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "./useAxiosPublic";

const useAllQueries = () => {
  const axiosPublic = useAxiosPublic();
  return useQuery({
    queryKey: ["Queries"],
    queryFn: async () => {
      const res = await axiosPublic.get("/queries");
      return res.data;
    },
  });
};

export default useAllQueries;
