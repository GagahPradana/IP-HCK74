import { Outlet } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/Footer";
import MobileNav from "./components/MobileNav";

function App() {
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
