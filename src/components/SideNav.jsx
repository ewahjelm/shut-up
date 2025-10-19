import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Button from "./Button";
import styles from "./SideNav.module.css";

export default function SideNav() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => setOpen(!open);

  return (
    <>
      {/* Hamburger ikon */}
      <div className={styles.hamburgerWrapper}>
        <button onClick={toggleMenu} className={styles.hamburgerBtn}>
          {open ? "✖" : "☰"}
        </button>
      </div>

      {/* Sidomeny */}
      <div
        className={`${styles.sidenav} ${open ? styles.open : ""}`}
      >
        <div className={styles.menuContent}>
          <h2 className={styles.title}>Meny</h2>

          <nav className={styles.navLinks}>
            {!user && (
              <>
                <Link to="/login" onClick={toggleMenu}>
                  Login
                </Link>
                <Link to="/register" onClick={toggleMenu}>
                  Register
                </Link>
              </>
            )}

            {user && (
              <>
                <Link to="/chat" onClick={toggleMenu}>
                  Chat
                </Link>
                <Button
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  type="button" // standard, men går att byta till submit/reset
                >
                  Logga ut
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {open && (
        <div className={styles.overlay} onClick={toggleMenu} />
      )}
    </>
  );
}
