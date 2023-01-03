import React, { useEffect, useState } from "react";
import { UidContext } from "./components/AppContext";
import Log from "./components/Log";
import Routes from "./Routes";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUsers } from "./actions/users.actions";
import Suggestions from "./pages/SuggestionsPage";
import Navigation from "./components/Navigation";

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  const getToken = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/jwtid`,
      withCredentials: true,
    })
      .then((res) => {
        // console.log(res);
        setUid(res.data);
      })
      .catch((err) => console.log("No Token"));
  };
  // check the auth
  useEffect(() => {
    getToken();

    dispatch(getUsers());
  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
      <div className="app">
        <Routes uid={uid} />
        <Navigation />
      </div>
    </UidContext.Provider>
  );
};

export default App;
