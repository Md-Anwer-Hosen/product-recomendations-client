import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useMyRecommendations = (email) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["myRecommendations", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-recommendations?email=${email}`);
      return res.data;
    },
  });
};

export default useMyRecommendations;
