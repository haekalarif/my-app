import React, { useEffect, useRef } from 'react'
import { Scheduler } from "@aldabil/react-scheduler";
import { ProcessedEvent, SchedulerRef } from '@aldabil/react-scheduler/types';
import { Button } from 'antd';
import { View } from '@aldabil/react-scheduler/components/nav/Navigation';
import { Pivot, PivotItem } from '@fluentui/react';
import bcrypt from "bcryptjs";

const TabPivot: React.FC<any> = (props) => {

    useEffect(() => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync("admin", salt);
        console.log(hash);
    }, []);
    return (
        <Pivot
            aria-label="Setting Pivot"
            // selectedKey={pivotKey}
            onLinkClick={(item?: PivotItem | undefined, ev?: React.MouseEvent<HTMLElement, MouseEvent> | undefined): void => {

            }}
            styles={{ root: { overflowX: 'auto', overflowY: "hidden" } }}
        >
            <div style={{ border: '1px solid #ededed' }}></div>
            <PivotItem headerText="Custom Fields" itemKey="Custom Fields">
            </PivotItem>
            <PivotItem headerText="User Permission" itemKey="User Permission">
            </PivotItem>
            <PivotItem headerText="Assignee" itemKey="Assignee">
            </PivotItem>
            <PivotItem headerText="Alert and Notification" itemKey="Alert and Notification">
            </PivotItem>
            <PivotItem headerText="Departement" itemKey="Departement">
            </PivotItem>
            <PivotItem headerText="Category" itemKey="Category">
            </PivotItem>
            <PivotItem headerText="Tags" itemKey="Tags">
            </PivotItem>
            <PivotItem headerText="Incoming Email" itemKey="Incoming Email">
            </PivotItem>
            <PivotItem headerText="User Manegemnt" itemKey="User Manegemnt">
            </PivotItem>
            <PivotItem headerText="Subscription" itemKey="Subscription" itemIcon="AccountManagement">
            </PivotItem>

        </Pivot>
    )
}

export default TabPivot