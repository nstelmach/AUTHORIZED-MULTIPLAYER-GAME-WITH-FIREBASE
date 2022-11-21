import React, { useState } from "react";
import classes from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

function Header() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  function menuClickHandler() {
    document.getElementById("menu")!.style.visibility === "visible"
      ? (document.getElementById("menu")!.style.visibility = "hidden")
      : (document.getElementById("menu")!.style.visibility = "visible");
  }

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <div className={classes.wrapper}>
      <header className={classes.header}>
        <div className={classes.headerWriting}>TIC TAC TOE</div>
        <button onClick={menuClickHandler} className={classes.userIcon}>
          <i className={`${classes.icon} fa-regular fa-user fa-2x`} />
        </button>
      </header>
      <div id="menu" className={classes.menuWrapper}>
        <div className={classes.emailElement}>Email:</div>{" "}
        <div className={`${classes.emailElement} ${classes.margin}`}>
          {currentUser?.email}
        </div>
        <Link to="/" className={classes.menuElement}>
          Home
        </Link>
        <Link to="/history" className={classes.menuElement}>
          History
        </Link>
        {error && <Alert variant="danger">{error}</Alert>}
        <div onClick={handleLogout} className={classes.menuElement}>
          Log Out
        </div>
      </div>
    </div>
  );
}

export default Header;
