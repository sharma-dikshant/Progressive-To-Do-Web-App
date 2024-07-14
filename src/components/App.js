import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import { initializeApp } from "firebase/app";
import { AuthContainer } from "./AuthContainer";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

function App() {
  const [logInSuccessful, setLogInSuccessful] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(function () {
    onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          console.log("user is logged in.......");
          setLogInSuccessful(true);
          setUserId(user.uid);
        } else {
          console.log("no user.....");
          setLogInSuccessful(false);
          setUserId("");
        }
      },
      []
    );
  });

  return (
    <div className="App">
      {!logInSuccessful ? <AuthContainer /> : <HomePage userId={userId} />}
    </div>
  );
}

function HomePage({ userId }) {
  function handleLogout() {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful...");
      })
      .catch((error) => {
        console.log(" An error happened...");
      });
  }
  return (
    <div>
      <h1>Welcome !</h1>
      <p>{userId}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
export default App;
