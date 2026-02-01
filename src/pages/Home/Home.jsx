import React from "react";
import Hero from "../../components/Hero/Hero";
import Blog from "../../components/Blog/Blog";
import Counter from "../../components/Counter/Counter";

const Home = () => {
  return (
    <div>
      <Hero />
      <Counter />
      <Blog />
    </div>
  );
};

export default Home;
