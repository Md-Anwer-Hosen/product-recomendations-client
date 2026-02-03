import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useRecommendationsForMe = (email) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["recommendationsForMe", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/recommendations-for-me?email=${email}`,
      );
      return res.data;
    },
  });
};

export default useRecommendationsForMe;
