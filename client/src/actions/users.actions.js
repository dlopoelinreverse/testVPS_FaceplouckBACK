import axios from "axios";

export const GET_USERS = "GET_USERS";

export const UPDATE_CLIENT_PROFIL = "UPDATE_CLIENT_PROFIL";
export const UPLOAD_CLIENT_PICTURE = "UPLOAD_CLIENT_PICTURE";
export const GET_USER_ERRORS = "GET_USER_ERRORS";

export const FOLLOW = "FOLLOW";
export const FOLLOWED = "FOLLOWED";

export const UNFOLLOW = "UNFOLLOW";
export const UNFOLLOWED = "UNFOLLOWED";

export const getUsers = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user`)
      .then((res) => {
        dispatch({ type: GET_USERS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const updateClientProfil = (clientId, newPseudo, newBio) => {
  return (dispatch) => {
    return axios
      .put(`${process.env.REACT_APP_API_URL}api/user/${clientId}`, {
        newPseudo,
        newBio,
      })
      .then((res) =>
        dispatch({
          type: UPDATE_CLIENT_PROFIL,
          payload: { data: res.data, clientId },
        })
      )
      .catch((err) => console.log(err));
  };
};

export const uploadClientPicture = (data, clientId) => {
  return (dispatch) => {
    console.log(data, clientId);
    return axios
      .put(`${process.env.REACT_APP_API_URL}api/user/update/${clientId}`, data)
      .then((res) => {
        // return axios
        //   .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
        //   .then((res) => {
        //     dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
        //   });
        if (res.data.errors) {
          dispatch({ type: GET_USER_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_USER_ERRORS, payload: "" });
          dispatch({
            type: UPLOAD_CLIENT_PICTURE,
            payload: { data: res.data, clientId },
          });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const follow = (followerId, followedId) => {
  return (dispatch) => {
    return axios
      .patch(`${process.env.REACT_APP_API_URL}api/user/follow/${followerId}`, {
        idToFollow: followedId,
      })
      .then(() =>
        dispatch({ type: FOLLOW, payload: { followerId, followedId } })
      )
      .catch((err) => console.log("Error | Follow : ", err));
  };
};

export const followed = (followerId, followedId) => {
  return (dispatch) => {
    return dispatch({ type: FOLLOWED, payload: { followerId, followedId } });
  };
};
export const unfollow = (unFollowerId, unFollowedId) => {
  return (dispatch) => {
    return axios
      .patch(
        `${process.env.REACT_APP_API_URL}api/user/unfollow/${unFollowerId}`,
        {
          idToUnfollow: unFollowedId,
        }
      )
      .then(
        dispatch({
          type: UNFOLLOW,
          payload: { unFollowerId, unFollowedId },
        })
      )
      .catch((err) => console.log("Error | UnFollow : ", err));
  };
};

export const unfollowed = (unFollowerId, unFollowedId) => {
  return (dispatch) => {
    return dispatch({
      type: UNFOLLOWED,
      payload: { unFollowerId, unFollowedId },
    });
  };
};
