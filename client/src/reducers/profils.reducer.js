import { CREATE_POST } from "../actions/posts.actions";
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
    case CREATE_POST:
      return {
        ...state,
        profilPosts: state.profilsPosts.map((profilPosts) => {
          if (profilPosts.userId === action.payload.posterId) {
            if (!profilPosts.posts.includes(action.payload)) {
              return [...state.profilsPosts, action.payload];
            } else return state.profilsPosts;
          } else return profilPosts;
        }),
      };

    default:
      return state;
  }
}
