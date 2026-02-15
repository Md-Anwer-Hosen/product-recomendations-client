import React from "react";
import Hero from "../../components/Hero/Hero";
import Blog from "../../components/Blog/Blog";
import Counter from "../../components/Counter/Counter";
import AllQueries from "../AllQueries/AllQueries";

const Home = () => {
  return (
    <div>
      <Hero />
      <Counter />
      <AllQueries />
      <Blog />
    </div>
  );
};

export default Home;
