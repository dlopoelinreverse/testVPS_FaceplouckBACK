import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/posts.actions";
import { isEmpty } from "../../utils/Utils";
import PostCard from "../Post/PostCard";

const ProfilFeed = ({ profilPosts }) => {
  const allPostsData = useSelector((state) => state.postsReducer);
  const dispatch = useDispatch();

  if (isEmpty(allPostsData)) dispatch(getPosts());

  return (
    <ul className="profil-feed">
      {!isEmpty(profilPosts) &&
        !isEmpty(allPostsData) &&
        profilPosts.map((post) => (
          <PostCard
            key={post._id}
            postId={post._id}
            // postsData={allPostsData}
            postsData={profilPosts}
            type="profil-feed"
          />
        ))}
    </ul>
  );
};

export default ProfilFeed;
