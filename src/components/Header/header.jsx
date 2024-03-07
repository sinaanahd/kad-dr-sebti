import React, { useContext, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import logo from "../../asset/images/main-logo.webp";
import ReloadBtn from "../reuseables/reload-btn";
import { DataContext } from "../data/datacontext";
const Header = () => {
  const { log_out, set_all_videos, get_all_videos } = useContext(DataContext);
  const handle_reload = () => {
    set_all_videos(false);
    get_all_videos();
  };
  return (
    <header className="main-header mm-width">
      <Link to="/home" className="logo-img">
        <img src={logo} alt="کاد" />
      </Link>
      <ul className="main-links-wrapper">
        <li className="menu-item">
          <Link to="/home" className="menu-link">
            خانه
          </Link>
        </li>
        <li className="menu-item">
          <span className="menu-link" onClick={log_out}>
            خروج از سایت
          </span>
        </li>
      </ul>
      <span className="header-reload-module" onClick={handle_reload}>
        <span className="reload-text">بارگذاری مجدد</span>
        <ReloadBtn click={handle_reload} />
      </span>
    </header>
  );
};

export default Header;
