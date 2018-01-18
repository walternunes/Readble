import React, { Component } from 'react';
import logo from './logo.svg';
import Categories from './components/Categories.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App"> 
        <Categories/>
      </div>
    );
  }
}

export default App;
