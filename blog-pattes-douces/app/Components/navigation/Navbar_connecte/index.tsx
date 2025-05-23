import React from "react";
import Link from "next/link";
// import Logo from "./Components/Navbar/Logo";
// import Button from "./Components/Navbar/Navbar";

const Navbar = () => {
  return (
    <div className="navbar">
      <div
        className="w-full h-20"
        style={{
          background:
            "linear-gradient(90deg, hsla(28, 38%, 43%, 1) 0%, hsla(0, 0%, 27%, 1) 100%)",
        }}
      >
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-end items-center h-full">
            <ul className="hidden md:flex gap-x-6 text-white">
              <li>
                <Link href="/Profil">
                  <p>Profil</p>
                </Link>
              </li>
              <li>
                <a href="/Feed">Feed</a>
              </li>
              <li>
                <Link href="/Activity">
                  <p>Activité</p>
                </Link>
              </li>
              <li>
                <Link href="/dashboard">
                  <p>Dashboard</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
