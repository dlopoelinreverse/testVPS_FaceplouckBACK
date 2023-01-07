import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateParser, isEmpty, removeDotOnPics } from "../../utils/Utils";
import LikeButton from "./LikeButton";
// import { setProfilId } from "../../actions/profil.actions";
import UserMiniData from "../User/UserMiniData";
import { useContext } from "react";
import { UidContext } from "../AppContext";
import { deletePost, updatePost } from "../../actions/posts.actions";
import { useEffect } from "react";
import CommentContainer from "./Comments/CommentContainer";

const PostCard = ({ postId, postsData, type }) => {
  const usersData = useSelector((state) => state.usersReducer);
  // const postsData = useSelector((state) => state.postsReducer);
  const [post, setPost] = useState();
  const uid = useContext(UidContext);
  const [editPost, setEditPost] = useState(false);
  const [newTextMessage, setNewTextMessage] = useState("");
  const dispatch = useDispatch();

  const handleTextEdit = () => {
    if (newTextMessage !== post.message) {
      dispatch(updatePost(post, newTextMessage));
      setEditPost(false);
    } else setEditPost(false);
  };

  const handleDelete = () => {
    if (window.confirm("Voulez-vous supprimer ce post ?")) {
      dispatch(deletePost(post));
    }
  };

  useEffect(() => {
    setPost(postsData.filter((post) => post._id === postId)[0]);
  }, [postId, postsData]);

  return (
    <>
      {post && (
        <li className="post-card">
          <div className="post-header">
            <div className="left-part">
              {/* {type && type === "profil-feed"
                ? null
                : */}
              {!isEmpty(usersData[0]) &&
                usersData
                  .filter((user) => user._id === post.posterId)
                  .map((posterData, index) => (
                    <UserMiniData
                      key={index}
                      posterData={posterData}
                      fromType={type}
                    />
                  ))}
              {/* ))} */}
            </div>
            <div className="right-part">
              <p>{dateParser(post.createdAt)}</p>
              {uid === post.posterId && (
                <div className="edit-container">
                  <button onClick={() => setEditPost(!editPost)}>
                    modifier
                  </button>
                  <button onClick={handleDelete}>supprimer</button>
                </div>
              )}
            </div>
          </div>
          <div className="post-content">
            {post.message && (
              <>
                {editPost ? (
                  <div className="edit-message">
                    <textarea
                      defaultValue={post.message}
                      onChange={(e) => setNewTextMessage(e.target.value)}
                    />
                    <button onClick={handleTextEdit}>
                      valider la modification
                    </button>
                  </div>
                ) : (
                  <p>{post.message}</p>
                )}
              </>
            )}
            {post.picture && (
              // <>
              //   {editPost ? (
              //     <>
              //       <img src={post.picture} alt="Photo du post" />
              //       <div className="edit-picture">
              //         <input
              //           type="file"
              //           onChange={(e) =>
              //             // setNewImage(e.target.files[0])
              //             console.log(e.target.files[0])
              //           }
              //         />
              //         <button>modifier l'image</button>
              //       </div>
              //     </>
              //   ) : (
              <img
                // src={removeDotOnPics(post.picture)}
                src={`${process.env.REACT_APP_API_URL}${post.picture}`}
                alt="Illustration du post"
              />
              //   )}
              // </>
            )}
          </div>

          {/* {type === "show-comments" ? null : ( */}
          <div className="reactions-container">
            <LikeButton post={post} />
            {(type === "feed" || type === "profil-feed") && (
              <Link to={`/post/comments/${post._id}`}>
                <span
                //  onClick={() => dispatch(showPostComment(post))}
                >
                  <img src="/img/icons/message1.svg" alt="Commentaire" />
                  {post.comments.length ? post.comments.length : null}
                </span>
              </Link>
            )}
            {type === "post-comments" && (
              <span>
                <img src="/img/icons/message1.svg" alt="Commentaire" />
                {post.comments.length ? post.comments.length : null}
              </span>
            )}
          </div>
          {type === "post-comments" && <CommentContainer post={post} />}
          {/* )} */}
        </li>
      )}
    </>
  );
};

export default PostCard;
