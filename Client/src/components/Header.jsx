import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import userIcon from "../assets/user.png";
import { ImSearch } from "react-icons/im";
import { nav } from "../contents/nav";

const Header = () => {
  const location = useLocation();
  const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ");
  const [search, setSearch] = useState(removeSpace);
  const navigate = useNavigate();

  console.log(removeSpace, "......");
  useEffect(() => {
    if (search) {
      navigate(`/search?q=${search}`);
    }
  }, [search]);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <header className="fixed top-0 w-full h-16 bg-zinc-800 bg-opacity-75 z-40">
        <div className="container mx-auto px-2 flex items-center h-full">
          <Link to={"/"}>
            <img src={logo} alt="logo" width={120} />
          </Link>
          <nav className="hidden lg:flex items-center gap-1 ml-4">
            {nav.map((n) => {
              return (
                <div key={n + ""}>
                  <NavLink
                    key={n.label}
                    to={n.href}
                    className={({ isActive }) =>
                      `px-2 hover:text-neutral-100 ${
                        isActive && "text-neutral-100"
                      }`
                    }
                  >
                    {n.label}
                  </NavLink>
                </div>
              );
            })}
          </nav>
          <div className="ml-auto flex items-center gap-5">
            <form className="flex items-center gap-0" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Search here..."
                className="bg-transparent px-0 py-0 outline-none border-none hidden lg:block"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <button className="text-xl text-zinc-100">
                <ImSearch />
              </button>
            </form>
            <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer active:scale-75 transition-all">
              <img src={userIcon} alt="userIcon" width="w-full h-full" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
