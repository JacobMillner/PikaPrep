import React from 'react';
import './Splash.css';

function Splash() {
  return (
    <div className="box flex">
      <div className="wrapper">
        Welcome to Pika Prep.
        <p>
          <img
            src={require('../../static/pika.jpg')}
            alt="Our favorite animal."
          />
        </p>
      </div>
    </div>
  );
}

export default Splash;
