import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <h1>Pika Prep</h1>
        </p>
        <img src={require('./static/pika.jpg')}  alt="Our favorite animal." />
      </header>
    </div>
  );
}

export default App;
