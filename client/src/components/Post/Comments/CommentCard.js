import React from "react";
import { useSelector } from "react-redux";
import UserMiniData from "../../User/UserMiniData";
import CommentContent from "./CommentContent";

const CommentCard = ({ comment, post }) => {
  const commenterData = useSelector(
    (state) =>
      state.usersReducer.filter((user) => user._id === comment.commenterId)[0]
  );

  return (
    <li className="comment-card">
      {/* <UserData userId={comment.commenterId} /> */}
      <div className="user-data">
        <UserMiniData posterData={commenterData} />
      </div>
      <div className="comment-content">
        <CommentContent comment={comment} postId={post._id} />
      </div>
    </li>
  );
};

export default CommentCard;
