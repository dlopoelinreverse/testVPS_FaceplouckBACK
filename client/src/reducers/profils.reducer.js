import { GET_USER_POSTS } from "../actions/profils.actions";

const initialState = { profilsPosts: [], profilsData: [] };

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_POSTS:
      // console.log(action.payload);

      const profilPostAlreadyIn = state.profilsPosts.some((profilPosts) => {
        if (profilPosts.userId === action.payload.userId) return true;
        else return false;
      });

      // console.log("GET_USER_POSTS check if in : ", profilPostAlreadyIn);
      return {
        ...state,
        profilsPosts: profilPostAlreadyIn
          ? state.profilsPosts.map((profilPosts) => {
              if (profilPosts.userId === action.payload.userId) {
                return {
                  ...profilPosts,
                  posts: action.payload.posts,
                };
              } else return profilPosts;
            })
          : [...state.profilsPosts, action.payload],
      };

    default:
      return state;
  }
}
