import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  // to change burger classes
  const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
  const [menu_class, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  // toggle burger menu change
  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass("burger-bar clicked");
      setMenuClass("menu visible");
    } else {
      setBurgerClass("burger-bar unclicked");
      setMenuClass("menu hidden");
    }
    setIsMenuClicked(!isMenuClicked);
  };

  const home = () => {
    window.location.href = "../inventaire";
  };

  return (
    <div>
      <div className="burger-logo" onClick={home}>
        VinoVeritas
      </div>
      <nav>
        <div className="burger-menu" onClick={updateMenu}>
          <div className={burger_class}></div>
          <div className={burger_class}></div>
          <div className={burger_class}></div>
        </div>
      </nav>
      <div className={menu_class}>
        <div
          className="menu-item"
          onClick={() => (window.location.href = "../inventaire")}
        >
          Inventaire
        </div>
        <div
          className="menu-item"
          onClick={() => (window.location.href = "../cellar")}
        >
          Cellier
        </div>
        <div
          className="menu-item"
          onClick={() => (window.location.href = "../capture")}
        >
          Ajouter
        </div>
        <div
          className="menu-item"
          onClick={() => (window.location.href = "../qr")}
        >
          Code QR
        </div>
        <div
          className="menu-item"
          onClick={() => (window.location.href = "../all")}
        >
          Liste
        </div>
      </div>
    </div>
  );
};

export default Navbar;
