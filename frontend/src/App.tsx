import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import InventoryList from './components/InventoryList';


function App() {
  return (
    <div className="App">
      <Navbar />
      <InventoryList />
    </div>
  );
}

export default App;
