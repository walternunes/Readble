import React, { Component } from 'react';
import logo from './logo.svg';
import Categories from './components/Categories.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row content">
            <Categories/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
