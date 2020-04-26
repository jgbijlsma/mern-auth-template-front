import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";

export default function Home() {
  const { userData } = useContext(UserContext);

  return (
    <div className="page">
      {userData.user ? (
        <h1>Welcome {userData.user.displayName}</h1>
      ) : (
        <h2>Please log in</h2>
      )}
    </div>
  );
}
