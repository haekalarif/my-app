import { ITheme, getTheme, mergeStyleSets, mergeStyles } from '@fluentui/react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';

interface DataType {
    key: string;
    archive: boolean,
    data: any,
}

const theme: ITheme = getTheme();
const rowStyle = (item) => {
    return mergeStyles({
        background: item.archive ? theme.palette.neutralLight : "#ffffff"

    });
}

const classnames = mergeStyleSets({
    antdClassname: {
        selectors: {
            ".ant-table-tbody > tr.ant-table-row:hover > td, .ant-table-tbody > tr > td.ant-table-cell-row-hover": {
                background: "#000000",
                transition: 0
            }
        }
    }

})


const columns: ColumnsType<DataType> = [
    {
        title: "",
        key: 'data',
        render: (_, record, index) => {
            // console.log(record);
            // console.log(index);
            return (
                <>hah</>
            )
        },
    },
];

const data: DataType[] = [
    {
        key: '1',
        archive: true,
        data: {},
    },
    {
        key: '2',
        archive: false,
        data: {},
    }
];

const AntdTable: React.FC = () => {
    return (<>
        {data.length > 0 &&
            <Table
                columns={columns}
                dataSource={data}
                size="middle"
                showHeader={false}
                rowClassName={(record: DataType, index: number, indent: number) => {
                    console.log(record);
                    return rowStyle(record);
                }}
                className={classnames.antdClassname}
            // className={tableRowStyle}
            />}
    </>)
};

export default AntdTable;