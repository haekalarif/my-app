import React, { useState } from 'react';
import ReactBigCalendar from './components/ReactBigCalendar';
import './App.css';
import ReactScheduler from './components/ReactScheduler';
import AntdCalendar from './components/AntdCalendar';
import { initializeIcons } from '@fluentui/react';

function App() {
  initializeIcons();
  
  return (
    <div className="App">
      {/* <ReactBigCalendar/> */}
      {/* <ReactScheduler/> */}
      <AntdCalendar />
    </div>
  );
}

export default App;
