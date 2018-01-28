import React, { Component } from 'react';
import Categories from './components/Categories.js'
import Posts from './components/Posts.js'
import { Route, Switch, Link } from 'react-router-dom'
import './App.css';

class App extends Component {
  render() {
    return (

        <div className="App">
        <header className="App-header">
          <h1 className="App-title">Readble</h1>
        </header>
        <Route  path='/' render={(props) => (
          <div className="container-fluid">
            <div className="row content">
              <Categories/>
              <Posts/>
            </div>
          </div>
        )}/>
        <Route  path='/:category' render={(props) => (
          <div className="container-fluid">
            <div className="row content">
              <Categories/>
              <Posts {...props}/>
            </div>
          </div>
          )}/>
        </div>
      );
  }
}

export default App;
