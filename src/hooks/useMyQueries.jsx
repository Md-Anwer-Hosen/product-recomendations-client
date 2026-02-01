import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useMyQueries = (email) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["myQueries", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-queries?email=${email}`);
      return res.data;
    },
  });
};

export default useMyQueries;
