import { Outlet } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <div className="pt-16">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
