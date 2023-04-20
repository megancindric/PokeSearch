import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as PokeBall } from "../../assets/pokeball.svg";
import "./NavBar.css";
const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          <Link
            to="/"
            style={{ textDecoration: "none", color: "white" }}
            className="brand"
          >
            <PokeBall height={48} width={48} />
            <b>PokeSearch</b>
          </Link>
        </li>
        <li className="brand">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/search")}>Search</button>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
