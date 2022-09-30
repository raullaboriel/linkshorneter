import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import "../style.css";
import origin from "../origin.js";

const NavBar = (props) => {
  const logout = async () => {
    await axios
      .post(origin() + "/user/logout", null, { withCredentials: true })
      .then(() => {
        window.location.reload(false);
      });
  };
  return (
    <nav
      style={{ backgroundColor: "rgb(28,29,29)" }}
      className="navbar pb-3 pt-3 fixed-top position-sticky navbar-dark"
    >
      <Link
        className="navbar-brand"
        style={{ fontWeight: "bold", fontSize: "25px" }}
        to={"/"}
      >
        Link Shortener
      </Link>
      {typeof props.user === "undefined" || props.user === null ? (
        <Link
          to="/login"
          className="fa fa-user-circle fa-2x text-white no-underline"
          aria-hidden="true"
        ></Link>
      ) : (
        <div className="dropdown">
          <button
            className="btn h5 btn-link font-weight-bold dropdown-toggle"
            type="button"
            id="dropdownMenu2"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <span className="h5">Hola, {props.user.username}</span>
          </button>
          <div
            className="dropdown-menu dropdown-menu-right"
            aria-labelledby="dropdownMenu2"
          >
            <button className="dropdown-item" type="button">
              Cuenta
            </button>
            <div className="dropdown-divider"></div>
            <button
              onClick={() => logout()}
              className="dropdown-item text-danger"
              type="button"
            >
              Cerrar sesión
              <i
                className="ml-2 text-danger fa fa-sign-out"
                aria-hidden="true"
              ></i>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
