import React from "react";
import { useContext } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../../actions/posts.actions";
import { UidContext } from "../../AppContext";

const CommentForm = ({ postId }) => {
  const uid = useContext(UidContext);
  const clientData = useSelector(
    (state) => state.usersReducer.filter((user) => user._id === uid)[0]
  );
  const dispatch = useDispatch();
  const commentText = useRef();
  const handleComment = (e) => {
    e.preventDefault();
    if (commentText.current.value) {
      dispatch(
        addComment(
          postId,
          clientData._id,
          commentText.current.value,
          clientData.pseudo
        )
      );
      commentText.current.value = "";
    }
  };

  return (
    <div className="comment-form-container">
      <form onSubmit={handleComment}>
        <textarea name="comment" ref={commentText} />
        <input type="submit" value="commenter" />
      </form>
    </div>
  );
};

export default CommentForm;
