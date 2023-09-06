import React, { useState } from 'react';
import ReactBigCalendar from './components/ReactBigCalendar';
import './App.css';
import ReactScheduler from './components/ReactScheduler';
import AntdCalendar from './components/AntdCalendar';
import { initializeIcons } from '@fluentui/react';
import TabPivot from './components/TabPivot';
import JoditRTE from './components/JoditRTE';
import { PeoplePickerNormalExample } from './components/PeoplePickerNormalExample';
import ViewAttachmentComponent from './components/DocViewer/ViewAttachmentComponent';
import ReactFileViewer from './components/ReactFileViewer';
import ReactH5AudioPlayer from './components/ReactH5AudioPlayer';
import ApiPage from './components/ApiPage';
import SlaCalculate from './components/SlaCalculate';
import ModalComponent from './components/ModalComponent';
import Complete from './components/Complete';
import Workflow from './components/TicketWorkflow/Workflow';

function App() {
  initializeIcons();
  console.log();
  return (
    <div className="App">
      {/* <ReactBigCalendar/> */}
      {/* <ReactScheduler/> */}
      {/* <AntdCalendar /> */}
      {/* <TabPivot/> */}
      {/* <JoditRTE /> */}
      {/* <PeoplePickerNormalExample/> */}
      {/* <Diagram /> */}
      {/* <ViewAttachmentComponent /> */}
      {/* <ReactFileViewer /> */}
      {/* <ReactH5AudioPlayer /> */}
      {/* <ApiPage/> */}
      {/* <SlaCalculate /> */}
      {/* <ModalComponent/> */}
      {/* <Complete/> */}
      <Workflow/>
    </div>
  );
}

export default App;
