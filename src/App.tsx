import React, { useCallback, useEffect, useState } from 'react';
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
import ReactLifecycle from './components/ReactLifecycle';
import PermissionMissing from './components/PermissionMissing';
import Mailhtml from './components/Mailhtml';
import { DescHtml } from './components/DescHtml';
import Re from './components/Re';
import AutomationRules from './components/AutomationRules';
import PresetTemplate from './components/PresetTemplate';
import SpecialList from './components/SpecialList';
import BookList from './components/BookList';
import AddNewBook from './components/AddNewBook';
import ExportExcel from './components/ExportExcel';
import AntdTable from './components/AntdTable';
import AntdTooltips from './components/AntdTooltips';
import Static from './checklist/Static';
import { Swipeable } from './components/Swipeable';
import SwipeableList from './components/SwipeableList';
import { SwipeableMaster } from './components/SwipeableMaster';
import { SwiperReact } from './components/SwiperReact';
import IconWithBadge from './components/IconWithBadge';
import DetailListSticky from './components/DetailListSticky';
import AutomaticReload from './components/AutomaticReload';
import MyComponent from './components/MyComponent';
import LearnComponent from './components/LearnComponent';
import SettingColumnList, { ColumnItemsSetting } from './components/SettingColumnList';
import NotificationLog from './components/NotificationLog';
import Asynchronous from './components/Asynchronous';
import BreadthFirstSearch from './components/BreadthFirstSearch';
import DetailListStickyV2 from './components/DetailListStickyV2';
import FriendList from './components/FriendList';
import ScaleImage from './components/ScaleImage';
import ErrorPage from './components/Error';
import RegionDeployment from './components/RegionDeployment';
import StartTrial from './components/StartTrial';
import SpecialCharacter from './components/SpecialCharacter';
import AssigneeVisibility from './components/AssigneeVisibility';
import Boxs from './components/Boxs';
import AntdModal from './components/AntdModal';
import AntdPanel from './components/AntdPanel';
import { DetailListAdvance } from './components/DetailListAdvance';
import ParseMail from './components/ParseMail';
import ChecklistStaticPage from './components/ChecklistStaticPage';
import SlaBreach from './components/SlaBreach';
import TicketingStaticPage from './components/TicketingStaticPage';
import NewStaticPage from './components/NewStaticPage';

function App() {
  initializeIcons();
  useEffect(() => {
    // console.log("haha")
  }, []);
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
      {/* <EmailNotification /> */}
      {/* <TicketCreationCard /> */}
      {/* <ReactLifecycle /> */}
      {/* <PermissionMissing /> */}
      {/* <Mailhtml /> */}
      {/* <DescHtml /> */}
      {/* <Re /> */}
      {/* <AutomationRules /> */}
      {/* <PresetTemplate /> */}
      {/* <SpecialList columns={[]} items={[]} /> */}
      {/* <BookList /> */}
      {/* <AddNewBook /> */}
      {/* <ExportExcel /> */}
      {/* <AntdTable /> */}
      {/* <ApiPage /> */}
      {/* <AntdTooltips /> */}
      {/* <Static /> */}
      {/* <Swipeable /> */}
      {/* <SwipeableList
        items={[
          "Item 1",
          "Item 2",
          "Item 3",
          "Item 4",
        ]}
      /> */}
      {/* <SwipeableMaster /> */}
      {/* <SwiperReact /> */}
      {/* <IconWithBadge
        count={10}
      /> */}
      {/* <DetailsListBasicExample /> */}
      {/* <DetailListSticky /> */}
      {/* <AutomaticReload /> */}
      {/* <MyComponent /> */}
      {/* <LearnComponent /> */}
      {/* <SettingColumnList /> */}
      {/* <NotificationLog /> */}
      {/* <Asynchronous /> */}
      {/* <BreadthFirstSearch /> */}
      {/* <DetailListStickyV2 /> */}
      {/* <FriendList /> */}
      {/* <ScaleI mage /> */}
      {/* <ErrorPage errorCode={""} errorMessage={""}/> */}

      {/* <RegionDeployment /> */}
      {/* <StartTrial /> */}
      {/* <SpecialCharacter /> */}
      {/* <AssigneeVisibility /> */}
      {/* <Boxs /> */}

      {/* <AntdModal /> */}
      {/* <AntdPanel /> */}
      {/* <DetailListAdvance /> */}
      {/* <ParseMail /> */}
      {/* <ChecklistStaticPage /> */}
      {/* <SlaCalculate /> */}
      <SlaBreach />
      {/* <TicketingStaticPage /> */}
      {/* <NewStaticPage setState={undefined} /> */}
      {/* <TicketingStaticPage /> */}
    </div>
  );
}

export default App;
