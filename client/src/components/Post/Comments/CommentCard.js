import React from "react";
import { useSelector } from "react-redux";
import UserMiniData from "../../User/UserMiniData";
import EditDeleteComment from "./EditDeleteComment";

const CommentCard = ({ comment, post }) => {
  const posterData = useSelector(
    (state) =>
      state.usersReducer.filter((user) => user._id === post.posterId)[0]
  );
  return (
    <div className="comment-card">
      {/* <UserData userId={comment.commenterId} /> */}
      <UserMiniData posterData={posterData} />
      <p>{comment.text}</p>
      <EditDeleteComment comment={comment} postId={post._id} />
    </div>
  );
};

export default CommentCard;
