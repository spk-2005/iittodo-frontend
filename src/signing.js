  import React from "react";
  import { signInWithPopup } from "firebase/auth";
  import { auth, provider } from "./firebase";  
  import axios from "axios";
  import { useNavigate } from "react-router-dom"; 
import './signing.css';
  export default function Signing() {
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const userData = {
          name: user.displayName,
          email: user.email,
        };

        localStorage.setItem("userEmail", user.email);

        await axios.post("http://localhost:5000/api/users", userData);
        alert(`Welcome, ${userData.name}`);
        navigate(`/first`);
      } catch (error) {
        console.error("Error signing in:", error);
      }
    };

    return (
      <div id="signing-section">
        <h1>Please sign in With Google</h1>
        <p>We are here to track your tasks</p>
        <div id="signing-cont">
        <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      </div></div>
    );
  }
