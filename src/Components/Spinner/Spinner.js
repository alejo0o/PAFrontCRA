import React from 'react';
import 'semantic-ui-css/semantic.min.css';

const Spinner = () => {
  return (
    <div className='ui segment' style={{ height: 150 }}>
      <div className='ui active inverted dimmer'>
        <div className='ui massive text loader'>Loading</div>
      </div>
      <p></p>
      <p></p>
      <p></p>
    </div>
  );
};

export default Spinner;
