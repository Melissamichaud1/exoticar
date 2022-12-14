import React from "react";
// import "../App.css";
import "./MainPage.css";

function MainPage() {
  return (
    <div className="mainpage-container">
      {/* <video src="/videos/video-1.mp4" autoPlay loop muted /> */}
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold">ExotiCar</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">Don't just dream it. Drive it.</p>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
