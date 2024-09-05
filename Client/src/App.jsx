import { Outlet } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/Footer";
import MobileNav from "./components/MobileNav";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBannerData, setImageURL } from "./store/gmovieSlice";
import { getConfigurasionMovies, getTrendingMovies } from "./utils/api";

function App() {
  const dispatch = useDispatch();
  async function fecthTrendingData() {
    try {
      const response = await getTrendingMovies();
      dispatch(setBannerData(response.data.results));
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fecthTrendingData();
  }, []);

  async function fecthConfigurasion() {
    try {
      const response = await getConfigurasionMovies();
      dispatch(setImageURL(response.data.images.secure_base_url + "original"));
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fecthConfigurasion();
  }, []);
  return (
    <>
      <main className="pb-14 lg:pb-0">
        <Header />
        <div className="">
          <Outlet />
        </div>
        <Footer />
        <MobileNav />
      </main>
    </>
  );
}

export default App;
