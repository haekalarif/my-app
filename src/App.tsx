import React, { useCallback, useState } from 'react';
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
import ReactWorkFlow from './components/TicketWorkflow/ReactWorkFlow';
import Flow from './components/TicketWorkflow/ReactFlowRenderer';
import Board from './components/TicketWorkflow/Board';
import Wizard from './components/Wizard';
import MultipleStep from './components/MultipleStep';
import Interface from './components/Interface';
import Download from './components/Download';
import Dialog from './components/Dialog';
import Messagebar from './components/Messagebar';
import IconPicker from './components/IconPicker';
import AntdDropdown from './components/AntdDropdown';
import { TicketForm } from './components/TicketForm';
import { ModalTransition } from './components/ModalTransition';
import { clarity } from 'react-microsoft-clarity';
import Profile from './components/Profile';
import EmailFields from './components/EmailFields';
import { Attachments } from './components/Attachments';
import NotificationMsg from './components/NotificationMsg';
import CreationTab from './components/CreationTab';
import FloatingPanel from './components/FloatingPanel';
import List from './components/List';
import Text from './components/Text';
import { CustomCallout } from './components/CustomCallout';
import ProductPage from './components/ProductPage';
import DetailsListBasicExample from './components/Detaillist';
import { DateFormatExamples } from './components/DateFormatExamples';
import EmailNotification from './components/EmailNotification';
import TicketCreationCard from './components/TicketCreationCard';

function App() {
  initializeIcons();


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
      {/* <ApiPage /> */}
      {/* <SlaCalculate /> */}
      {/* <ModalComponent/> */}
      {/* <Complete/> */}
      {/* <Workflow/> */}
      {/* <ReactWorkFlow/> */}
      {/* <Flow /> */}
      {/* <Board/> */}
      {/* <Wizard /> */}
      {/* <MultipleStep /> */}
      {/* <Interface/> */}
      {/* <Download/> */}
      {/* <Dialog /> */}
      {/* <Messagebar /> */}
      {/* <AntdDropdown /> */}
      {/* <TicketForm /> */}
      {/* <ModalTransition /> */}
      {/* <Profile
        user={{
          "id": "c553f079-1e4d-49d3-a2a9-efc007452883",
          "text": "Haekal Arif Rozikin",
          "secondaryText": "Haekal.rozikin@kitameraki.com"
        }}
      /> */}
      {/* <EmailFields /> */}
      {/* <Attachments /> */}
      {/* <NotificationMsg /> */}
      {/* <CreationTab /> */}
      {/* <FloatingPanel /> */}
      {/* <List /> */}
      {/* <Text /> */}
      {/* <CustomCallout /> */}
      {/* <ProductPage /> */}
      {/* <DetailsListBasicExample /> */}
      {/* <DateFormatExamples /> */}
      <EmailNotification />
      {/* <TicketCreationCard /> */}
    </div>
  );
}

export default App;
