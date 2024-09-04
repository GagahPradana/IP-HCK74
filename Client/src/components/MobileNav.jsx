import React from "react";
import { mobileNav } from "../contents/nav";
import { NavLink } from "react-router-dom";
function MobileNav() {
  return (
    <section className="lg:hidden h-14 bg-zinc-800 bg-opacity-40 fixed bottom-0 w-full">
      <div className="flex items-center justify-between h-full text-zinc-400">
        {mobileNav.map((nav) => {
          return (
            <NavLink
              key={nav.label + "mobileNav"}
              to={nav.href}
              className={({ isActive }) =>
                `px-4 flex h-full items-center flex-col justify-center ${
                  isActive && "text-zinc-100"
                }`
              }
            >
              <div className="text-xl">{nav.icons}</div>
              <p className="text-sm">{nav.label}</p>
            </NavLink>
          );
        })}
      </div>
    </section>
  );
}

export default MobileNav;
