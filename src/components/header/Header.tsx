import React, { useCallback, useRef, useState } from "react";
import classes from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import useOutsideClick from "../../hooks/useOutsideClick";

function Header() {
  const [error, setError] = useState("");
  const { user, logout } = useAuth();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  function openMenu() {
    document.getElementById("menu")!.style.visibility = "visible";
  }

  const closeMenu = useCallback((event: MouseEvent) => {
    if (
      document.getElementById("menu")!.style.visibility === "visible" &&
      buttonRef.current &&
      buttonRef.current.contains(event.target as Node)
    ) {
      event.stopPropagation();
    }
    document.getElementById("menu")!.style.visibility = "hidden";
  }, []);

  const ref = useOutsideClick<HTMLDivElement>(closeMenu);

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
        <Link to="/" className={classes.headerWriting}>
          TIC TAC TOE
        </Link>
        <button ref={buttonRef} onClick={openMenu} className={classes.userIcon}>
          <i className={`${classes.icon} fa-regular fa-user fa-2x`} />
        </button>
      </header>
      <div id="menu" ref={ref} className={classes.menuWrapper}>
        <div className={classes.emailElement}>User:</div>
        <div className={`${classes.emailElement} ${classes.margin}`}>
          {user?.displayName}
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
