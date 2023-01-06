import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../actions/posts.actions";

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePost(post._id, uid, post.posterId));
  };

  const unlike = () => {
    dispatch(unlikePost(post._id, uid, post.posterId));
  };

  useEffect(() => {
    if (post.likers.includes(uid)) setLiked(true);
    else setLiked(false);
  }, [uid, post]);

  return (
    <div className="like-container">
      {uid === null && (
        <Popup
          trigger={<img src="/img/icons/heart.svg" alt="like" />}
          position={["bottom center", "bottom right", "bottom left"]}
          closeOnDocumentClick
        >
          <div>Connectez-vous pour aimer un post</div>
        </Popup>
      )}
      {uid && !liked && (
        <img src="/img/icons/heart.svg" alt="like" onClick={like} />
      )}
      {uid && liked && (
        <img src="/img/icons/heart-filled.svg" alt="unlike" onClick={unlike} />
      )}
      <span>{post.likers.length}</span>
    </div>
  );
};

export default LikeButton;
