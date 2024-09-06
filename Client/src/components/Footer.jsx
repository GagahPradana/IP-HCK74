import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="text-center bg-zinc-700 bg-opacity-35 text-zinc-300 py-4">
      <div className="flex items-center justify-center gap-4">
        <Link to={"/"}>About </Link>
        <Link to={"/"}>Contact </Link>
      </div>
      <p className="text-sm">Created by G</p>
    </footer>
  );
}

export default Footer;
