import { NavLink } from "react-router-dom";
import HeartSVG from "../ui/HeartSVG";
import "../styles/components/header.scss";
import { useState } from "react";

const Header = () => {
  const onWishlist = window.location.pathname.includes("wishlist");
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={"header"}>
      <NavLink
        to={"/"}
        className={"logo"}
        onClick={() => window.location.replace("/")}
      >
        <img alt="Logo" src="/Logo.svg" />
      </NavLink>
      <div className="header-right">
        <NavLink
          className={"wishlist-btn"}
          to={"/wishlist"}
          onMouseOver={() => setIsHovered(true)}
          onMouseOut={() => setIsHovered(false)}
        >
          <HeartSVG
            width={"14px"}
            height={"14px"}
            fill={isHovered ? "yes" : "none" && onWishlist ? "yes" : "none"}
            name={isHovered ? "smallBeat" : ""}
          />
          <span>Wishlist</span>
        </NavLink>
        <button className="user">
          <p>Sarah</p>
        </button>
      </div>
    </div>
  );
};

export default Header;
