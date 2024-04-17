import { Dropdown as AntdDropdown, Menu } from 'antd';
import { Dropdown as FluentDropdown, IDropdownOption, IDropdownStyleProps, IDropdownStyles, IStyleFunctionOrObject, Icon } from "@fluentui/react";
import React, { CSSProperties, ReactNode, useEffect, useRef } from 'react';

interface IIconPicker {
    options: IDropdownOption[],
    label?: string,
    onChange?: Function,
    width?: number | string,
    value?: any
}
interface IMenuItem {
    options: IDropdownOption[],
    styles: CSSProperties,
    onChange?: Function
}
const iconStyles = { marginRight: '8px' };

const MenuItem = (props: IMenuItem) => {
    return (
        <Menu style={props?.styles}>
            {props?.options?.map((icon) => {
                return (
                    <Menu.Item key={icon.key} onClick={() => props.onChange(icon)}>
                        <Icon iconName={String(icon.key)} />
                    </Menu.Item>
                )
            })}
        </Menu>
    )
};
const onRenderTitle = (option: IDropdownOption | IDropdownOption[]): JSX.Element => {
    console.log(option)
    let item = option;
    if (Array.isArray(item)) item = item[0];
    return (
        <div>
            {item && (
                <Icon style={iconStyles} iconName={String(item.key)} aria-hidden="true" title={String(item.key)} />
            )}
            <span>{item.text}</span>
        </div>
    );
};
const IconPicker: React.FunctionComponent<IIconPicker> = (props: IIconPicker) => {
    console.log(props);
    const ref = useRef(null);
    const label: string = props.label ? props.label : "";
    const width: number | string = props?.width;
    const value: any = props?.value;
    const onChange: Function | any = props.onChange;
    const options: IDropdownOption[] = props.options;

    /**
     * Styling for components
    */
    const dropdownStyles: IStyleFunctionOrObject<IDropdownStyleProps, IDropdownStyles> = {
        dropdown: { width: width }
    }
    const menuStyles: CSSProperties = {
        width: 300,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: "center"
    }
    return (
        <div style={{}} ref={ref}>
            <AntdDropdown
                overlay={() => (
                    <MenuItem
                        options={options}
                        styles={menuStyles}
                        onChange={onChange}
                    />
                )}
                trigger={['click']}
                destroyPopupOnHide={true}
                getPopupContainer={(node: any) => node.parentNode}
                overlayStyle={{
                    width: 300
                }}
            >

                <FluentDropdown
                    placeholder=""
                    label={label}
                    options={options}
                    selectedKey={value}
                    styles={dropdownStyles}
                    onRenderTitle={onRenderTitle}
                />

            </AntdDropdown>
        </div>
    )
};

export default IconPicker;