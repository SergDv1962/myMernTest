import React from "react";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const isAuth = false

  const activeStyle = {
    color: "white",
  };

  return (
    <div className="flex py-4 justify-between items-center">
      <span className="flex justify-center items-center w-6 h-6 bg-gray-600 text-xs text-white rounded-sm">
        E
      </span>
      {isAuth && (
        <ul className="flex gap-8">
          <li>
            <NavLink
              to={"/"}
              href="/"
              className="text-xs text-gray-400 hover:text-white"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Головна
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/posts"}
              href="/"
              className="text-xs text-gray-400 hover:text-white"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Мої пости
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/new"}
              href="/"
              className="text-xs text-gray-400 hover:text-white"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Додати пост
            </NavLink>
          </li>
        </ul>
      )}

      <div className="flex justify-center item-center bg-gray-600 text-xs text-white rounded-nm px-4 py-2">
        {isAuth ? <button>Вийти</button> : <Link to={"/login"}>Увійти</Link>}
      </div>
    </div>
  );
};