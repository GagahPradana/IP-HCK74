import { Outlet } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/Footer";
import MobileNav from "./components/MobileNav";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBannerData } from "./store/gmovieSlice";

function App() {
  const dispatch = useDispatch();
  async function fecthTrendingData() {
    try {
      const response = await axios.get("/trending/all/day");
      dispatch(setBannerData(response.data.results));
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fecthTrendingData();
  }, []);

  return (
    <>
      <main className="pb-14 lg:pb-0">
        <Header />
        <div className="pt-16">
          <Outlet />
        </div>
        <Footer />
        <MobileNav />
      </main>
    </>
  );
}

export default App;
