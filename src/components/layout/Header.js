import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import Axios from "axios";

export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const token = localStorage.getItem("auth-token");
      const tokenRes = await Axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      setLoggedIn(tokenRes.data);
    };

    checkUserLoggedIn();
  }, [userData]);

  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const logOut = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  return (
    <header className="header">
      <Link to="/">
        <h1 className="title">MERN auth tutorial</h1>
      </Link>
      <div className="auth-options">
        {loggedIn ? (
          <button onClick={logOut}>Log out</button>
        ) : (
          <>
            <button onClick={register}>Register</button>
            <button onClick={login}>Log in</button>
          </>
        )}
      </div>
    </header>
  );
}
