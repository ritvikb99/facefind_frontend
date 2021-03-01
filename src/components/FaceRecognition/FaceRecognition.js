import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = (props)=>{
    return(
      <div className="center ma">
        <div className="absolute mt3">
          <img id="inputImage" src={props.imageURL} width="500px" height="auto" />
          <div className="bounding-box" style={{top: props.box.topRow, right: props.box.rightCol, left:props.box.leftCol, bottom:props.box.bottomRow}}></div>
        </div>
      </div>  
    );
}

export default FaceRecognition;