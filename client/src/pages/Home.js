import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";

import CreateFormPost from "../components/Post/CreateFormPost";
import Log from "../components/Log";
import Feed from "../components/Feed/Feed";

const Home = () => {
  const uid = useContext(UidContext);

  return (
    <div className="home page">
      <div className="main">
        <div className="home-header">
          {uid ? <CreateFormPost /> : <Log signIn={true} signUp={false} />}
        </div>

        <Feed />
      </div>
      <div className="main-right-part">
        <p>right part</p>
      </div>
    </div>
  );
};

export default Home;
