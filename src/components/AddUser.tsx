import React ,{useState,useEffect}from 'react';
import {Button,Input,Form} from "antd";
import { DefaultButton, PrimaryButton, IconButton,CommandBarButton} from '@fluentui/react/lib/Button';
import { TextField} from '@fluentui/react/lib/TextField';
import { UserList } from './UserList';

interface UserInterfaces{
    name: string;
    umur: number;
    addUser: () => void;
    list:object[];
}
export const AddUser : React.FunctionComponent<UserInterfaces> = (props:UserInterfaces) =>{

    const [oi,setOi] = useState(props.addUser);
    console.log(props.list)

    return (
        <div>
            <h1>{props.name}</h1>
            <h1>{props.umur}</h1>
            <h1>{props.list.map((name)=>(
                console.log(name)
            ))}</h1>
        </div>
        // <div className="addUser">
        //           <form>
        //             <TextField placeholder='Firtsname' name='firstname' className='mb-1'/>
        //             <TextField placeholder='Lastsname' name='lastname' className='mb-1'/>
        //             <PrimaryButton type='submit' text='Submit'/>
        //           </form>
        //       </div>
    )
}