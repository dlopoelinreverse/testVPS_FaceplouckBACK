import React, { useRef } from "react";
import axios from "axios";

const SignInForm = () => {
  const inputEmail = useRef();
  const inputPassword = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      // credentials: "include",
      data: {
        email: inputEmail.current.value,
        password: inputPassword.current.value,
      },
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          window.location = "/";
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="sign-in-container">
      <form id="sign-up-form" onSubmit={handleLogin}>
        {/* <label>Email</label> */}
        <input
          type="email"
          id="email"
          placeholder="Votre email"
          ref={inputEmail}
        />
        <div className="email error"></div>
        {/* <label>Mot de passe</label> */}
        <input
          type="password"
          id="password"
          placeholder="Mot de passe"
          ref={inputPassword}
        />
        <div className="password error"></div>
        <input type="submit" value="Se connecter" />
      </form>
    </div>
  );
};

export default SignInForm;
