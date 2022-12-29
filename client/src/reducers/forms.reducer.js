const initialState = {
  createPost: {
    message: {},
    postPicture: {},
    video: {},
    file: {},
    valid: false,
  },
};

const formsReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default formsReducer;
