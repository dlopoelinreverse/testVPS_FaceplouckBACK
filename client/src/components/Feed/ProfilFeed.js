import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPosts } from "../../actions/posts.actions";
import { getUserPosts } from "../../actions/profils.actions";
import { isEmpty } from "../../utils/Utils";
import PostCard from "../Post/PostCard";

const ProfilFeed = ({ profilPosts }) => {
  const allPostsData = useSelector((state) => state.postsReducer);
  const dispatch = useDispatch();

  if (isEmpty(allPostsData)) dispatch(getPosts());

  // console.log(allPostsData, profilPosts);
  return (
    <ul className="profil-feed">
      {!isEmpty(profilPosts) &&
        !isEmpty(allPostsData) &&
        profilPosts.map((post) => (
          <PostCard
            key={post._id}
            postId={post._id}
            postsData={allPostsData}
            type="profil-feed"
          />
        ))}
    </ul>
  );
};

export default ProfilFeed;
