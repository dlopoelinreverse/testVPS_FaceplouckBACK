import React, { useRef, useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const inputPseudo = useRef();
  const inputEmail = useRef();
  const inputPassword = useRef();
  const inputControlPassword = useRef();

  const handleRegister = (e) => {
    e.preventDefault();
    const terms = document.getElementById("terms");
    const pseudoError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const controlPasswordError = document.querySelector(
      ".control-password.error"
    );
    const termsError = document.querySelector(".terms.error");

    controlPasswordError.innerHTML = "";
    termsError.innerHTML = "";
    pseudoError.innerHTML = "";
    emailError.innerHTML = "";
    passwordError.innerHTML = "";

    if (
      inputPassword.current.value !== inputControlPassword.current.value ||
      !terms.checked
    ) {
      if (inputPassword.current.value !== inputControlPassword.current.value)
        controlPasswordError.innerHTML =
          "Les mots de passe ne correspondent pas";

      if (!terms.checked)
        termsError.innerHTML = "Veuillez valider les conditions générales";
    } else {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        withCredentials: true,
        data: {
          pseudo: inputPseudo.current.value,
          email: inputEmail.current.value,
          password: inputPassword.current.value,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            pseudoError.innerHTML = res.data.errors.pseudo;
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
          } else {
            setFormSubmit(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="sign-up-container">
      {formSubmit ? (
        <>
          <SignInForm />
          <h4>Inscription réussie, veuillez vous connecter</h4>
        </>
      ) : (
        <form onSubmit={handleRegister}>
          <input
            type="text"
            id="pseudo"
            placeholder="Pseudo"
            ref={inputPseudo}
          />
          <div className="pseudo error"></div>
          <input type="email" id="email" placeholder="Email" ref={inputEmail} />
          <div className="email error"></div>
          <input
            type="password"
            id="pasword"
            placeholder="Mot de passe"
            ref={inputPassword}
          />
          <div className="password error"></div>
          <input
            type="password"
            id="controlPassword"
            placeholder="Comfirmez mot de passe"
            ref={inputControlPassword}
          />
          <div className="control-password error"></div>
          <div className="condition-container">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              J'accepte les{" "}
              <a href="/" target="_blank" rel="noopener noreferrer">
                {" "}
                conditions générales
              </a>
            </label>
          </div>
          <div className="terms error"></div>
          <input type="submit" value="S'inscrire" />
        </form>
      )}
    </div>
  );
};

export default SignUpForm;
