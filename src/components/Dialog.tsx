import React from "react"
import BasicDialog from "./BasicDialog";
import { DefaultButton, Modal, PrimaryButton, Stack, Text, concatStyleSets, mergeStyleSets } from "@fluentui/react";
import { useBoolean } from '@fluentui/react-hooks';

const customPanelStyles = mergeStyleSets({
    wrapper: {
        padding: 10,
        height: "calc(110vh - 235px)",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #ededed",
        borderLeft: "1px solid #ededed"
    },
    disabledFlowEditor: {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        pointerEvents: 'all',
        cursor: "not-allowed"
    },
    header: {
        height: 50,
        justifyContent: "center"
    },
    headerDialog: {
        marginBottom: 15
    },
    bodyModal: {
        gap: 10,
        minWidth: 350,
    },
    bodyPanel: {
        gap: 10
    },
    bodyDialog: {
        '&>*:last-child': {
            marginTop: '14px',
        },
    },
    footerModal: {
        marginTop: 20
    },
    footerPanel: {
        marginTop: "auto"
    },
    data: {
        // border: '1px solid #ededed',
        minHeight: 200,
        padding: 10,
        display: "flex",
        flexDirection: "column",
        '&>*:not(:first-child)': {
            marginTop: '10px',
        },
    }
});
const Dialog: React.FunctionComponent = () => {

    const [isOpenModal, { toggle: toggleOpenModal }] = useBoolean(false);

    return (
        <div>
            <PrimaryButton
                text="Open dialog"
                onClick={toggleOpenModal}
            />
            <BasicDialog
                title={"Test"}
                subText={"Test"}
                hideDialogBasic={!!!isOpenModal}
                onDismiss={toggleOpenModal}
                isFooterAtBottom={true}
                onRenderFooter={
                    <div>haha</div>
                }

            />
            {/* <Modal
                isOpen={isOpenModal}
                onDismiss={toggleOpenModal}
                isBlocking={true}
                styles={{
                    main: {
                        padding: '10px 24px 24px 24px',
                        maxWidth: 430
                    }
                }}
            >
                <Stack className={customPanelStyles.headerDialog}>
                    <Text variant={"xLarge"}>
                        Ready to apply a new Workflow?
                    </Text>
                </Stack>

                <Stack className={customPanelStyles.bodyDialog} tokens={{ childrenGap: 5 }}>
                    <Text style={{ color: "#605e5c" }} variant="medium">You are about to change the ticket workflow.
                    </Text>
                    <Text style={{ color: "#605e5c" }} variant="medium">Please be aware that this action will affect the workflow process for all newly created tickets.
                    </Text>
                    <Text style={{ color: "#605e5c" }} variant="medium">Are you sure you
                        want to proceed with this workflow change?</Text>
                </Stack>
                <Stack className={customPanelStyles.footerModal}>
                    <Stack
                        horizontal
                        horizontalAlign="end"
                        tokens={{ childrenGap: 10 }}
                    >
                        <DefaultButton
                            text={"Cancel"}
                            onClick={() => { }}
                        />
                        <PrimaryButton
                            text={"Apply"}
                            onClick={() => { }}
                            disabled={false}
                        />
                    </Stack>
                </Stack>
            </Modal> */}

        </div>)
}
export default Dialog;