import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "./useAxiosPublic";

const useAllQueries = (search = "") => {
  const axiosPublic = useAxiosPublic();
  return useQuery({
    queryKey: ["Queries", search],
    queryFn: async () => {
      const q = search.trim();
      const url = q ? `/queries?search=${encodeURIComponent(q)}` : `/queries`;
      const res = await axiosPublic.get(url);
      return res.data;
    },
  });
};

export default useAllQueries;
