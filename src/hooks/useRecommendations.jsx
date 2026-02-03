// src/hooks/useRecommendations.js
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useRecommendations = (queryId) => {
  const axiosPublic = useAxiosPublic();

  return useQuery({
    queryKey: ["recommendations", queryId],
    enabled: !!queryId,
    queryFn: async () => {
      const res = await axiosPublic.get(`/recommendations?queryId=${queryId}`);
      return res.data;
    },
  });
};

export default useRecommendations;
