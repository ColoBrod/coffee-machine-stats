import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

import './style.css';

class Tabs extends Component {
  render() {
    return (
      <div className="tabs">
        <NavLink to="/">Overview</NavLink>
        <NavLink to="/sales-export">Sales Export</NavLink>
      </div>
    );
  }
}

export default Tabs;