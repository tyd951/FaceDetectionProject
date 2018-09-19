import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, boxes, w, h }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputimage"
          src={imageUrl}
          width="500px"
          height="auto"
          alt=""
        />

        <div>
          {boxes.map((box, i) => {
            return (
              <div
                className="bounding-box"
                key={i}
                style={{
                  top: boxes[i].region_info.bounding_box.top_row * h,
                  right: w - boxes[i].region_info.bounding_box.right_col * w,
                  bottom: h - boxes[i].region_info.bounding_box.bottom_row * h,
                  left: boxes[i].region_info.bounding_box.left_col * w
                }}
              />
            );
          })}
        </div>

        {/* <div
          className="bounding-box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol
          }}
        /> */}
      </div>
    </div>
  );
};

export default FaceRecognition;
