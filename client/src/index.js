import React from "react";
import ReactDOM from "react-dom/client";
// import "./styles/index.scss";
import "./styles/index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

import { composeWithDevTools } from "redux-devtools-extension";
// import logger from "redux-logger";
import { getUsers } from "./actions/users.actions";

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk
      // , logger
    )
  )
);

store.dispatch(getUsers());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);
