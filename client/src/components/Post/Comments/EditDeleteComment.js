import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComment, editComment } from "../../../actions/posts.actions";
import { UidContext } from "../../AppContext";

const EditDeleteComment = ({ comment, postId }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const text = useRef();
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.preventDefault();

    if (text.current.value) {
      dispatch(editComment(postId, comment._id, text.current.value)).then(() =>
        setIsEditing(false)
      );
    } else {
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Voulez-vous supprimer ce commentaire ?")) {
      dispatch(deleteComment(postId, comment._id));
    }
  };

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.commenterId) setIsAuthor(true);
      else setIsAuthor(false);
    };
    checkAuthor();
  }, [uid, comment]);
  return (
    <div className="edit-comment">
      {isAuthor && !isEditing && (
        <span onClick={() => setIsEditing(!isEditing)}>
          <img src="/img/icons/pencil-solid.svg" alt="edit comment" />
        </span>
      )}
      {isAuthor && isEditing && (
        <form className="edit-comment-form" onSubmit={handleEdit}>
          <label htmlFor="text" onClick={() => setIsEditing(!isEditing)}>
            Editer
          </label>
          <input
            type="text"
            name="text"
            ref={text}
            defaultValue={comment.text}
          />
          <div className="btn">
            <span onClick={handleDelete}>
              <img src="/img/icons/trash-can-solid.svg" alt="trash" />
            </span>
            <input type="submit" value="Valider" />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditDeleteComment;
