import { PrimaryButton, Text, TextField } from "@fluentui/react";
import { Affix } from "antd";
import React from "react";

export const TicketForm: React.FunctionComponent = (props) => {
    return (
        <div>
            <TextField />
            <TextField />
            <TextField />
            <TextField />
            <TextField />
            <TextField />
            <TextField />
            <TextField />
            <TextField />
            <TextField />
            <TextField />
            <TextField />
            <TextField />
            <TextField />
            <TextField />
            <TextField />
            <TextField />
            <TextField />
            <TextField />
            <TextField />
            <TextField />
            <TextField />
            <TextField />
            <TextField />
            <Affix offsetBottom={10} onChange={affixed => console.log(affixed)}>
                <div style={{ backgroundColor: "#fff"}}>
                    <PrimaryButton
                        text="Save"
                    />
                </div>
            </Affix>
        </div>
    )
}