import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComment, editComment } from "../../../actions/posts.actions";
import { UidContext } from "../../AppContext";

const CommentContent = ({ comment, postId }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState("");
  // const text = useRef();
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const handleEdit = () => {
    console.log(editedText);
    if (editedText) {
      dispatch(editComment(postId, comment._id, editedText)).then(() =>
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
    <>
      {isAuthor ? (
        <div className="editable-comment">
          {isEditing ? (
            <>
              <textarea
                defaultValue={comment.text}
                onChange={(e) => setEditedText(e.target.value)}
              />
              <div className="edition-btn">
                <button onClick={handleEdit}>Valider</button>
                <button
                  onClick={() => (setIsEditing(false), setEditedText(""))}
                >
                  Annuler
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="comment">
                <p className="content">{comment.text}</p>
              </div>
              <div className="edit-btn">
                <span onClick={() => setIsEditing(!isEditing)}>
                  <img src="/img/icons/pencil-solid.svg" alt="edit comment" />
                </span>
              </div>
            </>
          )}
          <div className="delete-btn">
            <span onClick={handleDelete}>
              <img src="/img/icons/trash-can-solid.svg" alt="trash" />
            </span>
          </div>
        </div>
      ) : (
        <div className="comment">
          <p className="content">{comment.text}</p>
        </div>
      )}
    </>
  );
};

export default CommentContent;
