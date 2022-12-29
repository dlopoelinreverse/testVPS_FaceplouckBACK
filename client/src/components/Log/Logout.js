import React from "react";
import axios from "axios";
import cookie from "js-cookie";

const Logout = () => {
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const logout = async () => {
    if (window.confirm("Voulez-vous vraiment vous déconnecter ?")) {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/user/logout`,
        withCredentials: true,
      })
        .then(() => removeCookie("jwt"))
        .catch((err) => console.log(err));

      window.location = "/";
    }
  };
  return (
    <span onClick={logout} className="icon-btn">
      <img src="/img/icons/arrow-right-from-bracket-solid.svg" alt="logout" />
    </span>
  );
};

export default Logout;
