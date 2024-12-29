import React from 'react';
import './loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="half-circle-ring ring1"></div>
      <div className="half-circle-ring ring2"></div>
      <div className="half-circle-ring ring3"></div>
      <div className="half-circle-ring ring4"></div>
    </div>
  );
};

export default Loader;
