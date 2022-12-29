import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UidContext } from "../components/AppContext";
import UserData from "../components/User/UserData";
import { isEmpty } from "../utils/Utils";

const Suggestions = () => {
  const uid = useContext(UidContext);
  const usersData = useSelector((state) => state.usersReducer);
  const clientData = useSelector(
    (state) => state.usersReducer.filter((user) => user._id === uid)[0]
  );
  const [suggestionUsers, setSuggestionUsers] = useState([]);

  const getRandomUsers = (number) => {
    if (usersData.length > 20) {
      let randomIndex = Math.random();
    } else {
      let randomIndexes = [];
      while (randomIndexes.length < number) {
        let index = Math.floor(Math.random() * usersData.length);
        if (!randomIndexes.includes(index)) randomIndexes.push(index);
      }
      setSuggestionUsers(
        usersData.filter((user, i) => randomIndexes.includes(i))
      );
    }
  };

  useEffect(() => {
    getRandomUsers(3);
  }, []);
  return (
    <div className="suggestions page">
      <div className="hearder-button">
        <Link to="/">
          <span className="icon-btn">
            <img src="/img/icons/chevron-left-solid.svg" alt="" />
          </span>
        </Link>
      </div>
      {!isEmpty(suggestionUsers) &&
        suggestionUsers
          .filter((user) => user._id !== uid)
          .filter((user) => !clientData.following.includes(user._id))
          .map((user) => <UserData key={user._id} userId={user._id} />)}
    </div>
  );
};

export default Suggestions;
