import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getPosts } from "../../actions/posts.actions";
import { timestampParser } from "../../utils/Utils";
import UserData from "../User/UserData";
import EditDeleteComment from "./Comments/EditDeleteComment";

const Comments = ({ postId }) => {
  const text = useRef();
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const postData = useSelector(
    (state) => state.postsReducer.filter((post) => post._id === postId)[0]
  );
  const dispatch = useDispatch();

  const handleComment = (e) => {
    e.preventDefault();

    if (text.current.value) {
      dispatch(
        addComment(
          postData._id,
          userData._id,
          text.current.value,
          userData.pseudo
        )
      )
        .then(() => dispatch(getPosts()))
        .then(() => (text.current.value = ""));
    } else {
      console.log("Commentaire null");
    }
  };

  return (
    <div className="comments-container">
      {postData.comments.map((comment) => {
        return (
          <div
            key={comment._id}
            className={
              comment.commenterId === userData._id
                ? "comment-container client"
                : "comment-container"
            }
          >
            <div className="content">
              <UserData userId={comment.commenterId} />
              <span>{timestampParser(comment.timestamp)}</span>
              <p>{comment.text}</p>
              <EditDeleteComment comment={comment} postId={postData._id} />
            </div>
          </div>
        );
      })}
      {userData._id && (
        <form onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            name="text"
            ref={text}
            placeholder="Voulez vous commenter ?"
          />
          <input type="submit" value="Commenter" />
        </form>
      )}
    </div>
  );
};

export default Comments;
