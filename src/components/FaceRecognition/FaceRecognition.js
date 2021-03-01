import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = (props) => {
  return (
    <div className='ma center'>
      <div className='absolute mt3'>
        <img id='inputImage' src={props.imageURL} width='500px' height='auto' />
        {props.boxes.map((box) => {
          return <div className='bounding-box' style={{ top: box.topRow, right: box.rightCol, left: box.leftCol, bottom: box.bottomRow }}></div>;
        })}
      </div>
    </div>
  );
};

export default FaceRecognition;
