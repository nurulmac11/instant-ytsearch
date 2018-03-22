import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './App.css';
import Youtube from './components/Youtube';

class App extends Component {
  render() {
    return (
      <Router basename={'/'}>
      <div className="App">
        <div className="navbar">
          <Link to="/"><i className="fab fa-youtube"></i> Youtube</Link>
        </div>

        <Route exact path="/" component={Youtube} smt="routeit" />

      </div>
      </Router>
    );
  }
}

export default App;
