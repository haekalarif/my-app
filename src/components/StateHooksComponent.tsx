import React,{ChangeEvent, FormEvent, useState, useEffect} from 'react';
import {Button,Input,Form} from "antd";
import '../../node_modules/antd/dist/antd.css'

interface Props{
}


export const StateHooksComponent : React.FC<Props> = () => {

    const[name,setName] = useState<string>('');
    const[address,setAddress] = useState<string>('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        console.log(name,address)
    }

    const onNameChange = (e: ChangeEvent<HTMLInputElement>) =>{
        setName(e.target.value)
    }
    const onAddressChange = (e: ChangeEvent<HTMLInputElement> )=>{
        setAddress(e.target.value)
    }
    
    useEffect(() => {
        console.log('Component mounted');
        return () => {
            console.log('Component will be unmount')
        }
    }, []); //# notice the empty array here, this is optional

    useEffect(()=>{
        console.log(`any state change Name: ${name}, Address: ${address} `);
    })

    useEffect(()=>{
        console.log(`Name changed : ${name} `);
    },[name])

    console.log(name,address)

    return (
        <Form layout='inline' onSubmitCapture={handleSubmit}>
            <Form.Item>
                <Input type="text" placeholder='name' value={name} name='name' onChange={onNameChange} />
                <Input type="text" placeholder='address' value={address} name='name' onChange={onAddressChange} />
                <Button htmlType='submit' type='primary'>Submit</Button>
            </Form.Item>
        </Form>
    )
}