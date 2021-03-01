import React from 'react';

const Rank = (props) => {
  return (
    <div className='mt4'>
      <div className='black f3'> {`${props.name}, Your detection count is....`} </div>
      <div className='black f1'> {props.entries} </div>
    </div>
  );
};

export default Rank;
