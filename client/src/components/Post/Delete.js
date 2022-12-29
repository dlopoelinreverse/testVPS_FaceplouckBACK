import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/posts.actions";

const Delete = ({ id }) => {
  const dispatch = useDispatch();
  const deleteThePost = () => {
    dispatch(deletePost(id));
  };
  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer ce post ?")) {
          deleteThePost();
        }
      }}
    >
      <img src="./img/icons/trash.svg" alt="trash" />
    </div>
  );
};

export default Delete;
