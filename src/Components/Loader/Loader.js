import React from 'react';
import { LoaderC } from './Loaderestilos';

const LoaderP = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 600,
      }}>
      <LoaderC></LoaderC>
    </div>
  );
};

export default LoaderP;
