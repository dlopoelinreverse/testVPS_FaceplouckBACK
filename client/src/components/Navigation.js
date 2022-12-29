import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";

const Navigation = () => {
  const uid = useContext(UidContext);
  const origin = window.location.pathname;
  return (
    <nav>
      <div className="navigation-container">
        <NavLink
          to="/"
          className={({ isActive }) =>
            (!isActive ? "" : "active-") + "feed-navigation"
          }
        >
          <span className="icon-btn">
            <img src="/img/icons/house-solid.svg" alt="home" />
          </span>
        </NavLink>
        <br />
        <NavLink
          to="/suggestions"
          className={({ isActive }) =>
            (!isActive ? "" : "active-") + "conversation-navigation"
          }
        >
          <span className="icon-btn">
            <img
              src="/img/icons/user-plus-solid.svg"
              alt="Suggestion utilisateurs"
            />
          </span>
        </NavLink>
        <br />

        <NavLink to={`/profil/${uid}`} state={{ from: origin }}>
          <span className="icon-btn">
            <img
              src="/img/icons/id-card-regular.svg"
              alt="Profil de l'utilisateur"
            />
          </span>
        </NavLink>
        <br />
        <Logout />
      </div>
    </nav>
  );
};

export default Navigation;
