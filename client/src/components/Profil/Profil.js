import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPosts } from "../../actions/profils.actions";
import { isEmpty } from "../../utils/Utils";
import ProfilFeed from "../Feed/ProfilFeed";
import ProfilHeader from "./ProfilHeader";

const Profil = ({ userId, usersData, profilsPosts }) => {
  const [profilData, setProfilData] = useState([]);
  const [profilPosts, setProfilPosts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setProfilData(usersData.filter((user) => user._id === userId)[0]);
    if (profilsPosts.some((profilPosts) => profilPosts.userId === userId)) {
      setProfilPosts(
        profilsPosts.filter((profilPosts) => profilPosts.userId === userId)[0]
          .posts
      );
    } else {
      dispatch(getUserPosts(userId));
    }
  }, [userId, usersData, profilsPosts]);

  // console.log(profilsPosts);
  console.log(profilPosts);

  return (
    <div className="profil-container">
      <ProfilHeader profilData={profilData} />
      <ProfilFeed profilPosts={profilPosts} />
    </div>
  );
};

export default Profil;
