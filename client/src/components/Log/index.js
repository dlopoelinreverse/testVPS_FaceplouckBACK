import { set } from "mongoose";
import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import TesterLog from "./TesterLog";

const Log = ({ signIn, signUp }) => {
  const [signUpModal, setSignUpModal] = useState(signUp);
  const [signInModal, setSignInModal] = useState(signIn);
  const [testerModal, setTesterModal] = useState(false);

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      setSignUpModal(false);
      setSignInModal(true);
    } else if (e.target.id === "tester") {
      setTesterModal(true);
      setSignUpModal(false);
      setSignInModal(false);
    }
  };

  return (
    <div className="connection page">
      <div className="connection-container">
        <ul className="selection">
          <li
            id="register"
            onClick={handleModals}
            className={signUpModal ? "active-btn" : null}
          >
            S'inscrire
          </li>
          <li
            id="login"
            onClick={handleModals}
            className={signInModal ? "active-btn" : null}
          >
            Se connecter
          </li>
          <li id="tester" onClick={handleModals}>
            Testeur
          </li>
        </ul>
        {signUpModal && <SignUpForm />}
        {signInModal && <SignInForm />}
        {testerModal && <TesterLog />}
      </div>
    </div>
  );
};

export default Log;
