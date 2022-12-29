import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  follow,
  followed,
  unfollow,
  unfollowed,
} from "../../actions/users.actions";
import { isEmpty } from "../../utils/Utils";

const DynamicFollowButton = ({ followedId, clientId, type }) => {
  const clientData = useSelector(
    (state) => state.usersReducer.filter((user) => user._id === clientId)[0]
  );
  const [isFollowing, setIsFollowing] = useState(false);
  const [followBtnValue, setFollowBtnValue] = useState("Abonné");
  const dispatch = useDispatch();

  const handleFollow = () => {
    // dispatch(followUser(clientData._id, followedId));
    // usersReducer (front actu)
    dispatch(follow(clientData._id, followedId));
    dispatch(followed(clientData._id, followedId));
    setIsFollowing(true);
  };

  const handleUnFollow = () => {
    // dispatch(unFollowUser(clientData._id, followedId));
    // usersReducer
    console.log(followedId);
    dispatch(unfollow(clientData._id, followedId));
    dispatch(unfollowed(clientData._id, followedId));
    setIsFollowing(false);
  };

  useEffect(() => {
    if (!isEmpty(clientData)) {
      if (clientData.following.includes(followedId)) setIsFollowing(true);
      else setIsFollowing(false);
    }
  }, [followedId, clientId]);

  return (
    <>
      {!isEmpty(clientData) && isFollowing ? (
        <span onClick={handleUnFollow}>
          <button
            className="unfollow-btn"
            onMouseEnter={() => setFollowBtnValue("Se désabonner")}
            onMouseLeave={() => setFollowBtnValue("Abonné")}
          >
            {followBtnValue}
          </button>
        </span>
      ) : (
        <span onClick={handleFollow}>
          <button className="follow-btn">S'abonner</button>
        </span>
      )}
    </>
  );
};

export default DynamicFollowButton;
