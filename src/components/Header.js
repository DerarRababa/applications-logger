import light from "../images/light.svg";
import dark from "../images/dark.svg";
import { Link } from "react-router-dom";

import React, { useState } from "react";

const Header = () => {
  const [mode, setMode] = useState("light");
  const chandeMode = (userMode) => {
    document.documentElement.classList.remove(mode);
    document.documentElement.classList.add(userMode);
    setMode(userMode);
  };

  return (
    <header className=" flex justify-between pb-2 mb-2 border-b-[1px] border-solid border-slate-500">
      <nav className=" flex text-xs text-slate-700 dark:text-slate-400">
        <Link className=" text-blue-800" to={"/home"}>
          Home
        </Link>
        <span className="mx-1"> &gt; </span>
        <Link className="text-blue-800" to={"/home/administration"}>
          Administration
        </Link>
        <span className="mx-1"> &gt; </span>
        <Link className="text-blue-800" to={"/home/administration/logger-search"}>
        Logger Search
        </Link>
      </nav>

      <img
        src={mode == "dark" ? dark : light}
        onClick={() => chandeMode(mode == "dark" ? "light" : "dark")}
        className="w-5 mx-2 cursor-pointer "
      />
    </header>
  );
};

export default Header;
