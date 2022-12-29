import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  createPost,
  createPostPicture,
  getPosts,
} from "../../actions/posts.actions";
import { isEmpty } from "../../utils/Utils";
import { UidContext } from "../AppContext";

const CreateFormPost = () => {
  const origin = window.location.pathname;
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState("");
  const [video, setVideo] = useState("");
  const [file, setFile] = useState("");
  const uid = useContext(UidContext);
  const clientData = useSelector(
    (state) => state.usersReducer.filter((user) => user._id === uid)[0]
  );
  const errors = useSelector((state) => state.errorsReducer);
  const dispatch = useDispatch();

  const handlePost = async () => {
    if (message || postPicture || video) {
      const data = new FormData();
      if (file) {
        data.append("file", file);
        data.append("posterId", clientData._id);
        data.append("message", message);
        data.append("video", video);
        await dispatch(createPostPicture(data));
        dispatch(getPosts());
        cancelPost();
      } else {
        await dispatch(createPost(clientData._id, message, video));
        dispatch(getPosts());
        cancelPost();
      }
    } else {
      alert("Veuillez ajouter du contenu à votre post.");
    }
  };

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setVideo("");
  };

  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
    setVideo("");
    setFile("");
  };

  useEffect(() => {
    if (!isEmpty(clientData)) setIsLoading(false);
    const handleVideo = () => {
      let findLink = message.split(" ");
      for (let i = 0; i < findLink.length; i++) {
        if (findLink[i].includes("https://www.yout" || "https://yout")) {
          let embed = findLink[i].replace("watch?v=", "embed/");
          setVideo(embed.split("&")[0]);
          findLink.splice(i, 1);
          setMessage(findLink.join(" "));
          setPostPicture("");
        }
      }
    };
    handleVideo();
  }, [clientData, message, video]);

  return (
    <div className="create-post-container">
      {isLoading && !isEmpty(clientData) ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <>
          <div className="header">
            <div className="left-part">
              <Link to={`/profil/${clientData._id}`} state={{ from: origin }}>
                <div className="user-picture">
                  <img src={clientData.picture} alt="" />
                </div>
              </Link>
            </div>
          </div>
          <div className="post-form">
            <textarea
              name="message"
              id="message"
              placeholder="Quelque chose à raconter ?"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            {message || postPicture || video.length > 20 ? (
              <div className="post-preview">
                <div className="post-header">
                  <img src={clientData.picture} alt="user illustration" />
                  <div className="pseudo">
                    <h3>{clientData.pseudo}</h3>
                  </div>
                </div>
                <div className="content">
                  {message && (
                    <div className="content-message">
                      <p>{message}</p>
                    </div>
                  )}
                  {postPicture && (
                    <div className="content-picture">
                      <img src={postPicture} alt="post illustration" />
                    </div>
                  )}
                  {video && (
                    <div className="content-video">
                      <iframe
                        src={video}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={video}
                      ></iframe>
                    </div>
                  )}
                </div>
              </div>
            ) : null}
            <div className="footer-form">
              <div className="icon">
                {isEmpty(video) && (
                  <>
                    <img src="./img/icons/picture.svg" alt="img" />
                    <input
                      type="file"
                      id="file-upload"
                      name="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => handlePicture(e)}
                    />
                  </>
                )}
                {video && (
                  <button onClick={() => setVideo("")}>Supprimer video</button>
                )}
              </div>
              <p>
                {errors.postErrors && errors.postErrors.format
                  ? errors.postErrors.format
                  : ""}
              </p>
              <p>
                {errors.postErrors && errors.postErrors.fileSize
                  ? errors.postErrors.fileSize
                  : ""}
              </p>

              <div className="btn-send">
                {message || postPicture || video.length > 20 ? (
                  <button className="cancel" onClick={cancelPost}>
                    Annuler
                  </button>
                ) : null}
                <button className="send" onClick={handlePost}>
                  Poster
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateFormPost;
