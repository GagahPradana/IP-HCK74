import React from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";

const Header = () => {
  const nav = [
    {
      label: "Movies",
      href: "movie",
    },
    {
      label: "My List",
      href: "mylist",
    },
  ];
  return (
    <>
      <header className="fixed top-0 w-full h-16 bg-zinc-800 bg-opacity-75">
        <div className="container mx-auto px-2 flex items-center h-full">
          <div>
            <img src={logo} alt="logo" width={120} />
          </div>
          <nav className="flex items-center gap-1 ml-4">
            {nav.map((n) => {
              return (
                <div key={n.id}>
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
        </div>
      </header>
    </>
  );
};

export default Header;
