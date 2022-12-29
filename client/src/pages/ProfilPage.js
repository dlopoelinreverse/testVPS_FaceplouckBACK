import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { getUserPosts } from "../actions/profils.actions";
import Profil from "../components/Profil/Profil";
import { isEmpty } from "../utils/Utils";

const ProfilPage = () => {
  const { userId } = useParams();
  // const location = useLocation();
  // const { from } = location.state;
  // const origin = from;

  console.log(origin);

  const usersData = useSelector((state) => state.usersReducer);
  const profilsPosts = useSelector(
    (state) => state.profilsReducer.profilsPosts
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      isEmpty(
        profilsPosts.filter((profilPosts) => profilPosts.userId === userId)
      )
    ) {
      dispatch(getUserPosts(userId));
    }
  }, [profilsPosts]);

  // console.log(
  //   "ProfilPosts : ",
  //   profilsPosts
  //     .filter((profilPosts) => profilPosts.userId === userId)
  //     .map((profilPosts) => profilPosts.posts)
  // );

  return (
    <div className="profil page">
      <div className="hearder-button">
        <Link to={`../../`}>
          <span className="icon-btn">
            <img src="/img/icons/chevron-left-solid.svg" alt="" />
          </span>
        </Link>
      </div>
      {userId && !isEmpty(usersData) && !isEmpty(profilsPosts) && (
        <Profil
          userId={userId}
          usersData={usersData}
          profilsPosts={profilsPosts}
        />
      )}
    </div>
  );
};

export default ProfilPage;
