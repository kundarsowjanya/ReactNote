import './App.css';
import Header from './Header';
import { useState } from 'react';
import ImageSlider from './ImageSlider';

function App() {

  const country="India";
  return (
    <div className="App">
     <Header country={country} />
     <ImageSlider/>
    </div>
  );
}

export default App;
