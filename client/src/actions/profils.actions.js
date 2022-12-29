import axios from "axios";

export const GET_USER_POSTS = "GET_USER_POSTS";

export const getUserPosts = (userId) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/userPosts/${userId}`)
      .then((res) => {
        dispatch({ type: GET_USER_POSTS, payload: res.data });
        console.log("GetUserPosts : ", res.data);
      })

      .catch((err) => console.log("Action error | getUserPosts : " + err));
  };
};
