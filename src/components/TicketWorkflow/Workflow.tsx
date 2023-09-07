import { ActionButton, IButtonStyles, IIconProps, IPersonaProps, Stack } from "@fluentui/react";
import React from "react";
import ListActionButton from "./ListActionButton";
import Board from "./Board";

interface IAttachment {
    src: string,
    caption: string,
    createdDateTime: string,
    createdBy: string,
    id: string,
    isImage?: boolean,
    isHyperlink?: boolean,
    isArchive: boolean
}
interface ITicketTag {
    tagCategoryId?: string,
    text: string,
    deleted?: boolean
}
export interface IWorkflowStep {
    id: string,
    label: string,
    color: string,
    nextSteps: {
        targetId: string,
        transitionLabel: string,
        transitionIcon: string,
        displayDialogWindow?: boolean
    }[]
}
export interface ICase {
    id?: string;
    ticketId?: string;
    index?: number;
    title: string;
    status: string;
    requestorId: string;
    requestorName: string;
    description: string;
    customFields: any;
    priority: string;
    department: string;
    assigneeId: string;
    category: string;
    instanceId?: string;
    expectedDate: Date | undefined | string;
    formatedDate?: string;
    attachments: IAttachment[] | any[];
    assigneeName: string;
    resolution?: string;
    firstResolutionDate?: Date;
    lastResolutionDate?: Date;
    createdDateTime?: Date;
    tags?: ITicketTag[];
    lastInteraction?: Date;
    firstTimeResponse: Date | string;
    timeResolution: Date | string;
    isFrtEscalated?: boolean,
    isRtEscalated?: boolean,
    isFrtBreached?: boolean,
    isRtBreached?: boolean,
    trackingId?: string, // tracking id for ticket created from email
    mailbox?: string, // the mailbox address from where the ticket is created from
    messageId?: string, // The id of the last email sent by the requestor
    lastUpdatedBy?: IPersonaProps,
    lastResolutionComment?: string,
    createdBy?: IPersonaProps,
    requestorEmail?: string,
    assigneeEmail?: string,
    workflow?: IWorkflowStep[]
};
const CaseActionEnum = {
    attach: "attachToCase",
    view: "viewCase",
    new: "createAnotherCase",
    edit: "editCase",
    start: "startCase",
    resolve: "resolveCase",
    close: "closeCase",
    reopen: "reopenCase",
}
const CaseStatusEnum = {
    open: "Open",
    inProgress: "In Progress",
    resolved: "Resolved",
    closed: "Closed",
    reopened: "Reopened"
}
const addIcon: IIconProps = { iconName: "Add" };
const editIcon: IIconProps = { iconName: "Edit" };
const startIcon: IIconProps = { iconName: "Forward" };
const reopenIcon: IIconProps = { iconName: "Reply" };
const resolveIcon: IIconProps = { iconName: "CheckMark" };
const closeIcon: IIconProps = { iconName: "Archive" };

export const activeItem: ICase = {
    title: "",
    status: "Reopened",
    requestorId: "",
    requestorName: "",
    description: "",
    customFields: undefined,
    priority: "",
    department: "",
    assigneeId: "",
    category: "",
    expectedDate: "",
    attachments: [],
    assigneeName: "",
    firstTimeResponse: "",
    timeResolution: "",
    workflow: [
        {
            id: "Open",
            label: "Open",
            color: "#FFFFFF",
            nextSteps: [
                {
                    targetId: "In Progress",
                    transitionIcon: "Forward",
                    transitionLabel: "Start Ticket"
                },
                {
                    targetId: "Resolved",
                    transitionIcon: "CheckMark",
                    transitionLabel: "Resolved Ticket"
                },
                {
                    targetId: "Closed",
                    transitionIcon: "Archive",
                    transitionLabel: "Closed Ticket"
                },
            ]
        },
        {
            id: "In Progress",
            label: "In Progress",
            color: "#1cd9d6",
            nextSteps: [
                {
                    targetId: "Resolved",
                    transitionIcon: "CheckMark",
                    transitionLabel: "Resolved Ticket"
                },
                {
                    targetId: "Closed",
                    transitionIcon: "Archive",
                    transitionLabel: "Closed Ticket"
                },
            ]
        },
        {
            id: "Resolved",
            label: "Resolved",
            color: "#34eb71",
            nextSteps: [
                {
                    targetId: "Reopened",
                    transitionIcon: "Reply",
                    transitionLabel: "Reopen Ticket"
                },
                {
                    targetId: "Closed",
                    transitionIcon: "Archive",
                    transitionLabel: "Closed Ticket"
                },
            ]
        },
        {
            id: "Closed",
            label: "Closed",
            color: "#28b05f",
            nextSteps: [
                {
                    targetId: "Reopened",
                    transitionIcon: "Reply",
                    transitionLabel: "Reopen Ticket"
                },
            ]
        },
        {
            id: "Reopened",
            label: "Reopened",
            color: "#ff970f",
            nextSteps: [
                {
                    targetId: "Resolved",
                    transitionIcon: "CheckMark",
                    transitionLabel: "Resolved Ticket"
                },
                {
                    targetId: "Closed",
                    transitionIcon: "Archive",
                    transitionLabel: "Closed Ticket"
                },
            ]
        },
    ]
}

const Workflow: React.FC = (props) => {

    const ActionButtons: React.FunctionComponent = () => {
        const actionButtonStyles: IButtonStyles = {
            root: {
                minWidth: 120
            },
            label: {
                width: 90,
                textAlign: "center"
            }
        }
        const StatusFlow: any = (props: { ticket: ICase }) => {
            const ticket: ICase = props.ticket;

            if ((ticket?.workflow) && (ticket.workflow?.length > 0)) {
                const status = ticket.status;
                const workflow: IWorkflowStep | undefined = ticket.workflow.find((item) => item.id == status);
                if (workflow) {
                    return (
                        workflow.nextSteps.map((item) => (
                            <ActionButton
                                iconProps={{ iconName: item.transitionIcon }}
                                id={item.targetId}
                                text={item.transitionLabel}
                                styles={actionButtonStyles}
                            // onClick={ShowDialog}
                            />
                        ))
                    )
                }
            } else {
                return (
                    <>
                        {([CaseStatusEnum.open].indexOf(activeItem.status) >= 0) && (
                            <ActionButton
                                iconProps={startIcon}
                                id={CaseActionEnum.start}
                                text={"Start Ticket"}
                                styles={actionButtonStyles}
                            // onClick={ShowDialog}
                            />
                        )}
                        {([CaseStatusEnum.resolved, CaseStatusEnum.closed].indexOf(activeItem.status) >= 0) && (
                            <ActionButton
                                iconProps={reopenIcon}
                                id={CaseActionEnum.reopen}
                                text={"Reopen Ticket"}
                                styles={actionButtonStyles}
                            // onClick={ShowDialog}
                            />
                        )}
                        {([CaseStatusEnum.open, CaseStatusEnum.reopened, CaseStatusEnum.inProgress].indexOf(activeItem.status) >= 0) && (
                            <ActionButton
                                iconProps={resolveIcon}
                                id={CaseActionEnum.resolve}
                                text={"Resolve Ticket"}
                                styles={actionButtonStyles}
                            // onClick={ShowDialog}
                            />
                        )}
                        {([CaseStatusEnum.reopened, CaseStatusEnum.resolved, CaseStatusEnum.open, CaseStatusEnum.inProgress].indexOf(activeItem.status) >= 0) && (
                            <ActionButton
                                iconProps={closeIcon}
                                id={CaseActionEnum.close}
                                text={"Close Ticket"}
                                styles={actionButtonStyles}
                            // onClick={ShowDialog}
                            />
                        )}
                    </>
                )
            }
        }

        return (
            <Stack style={{ display: 'flex', overflowX: "initial", justifyContent: 'initial' }} horizontal horizontalAlign="center" tokens={{ childrenGap: 10 }}>
                {/* {"y" === 'y' && (
                    <ActionButton
                        iconProps={addIcon}
                        id={CaseActionEnum.new}
                        text={"Create Another Ticket"}
                        // disabled={isOverQuota()}
                        styles={{
                            ...actionButtonStyles,
                            label: {
                                textAlign: "center",
                                width: 90
                            }
                        }}
                        onClick={() => {
                            // if (!!!isHomePage) history.replace(`/NewCase`);
                            // else props.openTicketModal(activeItem, 'create');
                        }}
                    />
                )
                } */}
                {/* // this state is for user there is a custom field people picker type */}

                <ActionButton
                    iconProps={editIcon}
                    id={CaseActionEnum.edit}
                    text={"Edit Ticket"}
                    styles={actionButtonStyles}
                    onClick={() => {
                        // if (!!!isHomePage) history.replace(`/EditCase?ticketId=${ticketId}`);
                        // else props.openTicketModal(activeItem, 'edit');
                    }}
                />

                <StatusFlow
                    ticket={activeItem}
                />
            </Stack>
        )
    };
    return (
        <Stack horizontal verticalAlign="center" horizontalAlign={"center"}>
            {/* <ActionButtons /> */}
            {/* <ListActionButton/> */}
            {/* <Board/> */}
        </Stack>
    )
}
export default Workflow;
