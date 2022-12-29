import React, { useState } from "react";
import { useEffect } from "react";
import { isEmpty } from "../../utils/Utils";
import PostCard from "./PostCard";

const PostComments = ({ postId, postsData }) => {
  // const [postData, setPostData] = useState([]);
  // useEffect(() => {
  //   setPostData(postsData.filter((postData) => postData._id === postId)[0]);
  //   console.log("PostComments COMP");
  // }, [postId, postsData]);

  return (
    <>
      {!isEmpty(postsData) && (
        <PostCard postId={postId} postsData={postsData} type="post-comments" />
      )}
    </>
  );
};

export default PostComments;
