import React, { Component } from 'react';
import Categories from './components/Categories.js'
import Posts from './components/Posts.js'
import PostDetail from './components/PostDetail.js'
import { Route } from 'react-router-dom'
import { Row, Grid } from 'react-bootstrap'
import './App.css';

class App extends Component {
  render() {
    return (

        <div className="App">
        <header className="App-header">
          <h1 className="App-title">Readble</h1>
        </header>
        <Grid fluid={true}>
        <Route exact path='/' render={(props) => (
            <Row className="content">
              <Categories/>
              <Posts/>
            </Row>
        )}/>
        <Route exact path='/:category/:id' render={(props) => (
            <Row className="content">
              <PostDetail {...props}/>
            </Row>
        )}/>
        <Route exact path='/:category' render={(props) => (
            <Row className="content">
              <Categories/>
              <Posts {...props}/>
            </Row>
          )}/>

        </Grid>
        </div>
      );
  }
}

export default App;
