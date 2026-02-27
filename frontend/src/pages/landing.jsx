import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

export default function landing() {
  return (
    <div className="landingPageContainer">
      <nav>
        <div className="navHeader">
          <h2>NovaCall</h2>
        </div>
        <div className="navList">
          <p>Join as Guest</p>
          <p>Register</p>
          <div role="button">
            <p>Login</p>
          </div>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div>
          <h1>
            <span style={{ color: "#FF9839" }}>Connect</span> with your loved one
          </h1>
          <p>Cover a Distance by NovaCall</p>
          <div role="button">
            <Link to={"/auth"}>Get Started</Link>
          </div>
        </div>

        <div>
          <img src="/mobile.png" alt="Mobile image" />
        </div>
      </div>
    </div>
  );
}
