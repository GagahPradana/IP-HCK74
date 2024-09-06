import React from "react";
import HomeBanner from "../components/HomeBanner";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import HorinzontalScrollCard from "../components/VerticalScrollCard";

const Home = () => {
  const trendingMovie = useSelector((state) => state.gmovieData.bannerData);
  return (
    <div>
      <HomeBanner />
      <HorinzontalScrollCard data={trendingMovie} heading={"Trending Movie"} />
    </div>
  );
};

export default Home;
