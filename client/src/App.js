import React, { Component } from 'react';
import Categories from './components/Categories.js'
import Posts from './components/Posts.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <header className="App-header">
        <h1 className="App-title">Readble</h1>
      </header>
        <div className="container-fluid">
          <div className="row content">
            <Categories/>
            <Posts/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
