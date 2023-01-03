import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { isEmpty } from "../../utils/Utils";
import FollowsFollowersContainer from "./FollowsFollowersContainer";

const FollowsFollowers = ({ userId, usersData, show }) => {
  const [userData, setUserData] = useState([]);
  const [followsFollowersToggle, setFollowsFollowersToggle] = useState(show);
  useEffect(() => {
    setUserData(usersData.filter((user) => user._id === userId)[0]);
  }, [userId, usersData]);

  return (
    <div className="follows-follwers-container">
      {!isEmpty(userData) && (
        <>
          <ul className="selection">
            <li onClick={() => setFollowsFollowersToggle("follows")}>
              Abonnement{userData.following.length > 1 ? "s" : ""}{" "}
              {userData.following && userData.following.length}
            </li>
            <li onClick={() => setFollowsFollowersToggle("followers")}>
              Abonné{userData.followers.length > 1 ? "s" : ""}{" "}
              {userData.followers && userData.followers.length}
            </li>
          </ul>
          {followsFollowersToggle === "follows" && (
            <FollowsFollowersContainer
              userData={userData}
              show={followsFollowersToggle}
            />
          )}
          {followsFollowersToggle === "followers" && (
            <FollowsFollowersContainer
              userData={userData}
              show={followsFollowersToggle}
            />
          )}
        </>
      )}
    </div>
  );
};

export default FollowsFollowers;
