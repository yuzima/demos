import React, { Component } from 'react';
import loadable from '@loadable/component'
import './App.css';
const AsyncPage = loadable(props => import(/* webpackChunkName: "AsyncPage-" */ `./components/${props.page}`))

class App extends Component {
  render() {
    return (
      <div className="App">
        <AsyncPage page="Home" />
        <AsyncPage page="Contact" />
      </div>
    );
  }
}

export default App;
