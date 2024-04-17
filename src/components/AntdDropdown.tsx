import { Select } from 'antd';
import React, { useEffect } from 'react';
import type { SelectProps } from 'antd';
import FloatingPanel from './FloatingPanel';

const options: SelectProps['options'] = [];
for (let i = 10; i < 36; i++) {
    options.push({
        label: i.toString(36) + i,
        value: i.toString(36) + i,
    });
}

const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
};

const AntdDropdown: React.FC = () => {
    useEffect(() => {
        console.log(Math.round(new Date().getTimezoneOffset() / 60))
    }, []);
    return (
        <div style={{ width: 500 }}>
            <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Please select"
                defaultValue={['a10', 'c12']}
                onChange={handleChange}
                options={options}
                className="dropdown-disabled"
            />
            <br />
            {/* <Select
            mode="multiple"
            disabled
            style={{ width: '100%' }}
            placeholder="Please select"
            defaultValue={['a10', 'c12']}
            onChange={handleChange}
            options={options}
        /> */}
            <FloatingPanel />
        </div>)
};

export default AntdDropdown;
