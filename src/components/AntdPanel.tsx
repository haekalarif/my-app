import { Button, Drawer } from 'antd';
import React, { useState } from 'react';
import { ActionButton, Stack, Text } from "@fluentui/react"

const AntdPanel: React.FC = () => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    function handleRenderFooterContent() {
        return (
            <div>
                <ActionButton
                    iconProps={{ iconName: "ClosePane" }}
                    style={{
                        border: '1px solid #0078d4',
                        height: 30
                    }}
                    // onClick={() => {
                    //     setState({
                    //         isOpenCalendarPanel: false
                    //     });
                    // }}
                />
            </div>
        )
    }

    return (
        <>
            <Button type="primary" onClick={showDrawer}>
                Open
            </Button>
            <Drawer
                // title={() => handleRenderNavigationContent}
                placement="right"
                visible={open}
                closable={false}
                headerStyle={{
                    borderBottom: "2px solid #ededed"
                }}
                contentWrapperStyle={{
                    width: 441
                }}
                // mask={false}
            >
                <Stack verticalAlign="space-between" style={{ height: "100%" }}>
                    <Stack>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Stack>
                    <Stack>
                        {handleRenderFooterContent()}
                    </Stack>
                </Stack>
            </Drawer>
        </>
    );
};

export default AntdPanel;