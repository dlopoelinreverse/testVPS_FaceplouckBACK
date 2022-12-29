import React from "react";
import { useContext } from "react";
import { UidContext } from "../../AppContext";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

const CommentContainer = ({ post }) => {
  const uid = useContext(UidContext);
  return (
    <div className="comment-container">
      {uid && <CommentForm postId={post._id} />}
      <ul className="comments-container">
        {post.comments.map((comment) => (
          <CommentCard key={comment._id} comment={comment} post={post} />
        ))}
      </ul>
    </div>
  );
};

export default CommentContainer;
