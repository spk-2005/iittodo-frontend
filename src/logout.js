import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import './logout.css';
export default function Logout() {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("userEmail");
        localStorage.removeItem("name"); 
        navigate("/"); 
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  };

  return (
    <div id="logout">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
