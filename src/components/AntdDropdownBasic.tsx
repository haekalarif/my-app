import React from "react";
import { Label } from "@fluentui/react";
import { Select } from "antd";
import { DefaultOptionType } from "antd/lib/select";

interface IAntdDropdownBasic {
    onChange: (value: string, option: DefaultOptionType[]) => void,
    options: DefaultOptionType[],
    style?: React.CSSProperties,
    defaultValue?: string
    label?: string,
    placeholder?: string,
    className?: string
    value?: string
}

const AntdDropdownBasic: React.FunctionComponent<IAntdDropdownBasic> = (props: IAntdDropdownBasic) => {
    console.log(props);
    return (<>
        {props.placeholder}
        {props.label && <Label>{props.label}</Label>}
        <Select
            defaultValue={props.defaultValue}
            style={props.style}
            onChange={props.onChange}
            options={props.options}
            placeholder={props.placeholder}
            className={props.className}
            value={props.value}
        />
    </>)
}

export default AntdDropdownBasic;