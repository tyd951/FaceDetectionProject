import React from "react";
import Tilt from "react-tilt";
import brain from "./brain.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="ma3 mt0 mb0">
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 55 }}
        style={{ height: 100, width: 100 }}
      >
        <div className="pa3 Tilt-inner">
          <img src={brain} style={{ paddingTop: "5px" }} alt="logo" />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
