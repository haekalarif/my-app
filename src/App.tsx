import React,{useState} from 'react';
import { Stack, Text, Link, FontWeights, IStackTokens, IStackStyles, ITextStyles, IIconProps } from '@fluentui/react';
import { TextField} from '@fluentui/react/lib/TextField';
import { DefaultButton, PrimaryButton, IconButton,CommandBarButton} from '@fluentui/react/lib/Button';
import '../node_modules/office-ui-fabric-core/dist/css/fabric.min.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {Button,Input,Form} from "antd";
import '../node_modules/antd/dist/antd.css'
import { AddUser } from './components/AddUser';
import { UserList } from './components/UserList';

export const App: React.FunctionComponent = () => {


  const [editing,setEditing] = useState<boolean>(true);
  const [users,setUsers] = useState(UserList);

  const addUser = () =>{
      console.log("Hello")
  } 


  console.log(editing)

  return (
    <Stack className="app">
      <div className="container">
        <div className="ms-Grid" dir ="ltr"> 
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-lg-6">
              {
                editing ?(
                  <AddUser name='Haekal' umur={18}  addUser={addUser} list={users}/>
                ):(
                 <h1>Hello</h1>
                ) 
              }
            </div>
            <div className="ms-Grid-col ms-lg-6"></div>
          </div>
        </div>
      </div>
    </Stack>
  );
};
