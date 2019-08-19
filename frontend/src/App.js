import React from 'react';
import MainNavBar from './Components/MainNavBar/MainNavBar';

function App() {
  return (
    <div>
      <MainNavBar />
      <p>Pika Prep</p>
      <img src={require('./static/pika.jpg')} alt="Our favorite animal." />
    </div>
  );
}

export default App;
