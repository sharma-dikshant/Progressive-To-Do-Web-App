import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "./App";
import './AuthContainer.css'; // make sure to import the CSS file

export function AuthContainer() {
  const [isLogInMethod, setIsLogInMethod] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function LogInUser() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("user Logged In successfully");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  function SignUpUser() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user Signed up Successfully");
      })
      .catch((err) => console.log(err.message));
  }

  function handleIsLogInMethod() {
    setIsLogInMethod(!isLogInMethod);
  }

  return (
    <div className="auth-container">
      <h2>{isLogInMethod ? "Login" : "Sign Up"}</h2>
      <div className="toggle">
        <span
          className={isLogInMethod ? "active" : ""}
          onClick={() => setIsLogInMethod(true)}
        >
          Login
        </span>
        <span
          className={!isLogInMethod ? "active" : ""}
          onClick={() => setIsLogInMethod(false)}
        >
          SignUp
        </span>
      </div>
      <form>
        <input
          type="email"
          placeholder="Email..."
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <input
          type="password"
          placeholder="Password..."
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
        />
      </form>
      <button onClick={isLogInMethod ? LogInUser : SignUpUser}>
        {isLogInMethod ? "Login" : "SignUp"}
      </button>
    </div>
  );
}
