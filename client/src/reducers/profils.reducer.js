import {
  CREATE_POST,
  CREATE_POST_PICTURE,
  DELETE_POST,
  LIKE_POST,
  UNLIKE_POST,
  UPDATE_POST,
} from "../actions/posts.actions";
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
        profilsPosts: state.profilsPosts.map((profilPosts) => {
          if (profilPosts.userId === action.payload.posterId) {
            if (!profilPosts.posts.includes(action.payload)) {
              return {
                ...profilPosts,
                posts: [action.payload, ...profilPosts.posts],
              };
            } else return profilPosts;
          } else return profilPosts;
        }),
      };
    case CREATE_POST_PICTURE:
      return {
        ...state,
        profilsPosts: state.profilsPosts.map((profilPosts) => {
          if (profilPosts.userId === action.payload.posterId) {
            if (!profilPosts.posts.includes(action.payload)) {
              return {
                ...profilPosts,
                posts: [action.payload, ...profilPosts.posts],
              };
            } else return profilPosts;
          } else return profilPosts;
        }),
      };
    case LIKE_POST:
      return {
        ...state,
        profilsPosts: state.profilsPosts.map((profilPosts) => {
          if (profilPosts.userId === action.payload.posterId) {
            return {
              ...profilPosts,
              posts: profilPosts.posts.map((post) => {
                if (post._id === action.payload.postId) {
                  return {
                    ...post,
                    likers: [action.payload.userId, ...post.likers],
                  };
                } else return post;
              }),
            };
          } else return profilPosts;
        }),
      };
    case UNLIKE_POST:
      return {
        ...state,
        profilsPosts: state.profilsPosts.map((profilPosts) => {
          if (profilPosts.userId === action.payload.posterId) {
            return {
              ...profilPosts,
              posts: profilPosts.posts.map((post) => {
                if (post._id === action.payload.postId) {
                  return {
                    ...post,
                    likers: post.likers.filter(
                      (likers) => likers !== action.payload.userId
                    ),
                  };
                } else return post;
              }),
            };
          } else return profilPosts;
        }),
      };
    case UPDATE_POST:
      return {
        ...state,
        profilsPosts: state.profilsPosts.map((profilPosts) => {
          if (profilPosts.userId === action.payload.post.posterId) {
            return {
              ...profilPosts,
              posts: profilPosts.posts.map((post) => {
                if (post._id === action.payload.post._id) {
                  return {
                    ...post,
                    message: action.payload.message,
                  };
                } else return post;
              }),
            };
          } else return profilPosts;
        }),
      };
    case DELETE_POST:
      console.log(action.payload.post);
      return {
        ...state,
        profilsPosts: state.profilsPosts.map((profilPosts) => {
          if (profilPosts.userId === action.payload.post.posterId) {
            return {
              ...profilPosts,
              posts: profilPosts.posts.filter(
                (post) => post._id !== action.payload.post._id
              ),
            };
          } else return profilPosts;
        }),
      };

    default:
      return state;
  }
}
