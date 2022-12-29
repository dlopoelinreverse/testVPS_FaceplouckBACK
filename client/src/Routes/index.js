import React from "react";
import { Route, Routes } from "react-router-dom";
// import Conversation from "../pages/Conversation";
import Home from "../pages/Home";
import FollowsFollowersPage from "../pages/FollowsFollowersPage";
import ProfilPage from "../pages/ProfilPage";
import PostCommentPage from "../pages/PostCommentPage";
import SuggestionsPage from "../pages/SuggestionsPage";
// import EditProfilPage from "../pages/EditProfilPage";

const index = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="profil">
        <Route path=":userId" element={<ProfilPage />} />
        {/* <Route path="edit/:userId" element={<EditProfilPage />} /> */}
        <Route
          path="follows/:userId"
          element={<FollowsFollowersPage show="follows" />}
        />
        <Route
          path="followers/:userId"
          element={<FollowsFollowersPage show="followers" />}
        />
      </Route>
      <Route path="suggestions" element={<SuggestionsPage />} />
      <Route path="post">
        <Route path="comments/:postId" element={<PostCommentPage />} />
      </Route>
      {/* <Route path="/conversation" element={<Conversation />} /> */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default index;
