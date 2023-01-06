import axios from "axios";

export const GET_POSTS = "GET_POSTS";
export const GET_POST = "GET_POST";

export const CREATE_POST = "CREATE_POST";
export const CREATE_POST_PICTURE = "CREATE_POST_PICTURE";

export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const GET_POST_ERRORS = "GET_POST_ERRORS";

export const getPosts = (num) => {
  return (dipsatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/`)
      .then((res) => {
        const array = res.data.slice(0, num);
        dipsatch({ type: GET_POSTS, payload: array });
      })
      .catch((err) => console.log("Action error | getPosts : " + err));
  };
};

export const getPost = (postId) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/${postId}`)
      .then((res) => {
        dispatch({ type: GET_POST, payload: res.data });
      })
      .catch((err) => console.log("Action error | getPost : " + err));
  };
};

export const createPost = (posterId, message, video) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/post`,
      data: { posterId, message, video },
    })
      .then((res) => {
        dispatch({ type: GET_POST_ERRORS, payload: "" });
        dispatch({ type: CREATE_POST, payload: res.data });
      })
      .catch((err) => console.log("Action error | createPost : " + err));
  };
};

export const createPostPicture = (data) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/post/picture`, data)
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_POST_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_POST_ERRORS, payload: "" });
        }
      })
      .catch((err) => console.log("Action error | createPostPicture : " + err));
  };
};

export const likePost = (postId, userId, posterId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/like/${postId}`,
      data: { likerId: userId },
    })
      .then(() => {
        dispatch({ type: LIKE_POST, payload: { postId, userId, posterId } });
      })
      .catch((err) => console.log(err));
  };
};

export const unlikePost = (postId, userId, posterId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/unlike/${postId}`,
      data: { likerId: userId },
    })
      .then(() => {
        dispatch({ type: UNLIKE_POST, payload: { postId, userId, posterId } });
      })
      .catch((err) => console.log(err));
  };
};

export const updatePost = (postId, message) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      data: { message },
    })
      .then(() => {
        dispatch({ type: UPDATE_POST, payload: { postId, message } });
      })
      .catch((err) => console.log(err));
  };
};

export const deletePost = (postId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
    })
      .then(() => {
        dispatch({ type: DELETE_POST, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const addComment = (postId, commenterId, text, commenterPseudo) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/comment/${postId}`,
      data: { commenterId, text, commenterPseudo },
    })
      .then((res) => {
        const commentData = res.data;
        console.log(commentData);
        dispatch({
          type: ADD_COMMENT,
          payload: { commentData, postId },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const editComment = (postId, commentId, text) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/comment/edit/${postId}`,
      data: { commentId, text },
    })
      .then(() => {
        dispatch({ type: EDIT_COMMENT, payload: { postId, commentId, text } });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteComment = (postId, commentId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/post/comment/delete/${postId}`,
      data: { commentId },
    })
      .then(() => {
        dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } });
      })
      .catch((err) => console.log(err));
  };
};
