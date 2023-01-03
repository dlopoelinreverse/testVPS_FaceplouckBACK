import React from "react";
import { Link } from "react-router-dom";

const FollowsFollowersButtons = ({ userData }) => {
  return (
    <div>
      <ul className="selection">
        <Link to={`/profil/follows/${userData._id}`}>
          <li>
            Abonnement{userData.following.length > 1 ? "s" : ""}{" "}
            {userData.following && userData.following.length}
          </li>
        </Link>
        <Link to={`/profil/followers/${userData._id}`}>
          <li>
            Abonné{userData.followers.length > 1 ? "s" : ""}{" "}
            {userData.followers && userData.followers.length}
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default FollowsFollowersButtons;
