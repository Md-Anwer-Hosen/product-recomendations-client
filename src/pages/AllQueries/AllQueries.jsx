import QueriesSection from "../../components/QueriesSection/QueriesSection";
import useAllQueries from "../../hooks/useAllQueries";

const AllQueries = () => {
  const { data: queries = [], isLoading } = useAllQueries();

  if (isLoading) return <p>Loading...</p>;

  return <QueriesSection queries={queries} />;
};

export default AllQueries;
