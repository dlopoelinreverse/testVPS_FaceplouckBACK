import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { isEmpty } from "../../utils/Utils";
import UserData from "../User/UserData";

const FollowsFollowersContainer = ({ userData, show }) => {
  const [followsFollowersIds, setFollowsFollowersIds] = useState([]);

  useEffect(() => {
    if (show === "follows") setFollowsFollowersIds(userData.following);
    else if (show === "followers") setFollowsFollowersIds(userData.followers);
  }, [show, userData]);
  return (
    <div>
      <ul>
        {!isEmpty(followsFollowersIds) &&
          followsFollowersIds.map((id) => (
            <li key={id}>
              <UserData userId={id} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FollowsFollowersContainer;
