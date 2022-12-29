// import React, { useContext, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { NavLink } from "react-router-dom";
// import { updatePost } from "../../actions/posts.actions";
// import { dateParser, isEmpty } from "../../utils/Utils";
// import { UidContext } from "../AppContext";
// import FollowHandler from "../Profil/FollowHandler";
// import Comments from "./Comments";
// import Delete from "./Delete";
// import LikeButton from "./LikeButton";

// const Card = ({ post }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isUpdated, setIsUpdated] = useState(false);
//   const [textUpdate, setTextUpdate] = useState("");
//   const [showComments, setShowComments] = useState(false);
//   const usersData = useSelector((state) => state.usersReducer);
//   const userData = useSelector((state) => state.userReducer);
//   const uid = useContext(UidContext);
//   const dispatch = useDispatch();

//   const updateItem = () => {
//     if (textUpdate) {
//       dispatch(updatePost(post._id, textUpdate));
//     }
//     setIsUpdated(false);
//   };

//   useEffect(() => {
//     !isEmpty(usersData) && setIsLoading(false);
//   }, [usersData]);

//   return (
//     <li className="card-container">
//       {isLoading ? (
//         <i className="fas fa-spinner fa-spin"></i>
//       ) : (
//         <>
//           <div className="card-left">
//             {/* <NavLink to={<Profil userId={post.posterI} />}> */}
//             <img
//               src={usersData
//                 .filter((user) => user._id === post.posterId)
//                 .map((user) => user.picture)}
//               alt="poster picture"
//             />
//             {/* </NavLink> */}
//           </div>
//           <div className="card-right">
//             <div className="card-header">
//               <div className="pseudo">
//                 <h3>
//                   {usersData
//                     .filter((user) => user._id === post.posterId)
//                     .map((user) => user.pseudo)}
//                 </h3>
//                 {uid && post.posterId !== userData._id && (
//                   <FollowHandler idToFollow={post.posterId} type="card" />
//                 )}
//               </div>
//               <span>{dateParser(post.createdAt)}</span>
//             </div>
//             {isUpdated ? (
//               <div className="update-post">
//                 <textarea
//                   defaultValue={post.message}
//                   onChange={(e) => setTextUpdate(e.target.value)}
//                 />
//                 <div className="button-container">
//                   <button className="btn" onClick={updateItem}>
//                     Valider
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <p>{post.message}</p>
//             )}
//             {post.picture && (
//               <div className="picture-container">
//                 <img
//                   src={post.picture}
//                   alt="post picture"
//                   className="card-pic"
//                 />
//               </div>
//             )}
//             {post.video && (
//               <iframe
//                 src={post.video}
//                 frameBorder="0"
//                 width="500"
//                 heigth="300"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//                 title={post.video}
//               ></iframe>
//             )}
//             {uid === post.posterId && (
//               <div className="button-container">
//                 <div onClick={() => setIsUpdated(!isUpdated)}>
//                   <img src="./img/icons/edit.svg" alt="edit" />
//                 </div>
//                 <Delete id={post._id} />
//               </div>
//             )}
//             <div className="card-footer">
//               <div className="comment-icon">
//                 <img
//                   src="./img/icons/message1.svg"
//                   alt="comment"
//                   onClick={() => setShowComments(!showComments)}
//                 />
//                 <span>{post.comments.length}</span>
//               </div>
//               <LikeButton post={post} />
//               <img src="./img/icons/share.svg" alt="share" />
//             </div>
//             {showComments && <Comments post={post} />}
//           </div>
//         </>
//       )}
//     </li>
//   );
// };

// export default Card;
