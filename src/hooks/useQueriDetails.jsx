import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "./useAxiosSecure";

const useQueriDetails = (id) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["queriesDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/queries/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};

export default useQueriDetails;
