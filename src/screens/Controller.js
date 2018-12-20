import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "../route";


/**
 * Class component for controller
 * @class Controller
 * @extends {Component}
 */
class Controller extends Component {

  render() {
    return (
      <Router>
        <div className="main-container">
          <Routes />
        </div>
      </Router>
    );
  }
}

export default Controller;
