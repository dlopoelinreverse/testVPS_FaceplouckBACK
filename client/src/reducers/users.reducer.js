import {
  FOLLOW,
  FOLLOWED,
  GET_USERS,
  UNFOLLOW,
  UNFOLLOWED,
  UPDATE_CLIENT_PROFIL,
} from "../actions/users.actions";

const initialState = {};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return action.payload;

    case FOLLOW:
      console.log(action.payload);
      return state.map((user) => {
        if (user._id === action.payload.followerId) {
          return {
            ...user,
            following: [action.payload.followedId, ...user.following],
          };
        } else return user;
      });
    case FOLLOWED:
      return state.map((user) => {
        if (user._id === action.payload.followedId) {
          return {
            ...user,
            followers: [action.payload.followerId, ...user.followers],
          };
        } else return user;
      });
    case UNFOLLOW:
      return state.map((user) => {
        if (user._id === action.payload.unFollowerId) {
          return {
            ...user,
            following: user.following.filter(
              (follow) => follow !== action.payload.unFollowedId
            ),
          };
        } else return user;
      });
    case UNFOLLOWED:
      return state.map((user) => {
        if (user._id === action.payload.unFollowedId) {
          return {
            ...user,
            followers: user.followers.filter(
              (follower) => follower !== action.payload.unFollowerId
            ),
          };
        } else return user;
      });

    // case UNFOLLOW_USER:
    //   return state.map((user) => {
    //     if (user._id === action.payload.idToUnfollow) {
    //       return {
    //         ...user,
    //         followers: user.followers.filter(
    //           (follower) => follower !== action.payload.userId
    //         ),
    //       };
    //     } else return user;
    //   });
    case UPDATE_CLIENT_PROFIL:
      return state.map((user) => {
        if (user._id === action.payload.clientId) {
          return {
            ...user,
            pseudo: action.payload.data.pseudo,
            bio: action.payload.data.bio,
          };
        } else return user;
      });
    // case UPLOAD_CLIENT_PICTURE:
    //   return state.map(user => {
    //     if (user._id === action.payload.clientId) {
    //       return state
    //     }
    // })
    default:
      return state;
  }
}
