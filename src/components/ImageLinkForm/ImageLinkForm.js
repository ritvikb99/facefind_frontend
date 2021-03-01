import React from 'react';

const ImageLinkForm = (props) => {
  return (
    <div>
      <p className='f3'>{'FaceFind can help you detect faces in images from all over the internet. Give it a try!'}</p>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className='br3 shadow-5' style={{ width: '50%' }}>
          <input type='text' className='mr3' style={{ width: '80%' }} onChange={props.onInputChange}></input>
          <button className='grow link ph3 pv2 dib white bg-light-blue br3' onClick={props.onButtonSubmit}>
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
