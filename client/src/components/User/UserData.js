import React from "react";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { isEmpty, removeDotOnPics } from "../../utils/Utils";
import { UidContext } from "../AppContext";
import { Link } from "react-router-dom";
import DynamicFollowButton from "../FollowingFollower/DynamicFollowButton";

const UserData = ({ userId, type }) => {
  const userData = useSelector(
    (state) => state.usersReducer.filter((user) => user._id === userId)[0]
  );
  const uid = useContext(UidContext);
  return (
    <div className="user-data">
      {!isEmpty(userData) && (
        <>
          <Link to={`/profil/${userId}`}>
            <div className="profil-data">
              <div className="img-container">
                <img
                  src={userData.picture && removeDotOnPics(userData.picture)}
                  alt=""
                />
              </div>
              <h3>{userData.pseudo}</h3>
            </div>
          </Link>
          {uid !== userData._id && (
            <DynamicFollowButton followedId={userData._id} clientId={uid} />
          )}
        </>
      )}
    </div>
  );
};

export default UserData;
