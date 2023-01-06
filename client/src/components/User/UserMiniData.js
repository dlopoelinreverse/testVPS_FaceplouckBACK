import React from "react";
import { Link } from "react-router-dom";
import { removeDotOnPics } from "../../utils/Utils";

const UserMiniData = ({ posterData, origin, fromType }) => {
  return (
    <>
      {fromType === "profil-feed" ? (
        <div className="user-mini-data">
          <div className="user-data">
            <img
              src={`${process.env.REACT_APP_API_URL}${posterData.picture}`}
              alt=""
            />
            <h3>{posterData.pseudo}</h3>
          </div>
        </div>
      ) : (
        <Link to={`/profil/${posterData._id}`} state={{ from: origin }}>
          <div className="user-mini-data">
            <div className="user-data">
              <img
                src={`${process.env.REACT_APP_API_URL}${posterData.picture}`}
                alt=""
              />
              <h3>{posterData.pseudo}</h3>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default UserMiniData;
