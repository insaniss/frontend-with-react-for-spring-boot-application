import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import './App.scss';
import SideBar from './component/SideBar'
import Content from './component/Content';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename="/~s289307">
        <div className="App">
          <SideBar/>
          <Content/>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
