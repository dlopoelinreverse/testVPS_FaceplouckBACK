import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { isEmpty, removeDotOnPics } from "../../utils/Utils";
import { UidContext } from "../AppContext";
import DynamicFollowButton from "../FollowingFollower/DynamicFollowButton";
import FollowsFollowersButtons from "../FollowingFollower/FollowsFollowersButtons";
import EditingProfil from "./EditingProfil";

const ProfilHeader = ({ profilData }) => {
  const uid = useContext(UidContext);

  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className="profil">
      {!isEmpty(profilData) && (
        <div className="profil-header">
          <div className="top-part">
            <img
              src={removeDotOnPics(profilData.picture)}
              alt={`Profil de ${profilData.pseudo}`}
            />
            <div className="profil-info">
              <div className="data">
                <h3>{profilData.pseudo}</h3>
                <p className="bio">{profilData.bio && profilData.bio}</p>
              </div>
              {uid && uid === profilData._id && (
                <div className="edit-button">
                  <button onClick={() => setShowEdit(!showEdit)}>
                    Editer le profil
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="bottom-part">
            <FollowsFollowersButtons userData={profilData} />
            {profilData._id !== uid && (
              <DynamicFollowButton followedId={profilData._id} clientId={uid} />
            )}
          </div>
        </div>
      )}
      {showEdit && (
        <>
          <button onClick={() => setShowEdit(!showEdit)}>X</button>
          <EditingProfil />
        </>
      )}
    </div>
  );
};

export default ProfilHeader;
