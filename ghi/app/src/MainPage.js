import React from "react";
// import "../App.css";
import "./MainPage.css";
// import video from "./videos.dashboard.mp4";

function MainPage() {
  return (
    <div className="mainpage-container">
      <video src="/videos/dashboard.mp4" type="video/mp4" autoPlay loop muted />
      <div className="px-4 py-5 my-5 text-center">
        <h1 style={{ color: "white" }} className="display-5 fw-bold">
          ExotiCar
        </h1>
        <div>
          <p style={{ color: "white" }} className="lead mb-4">
            Don't just dream it. Drive it.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
