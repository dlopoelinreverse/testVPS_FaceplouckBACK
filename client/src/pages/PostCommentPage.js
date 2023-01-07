import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getPost } from "../actions/posts.actions";
import PostComments from "../components/Post/PostComments";
import { isEmpty } from "../utils/Utils";

const PostCommentPage = () => {
  const { postId } = useParams();
  const postsData = useSelector((state) => state.postsReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isEmpty(postsData)) dispatch(getPost(postId));
  }, [postId]);
  return (
    <div className="post-comment page">
      <div className="main">
        <div className="hearder-button">
          <Link to="/">
            <span className="icon-btn">
              <img src="/img/icons/chevron-left-solid.svg" alt="" />
            </span>
          </Link>
        </div>
        {!isEmpty(postsData) && postId && (
          <PostComments postId={postId} postsData={postsData} />
        )}
      </div>
      <div className="main-right-part">
        <p>Right part</p>
      </div>
    </div>
  );
};

export default PostCommentPage;
