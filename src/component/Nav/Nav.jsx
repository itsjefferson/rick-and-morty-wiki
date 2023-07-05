import { useEffect, useState } from "react";

import { NavLink, useLocation } from "react-router-dom";

import icon from "/assets/Rick-and-Morty-Icon.svg";
import logo from "/assets/Rick-and-Morty-Wiki-Logo.svg";

import style from "./Nav.module.scss";

import { BiMenu } from "react-icons/bi";
import { HiXMark } from "react-icons/hi2";

const Nav = () => {
  const [menuDisplayed, setMenuDisplayed] = useState(false);

  const location = useLocation();
  const presentLoc = location.pathname;

  useEffect(() => {
    if (menuDisplayed) {
      document.documentElement.classList.add("overflow-hidden");
      document.body.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    }
  }, [menuDisplayed]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 600) {
        setMenuDisplayed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = () => {
    if (window.innerWidth < 600) {
      setMenuDisplayed(!menuDisplayed);
    }
  };

  return (
    <nav className={style.nav}>
      <ul
        className={`${style.navList} ${menuDisplayed && style.navListDeployed}`}
      >
        <li className={style.logoContainer}>
          <NavLink to="/">
            <img
              className={`${style.logoSlice} ${style.logoIcon}`}
              src={icon}
              alt="Rick and Morty Icon"
            />
          </NavLink>
          <NavLink to="/">
            <img
              className={`${style.logoSlice} ${style.logoTitle}`}
              src={logo}
              alt="Rick and Morty Logo"
            />
          </NavLink>
          <span>
            {/* This is an auxiliary span for justification purposes in mobile
              size. */}
          </span>
        </li>
        <li className={style.menuIconContainer}>
          <BiMenu className={style.menuIcon} onClick={handleClick} />
        </li>
        <li className={style.closeIconContainer}>
          <HiXMark className={style.closeIcon} onClick={handleClick} />
        </li>
        <li
          className={`${style.link} ${style.toHome} ${
            presentLoc === "/" && style.linkSelected
          }`}
        >
          <NavLink to="/" onClick={handleClick}>
            Home
          </NavLink>
        </li>
        <li
          className={`${style.link} ${style.toEpisode} ${
            presentLoc === "/episode" && style.linkSelected
          }`}
        >
          <NavLink to="/episode" onClick={handleClick}>
            Episode
          </NavLink>
        </li>
        <li
          className={`${style.link} ${style.toLocation} ${
            presentLoc === "/location" && style.linkSelected
          }`}
        >
          <NavLink to="/location" onClick={handleClick}>
            Location
          </NavLink>
        </li>
        <li
          className={`${style.link} ${style.toFavorite} ${
            presentLoc === "/favorite" && style.linkSelected
          }`}
        >
          <NavLink to="/favorite" onClick={handleClick}>
            Favorite
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
