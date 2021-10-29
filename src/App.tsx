import React from 'react';
import { Stack, Text, Link, FontWeights, IStackTokens, IStackStyles, ITextStyles, IIconProps } from '@fluentui/react';
import { TextField} from '@fluentui/react/lib/TextField';
import { DefaultButton, PrimaryButton, IconButton,CommandBarButton} from '@fluentui/react/lib/Button';
import '../node_modules/office-ui-fabric-core/dist/css/fabric.min.css'
import logo from './logo.svg';
import './App.css';

const boldStyle: Partial<ITextStyles> = { root: { fontWeight: FontWeights.semibold } };
const stackTokens: IStackTokens = { childrenGap: 15 };
const stackStyles: Partial<IStackStyles> = {
  root: {
    width: '960px',
    margin: '0 auto',
    textAlign: 'center',
    color: '#605e5c',
  },
};
function handleSubmit(){
  alert("Hello");
}
const saveIcon : IIconProps = {iconName:'Save',color:"#fff"}

export const App: React.FunctionComponent = () => {
  return (
    <Stack className="app">

      <Stack className="form">
        <div className="ms-Grid" dir="ltr">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-lg6">
                <Text variant="xxLarge" className="mb-1">Add User</Text>
              <form onSubmit={handleSubmit}>
                <div className="mb-1">
                  <TextField label="Firstname" name="firstname" placeholder="Username"/>
                </div>
                <div className="mb-1">
                  <TextField label="Lastname" name="lastname" placeholder="Lastname" />
                </div>
                <div>
                  <PrimaryButton text="Submit" type="submit"/>
                </div>
              </form>
            </div>

            <div className="ms-Grid-col ms-lg6">
              <Text>User List</Text>
            </div>

          </div>
        </div>
      </Stack>

    </Stack>
  );
};
