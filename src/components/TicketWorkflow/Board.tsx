import React, { MouseEventHandler, ReactNode, useEffect, useState } from "react"
import { IButtonStyles, Panel, PanelType, PrimaryButton, Stack, mergeStyleSets, Text, IPersonaProps, TextField, Dropdown, IDropdownOption, DefaultButton, Checkbox, Label, Toggle, ActionButton, Icon } from "@fluentui/react";
import { FlowEditor, NodeTypeEnum, ReactFlow, handleDownloadFlowData, handleUploadAndParseFlow } from "@kitameraki/teamswork-library";
import { SliderPicker, ColorResult } from "react-color"
import { IFlowEditorProps, ITextFieldNodeData } from "@kitameraki/teamswork-library/dist/components/FlowEditor/utils/Interfaces";
import { ExistingKeyOperation } from "@azure/cosmos"
import { format } from "date-fns";
import IconPicker from "../IconPicker";
import FloatingPanel from "../FloatingPanel";
import useDownloader from 'react-use-downloader';

interface INodeData {
    // properties default
    label: string;
    recordResolutionSLA: boolean,
    color: string,
    // onChange?: Function,
    // onRender?: Function
}

interface IEdgeData {
    // properties default
    // label: string,
    iconName?: string,
    isEditing: boolean,
    recordComment: boolean,
    authorizedUsers: ("owner" | "assignee" | "requestor")[],
    markerEnd: ReactFlow.EdgeMarkerType
    // onChange?: Function,
}
interface INode {
    id: string;
    type: string;
    position: {
        x: number;
        y: number;
    };
    data: {
        label: string;
        // onRender?: (props: any, defaultRender: any) => JSX.Element | null;
        // onChange: (id: string, newName: string) => void
    };
    targetPosition: string;
    sourcePosition: string;
}
interface IEdge {
    id: string;
    type: string;
    label: string;
    source: string;
    sourceHandle: null | string;
    target: string;
    targetHandle: null | string;
    markerEnd: {
        type: string;
    };
    data: {
        isEditing: boolean;
        authorizedUsers: IPersonaProps[],
        capturedComment: string,
        iconName: ""
    };
}
const defaultStatus: string[] = ["Open", "In Progress", "Resolved", "Closed", "Reopened"];
const defaultIcons = {
    "In Progress": "Forward",
    "Resolved": "CheckMark",
    "Closed": "Archive",
    "Reopened": "Reply"

}
// Custom Node and textFieldNode type only can custom render
const initialNodes: any[] = [
    {
        "id": "Open",
        "type": "startNode",
        "position": {
            "x": -205.2049180327868,
            "y": -57.13934426229507
        },
        "data": {
            "label": "Open",
            "recordResolutionSLA": false,
            "color": "#fff",
        },
        "targetPosition": "left",
        "sourcePosition": "right",
        "deletable": false
    },
    {
        "id": "In Progress",
        "type": "textFieldNode",
        "position": {
            "x": -24.368177503993962,
            "y": -213.619285456832
        },
        "data": {
            "label": "In Progress",
            "recordResolutionSLA": false,
            "color": "#1cd9d6"
        },
        "targetPosition": "left",
        "sourcePosition": "right"
    },
    {
        "id": "Resolved",
        "type": "textFieldNode",
        "position": {
            "x": 192.4423425992039,
            "y": 49.718743082182385
        },
        "data": {
            "label": "Resolved",
            "recordResolutionSLA": true,
            "color": "#34eb71"
        },
        "targetPosition": "left",
        "sourcePosition": "right"
    },
    {
        "id": "Closed",
        "type": "textFieldNode",
        "position": {
            "x": 773.1812215977077,
            "y": -62.75364748022107
        },
        "data": {
            "label": "Closed",
            "recordResolutionSLA": true,
            "color": "#28b05f"
        },
        "targetPosition": "left",
        "sourcePosition": "right"
    },
    {
        "id": "Reopened",
        "type": "textFieldNode",
        "position": {
            "x": 502.7629135476956,
            "y": -398.0035164745823
        },
        "data": {
            "label": "Reopened",
            "recordResolutionSLA": false,
            "color": "#ff970f"
        },
        "targetPosition": "left",
        "sourcePosition": "right",
        // "selected": true
    }
]
const initialEdges: any[] = [
    {
        "id": "03143c6f-c8bd-425e-9eff-31be3011dff9",
        "type": "labeledEdge",
        "label": "Start Ticket",
        "source": "Open",
        "sourceHandle": null,
        "target": "In Progress",
        "targetHandle": null,
        "markerEnd": {
            "type": "arrowclosed",
            "width": 25,
            "height": 25
        },
        "data": {
            "iconName": "Forward",
            "isEditing": false,
            "recordComment": false,
            "authorizedUsers": [
                "owner",
                "assignee"
            ]
        }
    },
    {
        "id": "bebee65c-974c-4afc-893e-b03672c168b4",
        "type": "labeledEdge",
        "label": "Close Ticket",
        "source": "Open",
        "sourceHandle": null,
        "target": "Closed",
        "targetHandle": null,
        "markerEnd": {
            "type": "arrowclosed",
            "width": 25,
            "height": 25
        },
        "data": {
            "iconName": "Archive",
            "isEditing": false,
            "recordComment": true,
            "authorizedUsers": [
                "owner",
                "assignee",
                "requestor"
            ]
        }
    },
    {
        "id": "3660eb66-9e3e-43c4-8699-391de37fd50e",
        "type": "labeledEdge",
        "label": "Resolve Ticket",
        "source": "Open",
        "sourceHandle": null,
        "target": "Resolved",
        "targetHandle": null,
        "markerEnd": {
            "type": "arrowclosed",
            "width": 25,
            "height": 25
        },
        "data": {
            "iconName": "CheckMark",
            "isEditing": false,
            "recordComment": true,
            "authorizedUsers": [
                "owner",
                "assignee"
            ]
        }
    },
    {
        "id": "ae401e38-dd49-496b-900e-805659580e5e",
        "type": "labeledEdge",
        "label": "Resolve Ticket",
        "source": "In Progress",
        "sourceHandle": null,
        "target": "Resolved",
        "targetHandle": null,
        "markerEnd": {
            "type": "arrowclosed",
            "width": 25,
            "height": 25
        },
        "data": {
            "iconName": "CheckMark",
            "isEditing": false,
            "recordComment": true,
            "authorizedUsers": [
                "owner",
                "assignee"
            ]
        }
    },
    {
        "id": "5a549dbb-fdbd-4874-88a7-b036d2653f8a",
        "type": "labeledEdge",
        "label": "Close Ticket",
        "source": "In Progress",
        "sourceHandle": null,
        "target": "Closed",
        "targetHandle": null,
        "markerEnd": {
            "type": "arrowclosed",
            "width": 25,
            "height": 25
        },
        "data": {
            "iconName": "Archive",
            "isEditing": false,
            "recordComment": true,
            "authorizedUsers": [
                "owner",
                "assignee",
                "requestor"
            ]
        }
    },
    {
        "id": "8ad646ca-7cbf-41f9-94fe-745bf007037c",
        "type": "labeledEdge",
        "label": "Close Ticket",
        "source": "Resolved",
        "sourceHandle": null,
        "target": "Closed",
        "targetHandle": null,
        "markerEnd": {
            "type": "arrowclosed",
            "width": 25,
            "height": 25
        },
        "data": {
            "iconName": "Archive",
            "isEditing": false,
            "recordComment": true,
            "authorizedUsers": [
                "owner",
                "assignee",
                "requestor"
            ]
        }
    },
    {
        "id": "4336ef9c-10b7-4c3f-9ac3-c1d9071786cd",
        "type": "labeledEdge",
        "label": "Reopen Ticket",
        "source": "Closed",
        "sourceHandle": null,
        "target": "Reopened",
        "targetHandle": null,
        "markerEnd": {
            "type": "arrowclosed",
            "width": 25,
            "height": 25
        },
        "data": {
            "iconName": "Reply",
            "isEditing": false,
            "recordComment": true,
            "authorizedUsers": [
                "owner",
                "assignee",
                "requestor"
            ]
        },
        // "selected": true
    },
    {
        "id": "4e4d94ef-3fa0-4ec5-93c7-ba2e35c01727",
        "type": "labeledEdge",
        "label": "Close Ticket",
        "source": "Reopened",
        "sourceHandle": null,
        "target": "Closed",
        "targetHandle": null,
        "markerEnd": {
            "type": "arrowclosed",
            "width": 25,
            "height": 25
        },
        "data": {
            "iconName": "Archive",
            "isEditing": false,
            "recordComment": true,
            "authorizedUsers": [
                "owner",
                "assignee",
                "requestor"
            ]
        }
    },
    {
        "id": "4f13b239-df78-49a8-96cd-819c2ec7b122",
        "type": "labeledEdge",
        "label": "Resolve Ticket",
        "source": "Reopened",
        "sourceHandle": null,
        "target": "Resolved",
        "targetHandle": null,
        "markerEnd": {
            "type": "arrowclosed",
            "width": 25,
            "height": 25
        },
        "data": {
            "iconName": "CheckMark",
            "isEditing": false,
            "recordComment": true,
            "authorizedUsers": [
                "owner",
                "assignee"
            ]
        }
    },
    {
        "id": "f09478fd-aa5b-47ec-ab1d-6b903ca6513a",
        "type": "labeledEdge",
        "label": "Reopen Ticket",
        "source": "Resolved",
        "sourceHandle": null,
        "target": "Reopened",
        "targetHandle": null,
        "markerEnd": {
            "type": "arrowclosed",
            "width": 25,
            "height": 25
        },
        "data": {
            "iconName": "Reply",
            "isEditing": false,
            "recordComment": true,
            "authorizedUsers": [
                "owner",
                "assignee",
                "requestor"
            ]
        }
    }
]

const iconStyles = { marginRight: '8px' };
const customPanelStyles = mergeStyleSets({
    wrapper: {
        padding: 10,
        minHeight: "100vh",
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
    body: {
        gap: 10
    },
    footer: {
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
        '&>*:last-child': {
            marginTop: '20px'
        }
    }
});

export interface INextStep {
    targetId: string,
    recordResolutionSLA: boolean,
    transitionLabel: string | ReactNode,
    transitionIcon: string,
    recordComment: boolean,
    authorizedUsers: ("owner" | "assignee" | "requestor")[]
}
export interface IWorkflowStep {
    id: string,
    label: string,
    color: string,
    recordResolutionSLA: boolean,
    nextSteps: INextStep[]
}
// let data: IWorkflowStep = {
//     id: "Open",
//     label: "Open",
//     color: "#FFFFFF",
//     nextSteps: [
//         {
//             targetId: "In Progress",
//             transitionIcon: "Forward",
//             transitionLabel: "Start Ticket",
//             recordComment: false,
//             authorizedUsers: ["owner", "assignee"]
//         },
//         {
//             targetId: "Resolved",
//             transitionIcon: "CheckMark",
//             transitionLabel: "Resolved Ticket",
//             recordComment: true,
//             authorizedUsers: ["owner", "assignee"]
//         },
//         {
//             targetId: "Closed",
//             transitionIcon: "Archive",
//             transitionLabel: "Closed Ticket",
//             recordComment: true,
//             authorizedUsers: ["owner", "assignee", "owner"]
//         },
//     ]
// }

const saveButtonStyles: IButtonStyles = {
    root: {
        position: 'fixed',
        bottom: '5px !important',
        // right: '360px !important',
    },
    rootDisabled: {
        position: 'fixed',
    }
}

interface IStatusContent {
    activeStatus: ReactFlow.Node<INodeData, NodeTypeEnum>,
    statusName: string,
    onChangeStatusName: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void,
    recordResolution: boolean,
    onChangeResolution: (event: React.MouseEvent<HTMLElement, MouseEvent>, checked?: boolean) => void,
    color: string,
    onChangeColor: Function,
    onSave: MouseEventHandler<any>,
    onCancel: MouseEventHandler<any>,
    headerText: string,
    cancelText: string,
    saveText: string,
    disabledSaveButton: boolean
}
const StatusContent: React.FunctionComponent<IStatusContent> = (props: IStatusContent) => {
    const activeStatus = props.activeStatus;
    const statusName = props.statusName;
    const onChangeStatusName = props.onChangeStatusName;
    const recordResolution = props.recordResolution;
    const onChangeResolution = props.onChangeResolution;
    const color = props.color;
    const onChangeColor = props.onChangeColor;
    const onSave = props.onSave;
    const onCancel = props.onCancel;
    const headerText = props.headerText;
    const cancelText = props.cancelText;
    const saveText = props.saveText;
    const disabledSaveButton = props.disabledSaveButton;
    return (<>
        <Stack className={customPanelStyles.header}>
            <Text variant={"xLarge"}>
                {headerText}
            </Text>
        </Stack>
        <Stack className={customPanelStyles.body}>
            <div className={customPanelStyles.data}>

                <div>
                    <TextField
                        label="Status Name"
                        value={statusName}
                        onChange={onChangeStatusName}
                    />
                </div>
                <div>
                    <Toggle
                        label="Record Resolution"
                        onText="Enabled"
                        offText="Disabled"
                        checked={recordResolution}
                        onChange={onChangeResolution}
                    />
                </div>
                {/* {!!!defaultStatus.includes(activeStatus?.id) && */}
                <div>
                    <Label styles={{ root: { padding: "0px 0px 5px 0px" } }}>Status Color</Label>
                    <SliderPicker
                        color={color!}
                        onChangeComplete={onChangeColor}
                    />
                </div>
                <div>
                    <ActionButton
                        iconProps={{ iconName: "Delete" }}
                        styles={{ root: { height: 0 } }}
                        text="Delete"
                    />
                </div>
            </div>
        </Stack>
        <Stack className={customPanelStyles.footer}>
            <Stack horizontal horizontalAlign="center" tokens={{ childrenGap: 10 }}>
                <PrimaryButton
                    text={saveText}
                    onClick={onSave}
                    disabled={disabledSaveButton}
                />
                <DefaultButton
                    text={cancelText}
                    onClick={onCancel}
                />
            </Stack>
        </Stack>
    </>)
}

interface ITransitionContent {
    transitionName: string,
    onChangeTransitionName: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void,
    recordComment: boolean,
    onChangeRecordComment: (event: React.MouseEvent<HTMLElement, MouseEvent>, checked?: boolean) => void,
    authorizedUsers: string[],
    onChangeAuthorized: (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => void,
    options: IDropdownOption[],
    onSave: MouseEventHandler<any>,
    onCancel: MouseEventHandler<any>,
    headerText: string,
    cancelText: string,
    saveText: string,
    disabledSaveButton: boolean,
    iconOptions: IDropdownOption[],
    onRenderOptionIcon: (option: IDropdownOption) => JSX.Element,
    selectedIcon: string,
    onChangeIcon: (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => void,
    onRenderOptionTitleIcon: (options: IDropdownOption[] | IDropdownOption) => JSX.Element,
    activeTransition: ReactFlow.Edge<IEdgeData>,
    statusColor: string
}
const TransitionContent: React.FunctionComponent<ITransitionContent> = (props: ITransitionContent) => {
    const activeTransition = props.activeTransition;
    const statusColor = props.statusColor;
    const transitionName = props.transitionName;
    const onChangeTransitionName = props.onChangeTransitionName;
    const recordComment = props.recordComment;
    const onChangeRecordComment = props.onChangeRecordComment;
    const authorizedUsers = props.authorizedUsers;
    const onChangeAuthorized = props.onChangeAuthorized;
    const onSave = props.onSave;
    const onCancel = props.onCancel;
    const headerText = props.headerText;
    const cancelText = props.cancelText;
    const saveText = props.saveText;
    const options = props.options;
    const disabledSaveButton = props.disabledSaveButton;
    const iconOptions = props.iconOptions;
    const onRenderOptionIcon = props.onRenderOptionIcon;
    const onChangeIcon = props.onChangeIcon;
    const selectedKey = props.selectedIcon;
    const onRenderOptionTitleIcon = props.onRenderOptionTitleIcon;

    return (<>
        <Stack className={customPanelStyles.header}>
            {/* <Text variant={"xLarge"}>
                {headerText}
            </Text> */}
            <div style={{ padding: '0px 10px', border: `2px solid ${statusColor}` }}>
                <Text>{activeTransition.source} {`->`} {activeTransition.target}</Text>
            </div>
        </Stack>
        <Stack className={customPanelStyles.body}>
            <div className={customPanelStyles.data}>
                <div>
                    <TextField
                        label="Transition Name"
                        value={transitionName}
                        onChange={onChangeTransitionName}
                    />
                </div>
                <div>
                    <Dropdown
                        placeholder="Select options"
                        label="Authorized Users"
                        selectedKeys={authorizedUsers}
                        onChange={onChangeAuthorized}
                        multiSelect
                        options={options}
                    />
                </div>
                <div>
                    {/* <Dropdown
                        placeholder="Select icon"
                        label="Transition Icon"
                        selectedKey={selectedKey}
                        onChange={onChangeIcon}
                        options={iconOptions}
                        onRenderOption={onRenderOptionIcon}
                        onRenderTitle={onRenderOptionTitleIcon}
                        styles={{
                            dropdown: {
                                width: "20%"
                            }
                        }}
                    /> */}
                    <IconPicker
                        options={iconOptions}
                        label={"Transition Icon"}
                        value={selectedKey}
                        onChange={onChangeIcon}
                        // onRenderTitle={onRenderOptionTitleIcon}
                        width={'35%'}
                    />
                </div>
                <div>
                    <Toggle
                        label="Record Comment"
                        onText="Enabled"
                        offText="Disabled"
                        checked={recordComment}
                        onChange={onChangeRecordComment}
                    />
                </div>
            </div>
        </Stack>
        <Stack className={customPanelStyles.footer}>
            <Stack
                horizontal
                horizontalAlign="center"
                tokens={{ childrenGap: 10 }}
            >
                <PrimaryButton
                    text={saveText}
                    onClick={onSave}
                    disabled={disabledSaveButton}
                />
                <DefaultButton
                    text={cancelText}
                    onClick={onCancel}
                />
            </Stack>
        </Stack>
    </>)
}
const Board: React.FunctionComponent = (props) => {
    const { download: reactDownload } = useDownloader();
    const [nodes, setNodes] = useState<ReactFlow.Node<INodeData, NodeTypeEnum>[]>([]);
    const [edges, setEdges] = useState<ReactFlow.Edge<IEdgeData>[]>([]);
    const [activeStatus, setActiveStatus] = useState<ReactFlow.Node<INodeData, NodeTypeEnum>>();
    const [statusName, setStatusName] = useState<string>("");
    const [recordResolutionSLA, setRecordResolutionSLA] = useState<boolean>();
    const [color, setColor] = useState<string>("");
    const [activeTransition, setActiveTransition] = useState<ReactFlow.Edge<IEdgeData>>();
    const [transitionName, setTransitionName] = useState<string>("");
    const [recordComment, setRecordComment] = useState<boolean>();
    const [authorizedUsers, setAuthorizedUsers] = useState<("owner" | "assignee" | "requestor")[]>([]);
    const [statusColor, setStatusColor] = useState<string>("");

    const [action, setAction] = useState<"create" | "edit">("create");
    const [editDetected, setEditDetected] = useState<boolean>(false);
    const [isDisabledSave, setIsDisabledSave] = useState<boolean>(false);
    const [selectedIcon, setSelectedIcon] = useState<string>("");

    const isStatusOrTransitionActive: boolean = (activeStatus || activeTransition) ? true : false
    /**
     * List options for authorized users
     * @type {Array<IDropdownOption>}
     * @property {string} key - 'key' is uniquely identify each option in the dropdown list
     * @property {string} text - The text property represents the human-readable label or display text associated with each option in the dropdown list.
     */
    const options: IDropdownOption[] = [
        { key: 'owner', text: 'Owner' },
        { key: 'assignee', text: 'Assignee' },
        { key: 'requestor', text: 'Requestor' },
    ];

    const iconOptions: IDropdownOption[] = [
        { key: 'Forward', text: "" },
        { key: 'CheckMark', text: "" },
        { key: 'Archive', text: "" },
        { key: 'Reply', text: "" },
        { key: 'Cancel', text: "" },
        { key: 'Clock', text: "" },
        { key: 'StatusCircleQuestionMark', text: "" },
        { key: 'Info2', text: "" },
        { key: 'Processing', text: "" },
        { key: 'RecycleBin', text: "" },
        { key: 'Back', text: "" },
        { key: 'Blocked', text: "" },
        { key: 'Warning', text: "" },
        { key: 'FavoriteStar', text: "" },
        { key: 'Up', text: "" },
        { key: 'Down', text: "" },
        { key: 'Pinned', text: "" },
        { key: 'View', text: "" },
        { key: 'Blocked12', text: "" },
        { key: 'Edit', text: "" },
        { key: 'RepeatAll', text: "" },
        { key: 'Delete', text: "" },
        { key: 'Lock', text: "" },
        { key: 'Mail', text: "" },
        { key: 'EntitlementRedemption', text: "" },
        { key: 'Add', text: "" },
        { key: 'Zoom', text: "" },
        { key: 'Send', text: "" },
        { key: 'MailReply', text: "" },
        { key: 'Copy', text: "" },
        { key: 'Important', text: "" },
        { key: 'World', text: "" },
        { key: 'DateTime', text: "" },
        { key: 'ReturnToSession', text: "" },
        { key: 'BarChartVerticalFill', text: "" },
        { key: 'WorkItem', text: "" },
        { key: 'WorkItemBug', text: "" },
        { key: 'LogRemove', text: "" },
        { key: 'UserFollowed', text: "" },
        { key: 'CubeShape', text: "" },
        { key: 'CRMServices', text: "" },
        { key: 'EditContact', text: "" },
        { key: 'DocumentSearch', text: "" },
        { key: 'FolderSearch', text: "" },
        { key: 'InboxCheck', text: "" },
        { key: 'Script', text: "" },
        { key: 'Archive', text: "" },
        { key: 'PublishContent', text: "" },
        { key: 'SingleBookmark', text: "" },
        { key: 'Cat', text: "" },
        { key: 'WebComponents', text: "" },
        { key: 'Feedback', text: "" },
        { key: 'VoicemailReply', text: "" },
        { key: 'VoicemailForward', text: "" },
        { key: 'MailAlert', text: "" },
        { key: 'MailCheck', text: "" },
        { key: 'MailLowImportance', text: "" },
        { key: 'CloudUpload', text: "" },
        { key: 'Shapes', text: "" },
        { key: 'LineChart', text: "" },
        { key: 'Headset', text: "" },
        { key: 'AlarmClock', text: "" },
        { key: 'Tag', text: "" },
    ]
    /**
     * Captures all updates on a node
     * 
     * @callback
     * @param {ReactFlow.Node<INodeData, NodeTypeEnum>[]} updatedNodeState - The updated state of nodes.
     * @param {ReactFlow.NodeChange[]} changes -  The changes made to nodes
     */
    const onNodeChange = (updatedNodeState: ReactFlow.Node<INodeData, NodeTypeEnum>[], changes?: ReactFlow.NodeChange[]) => {
        console.log("On node change")
        console.log(updatedNodeState);
        console.log(changes)
        const item = changes?.find((change: ReactFlow.NodeChange) => change["id"] == activeStatus?.id);
        console.log(item);
        switch (item?.type) {
            case "remove":
                setNodes([...updatedNodeState, activeStatus]);
                return;
                break;
            case "select":
                if (!!!item.selected && activeStatus) return;
                break;

            default:
                break;
        }

        setNodes(updatedNodeState);


        if (action == "edit" && activeStatus) {
            let node = updatedNodeState.find((item: ReactFlow.Node<INodeData, NodeTypeEnum>) => item.id == activeStatus.id);
            node = {
                ...activeStatus,
                data: {
                    ...activeStatus.data,
                    label: node.data.label
                }
            }
            console.log("node item", node);
            setActiveStatus(node);
            setStatusName(node.data.label);
        }

    }

    /**
     * Captures all updates on a node
     * 
     * @callback
     * @param {ReactFlow.Edge<IEdgeData>[]} updatedEdgeState - The updated state of edges.
     * @param {ReactFlow.EdgeChange[]} changes - The changes made to edges.
     */
    const onEdgeChange = (updatedEdgeState: ReactFlow.Edge<IEdgeData>[], changes?: ReactFlow.EdgeChange[]) => {
        console.log("On edge change")
        console.log(updatedEdgeState);
        console.log(changes);
        const item = changes?.find((change: ReactFlow.EdgeChange) => change["id"] == activeTransition?.id);
        console.log(item);
        switch (item?.type) {
            case "remove":
                // const deletedEdges = edges.filter((item) => changes.map((c: any) => c.id).includes(item.id));
                // // setDeletedEdges(deletedEdges);
                // setEdges([...updatedEdgeState, ...deletedEdges]);
                setEdges(updatedEdgeState);
                return;
                break;
            case "select":
                if (!!!item.selected && activeTransition) return;
                break;
            default:
                break;
        }
        setEdges(updatedEdgeState);
        if (action == "edit" && activeTransition) {
            let edge = updatedEdgeState.find((item: ReactFlow.Edge<IEdgeData>) => item.id == activeTransition.id);
            edge = {
                ...activeTransition,
                label: edge.label
            }
            console.log("edge item", edge);
            setActiveTransition(edge);
            setTransitionName(String(edge.label));
        }
    }

    /**
     * Callback for when added new node
     * 
     * @callback
     * @param {ReactFlow.Node<INodeData, NodeTypeEnum>} newNode - New node to be added
     */
    const addClick = (newNode: ReactFlow.Node<INodeData, NodeTypeEnum>) => {
        console.log(newNode);
        clearState();
        setActiveStatus(newNode);
        setStatusName(newNode.data.label);
        setRecordResolutionSLA(false);
        setColor("#bf4040")
        setAction("create");
    }

    /**
     * Callback when click node
     * 
     * @callback
     * @param {ReactFlow.Node<INodeData, NodeTypeEnum>} node - clicked node 
     */
    const onNodeClick = (node: ReactFlow.Node<INodeData, NodeTypeEnum>) => {
        console.log("onNodeClick", node);
        clearState();
        setEdges(edges.map(({ selected, style, ...item }) => item));
        setActiveStatus(node);
        setStatusName(node.data.label);
        setRecordResolutionSLA(node.data.recordResolutionSLA);
        setColor(node.data.color);
        setEditDetected(false);
        setAction("edit");
    }

    /**
     * Cleans the currently active node or edge
     * 
     * @function
     */
    const clearState = () => {
        setActiveStatus(undefined);
        setStatusName("");
        setRecordResolutionSLA(false);
        setColor("");

        setActiveTransition(undefined);
        setTransitionName("");
        setRecordComment(false);
        setAuthorizedUsers([]);

        setEditDetected(false);
        setSelectedIcon("");
    }
    /**
     * When adding new status after fill forms
     * 
     * @function
     */
    const addStatus = () => {
        const newStatus: ReactFlow.Node<INodeData, NodeTypeEnum> = {
            ...activeStatus,
            data: {
                ...activeStatus.data,
                label: statusName,
                recordResolutionSLA: recordResolutionSLA,
                color: color
            },
        }
        setNodes([...nodes, newStatus]);
        clearState();
    }
    /**
     * When editing status
     * 
     * @function
     */
    const editStatus = () => {
        const updateStatus: ReactFlow.Node<INodeData, NodeTypeEnum> = {
            ...activeStatus,
            data: {
                ...activeStatus.data,
                label: statusName,
                recordResolutionSLA: recordResolutionSLA,
                color: color
            }
        }
        setNodes(nodes.map((item) => item.id == updateStatus.id ? updateStatus : item));
        clearState();
    }

    /**
     * Callback for when added new edge
     * 
     * @callback
     * @param {ReactFlow.Edge<IEdgeData>} newEdge - New edge to be added 
     */
    const onConnect = (newEdge: ReactFlow.Edge<IEdgeData>) => {
        console.log("On connect");
        newEdge.markerEnd["width"] = 25;
        newEdge.markerEnd["height"] = 25;

        console.log(newEdge);
        clearState();
        setActiveTransition(newEdge);
        setTransitionName(String(newEdge.label));
        setRecordComment(newEdge.data?.recordComment ? newEdge.data.recordComment : false);
        setAuthorizedUsers(newEdge.data?.authorizedUsers ? newEdge.data.authorizedUsers : []);
        setEdges([...edges, { ...newEdge, data: { ...newEdge.data, recordComment: false, authorizedUsers: [] } }]);
        setAction("create");
    }
    /**
     * Callback when click edge
     * 
     * @param {ReactFlow.Edge<IEdgeData>} edge - clicked edge
     */
    const onEdgeClick = (edge: ReactFlow.Edge<IEdgeData>) => {
        console.log("onEdgeClick", edges)
        setEdges(edges.map(({ selected, style, ...item }) => item.id == edge.id ? { ...item, selected: true } : item));
        console.log(edge);
        /**
         * When I have changed the label of edge directly sometimes the data not completed
         */
        setNodes(nodes.map(({ selected, ...item }) => item));
        clearState();
        setActiveTransition(edge);
        setTransitionName(String(edge.label));
        setRecordComment(edge.data.recordComment);
        setSelectedIcon(edge.data.iconName);
        setAuthorizedUsers(edge.data.authorizedUsers ?? []);
        setEditDetected(false);
        const color = nodes.find((item) => item.id == edge.source)?.data.color;
        setStatusColor(color);
        setAction("edit");
    }
    const onEdgeDoubleClick = (edge: ReactFlow.Edge<IEdgeData>) => {
        console.log("double click", edge);
    }
    const saveTransition = () => {
        const updateTransition: ReactFlow.Edge<IEdgeData> = {
            ...activeTransition,
            data: {
                ...activeTransition.data,
                recordComment: recordComment,
                authorizedUsers: authorizedUsers
            },
            label: transitionName
        }

        setEdges(edges.map((item) => item.id == updateTransition.id ? updateTransition : item));
        clearState();
    }
    const cancelTransition = () => {
        if (action == "create") setEdges(edges.filter((item) => item.id !== activeTransition.id));
        else if (action == "edit") setEdges(edges.map(({ selected, style, ...item }) => item));
        clearState();
    }
    const cancelStatus = () => {
        if (action == "edit") setNodes(nodes.map(({ selected, style, ...item }) => item));
        clearState();
    }
    const saveWorkflow = () => {
        setIsDisabledSave(true);
        const results: IWorkflowStep[] = nodes.map((node: ReactFlow.Node<INodeData, NodeTypeEnum>) => {
            const nextSteps: INextStep[] = [];
            const steps = edges.filter((edge: ReactFlow.Edge<IEdgeData>) => edge.source == node.id);
            steps.forEach((step: ReactFlow.Edge<IEdgeData>) => {
                console.log("node : ", node.data, "step: ", step);
                nextSteps.push({
                    targetId: step.target,
                    transitionLabel: step.label,
                    transitionIcon: step.data.iconName,
                    authorizedUsers: step.data.authorizedUsers,
                    recordComment: step.data.recordComment,
                    recordResolutionSLA: nodes.find((item) => item.id == step.target).data.recordResolutionSLA
                })
            });
            return {
                id: node.id,
                label: node.data.label,
                color: node.data.color,
                recordResolutionSLA: node.data.recordResolutionSLA,
                nextSteps: nextSteps
            }
        })
        setIsDisabledSave(false);
        console.log(results);

        console.log("For instance");
        console.log(`Node: `, nodes);
        console.log(`Edge: `, edges)
        console.log("For ticket", results);
        console.log(results.map((item) => item.recordResolutionSLA ? item.id : undefined).filter((item) => item !== undefined))
    }

    const handleChangeStatusName = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
        setEditDetected(true);
        setStatusName(newValue ? newValue : "");
    }
    const handleChangeResolutionSla = (ev: React.MouseEvent<HTMLElement>, checked?: boolean) => {
        setEditDetected(true);
        setRecordResolutionSLA(checked);
    }
    const handleChangeColor = (color: ColorResult) => {
        setEditDetected(true);
        setColor(color.hex);
    }

    const handleChangeTransitionName = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
        setEditDetected(true);
        setTransitionName(newValue ? newValue : "");
    }
    const handleChangeRecordComment = (ev: React.MouseEvent<HTMLElement>, checked?: boolean) => {
        setEditDetected(true);
        setRecordComment(checked);
    }
    const handleChangeAuthorized = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number): void => {
        setEditDetected(true);
        const key: any = option.key;
        setAuthorizedUsers(authorizedUsers.includes(key) ? authorizedUsers.filter((item) => item !== key) : [...authorizedUsers, key]);
    }
    const download = () => handleDownloadFlowData(nodes, edges);
    async function upload() {
        try {
            const result: { nodes: ReactFlow.Node<any, any>[], edges: ReactFlow.Edge[] } = await handleUploadAndParseFlow();
            console.log("Test");
            console.log(result);
            setNodes(result.nodes);
            setEdges(result.edges);
        } catch (error) {
            console.log(error);
        }
    }

    const labels: IFlowEditorProps<any, any>["labels"] = {
        addNode: "Add Status",
        node: "Status",
        edge: "Transition"
    }

    const defaultStatusIcons = {
        "In Progress": "Forward",
        "Resolved": "CheckMark",
        "Closed": "Archive",
        "Reopen": "Reply"
    }
    function getTicketWorkflow(instance: any) {
        const nodes = instance.workflows.ticket[0].nodes;
        const edges = instance.workflows.ticket[0].edges;
        const results: IWorkflowStep[] = nodes.map((node: ReactFlow.Node<INodeData, NodeTypeEnum>) => {
            const nextSteps: INextStep[] = [];
            const steps = edges.filter((edge: ReactFlow.Edge<IEdgeData>) => edge.source == node.id);
            steps.forEach((step: ReactFlow.Edge<IEdgeData>) => {
                nextSteps.push({
                    targetId: step.target,
                    transitionLabel: step.label,
                    transitionIcon: step.data.iconName,
                    authorizedUsers: step.data.authorizedUsers,
                    recordComment: step.data.recordComment,
                    recordResolutionSLA: nodes.find((item) => item.id == step.target).data.recordResolutionSLA
                })
            });
            return {
                id: node.id,
                label: node.data.label,
                color: node.data.color,
                recordResolutionSLA: node.data.recordResolutionSLA,
                nextSteps: nextSteps
            }
        })

        return results;
    }

    function getStatusAssignee(resources) {
        /**
            * Sorting prioritizes existing ones assignee name
            */
        resources.sort((a: any, b: any) => (!!!a.assigneeName && b.assigneeName) ? 1 : (a.assigneeName && !!!b.assigneeName) ? -1 : 0);

        let inProgressTotal = 0;
        let resolvedTotal = 0;
        let closedTotal = 0;
        let openTotal = 0;

        const items = resources.map((item) => {
            inProgressTotal += item.inProgress;
            resolvedTotal += item.resolved;
            closedTotal += item.closed;
            openTotal += item.open;
            return ({
                ...item,
                assigneeName: item.assigneeName ? item.assigneeName : "Blank",
                total: (item.open + item.inProgress + item.resolved + item.closed)
            })
        })
        const rowTotal = {
            assigneeName: "Total",
            inProgress: inProgressTotal,
            open: openTotal,
            resolved: resolvedTotal,
            closed: closedTotal,
            total: (inProgressTotal + openTotal + resolvedTotal + closedTotal)
        };
        const results = [...items, rowTotal];
        return results;
    }

    function loadData() {
        const defaultStatus: string[] = ["Open", "In Progress", "Resolved", "Closed", "Reopened"];

        // Normal Case
        // Case 1
        // const activeTickets = [
        //     {
        //         "id": "422ca3cc-50a2-4a61-a340-681e37924d70",
        //         "ticketId": 3,
        //         "title": "Pending Ticket",
        //         "status": "d5745ec7-e5da-485a-978a-0858838381a4",
        //         "requestorId": "54461b25-26b5-4365-9eb7-8a6b855ea847",
        //         "requestorName": "MOD Administrator",
        //         "requestorEmail": "admin@M365B026215.onmicrosoft.com",
        //         "customFields": {},
        //         "priority": "",
        //         "department": "",
        //         "assigneeId": "be1eddf0-1df2-42d6-ae37-0d6cb2f6fd86",
        //         "category": "",
        //         "instanceId": "ffea4dfd-78de-46ad-ba31-c800833b8bf0",
        //         "expectedDate": "",
        //         "assigneeName": "Alex Wilber",
        //         "assigneeEmail": "AlexW@M365B026215.OnMicrosoft.com",
        //         "createdDateTime": "2023-10-04T06:22:51.700Z",
        //         "tags": [],
        //         "lastInteraction": "2023-10-04T06:22:51.700Z",
        //         "firstTimeResponse": "",
        //         "timeResolution": "",
        //         "isFrtBreached": false,
        //         "isRtBreached": false,
        //         "isFrtEscalated": false,
        //         "isRtEscalated": false,
        //         "createdBy": {
        //             "id": "54461b25-26b5-4365-9eb7-8a6b855ea847",
        //             "text": "MOD Administrator",
        //             "secondaryText": "admin@M365B026215.onmicrosoft.com"
        //         },
        //         "lastUpdatedBy": {
        //             "id": "54461b25-26b5-4365-9eb7-8a6b855ea847",
        //             "text": "MOD Administrator",
        //             "secondaryText": "admin@M365B026215.onmicrosoft.com"
        //         },
        //         "workflow": [
        //             {
        //                 "id": "Open",
        //                 "label": "Open",
        //                 "color": "#fff",
        //                 "recordResolutionSLA": false,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "In Progress",
        //                         "transitionLabel": "Start",
        //                         "transitionIcon": "Forward",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": false,
        //                         "recordResolutionSLA": false
        //                     },
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Resolved",
        //                         "transitionLabel": "Resolve",
        //                         "transitionIcon": "CheckMark",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "d5745ec7-e5da-485a-978a-0858838381a4",
        //                         "transitionLabel": "Pending",
        //                         "transitionIcon": "",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": false,
        //                         "recordResolutionSLA": false
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "In Progress",
        //                 "label": "In Progress",
        //                 "color": "#1cd9d6",
        //                 "recordResolutionSLA": false,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Resolved",
        //                         "transitionLabel": "Resolve",
        //                         "transitionIcon": "CheckMark",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "Resolved",
        //                 "label": "Resolved",
        //                 "color": "#34eb71",
        //                 "recordResolutionSLA": true,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Reopened",
        //                         "transitionLabel": "Reopen",
        //                         "transitionIcon": "Reply",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": false
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "Closed",
        //                 "label": "Closed",
        //                 "color": "#28b05f",
        //                 "recordResolutionSLA": true,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Reopened",
        //                         "transitionLabel": "Reopen",
        //                         "transitionIcon": "Reply",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": false
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "Reopened",
        //                 "label": "Reopened",
        //                 "color": "#ff970f",
        //                 "recordResolutionSLA": false,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Resolved",
        //                         "transitionLabel": "Resolve",
        //                         "transitionIcon": "CheckMark",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "d5745ec7-e5da-485a-978a-0858838381a4",
        //                 "label": "Pending",
        //                 "color": "#ad40bf",
        //                 "recordResolutionSLA": false,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Closed",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     }
        //                 ]
        //             }
        //         ]
        //     },
        //     {
        //         "id": "422ca3cc-50a2-4a61-a340-681e37924d70",
        //         "ticketId": 3,
        //         "title": "Pending Ticket",
        //         "status": "d5745ec7-e5da-485a-978a-0858838381a4",
        //         "requestorId": "54461b25-26b5-4365-9eb7-8a6b855ea847",
        //         "requestorName": "MOD Administrator",
        //         "requestorEmail": "admin@M365B026215.onmicrosoft.com",
        //         "customFields": {},
        //         "priority": "",
        //         "department": "",
        //         "assigneeId": "be1eddf0-1df2-42d6-ae37-0d6cb2f6fd86",
        //         "category": "",
        //         "instanceId": "ffea4dfd-78de-46ad-ba31-c800833b8bf0",
        //         "expectedDate": "",
        //         "assigneeName": "Alex Wilber",
        //         "assigneeEmail": "AlexW@M365B026215.OnMicrosoft.com",
        //         "createdDateTime": "2023-10-04T06:22:51.700Z",
        //         "tags": [],
        //         "lastInteraction": "2023-10-04T06:22:51.700Z",
        //         "firstTimeResponse": "",
        //         "timeResolution": "",
        //         "isFrtBreached": false,
        //         "isRtBreached": false,
        //         "isFrtEscalated": false,
        //         "isRtEscalated": false,
        //         "createdBy": {
        //             "id": "54461b25-26b5-4365-9eb7-8a6b855ea847",
        //             "text": "MOD Administrator",
        //             "secondaryText": "admin@M365B026215.onmicrosoft.com"
        //         },
        //         "lastUpdatedBy": {
        //             "id": "54461b25-26b5-4365-9eb7-8a6b855ea847",
        //             "text": "MOD Administrator",
        //             "secondaryText": "admin@M365B026215.onmicrosoft.com"
        //         },
        //         "workflow": [
        //             {
        //                 "id": "Open",
        //                 "label": "Open",
        //                 "color": "#fff",
        //                 "recordResolutionSLA": false,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "In Progress",
        //                         "transitionLabel": "Start",
        //                         "transitionIcon": "Forward",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": false,
        //                         "recordResolutionSLA": false
        //                     },
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Resolved",
        //                         "transitionLabel": "Resolve",
        //                         "transitionIcon": "CheckMark",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "d5745ec7-e5da-485a-978a-0858838381a4",
        //                         "transitionLabel": "Pending",
        //                         "transitionIcon": "",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": false,
        //                         "recordResolutionSLA": false
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "In Progress",
        //                 "label": "In Progress",
        //                 "color": "#1cd9d6",
        //                 "recordResolutionSLA": false,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Resolved",
        //                         "transitionLabel": "Resolve",
        //                         "transitionIcon": "CheckMark",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "Resolved",
        //                 "label": "Resolved",
        //                 "color": "#34eb71",
        //                 "recordResolutionSLA": true,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Reopened",
        //                         "transitionLabel": "Reopen",
        //                         "transitionIcon": "Reply",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": false
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "Closed",
        //                 "label": "Closed",
        //                 "color": "#28b05f",
        //                 "recordResolutionSLA": true,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Reopened",
        //                         "transitionLabel": "Reopen",
        //                         "transitionIcon": "Reply",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": false
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "Reopened",
        //                 "label": "Reopened",
        //                 "color": "#ff970f",
        //                 "recordResolutionSLA": false,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Resolved",
        //                         "transitionLabel": "Resolve",
        //                         "transitionIcon": "CheckMark",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "d5745ec7-e5da-485a-978a-0858838381a4",
        //                 "label": "Pending",
        //                 "color": "#ad40bf",
        //                 "recordResolutionSLA": false,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Closed",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     }
        //                 ]
        //             }
        //         ]
        //     },
        //     {
        //         "id": "422ca3cc-50a2-4a61-a340-681e37924d70",
        //         "ticketId": 3,
        //         "title": "Pending Ticket",
        //         "status": "d5745ec7-e5da-485a-978a-0858838381a4",
        //         "requestorId": "54461b25-26b5-4365-9eb7-8a6b855ea847",
        //         "requestorName": "MOD Administrator",
        //         "requestorEmail": "admin@M365B026215.onmicrosoft.com",
        //         "customFields": {},
        //         "priority": "",
        //         "department": "",
        //         "assigneeId": "be1eddf0-1df2-42d6-ae37-0d6cb2f6fd86",
        //         "category": "",
        //         "instanceId": "ffea4dfd-78de-46ad-ba31-c800833b8bf0",
        //         "expectedDate": "",
        //         "assigneeName": "Haekal",
        //         "assigneeEmail": "Haekal",
        //         "createdDateTime": "2023-10-04T06:22:51.700Z",
        //         "tags": [],
        //         "lastInteraction": "2023-10-04T06:22:51.700Z",
        //         "firstTimeResponse": "",
        //         "timeResolution": "",
        //         "isFrtBreached": false,
        //         "isRtBreached": false,
        //         "isFrtEscalated": false,
        //         "isRtEscalated": false,
        //         "createdBy": {
        //             "id": "54461b25-26b5-4365-9eb7-8a6b855ea847",
        //             "text": "MOD Administrator",
        //             "secondaryText": "admin@M365B026215.onmicrosoft.com"
        //         },
        //         "lastUpdatedBy": {
        //             "id": "54461b25-26b5-4365-9eb7-8a6b855ea847",
        //             "text": "MOD Administrator",
        //             "secondaryText": "admin@M365B026215.onmicrosoft.com"
        //         },
        //         "workflow": [
        //             {
        //                 "id": "Open",
        //                 "label": "Open",
        //                 "color": "#fff",
        //                 "recordResolutionSLA": false,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "In Progress",
        //                         "transitionLabel": "Start",
        //                         "transitionIcon": "Forward",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": false,
        //                         "recordResolutionSLA": false
        //                     },
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Resolved",
        //                         "transitionLabel": "Resolve",
        //                         "transitionIcon": "CheckMark",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "d5745ec7-e5da-485a-978a-0858838381a4",
        //                         "transitionLabel": "Pending",
        //                         "transitionIcon": "",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": false,
        //                         "recordResolutionSLA": false
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "In Progress",
        //                 "label": "In Progress",
        //                 "color": "#1cd9d6",
        //                 "recordResolutionSLA": false,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Resolved",
        //                         "transitionLabel": "Resolve",
        //                         "transitionIcon": "CheckMark",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "Resolved",
        //                 "label": "Resolved",
        //                 "color": "#34eb71",
        //                 "recordResolutionSLA": true,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Reopened",
        //                         "transitionLabel": "Reopen",
        //                         "transitionIcon": "Reply",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": false
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "Closed",
        //                 "label": "Closed",
        //                 "color": "#28b05f",
        //                 "recordResolutionSLA": true,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Reopened",
        //                         "transitionLabel": "Reopen",
        //                         "transitionIcon": "Reply",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": false
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "Reopened",
        //                 "label": "Reopened",
        //                 "color": "#ff970f",
        //                 "recordResolutionSLA": false,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Resolved",
        //                         "transitionLabel": "Resolve",
        //                         "transitionIcon": "CheckMark",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "d5745ec7-e5da-485a-978a-0858838381a4",
        //                 "label": "Pending",
        //                 "color": "#ad40bf",
        //                 "recordResolutionSLA": false,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Closed",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     }
        //                 ]
        //             }
        //         ]
        //     },
        //     {
        //         "id": "139afdb6-4270-4f78-9426-7420358fc496",
        //         "ticketId": 2,
        //         "title": "Ticket 2",
        //         "status": "Resolved",
        //         "requestorId": "54461b25-26b5-4365-9eb7-8a6b855ea847",
        //         "requestorName": "MOD Administrator",
        //         "requestorEmail": "admin@M365B026215.onmicrosoft.com",
        //         "customFields": {},
        //         "priority": "",
        //         "department": "",
        //         "assigneeId": "",
        //         "category": "",
        //         "instanceId": "ffea4dfd-78de-46ad-ba31-c800833b8bf0",
        //         "expectedDate": "",
        //         "assigneeName": "",
        //         "assigneeEmail": "",
        //         "resolution": "Fixed",
        //         "firstResolutionDate": "2023-09-01T09:14:53.295Z",
        //         "lastResolutionDate": "2023-09-01T10:05:55.729Z",
        //         "createdDateTime": "2023-09-01T08:04:09.012Z",
        //         "tags": [],
        //         "lastInteraction": "2023-10-04T04:53:58.355Z",
        //         "firstTimeResponse": "2023-09-01T09:14:53.295Z",
        //         "timeResolution": "2023-09-01T10:05:55.729Z",
        //         "isFrtBreached": false,
        //         "isRtBreached": false,
        //         "isFrtEscalated": false,
        //         "isRtEscalated": false,
        //         "createdBy": {
        //             "id": "54461b25-26b5-4365-9eb7-8a6b855ea847",
        //             "text": "MOD Administrator",
        //             "secondaryText": "admin@M365B026215.onmicrosoft.com"
        //         },
        //         "lastUpdatedBy": {
        //             "id": "54461b25-26b5-4365-9eb7-8a6b855ea847",
        //             "text": "MOD Administrator",
        //             "secondaryText": "admin@M365B026215.onmicrosoft.com"
        //         },
        //         "lastResolutionComment": "<p>Tes</p>",
        //         "workflow": [
        //             {
        //                 "id": "Open",
        //                 "label": "Open",
        //                 "color": "#fff",
        //                 "recordResolutionSLA": false,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "In Progress",
        //                         "transitionLabel": "Start",
        //                         "transitionIcon": "Forward",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": false,
        //                         "recordResolutionSLA": false
        //                     },
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Resolved",
        //                         "transitionLabel": "Resolve",
        //                         "transitionIcon": "CheckMark",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "In Progress",
        //                 "label": "In Progress",
        //                 "color": "#1cd9d6",
        //                 "recordResolutionSLA": false,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Resolved",
        //                         "transitionLabel": "Resolve",
        //                         "transitionIcon": "CheckMark",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "Resolved",
        //                 "label": "Resolved",
        //                 "color": "#34eb71",
        //                 "recordResolutionSLA": true,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Reopened",
        //                         "transitionLabel": "Reopen",
        //                         "transitionIcon": "Reply",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": false
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "Closed",
        //                 "label": "Closed",
        //                 "color": "#28b05f",
        //                 "recordResolutionSLA": true,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Reopened",
        //                         "transitionLabel": "Reopen",
        //                         "transitionIcon": "Reply",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": false
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "Reopened",
        //                 "label": "Reopened",
        //                 "color": "#ff970f",
        //                 "recordResolutionSLA": false,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Resolved",
        //                         "transitionLabel": "Resolve",
        //                         "transitionIcon": "CheckMark",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     }
        //                 ]
        //             }
        //         ]
        //     },
        //     {
        //         "id": "ea16fe56-e40b-4a92-b604-b78d40d7edcd",
        //         "ticketId": 1,
        //         "title": "Tes",
        //         "status": "Reopened",
        //         "requestorId": "54461b25-26b5-4365-9eb7-8a6b855ea847",
        //         "requestorName": "MOD Administrator",
        //         "requestorEmail": "admin@M365B026215.onmicrosoft.com",
        //         "customFields": {},
        //         "priority": "",
        //         "department": "",
        //         "assigneeId": "",
        //         "category": "",
        //         "instanceId": "ffea4dfd-78de-46ad-ba31-c800833b8bf0",
        //         "expectedDate": "",
        //         "assigneeName": "",
        //         "assigneeEmail": "",
        //         "resolution": "",
        //         "firstResolutionDate": "2023-09-01T10:06:30.595Z",
        //         "lastResolutionDate": "2023-09-01T10:06:30.595Z",
        //         "createdDateTime": "2023-09-01T06:46:18.154Z",
        //         "tags": [],
        //         "lastInteraction": "2023-09-01T10:22:40.155Z",
        //         "firstTimeResponse": "2023-09-01T10:06:30.595Z",
        //         "timeResolution": "",
        //         "isFrtBreached": false,
        //         "isRtBreached": false,
        //         "isFrtEscalated": false,
        //         "isRtEscalated": false,
        //         "createdBy": {
        //             "id": "54461b25-26b5-4365-9eb7-8a6b855ea847",
        //             "text": "MOD Administrator",
        //             "secondaryText": "admin@M365B026215.onmicrosoft.com"
        //         },
        //         "lastUpdatedBy": {
        //             "id": "54461b25-26b5-4365-9eb7-8a6b855ea847",
        //             "text": "MOD Administrator",
        //             "secondaryText": "admin@M365B026215.onmicrosoft.com"
        //         },
        //         "lastResolutionComment": "<p>Tes</p>"
        //     }
        // ]
        // const workflow = [
        //     {
        //         "id": "Open",
        //         "type": "startNode",
        //         "position": {
        //             "x": -205.2049180327868,
        //             "y": -57.13934426229507
        //         },
        //         "data": {
        //             "label": "Open",
        //             "recordResolutionSLA": false,
        //             "color": "#fff"
        //         },
        //         "targetPosition": "left",
        //         "sourcePosition": "right"
        //     },
        //     {
        //         "id": "In Progress",
        //         "type": "textFieldNode",
        //         "position": {
        //             "x": -24.368177503993962,
        //             "y": -213.619285456832
        //         },
        //         "data": {
        //             "label": "In Progress",
        //             "recordResolutionSLA": false,
        //             "color": "#1cd9d6"
        //         },
        //         "targetPosition": "left",
        //         "sourcePosition": "right"
        //     },
        //     {
        //         "id": "Resolved",
        //         "type": "textFieldNode",
        //         "position": {
        //             "x": 192.4423425992039,
        //             "y": 49.718743082182385
        //         },
        //         "data": {
        //             "label": "Resolved",
        //             "recordResolutionSLA": true,
        //             "color": "#34eb71"
        //         },
        //         "targetPosition": "left",
        //         "sourcePosition": "right"
        //     },
        //     {
        //         "id": "Closed",
        //         "type": "textFieldNode",
        //         "position": {
        //             "x": 773.1812215977077,
        //             "y": -62.75364748022107
        //         },
        //         "data": {
        //             "label": "Closed",
        //             "recordResolutionSLA": true,
        //             "color": "#28b05f"
        //         },
        //         "targetPosition": "left",
        //         "sourcePosition": "right"
        //     },
        //     {
        //         "id": "Reopened",
        //         "type": "textFieldNode",
        //         "position": {
        //             "x": 502.7629135476956,
        //             "y": -398.0035164745823
        //         },
        //         "data": {
        //             "label": "Reopened",
        //             "recordResolutionSLA": false,
        //             "color": "#ff970f"
        //         },
        //         "targetPosition": "left",
        //         "sourcePosition": "right"
        //     },
        //     {
        //         "id": "d5745ec7-e5da-485a-978a-0858838381a4",
        //         "type": "textFieldNode",
        //         "position": {
        //             "x": 123.22508369012786,
        //             "y": -363.87177336372764
        //         },
        //         "data": {
        //             "label": "Pending",
        //             "recordResolutionSLA": false,
        //             "color": "#ad40bf"
        //         },
        //         "targetPosition": "left",
        //         "sourcePosition": "right",
        //         "selected": false,
        //         "positionAbsolute": {
        //             "x": 123.22508369012786,
        //             "y": -363.87177336372764
        //         },
        //         "dragging": false
        //     }
        // ]
        // const statusAssignee = {
        //     value: [
        //         {
        //             "assigneeName": "Alex Wilber",
        //             "inProgress": 0,
        //             "open": 1,
        //             "resolved": 0,
        //             "closed": 0,
        //             "total": 1
        //         },
        //         {
        //             "assigneeName": "Haekal",
        //             "inProgress": 1,
        //             "open": 0,
        //             "resolved": 0,
        //             "closed": 0,
        //             "total": 1
        //         },
        //         {
        //             "assigneeName": "Blank",
        //             "inProgress": 0,
        //             "open": 1,
        //             "resolved": 1,
        //             "closed": 0,
        //             "total": 2
        //         },
        //         {
        //             "assigneeName": "Total",
        //             "inProgress": 0,
        //             "open": 2,
        //             "resolved": 1,
        //             "closed": 0,
        //             "total": 3
        //         }
        //     ]
        // }

        // Complex Case
        // Case 2
        // const activeTickets = [
        //     {
        //         "id": "422ca3cc-50a2-4a61-a340-681e37924d70",
        //         "ticketId": 3,
        //         "title": "Pending Ticket",
        //         "status": "d5745ec7-e5da-485a-978a-0858838381a4",
        //         "requestorId": "54461b25-26b5-4365-9eb7-8a6b855ea847",
        //         "requestorName": "MOD Administrator",
        //         "requestorEmail": "admin@M365B026215.onmicrosoft.com",
        //         "customFields": {},
        //         "priority": "",
        //         "department": "",
        //         "assigneeId": "be1eddf0-1df2-42d6-ae37-0d6cb2f6fd86",
        //         "category": "",
        //         "instanceId": "ffea4dfd-78de-46ad-ba31-c800833b8bf0",
        //         "expectedDate": "",
        //         "assigneeName": "Alex Wilber",
        //         "assigneeEmail": "AlexW@M365B026215.OnMicrosoft.com",
        //         "createdDateTime": "2023-10-04T06:22:51.700Z",
        //         "tags": [],
        //         "lastInteraction": "2023-10-04T06:22:51.700Z",
        //         "firstTimeResponse": "",
        //         "timeResolution": "",
        //         "isFrtBreached": false,
        //         "isRtBreached": false,
        //         "isFrtEscalated": false,
        //         "isRtEscalated": false,
        //         "createdBy": {
        //             "id": "54461b25-26b5-4365-9eb7-8a6b855ea847",
        //             "text": "MOD Administrator",
        //             "secondaryText": "admin@M365B026215.onmicrosoft.com"
        //         },
        //         "lastUpdatedBy": {
        //             "id": "54461b25-26b5-4365-9eb7-8a6b855ea847",
        //             "text": "MOD Administrator",
        //             "secondaryText": "admin@M365B026215.onmicrosoft.com"
        //         },
        //         "workflow": [
        //             {
        //                 "id": "Open",
        //                 "label": "Open",
        //                 "color": "#fff",
        //                 "recordResolutionSLA": false,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "In Progress",
        //                         "transitionLabel": "Start",
        //                         "transitionIcon": "Forward",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": false,
        //                         "recordResolutionSLA": false
        //                     },
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Resolved",
        //                         "transitionLabel": "Resolve",
        //                         "transitionIcon": "CheckMark",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "d5745ec7-e5da-485a-978a-0858838381a4",
        //                         "transitionLabel": "Pending",
        //                         "transitionIcon": "",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": false,
        //                         "recordResolutionSLA": false
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "In Progress",
        //                 "label": "In Progress",
        //                 "color": "#1cd9d6",
        //                 "recordResolutionSLA": false,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Resolved",
        //                         "transitionLabel": "Resolve",
        //                         "transitionIcon": "CheckMark",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "Resolved",
        //                 "label": "Resolved",
        //                 "color": "#34eb71",
        //                 "recordResolutionSLA": true,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Reopened",
        //                         "transitionLabel": "Reopen",
        //                         "transitionIcon": "Reply",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": false
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "Closed",
        //                 "label": "Closed",
        //                 "color": "#28b05f",
        //                 "recordResolutionSLA": true,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Reopened",
        //                         "transitionLabel": "Reopen",
        //                         "transitionIcon": "Reply",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": false
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "Reopened",
        //                 "label": "Reopened",
        //                 "color": "#ff970f",
        //                 "recordResolutionSLA": false,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Resolved",
        //                         "transitionLabel": "Resolve",
        //                         "transitionIcon": "CheckMark",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "d5745ec7-e5da-485a-978a-0858838381a4",
        //                 "label": "Pending",
        //                 "color": "#ad40bf",
        //                 "recordResolutionSLA": false,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Closed",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     }
        //                 ]
        //             }
        //         ]
        //     },
        //     {
        //         "id": "422ca3cc-50a2-4a61-a340-681e37924d70",
        //         "ticketId": 3,
        //         "title": "Pending Ticket",
        //         "status": "d5745ec7-e5da-485a-978a-0858838381a4",
        //         "requestorId": "54461b25-26b5-4365-9eb7-8a6b855ea847",
        //         "requestorName": "MOD Administrator",
        //         "requestorEmail": "admin@M365B026215.onmicrosoft.com",
        //         "customFields": {},
        //         "priority": "",
        //         "department": "",
        //         "assigneeId": "be1eddf0-1df2-42d6-ae37-0d6cb2f6fd86",
        //         "category": "",
        //         "instanceId": "ffea4dfd-78de-46ad-ba31-c800833b8bf0",
        //         "expectedDate": "",
        //         "assigneeName": "Haekal",
        //         "assigneeEmail": "Haekal",
        //         "createdDateTime": "2023-10-04T06:22:51.700Z",
        //         "tags": [],
        //         "lastInteraction": "2023-10-04T06:22:51.700Z",
        //         "firstTimeResponse": "",
        //         "timeResolution": "",
        //         "isFrtBreached": false,
        //         "isRtBreached": false,
        //         "isFrtEscalated": false,
        //         "isRtEscalated": false,
        //         "createdBy": {
        //             "id": "54461b25-26b5-4365-9eb7-8a6b855ea847",
        //             "text": "MOD Administrator",
        //             "secondaryText": "admin@M365B026215.onmicrosoft.com"
        //         },
        //         "lastUpdatedBy": {
        //             "id": "54461b25-26b5-4365-9eb7-8a6b855ea847",
        //             "text": "MOD Administrator",
        //             "secondaryText": "admin@M365B026215.onmicrosoft.com"
        //         },
        //         "workflow": [
        //             {
        //                 "id": "Open",
        //                 "label": "Open",
        //                 "color": "#fff",
        //                 "recordResolutionSLA": false,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "In Progress",
        //                         "transitionLabel": "Start",
        //                         "transitionIcon": "Forward",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": false,
        //                         "recordResolutionSLA": false
        //                     },
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Resolved",
        //                         "transitionLabel": "Resolve",
        //                         "transitionIcon": "CheckMark",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "d5745ec7-e5da-485a-978a-0858838381a4",
        //                         "transitionLabel": "Pending",
        //                         "transitionIcon": "",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": false,
        //                         "recordResolutionSLA": false
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "In Progress",
        //                 "label": "In Progress",
        //                 "color": "#1cd9d6",
        //                 "recordResolutionSLA": false,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Resolved",
        //                         "transitionLabel": "Resolve",
        //                         "transitionIcon": "CheckMark",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "Resolved",
        //                 "label": "Resolved",
        //                 "color": "#34eb71",
        //                 "recordResolutionSLA": true,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Reopened",
        //                         "transitionLabel": "Reopen",
        //                         "transitionIcon": "Reply",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": false
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "Closed",
        //                 "label": "Closed",
        //                 "color": "#28b05f",
        //                 "recordResolutionSLA": true,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Reopened",
        //                         "transitionLabel": "Reopen",
        //                         "transitionIcon": "Reply",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": false
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "Reopened",
        //                 "label": "Reopened",
        //                 "color": "#ff970f",
        //                 "recordResolutionSLA": false,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Resolved",
        //                         "transitionLabel": "Resolve",
        //                         "transitionIcon": "CheckMark",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "d5745ec7-e5da-485a-978a-0858838381a4",
        //                 "label": "Pending Bro",
        //                 "color": "#ad40bf",
        //                 "recordResolutionSLA": false,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Closed",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     }
        //                 ]
        //             }
        //         ]
        //     },
        //     {
        //         "id": "139afdb6-4270-4f78-9426-7420358fc496",
        //         "ticketId": 2,
        //         "title": "Ticket 2",
        //         "status": "d5745ec7-e5da-485a-978a-0858838381a4",
        //         "requestorId": "54461b25-26b5-4365-9eb7-8a6b855ea847",
        //         "requestorName": "MOD Administrator",
        //         "requestorEmail": "admin@M365B026215.onmicrosoft.com",
        //         "customFields": {},
        //         "priority": "",
        //         "department": "",
        //         "assigneeId": "",
        //         "category": "",
        //         "instanceId": "ffea4dfd-78de-46ad-ba31-c800833b8bf0",
        //         "expectedDate": "",
        //         "assigneeName": "",
        //         "assigneeEmail": "",
        //         "resolution": "Fixed",
        //         "firstResolutionDate": "2023-09-01T09:14:53.295Z",
        //         "lastResolutionDate": "2023-09-01T10:05:55.729Z",
        //         "createdDateTime": "2023-09-01T08:04:09.012Z",
        //         "tags": [],
        //         "lastInteraction": "2023-10-04T04:53:58.355Z",
        //         "firstTimeResponse": "2023-09-01T09:14:53.295Z",
        //         "timeResolution": "2023-09-01T10:05:55.729Z",
        //         "isFrtBreached": false,
        //         "isRtBreached": false,
        //         "isFrtEscalated": false,
        //         "isRtEscalated": false,
        //         "createdBy": {
        //             "id": "54461b25-26b5-4365-9eb7-8a6b855ea847",
        //             "text": "MOD Administrator",
        //             "secondaryText": "admin@M365B026215.onmicrosoft.com"
        //         },
        //         "lastUpdatedBy": {
        //             "id": "54461b25-26b5-4365-9eb7-8a6b855ea847",
        //             "text": "MOD Administrator",
        //             "secondaryText": "admin@M365B026215.onmicrosoft.com"
        //         },
        //         "lastResolutionComment": "<p>Tes</p>",
        //         "workflow": [
        //             {
        //                 "id": "Open",
        //                 "label": "Open",
        //                 "color": "#fff",
        //                 "recordResolutionSLA": false,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "In Progress",
        //                         "transitionLabel": "Start",
        //                         "transitionIcon": "Forward",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": false,
        //                         "recordResolutionSLA": false
        //                     },
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Resolved",
        //                         "transitionLabel": "Resolve",
        //                         "transitionIcon": "CheckMark",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "In Progress",
        //                 "label": "In Progress",
        //                 "color": "#1cd9d6",
        //                 "recordResolutionSLA": false,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Resolved",
        //                         "transitionLabel": "Resolve",
        //                         "transitionIcon": "CheckMark",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "Resolved",
        //                 "label": "Resolved",
        //                 "color": "#34eb71",
        //                 "recordResolutionSLA": true,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Reopened",
        //                         "transitionLabel": "Reopen",
        //                         "transitionIcon": "Reply",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": false
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "Closed",
        //                 "label": "Closed",
        //                 "color": "#28b05f",
        //                 "recordResolutionSLA": true,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Reopened",
        //                         "transitionLabel": "Reopen",
        //                         "transitionIcon": "Reply",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": false
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "Reopened",
        //                 "label": "Reopened",
        //                 "color": "#ff970f",
        //                 "recordResolutionSLA": false,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Resolved",
        //                         "transitionLabel": "Resolve",
        //                         "transitionIcon": "CheckMark",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "d5745ec7-e5da-485a-978a-0858838381a4",
        //                 "label": "Pending Bro",
        //                 "color": "#ad40bf",
        //                 "recordResolutionSLA": false,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Closed",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     }
        //                 ]
        //             }
        //         ]
        //     },
        //     {
        //         "id": "139afdb6-4270-4f78-9426-7420358fc496",
        //         "ticketId": 2,
        //         "title": "Ticket 2",
        //         "status": "d5745ec7-e5da-485a-978a-0858838381a5",
        //         "requestorId": "54461b25-26b5-4365-9eb7-8a6b855ea847",
        //         "requestorName": "MOD Administrator",
        //         "requestorEmail": "admin@M365B026215.onmicrosoft.com",
        //         "customFields": {},
        //         "priority": "",
        //         "department": "",
        //         "assigneeId": "",
        //         "category": "",
        //         "instanceId": "ffea4dfd-78de-46ad-ba31-c800833b8bf0",
        //         "expectedDate": "",
        //         "assigneeName": "",
        //         "assigneeEmail": "",
        //         "resolution": "Fixed",
        //         "firstResolutionDate": "2023-09-01T09:14:53.295Z",
        //         "lastResolutionDate": "2023-09-01T10:05:55.729Z",
        //         "createdDateTime": "2023-09-01T08:04:09.012Z",
        //         "tags": [],
        //         "lastInteraction": "2023-10-04T04:53:58.355Z",
        //         "firstTimeResponse": "2023-09-01T09:14:53.295Z",
        //         "timeResolution": "2023-09-01T10:05:55.729Z",
        //         "isFrtBreached": false,
        //         "isRtBreached": false,
        //         "isFrtEscalated": false,
        //         "isRtEscalated": false,
        //         "createdBy": {
        //             "id": "54461b25-26b5-4365-9eb7-8a6b855ea847",
        //             "text": "MOD Administrator",
        //             "secondaryText": "admin@M365B026215.onmicrosoft.com"
        //         },
        //         "lastUpdatedBy": {
        //             "id": "54461b25-26b5-4365-9eb7-8a6b855ea847",
        //             "text": "MOD Administrator",
        //             "secondaryText": "admin@M365B026215.onmicrosoft.com"
        //         },
        //         "lastResolutionComment": "<p>Tes</p>",
        //         "workflow": [
        //             {
        //                 "id": "Open",
        //                 "label": "Open",
        //                 "color": "#fff",
        //                 "recordResolutionSLA": false,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "In Progress",
        //                         "transitionLabel": "Start",
        //                         "transitionIcon": "Forward",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": false,
        //                         "recordResolutionSLA": false
        //                     },
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Resolved",
        //                         "transitionLabel": "Resolve",
        //                         "transitionIcon": "CheckMark",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "In Progress",
        //                 "label": "In Progress",
        //                 "color": "#1cd9d6",
        //                 "recordResolutionSLA": false,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Resolved",
        //                         "transitionLabel": "Resolve",
        //                         "transitionIcon": "CheckMark",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "Resolved",
        //                 "label": "Resolved",
        //                 "color": "#34eb71",
        //                 "recordResolutionSLA": true,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Reopened",
        //                         "transitionLabel": "Reopen",
        //                         "transitionIcon": "Reply",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": false
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "Closed",
        //                 "label": "Closed",
        //                 "color": "#28b05f",
        //                 "recordResolutionSLA": true,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Reopened",
        //                         "transitionLabel": "Reopen",
        //                         "transitionIcon": "Reply",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": false
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "Reopened",
        //                 "label": "Reopened",
        //                 "color": "#ff970f",
        //                 "recordResolutionSLA": false,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Resolved",
        //                         "transitionLabel": "Resolve",
        //                         "transitionIcon": "CheckMark",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "d5745ec7-e5da-485a-978a-0858838381a5",
        //                 "label": "Done",
        //                 "color": "#ad40bf",
        //                 "recordResolutionSLA": false,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Closed",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     }
        //                 ]
        //             }
        //         ]
        //     },
        //     {
        //         "id": "ea16fe56-e40b-4a92-b604-b78d40d7edcd",
        //         "ticketId": 1,
        //         "title": "Tes",
        //         "status": "Reopened",
        //         "requestorId": "54461b25-26b5-4365-9eb7-8a6b855ea847",
        //         "requestorName": "MOD Administrator",
        //         "requestorEmail": "admin@M365B026215.onmicrosoft.com",
        //         "customFields": {},
        //         "priority": "",
        //         "department": "",
        //         "assigneeId": "",
        //         "category": "",
        //         "instanceId": "ffea4dfd-78de-46ad-ba31-c800833b8bf0",
        //         "expectedDate": "",
        //         "assigneeName": "",
        //         "assigneeEmail": "",
        //         "resolution": "",
        //         "firstResolutionDate": "2023-09-01T10:06:30.595Z",
        //         "lastResolutionDate": "2023-09-01T10:06:30.595Z",
        //         "createdDateTime": "2023-09-01T06:46:18.154Z",
        //         "tags": [],
        //         "lastInteraction": "2023-09-01T10:22:40.155Z",
        //         "firstTimeResponse": "2023-09-01T10:06:30.595Z",
        //         "timeResolution": "",
        //         "isFrtBreached": false,
        //         "isRtBreached": false,
        //         "isFrtEscalated": false,
        //         "isRtEscalated": false,
        //         "createdBy": {
        //             "id": "54461b25-26b5-4365-9eb7-8a6b855ea847",
        //             "text": "MOD Administrator",
        //             "secondaryText": "admin@M365B026215.onmicrosoft.com"
        //         },
        //         "lastUpdatedBy": {
        //             "id": "54461b25-26b5-4365-9eb7-8a6b855ea847",
        //             "text": "MOD Administrator",
        //             "secondaryText": "admin@M365B026215.onmicrosoft.com"
        //         },
        //         "lastResolutionComment": "<p>Tes</p>"
        //     },
        // ]

        // const activeTickets = [
        //     {
        //         id: '422ca3cc-50a2-4a61-a340-681e37924d70',
        //         ticketId: 3,
        //         title: 'Pending Ticket',
        //         status: 'd5745ec7-e5da-485a-978a-0858838381a4',
        //         requestorId: '54461b25-26b5-4365-9eb7-8a6b855ea847',
        //         requestorName: 'MOD Administrator',
        //         requestorEmail: 'admin@M365B026215.onmicrosoft.com',
        //         customFields: {},
        //         priority: '',
        //         department: '',
        //         assigneeId: 'be1eddf0-1df2-42d6-ae37-0d6cb2f6fd86',
        //         category: '',
        //         instanceId: 'ffea4dfd-78de-46ad-ba31-c800833b8bf0',
        //         expectedDate: '',
        //         assigneeName: 'Alex Wilber',
        //         assigneeEmail: 'AlexW@M365B026215.OnMicrosoft.com',
        //         createdDateTime: '2023-10-04T06:22:51.700Z',
        //         tags: [],
        //         lastInteraction: '2023-10-04T06:22:51.700Z',
        //         firstTimeResponse: '',
        //         timeResolution: '',
        //         isFrtBreached: false,
        //         isRtBreached: false,
        //         isFrtEscalated: false,
        //         isRtEscalated: false,
        //         createdBy: {
        //             id: '54461b25-26b5-4365-9eb7-8a6b855ea847',
        //             text: 'MOD Administrator',
        //             secondaryText: 'admin@M365B026215.onmicrosoft.com'
        //         },
        //         lastUpdatedBy: {
        //             id: '54461b25-26b5-4365-9eb7-8a6b855ea847',
        //             text: 'MOD Administrator',
        //             secondaryText: 'admin@M365B026215.onmicrosoft.com'
        //         },
        //         workflow: [
        //             {
        //                 "id": "Open",
        //                 "label": "Open",
        //                 "color": "#fff",
        //                 "recordResolutionSLA": false,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "In Progress",
        //                         "transitionLabel": "Start",
        //                         "transitionIcon": "Forward",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": false,
        //                         "recordResolutionSLA": false
        //                     },
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Resolved",
        //                         "transitionLabel": "Resolve",
        //                         "transitionIcon": "CheckMark",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "d5745ec7-e5da-485a-978a-0858838381a4",
        //                         "transitionLabel": "Pending",
        //                         "transitionIcon": "",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": false,
        //                         "recordResolutionSLA": false
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "In Progress",
        //                 "label": "In Progress",
        //                 "color": "#1cd9d6",
        //                 "recordResolutionSLA": false,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Resolved",
        //                         "transitionLabel": "Resolve",
        //                         "transitionIcon": "CheckMark",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "Resolved",
        //                 "label": "Resolved",
        //                 "color": "#34eb71",
        //                 "recordResolutionSLA": true,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Reopened",
        //                         "transitionLabel": "Reopen",
        //                         "transitionIcon": "Reply",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": false
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "Closed",
        //                 "label": "Closed",
        //                 "color": "#28b05f",
        //                 "recordResolutionSLA": true,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Reopened",
        //                         "transitionLabel": "Reopen",
        //                         "transitionIcon": "Reply",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": false
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "Reopened",
        //                 "label": "Reopened",
        //                 "color": "#ff970f",
        //                 "recordResolutionSLA": false,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Resolved",
        //                         "transitionLabel": "Resolve",
        //                         "transitionIcon": "CheckMark",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "d5745ec7-e5da-485a-978a-0858838381a4",
        //                 "label": "Pending",
        //                 "color": "#ad40bf",
        //                 "recordResolutionSLA": false,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Closed",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     }
        //                 ]
        //             }
        //         ]
        //     },
        //     {
        //         id: '139afdb6-4270-4f78-9426-7420358fc496',
        //         ticketId: 2,
        //         title: 'Ticket 2',
        //         status: 'Resolved',
        //         requestorId: '54461b25-26b5-4365-9eb7-8a6b855ea847',
        //         requestorName: 'MOD Administrator',
        //         requestorEmail: 'admin@M365B026215.onmicrosoft.com',
        //         customFields: {},
        //         priority: '',
        //         department: '',
        //         assigneeId: '',
        //         category: '',
        //         instanceId: 'ffea4dfd-78de-46ad-ba31-c800833b8bf0',
        //         expectedDate: '',
        //         assigneeName: '',
        //         assigneeEmail: '',
        //         resolution: 'Fixed',
        //         firstResolutionDate: '2023-09-01T09:14:53.295Z',
        //         lastResolutionDate: '2023-09-01T10:05:55.729Z',
        //         createdDateTime: '2023-09-01T08:04:09.012Z',
        //         tags: [],
        //         lastInteraction: '2023-10-04T04:53:58.355Z',
        //         firstTimeResponse: '2023-09-01T09:14:53.295Z',
        //         timeResolution: '2023-09-01T10:05:55.729Z',
        //         isFrtBreached: false,
        //         isRtBreached: false,
        //         isFrtEscalated: false,
        //         isRtEscalated: false,
        //         createdBy: {
        //             id: '54461b25-26b5-4365-9eb7-8a6b855ea847',
        //             text: 'MOD Administrator',
        //             secondaryText: 'admin@M365B026215.onmicrosoft.com'
        //         },
        //         lastUpdatedBy: {
        //             id: '54461b25-26b5-4365-9eb7-8a6b855ea847',
        //             text: 'MOD Administrator',
        //             secondaryText: 'admin@M365B026215.onmicrosoft.com'
        //         },
        //         lastResolutionComment: '<p>Tes</p>',
        //         workflow: [
        //             {
        //                 "id": "Open",
        //                 "label": "Open",
        //                 "color": "#fff",
        //                 "recordResolutionSLA": false,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "In Progress",
        //                         "transitionLabel": "Start",
        //                         "transitionIcon": "Forward",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": false,
        //                         "recordResolutionSLA": false
        //                     },
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Resolved",
        //                         "transitionLabel": "Resolve",
        //                         "transitionIcon": "CheckMark",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "In Progress",
        //                 "label": "In Progress",
        //                 "color": "#1cd9d6",
        //                 "recordResolutionSLA": false,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Resolved",
        //                         "transitionLabel": "Resolve",
        //                         "transitionIcon": "CheckMark",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "Resolved",
        //                 "label": "Resolved",
        //                 "color": "#34eb71",
        //                 "recordResolutionSLA": true,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Reopened",
        //                         "transitionLabel": "Reopen",
        //                         "transitionIcon": "Reply",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": false
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "Closed",
        //                 "label": "Closed",
        //                 "color": "#28b05f",
        //                 "recordResolutionSLA": true,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Reopened",
        //                         "transitionLabel": "Reopen",
        //                         "transitionIcon": "Reply",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": false
        //                     }
        //                 ]
        //             },
        //             {
        //                 "id": "Reopened",
        //                 "label": "Reopened",
        //                 "color": "#ff970f",
        //                 "recordResolutionSLA": false,
        //                 "nextSteps": [
        //                     {
        //                         "targetId": "Closed",
        //                         "transitionLabel": "Close",
        //                         "transitionIcon": "Archive",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee",
        //                             "requestor"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     },
        //                     {
        //                         "targetId": "Resolved",
        //                         "transitionLabel": "Resolve",
        //                         "transitionIcon": "CheckMark",
        //                         "authorizedUsers": [
        //                             "owner",
        //                             "assignee"
        //                         ],
        //                         "recordComment": true,
        //                         "recordResolutionSLA": true
        //                     }
        //                 ]
        //             }
        //         ]
        //     },
        //     {
        //         id: 'ea16fe56-e40b-4a92-b604-b78d40d7edcd',
        //         ticketId: 1,
        //         title: 'Tes',
        //         status: 'Reopened',
        //         requestorId: '54461b25-26b5-4365-9eb7-8a6b855ea847',
        //         requestorName: 'MOD Administrator',
        //         requestorEmail: 'admin@M365B026215.onmicrosoft.com',
        //         customFields: {},
        //         priority: '',
        //         department: '',
        //         assigneeId: '',
        //         category: '',
        //         instanceId: 'ffea4dfd-78de-46ad-ba31-c800833b8bf0',
        //         expectedDate: '',
        //         assigneeName: '',
        //         assigneeEmail: '',
        //         resolution: '',
        //         firstResolutionDate: '2023-09-01T10:06:30.595Z',
        //         lastResolutionDate: '2023-09-01T10:06:30.595Z',
        //         createdDateTime: '2023-09-01T06:46:18.154Z',
        //         tags: [],
        //         lastInteraction: '2023-09-01T10:22:40.155Z',
        //         firstTimeResponse: '2023-09-01T10:06:30.595Z',
        //         timeResolution: '',
        //         isFrtBreached: false,
        //         isRtBreached: false,
        //         isFrtEscalated: false,
        //         isRtEscalated: false,
        //         createdBy: {
        //             id: '54461b25-26b5-4365-9eb7-8a6b855ea847',
        //             text: 'MOD Administrator',
        //             secondaryText: 'admin@M365B026215.onmicrosoft.com'
        //         },
        //         lastUpdatedBy: {
        //             id: '54461b25-26b5-4365-9eb7-8a6b855ea847',
        //             text: 'MOD Administrator',
        //             secondaryText: 'admin@M365B026215.onmicrosoft.com'
        //         },
        //         lastResolutionComment: '<p>Tes</p>'
        //     }
        // ]
        // const workflow = [
        //     {
        //         "id": "Open",
        //         "type": "startNode",
        //         "position": {
        //             "x": -205.2049180327868,
        //             "y": -57.13934426229507
        //         },
        //         "data": {
        //             "label": "Open",
        //             "recordResolutionSLA": false,
        //             "color": "#fff"
        //         },
        //         "targetPosition": "left",
        //         "sourcePosition": "right"
        //     },
        //     {
        //         "id": "In Progress",
        //         "type": "textFieldNode",
        //         "position": {
        //             "x": -24.368177503993962,
        //             "y": -213.619285456832
        //         },
        //         "data": {
        //             "label": "In Progress",
        //             "recordResolutionSLA": false,
        //             "color": "#1cd9d6"
        //         },
        //         "targetPosition": "left",
        //         "sourcePosition": "right"
        //     },
        //     {
        //         "id": "Resolved",
        //         "type": "textFieldNode",
        //         "position": {
        //             "x": 192.4423425992039,
        //             "y": 49.718743082182385
        //         },
        //         "data": {
        //             "label": "Resolved",
        //             "recordResolutionSLA": true,
        //             "color": "#34eb71"
        //         },
        //         "targetPosition": "left",
        //         "sourcePosition": "right"
        //     },
        //     {
        //         "id": "Closed",
        //         "type": "textFieldNode",
        //         "position": {
        //             "x": 773.1812215977077,
        //             "y": -62.75364748022107
        //         },
        //         "data": {
        //             "label": "Closed",
        //             "recordResolutionSLA": true,
        //             "color": "#28b05f"
        //         },
        //         "targetPosition": "left",
        //         "sourcePosition": "right"
        //     },
        //     {
        //         "id": "Reopened",
        //         "type": "textFieldNode",
        //         "position": {
        //             "x": 502.7629135476956,
        //             "y": -398.0035164745823
        //         },
        //         "data": {
        //             "label": "Reopened",
        //             "recordResolutionSLA": false,
        //             "color": "#ff970f"
        //         },
        //         "targetPosition": "left",
        //         "sourcePosition": "right"
        //     },
        //     {
        //         "id": "d5745ec7-e5da-485a-978a-0858838381a4",
        //         "type": "textFieldNode",
        //         "position": {
        //             "x": 123.22508369012786,
        //             "y": -363.87177336372764
        //         },
        //         "data": {
        //             "label": "Pending",
        //             "recordResolutionSLA": false,
        //             "color": "#ad40bf"
        //         },
        //         "targetPosition": "left",
        //         "sourcePosition": "right",
        //         "selected": false,
        //         "positionAbsolute": {
        //             "x": 123.22508369012786,
        //             "y": -363.87177336372764
        //         },
        //         "dragging": false
        //     }
        // ]
        // const statusAssignee = {
        //     value: [
        //         {
        //             "assigneeName": "Alex Wilber",
        //             "inProgress": 0,
        //             "open": 1,
        //             "resolved": 0,
        //             "closed": 0,
        //             "total": 1
        //         },
        //         {
        //             "assigneeName": "Haekal",
        //             "inProgress": 1,
        //             "open": 0,
        //             "resolved": 0,
        //             "closed": 0,
        //             "total": 1
        //         },
        //         {
        //             "assigneeName": "Blank",
        //             "inProgress": 0,
        //             "open": 1,
        //             "resolved": 1,
        //             "closed": 0,
        //             "total": 2
        //         },
        //         {
        //             "assigneeName": "Total",
        //             "inProgress": 0,
        //             "open": 2,
        //             "resolved": 1,
        //             "closed": 0,
        //             "total": 3
        //         }
        //     ]
        // }

        // const workflow = [
        //     {
        //         "id": "Open",
        //         "type": "startNode",
        //         "position": {
        //             "x": -205.2049180327868,
        //             "y": -57.13934426229507
        //         },
        //         "data": {
        //             "label": "Open",
        //             "recordResolutionSLA": false,
        //             "color": "#fff"
        //         },
        //         "targetPosition": "left",
        //         "sourcePosition": "right"
        //     },
        //     {
        //         "id": "In Progress",
        //         "type": "textFieldNode",
        //         "position": {
        //             "x": -24.368177503993962,
        //             "y": -213.619285456832
        //         },
        //         "data": {
        //             "label": "In Progress",
        //             "recordResolutionSLA": false,
        //             "color": "#1cd9d6"
        //         },
        //         "targetPosition": "left",
        //         "sourcePosition": "right"
        //     },
        //     {
        //         "id": "Resolved",
        //         "type": "textFieldNode",
        //         "position": {
        //             "x": 192.4423425992039,
        //             "y": 49.718743082182385
        //         },
        //         "data": {
        //             "label": "Resolved",
        //             "recordResolutionSLA": true,
        //             "color": "#34eb71"
        //         },
        //         "targetPosition": "left",
        //         "sourcePosition": "right"
        //     },
        //     {
        //         "id": "Closed",
        //         "type": "textFieldNode",
        //         "position": {
        //             "x": 773.1812215977077,
        //             "y": -62.75364748022107
        //         },
        //         "data": {
        //             "label": "Closed",
        //             "recordResolutionSLA": true,
        //             "color": "#28b05f"
        //         },
        //         "targetPosition": "left",
        //         "sourcePosition": "right"
        //     },
        //     {
        //         "id": "Reopened",
        //         "type": "textFieldNode",
        //         "position": {
        //             "x": 502.7629135476956,
        //             "y": -398.0035164745823
        //         },
        //         "data": {
        //             "label": "Reopened",
        //             "recordResolutionSLA": false,
        //             "color": "#ff970f"
        //         },
        //         "targetPosition": "left",
        //         "sourcePosition": "right"
        //     },
        //     {
        //         "id": "d5745ec7-e5da-485a-978a-0858838381a4",
        //         "type": "textFieldNode",
        //         "position": {
        //             "x": 123.22508369012786,
        //             "y": -363.87177336372764
        //         },
        //         "data": {
        //             "label": "Pending",
        //             "recordResolutionSLA": false,
        //             "color": "#ad40bf"
        //         },
        //         "targetPosition": "left",
        //         "sourcePosition": "right",
        //         "selected": false,
        //         "positionAbsolute": {
        //             "x": 123.22508369012786,
        //             "y": -363.87177336372764
        //         },
        //         "dragging": false
        //     }
        // ]
        // const statusAssignee = {
        //     value: [
        //         { assigneeName: '', inProgress: 0, open: 1, resolved: 1, closed: 0 },
        //         {
        //             assigneeName: 'Alex Wilber',
        //             inProgress: 0,
        //             open: 0,
        //             resolved: 0,
        //             closed: 0
        //         },
        //         {
        //             "assigneeName": "Total",
        //             "inProgress": 0,
        //             "open": 0,
        //             "resolved": 0,
        //             "closed": 0,
        //             "total": 1,
        //             "Reopened": 0,
        //             "Pending": 1
        //         }
        //     ]
        // }
        const activeTickets = [
            {
                "id": "5bfbea15-992c-4743-b099-f13163fd746b",
                "ticketId": 8,
                "title": "test",
                "status": "Resolution",
                "requestorId": "ba7c63d3-32ab-49fd-af2d-8b354d99ee59",
                "requestorName": "MOD Administrator",
                "requestorEmail": "admin@M365B615272.onmicrosoft.com",
                "customFields": {},
                "priority": "4_Urgent",
                "department": "",
                "assigneeId": "",
                "category": "",
                "instanceId": "abca1126-8b6f-450f-acbc-acf79a2714ba",
                "expectedDate": "",
                "assigneeName": "",
                "assigneeEmail": "",
                "firstResolutionDate": "2023-11-01T10:40:36.136Z",
                "lastResolutionDate": "2023-11-01T10:40:36.136Z",
                "createdDateTime": "2023-11-01T10:40:29.435Z",
                "tags": [],
                "lastInteraction": "2023-11-01T10:40:36.136Z",
                "firstTimeResponse": "2023-11-01T10:40:32.054Z",
                "timeResolution": "2023-11-01T10:40:36.136Z",
                "isFrtBreached": false,
                "isRtBreached": false,
                "isFrtEscalated": false,
                "isRtEscalated": false,
                "createdBy": {
                    "id": "ba7c63d3-32ab-49fd-af2d-8b354d99ee59",
                    "text": "MOD Administrator",
                    "secondaryText": "admin@M365B615272.onmicrosoft.com"
                },
                "lastUpdatedBy": {
                    "id": "ba7c63d3-32ab-49fd-af2d-8b354d99ee59",
                    "text": "MOD Administrator",
                    "secondaryText": "admin@M365B615272.onmicrosoft.com"
                },
                "workflow": [
                    {
                        "id": "Open",
                        "label": "Open",
                        "color": "#fff",
                        "recordResolutionSLA": false,
                        "nextSteps": [
                            {
                                "targetId": "In Progress",
                                "transitionLabel": "Start Ticket",
                                "transitionIcon": "Forward",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee"
                                ],
                                "recordComment": false,
                                "recordResolutionSLA": false
                            },
                            {
                                "targetId": "Closed",
                                "transitionLabel": "Close Ticket",
                                "transitionIcon": "Archive",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": true
                            },
                            {
                                "targetId": "Resolved",
                                "transitionLabel": "Resolve Ticket",
                                "transitionIcon": "CheckMark",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": true
                            },
                            {
                                "targetId": "Resolution",
                                "transitionLabel": "Test This",
                                "transitionIcon": "Clock",
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "recordComment": false,
                                "recordResolutionSLA": true
                            },
                            {
                                "targetId": "Re 2",
                                "transitionLabel": "Trans",
                                "transitionIcon": "Blocked",
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "recordComment": false,
                                "recordResolutionSLA": false
                            }
                        ]
                    },
                    {
                        "id": "In Progress",
                        "label": "In Progress",
                        "color": "#1cd9d6",
                        "recordResolutionSLA": false,
                        "nextSteps": [
                            {
                                "targetId": "Resolved",
                                "transitionLabel": "Resolve Ticket",
                                "transitionIcon": "CheckMark",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": true
                            },
                            {
                                "targetId": "Closed",
                                "transitionLabel": "Close Ticket",
                                "transitionIcon": "Archive",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": true
                            }
                        ]
                    },
                    {
                        "id": "Resolved",
                        "label": "Resolved",
                        "color": "#34eb71",
                        "recordResolutionSLA": true,
                        "nextSteps": [
                            {
                                "targetId": "Closed",
                                "transitionLabel": "Close Ticket",
                                "transitionIcon": "Archive",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": true
                            },
                            {
                                "targetId": "Reopened",
                                "transitionLabel": "Reopen Ticket",
                                "transitionIcon": "Reply",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": false
                            }
                        ]
                    },
                    {
                        "id": "Closed",
                        "label": "Closed",
                        "color": "#28b05f",
                        "recordResolutionSLA": true,
                        "nextSteps": [
                            {
                                "targetId": "Reopened",
                                "transitionLabel": "Reopen Ticket",
                                "transitionIcon": "Reply",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": false
                            }
                        ]
                    },
                    {
                        "id": "Reopened",
                        "label": "Reopened",
                        "color": "#ff970f",
                        "recordResolutionSLA": false,
                        "nextSteps": [
                            {
                                "targetId": "Closed",
                                "transitionLabel": "Close Ticket",
                                "transitionIcon": "Archive",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": true
                            },
                            {
                                "targetId": "Resolved",
                                "transitionLabel": "Resolve Ticket",
                                "transitionIcon": "CheckMark",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": true
                            }
                        ]
                    },
                    {
                        "id": "Resolution",
                        "label": "Resolution",
                        "color": "#bf4040",
                        "recordResolutionSLA": true,
                        "nextSteps": [
                            {
                                "targetId": "In Progress",
                                "transitionLabel": "Alright",
                                "transitionIcon": "Processing",
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "recordComment": false,
                                "recordResolutionSLA": false
                            }
                        ]
                    },
                    {
                        "id": "Re 2",
                        "label": "Re 2",
                        "color": "#bf4040",
                        "recordResolutionSLA": false,
                        "nextSteps": [
                            {
                                "targetId": "Resolution",
                                "transitionLabel": "aaa",
                                "transitionIcon": "RecycleBin",
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "recordComment": false,
                                "recordResolutionSLA": true
                            }
                        ]
                    }
                ],
                "isCustomWorkflow": true
            },
            {
                "id": "74a7cd7f-da01-44a9-8281-294ce39c92ca",
                "ticketId": 7,
                "title": "aw",
                "status": "Re 2",
                "requestorId": "ba7c63d3-32ab-49fd-af2d-8b354d99ee59",
                "requestorName": "MOD Administrator",
                "requestorEmail": "admin@M365B615272.onmicrosoft.com",
                "customFields": {},
                "priority": "4_Urgent",
                "department": "",
                "assigneeId": "",
                "category": "",
                "instanceId": "abca1126-8b6f-450f-acbc-acf79a2714ba",
                "expectedDate": "",
                "assigneeName": "",
                "assigneeEmail": "",
                "createdDateTime": "2023-11-01T10:35:10.064Z",
                "tags": [],
                "lastInteraction": "2023-11-01T10:37:18.357Z",
                "firstTimeResponse": "2023-11-01T10:37:18.357Z",
                "timeResolution": "",
                "isFrtBreached": false,
                "isRtBreached": false,
                "isFrtEscalated": false,
                "isRtEscalated": false,
                "createdBy": {
                    "id": "ba7c63d3-32ab-49fd-af2d-8b354d99ee59",
                    "text": "MOD Administrator",
                    "secondaryText": "admin@M365B615272.onmicrosoft.com"
                },
                "lastUpdatedBy": {
                    "id": "ba7c63d3-32ab-49fd-af2d-8b354d99ee59",
                    "text": "MOD Administrator",
                    "secondaryText": "admin@M365B615272.onmicrosoft.com"
                },
                "workflow": [
                    {
                        "id": "Open",
                        "label": "Open",
                        "color": "#fff",
                        "recordResolutionSLA": false,
                        "nextSteps": [
                            {
                                "targetId": "In Progress",
                                "transitionLabel": "Start Ticket",
                                "transitionIcon": "Forward",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee"
                                ],
                                "recordComment": false,
                                "recordResolutionSLA": false
                            },
                            {
                                "targetId": "Closed",
                                "transitionLabel": "Close Ticket",
                                "transitionIcon": "Archive",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": true
                            },
                            {
                                "targetId": "Resolved",
                                "transitionLabel": "Resolve Ticket",
                                "transitionIcon": "CheckMark",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": true
                            },
                            {
                                "targetId": "Resolution",
                                "transitionLabel": "Test This",
                                "transitionIcon": "Clock",
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "recordComment": false,
                                "recordResolutionSLA": true
                            },
                            {
                                "targetId": "Re 2",
                                "transitionLabel": "Trans",
                                "transitionIcon": "Blocked",
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": false
                            }
                        ]
                    },
                    {
                        "id": "In Progress",
                        "label": "In Progress",
                        "color": "#1cd9d6",
                        "recordResolutionSLA": false,
                        "nextSteps": [
                            {
                                "targetId": "Resolved",
                                "transitionLabel": "Resolve Ticket",
                                "transitionIcon": "CheckMark",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": true
                            },
                            {
                                "targetId": "Closed",
                                "transitionLabel": "Close Ticket",
                                "transitionIcon": "Archive",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": true
                            }
                        ]
                    },
                    {
                        "id": "Resolved",
                        "label": "Resolved",
                        "color": "#34eb71",
                        "recordResolutionSLA": true,
                        "nextSteps": [
                            {
                                "targetId": "Closed",
                                "transitionLabel": "Close Ticket",
                                "transitionIcon": "Archive",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": true
                            },
                            {
                                "targetId": "Reopened",
                                "transitionLabel": "Reopen Ticket",
                                "transitionIcon": "Reply",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": false
                            }
                        ]
                    },
                    {
                        "id": "Closed",
                        "label": "Closed",
                        "color": "#28b05f",
                        "recordResolutionSLA": true,
                        "nextSteps": [
                            {
                                "targetId": "Reopened",
                                "transitionLabel": "Reopen Ticket",
                                "transitionIcon": "Reply",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": false
                            }
                        ]
                    },
                    {
                        "id": "Reopened",
                        "label": "Reopened",
                        "color": "#ff970f",
                        "recordResolutionSLA": false,
                        "nextSteps": [
                            {
                                "targetId": "Closed",
                                "transitionLabel": "Close Ticket",
                                "transitionIcon": "Archive",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": true
                            },
                            {
                                "targetId": "Resolved",
                                "transitionLabel": "Resolve Ticket",
                                "transitionIcon": "CheckMark",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": true
                            }
                        ]
                    },
                    {
                        "id": "Resolution",
                        "label": "Resolution",
                        "color": "#bf4040",
                        "recordResolutionSLA": true,
                        "nextSteps": [
                            {
                                "targetId": "In Progress",
                                "transitionLabel": "Alright",
                                "transitionIcon": "Processing",
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "recordComment": false,
                                "recordResolutionSLA": false
                            }
                        ]
                    },
                    {
                        "id": "Re 2",
                        "label": "Re 2",
                        "color": "#bf4040",
                        "recordResolutionSLA": false,
                        "nextSteps": [
                            {
                                "targetId": "Resolution",
                                "transitionLabel": "aaa",
                                "transitionIcon": "RecycleBin",
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "recordComment": false,
                                "recordResolutionSLA": true
                            }
                        ]
                    }
                ],
                "isCustomWorkflow": true
            },
            {
                "id": "6bef6815-e614-4ef0-b824-44dba7ead700",
                "ticketId": 6,
                "title": "re",
                "status": "Re 2",
                "requestorId": "ba7c63d3-32ab-49fd-af2d-8b354d99ee59",
                "requestorName": "MOD Administrator",
                "requestorEmail": "admin@M365B615272.onmicrosoft.com",
                "customFields": {},
                "priority": "4_Urgent",
                "department": "",
                "assigneeId": "",
                "category": "",
                "instanceId": "abca1126-8b6f-450f-acbc-acf79a2714ba",
                "expectedDate": "",
                "assigneeName": "",
                "assigneeEmail": "",
                "createdDateTime": "2023-11-01T10:33:11.322Z",
                "tags": [],
                "lastInteraction": "2023-11-01T10:33:13.723Z",
                "firstTimeResponse": "2023-11-01T10:33:13.723Z",
                "timeResolution": "",
                "isFrtBreached": false,
                "isRtBreached": false,
                "isFrtEscalated": false,
                "isRtEscalated": false,
                "createdBy": {
                    "id": "ba7c63d3-32ab-49fd-af2d-8b354d99ee59",
                    "text": "MOD Administrator",
                    "secondaryText": "admin@M365B615272.onmicrosoft.com"
                },
                "lastUpdatedBy": {
                    "id": "ba7c63d3-32ab-49fd-af2d-8b354d99ee59",
                    "text": "MOD Administrator",
                    "secondaryText": "admin@M365B615272.onmicrosoft.com"
                },
                "workflow": [
                    {
                        "id": "Open",
                        "label": "Open",
                        "color": "#fff",
                        "recordResolutionSLA": false,
                        "nextSteps": [
                            {
                                "targetId": "In Progress",
                                "transitionLabel": "Start Ticket",
                                "transitionIcon": "Forward",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee"
                                ],
                                "recordComment": false,
                                "recordResolutionSLA": false
                            },
                            {
                                "targetId": "Closed",
                                "transitionLabel": "Close Ticket",
                                "transitionIcon": "Archive",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": true
                            },
                            {
                                "targetId": "Resolved",
                                "transitionLabel": "Resolve Ticket",
                                "transitionIcon": "CheckMark",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": true
                            },
                            {
                                "targetId": "Resolution",
                                "transitionLabel": "Test This",
                                "transitionIcon": "Clock",
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "recordComment": false,
                                "recordResolutionSLA": true
                            },
                            {
                                "targetId": "Re 2",
                                "transitionLabel": "Trans",
                                "transitionIcon": "Blocked",
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "recordComment": false,
                                "recordResolutionSLA": false
                            }
                        ]
                    },
                    {
                        "id": "In Progress",
                        "label": "In Progress",
                        "color": "#1cd9d6",
                        "recordResolutionSLA": false,
                        "nextSteps": [
                            {
                                "targetId": "Resolved",
                                "transitionLabel": "Resolve Ticket",
                                "transitionIcon": "CheckMark",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": true
                            },
                            {
                                "targetId": "Closed",
                                "transitionLabel": "Close Ticket",
                                "transitionIcon": "Archive",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": true
                            }
                        ]
                    },
                    {
                        "id": "Resolved",
                        "label": "Resolved",
                        "color": "#34eb71",
                        "recordResolutionSLA": true,
                        "nextSteps": [
                            {
                                "targetId": "Closed",
                                "transitionLabel": "Close Ticket",
                                "transitionIcon": "Archive",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": true
                            },
                            {
                                "targetId": "Reopened",
                                "transitionLabel": "Reopen Ticket",
                                "transitionIcon": "Reply",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": false
                            }
                        ]
                    },
                    {
                        "id": "Closed",
                        "label": "Closed",
                        "color": "#28b05f",
                        "recordResolutionSLA": true,
                        "nextSteps": [
                            {
                                "targetId": "Reopened",
                                "transitionLabel": "Reopen Ticket",
                                "transitionIcon": "Reply",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": false
                            }
                        ]
                    },
                    {
                        "id": "Reopened",
                        "label": "Reopened",
                        "color": "#ff970f",
                        "recordResolutionSLA": false,
                        "nextSteps": [
                            {
                                "targetId": "Closed",
                                "transitionLabel": "Close Ticket",
                                "transitionIcon": "Archive",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": true
                            },
                            {
                                "targetId": "Resolved",
                                "transitionLabel": "Resolve Ticket",
                                "transitionIcon": "CheckMark",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": true
                            }
                        ]
                    },
                    {
                        "id": "Resolution",
                        "label": "Resolution",
                        "color": "#bf4040",
                        "recordResolutionSLA": true,
                        "nextSteps": [
                            {
                                "targetId": "In Progress",
                                "transitionLabel": "Alright",
                                "transitionIcon": "Processing",
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "recordComment": false,
                                "recordResolutionSLA": false
                            }
                        ]
                    },
                    {
                        "id": "Re 2",
                        "label": "Re 2",
                        "color": "#bf4040",
                        "recordResolutionSLA": false,
                        "nextSteps": [
                            {
                                "targetId": "Resolution",
                                "transitionLabel": "aaa",
                                "transitionIcon": "RecycleBin",
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "recordComment": false,
                                "recordResolutionSLA": true
                            }
                        ]
                    }
                ],
                "isCustomWorkflow": true
            },
            {
                "id": "3fe67648-8b1f-432e-8247-cb42d6e4c4b3",
                "ticketId": 5,
                "title": "ur",
                "status": "Resolution",
                "requestorId": "ba7c63d3-32ab-49fd-af2d-8b354d99ee59",
                "requestorName": "MOD Administrator",
                "requestorEmail": "admin@M365B615272.onmicrosoft.com",
                "customFields": {},
                "priority": "4_Urgent",
                "department": "",
                "assigneeId": "ba7c63d3-32ab-49fd-af2d-8b354d99ee59",
                "category": "",
                "instanceId": "abca1126-8b6f-450f-acbc-acf79a2714ba",
                "expectedDate": "",
                "assigneeName": "MOD Administrator",
                "assigneeEmail": "admin@M365B615272.onmicrosoft.com",
                "firstResolutionDate": "2023-11-01T10:32:22.343Z",
                "lastResolutionDate": "2023-11-01T10:32:22.343Z",
                "createdDateTime": "2023-11-01T10:32:17.118Z",
                "tags": [],
                "lastInteraction": "2023-11-01T10:32:22.343Z",
                "firstTimeResponse": "2023-11-01T10:32:22.343Z",
                "timeResolution": "2023-11-01T10:32:22.343Z",
                "isFrtBreached": false,
                "isRtBreached": false,
                "isFrtEscalated": false,
                "isRtEscalated": false,
                "createdBy": {
                    "id": "ba7c63d3-32ab-49fd-af2d-8b354d99ee59",
                    "text": "MOD Administrator",
                    "secondaryText": "admin@M365B615272.onmicrosoft.com"
                },
                "lastUpdatedBy": {
                    "id": "ba7c63d3-32ab-49fd-af2d-8b354d99ee59",
                    "text": "MOD Administrator",
                    "secondaryText": "admin@M365B615272.onmicrosoft.com"
                },
                "workflow": [
                    {
                        "id": "Open",
                        "label": "Open",
                        "color": "#fff",
                        "recordResolutionSLA": false,
                        "nextSteps": [
                            {
                                "targetId": "In Progress",
                                "transitionLabel": "Start Ticket",
                                "transitionIcon": "Forward",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee"
                                ],
                                "recordComment": false,
                                "recordResolutionSLA": false
                            },
                            {
                                "targetId": "Closed",
                                "transitionLabel": "Close Ticket",
                                "transitionIcon": "Archive",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": true
                            },
                            {
                                "targetId": "Resolved",
                                "transitionLabel": "Resolve Ticket",
                                "transitionIcon": "CheckMark",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": true
                            },
                            {
                                "targetId": "Resolution",
                                "transitionLabel": "Test This",
                                "transitionIcon": "Clock",
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "recordComment": false,
                                "recordResolutionSLA": true
                            }
                        ]
                    },
                    {
                        "id": "In Progress",
                        "label": "In Progress",
                        "color": "#1cd9d6",
                        "recordResolutionSLA": false,
                        "nextSteps": [
                            {
                                "targetId": "Resolved",
                                "transitionLabel": "Resolve Ticket",
                                "transitionIcon": "CheckMark",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": true
                            },
                            {
                                "targetId": "Closed",
                                "transitionLabel": "Close Ticket",
                                "transitionIcon": "Archive",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": true
                            }
                        ]
                    },
                    {
                        "id": "Resolved",
                        "label": "Resolved",
                        "color": "#34eb71",
                        "recordResolutionSLA": true,
                        "nextSteps": [
                            {
                                "targetId": "Closed",
                                "transitionLabel": "Close Ticket",
                                "transitionIcon": "Archive",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": true
                            },
                            {
                                "targetId": "Reopened",
                                "transitionLabel": "Reopen Ticket",
                                "transitionIcon": "Reply",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": false
                            }
                        ]
                    },
                    {
                        "id": "Closed",
                        "label": "Closed",
                        "color": "#28b05f",
                        "recordResolutionSLA": true,
                        "nextSteps": [
                            {
                                "targetId": "Reopened",
                                "transitionLabel": "Reopen Ticket",
                                "transitionIcon": "Reply",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": false
                            }
                        ]
                    },
                    {
                        "id": "Reopened",
                        "label": "Reopened",
                        "color": "#ff970f",
                        "recordResolutionSLA": false,
                        "nextSteps": [
                            {
                                "targetId": "Closed",
                                "transitionLabel": "Close Ticket",
                                "transitionIcon": "Archive",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": true
                            },
                            {
                                "targetId": "Resolved",
                                "transitionLabel": "Resolve Ticket",
                                "transitionIcon": "CheckMark",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": true
                            }
                        ]
                    },
                    {
                        "id": "Resolution",
                        "label": "Resolution",
                        "color": "#bf4040",
                        "recordResolutionSLA": true,
                        "nextSteps": [
                            {
                                "targetId": "In Progress",
                                "transitionLabel": "Alright",
                                "transitionIcon": "Processing",
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "recordComment": false,
                                "recordResolutionSLA": false
                            }
                        ]
                    }
                ],
                "isCustomWorkflow": true
            },
            {
                "id": "282e1d35-8774-4476-8739-d297252c49fc",
                "ticketId": 4,
                "title": "awaw",
                "status": "Open",
                "requestorId": "ba7c63d3-32ab-49fd-af2d-8b354d99ee59",
                "requestorName": "MOD Administrator",
                "requestorEmail": "admin@M365B615272.onmicrosoft.com",
                "customFields": {},
                "priority": "",
                "department": "",
                "assigneeId": "",
                "category": "",
                "instanceId": "abca1126-8b6f-450f-acbc-acf79a2714ba",
                "expectedDate": "",
                "assigneeName": "",
                "assigneeEmail": "",
                "createdDateTime": "2023-11-01T10:18:26.405Z",
                "tags": [],
                "lastInteraction": "2023-11-01T10:18:26.405Z",
                "firstTimeResponse": "",
                "timeResolution": "",
                "isFrtBreached": false,
                "isRtBreached": false,
                "isFrtEscalated": false,
                "isRtEscalated": false,
                "createdBy": {
                    "id": "ba7c63d3-32ab-49fd-af2d-8b354d99ee59",
                    "text": "MOD Administrator",
                    "secondaryText": "admin@M365B615272.onmicrosoft.com"
                },
                "lastUpdatedBy": {
                    "id": "ba7c63d3-32ab-49fd-af2d-8b354d99ee59",
                    "text": "MOD Administrator",
                    "secondaryText": "admin@M365B615272.onmicrosoft.com"
                },
                "workflow": [
                    {
                        "id": "Open",
                        "label": "Open",
                        "color": "#fff",
                        "recordResolutionSLA": false,
                        "nextSteps": [
                            {
                                "targetId": "In Progress",
                                "transitionLabel": "Start Ticket",
                                "transitionIcon": "Forward",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee"
                                ],
                                "recordComment": false,
                                "recordResolutionSLA": false
                            },
                            {
                                "targetId": "Closed",
                                "transitionLabel": "Close Ticket",
                                "transitionIcon": "Archive",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": true
                            },
                            {
                                "targetId": "Resolved",
                                "transitionLabel": "Resolve Ticket",
                                "transitionIcon": "CheckMark",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": true
                            },
                            {
                                "targetId": "Resolution",
                                "transitionLabel": "Test This",
                                "transitionIcon": "Clock",
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "recordComment": false,
                                "recordResolutionSLA": true
                            }
                        ]
                    },
                    {
                        "id": "In Progress",
                        "label": "In Progress",
                        "color": "#1cd9d6",
                        "recordResolutionSLA": false,
                        "nextSteps": [
                            {
                                "targetId": "Resolved",
                                "transitionLabel": "Resolve Ticket",
                                "transitionIcon": "CheckMark",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": true
                            },
                            {
                                "targetId": "Closed",
                                "transitionLabel": "Close Ticket",
                                "transitionIcon": "Archive",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": true
                            }
                        ]
                    },
                    {
                        "id": "Resolved",
                        "label": "Resolved",
                        "color": "#34eb71",
                        "recordResolutionSLA": true,
                        "nextSteps": [
                            {
                                "targetId": "Closed",
                                "transitionLabel": "Close Ticket",
                                "transitionIcon": "Archive",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": true
                            },
                            {
                                "targetId": "Reopened",
                                "transitionLabel": "Reopen Ticket",
                                "transitionIcon": "Reply",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": false
                            }
                        ]
                    },
                    {
                        "id": "Closed",
                        "label": "Closed",
                        "color": "#28b05f",
                        "recordResolutionSLA": true,
                        "nextSteps": [
                            {
                                "targetId": "Reopened",
                                "transitionLabel": "Reopen Ticket",
                                "transitionIcon": "Reply",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": false
                            }
                        ]
                    },
                    {
                        "id": "Reopened",
                        "label": "Reopened",
                        "color": "#ff970f",
                        "recordResolutionSLA": false,
                        "nextSteps": [
                            {
                                "targetId": "Closed",
                                "transitionLabel": "Close Ticket",
                                "transitionIcon": "Archive",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": true
                            },
                            {
                                "targetId": "Resolved",
                                "transitionLabel": "Resolve Ticket",
                                "transitionIcon": "CheckMark",
                                "authorizedUsers": [
                                    "owner",
                                    "assignee"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": true
                            }
                        ]
                    },
                    {
                        "id": "Resolution",
                        "label": "Resolution",
                        "color": "#bf4040",
                        "recordResolutionSLA": true,
                        "nextSteps": [
                            {
                                "targetId": "In Progress",
                                "transitionLabel": "Alright",
                                "transitionIcon": "Processing",
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "recordComment": false,
                                "recordResolutionSLA": false
                            }
                        ]
                    }
                ],
                "isCustomWorkflow": true
            }
        ]

        // MOD Admin -> resolution: 1
        // Blank -> resolution: 1, Re 2

        const workflow = [
            {
                "id": "Open",
                "type": "startNode",
                "position": {
                    "x": -205.2049180327868,
                    "y": -57.13934426229507
                },
                "data": {
                    "label": "Open",
                    "recordResolutionSLA": false,
                    "color": "#fff"
                },
                "targetPosition": "left",
                "sourcePosition": "right",
                "deletable": false
            },
            {
                "id": "In Progress",
                "type": "textFieldNode",
                "position": {
                    "x": -24.368177503993962,
                    "y": -213.619285456832
                },
                "data": {
                    "label": "In Progress",
                    "recordResolutionSLA": false,
                    "color": "#1cd9d6"
                },
                "targetPosition": "left",
                "sourcePosition": "right"
            },
            {
                "id": "Resolved",
                "type": "textFieldNode",
                "position": {
                    "x": 192.4423425992039,
                    "y": 49.718743082182385
                },
                "data": {
                    "label": "Resolved",
                    "recordResolutionSLA": true,
                    "color": "#34eb71"
                },
                "targetPosition": "left",
                "sourcePosition": "right"
            },
            {
                "id": "Closed",
                "type": "textFieldNode",
                "position": {
                    "x": 773.1812215977077,
                    "y": -62.75364748022107
                },
                "data": {
                    "label": "Closed",
                    "recordResolutionSLA": true,
                    "color": "#28b05f"
                },
                "targetPosition": "left",
                "sourcePosition": "right"
            },
            {
                "id": "Reopened",
                "type": "textFieldNode",
                "position": {
                    "x": 502.7629135476956,
                    "y": -398.0035164745823
                },
                "data": {
                    "label": "Reopened",
                    "recordResolutionSLA": false,
                    "color": "#ff970f"
                },
                "targetPosition": "left",
                "sourcePosition": "right"
            },
            {
                "id": "Resolution",
                "type": "textFieldNode",
                "position": {
                    "x": -79.00813355219623,
                    "y": 94.29259910068222
                },
                "data": {
                    "label": "Resolution",
                    "recordResolutionSLA": true,
                    "color": "#bf4040"
                },
                "targetPosition": "left",
                "sourcePosition": "right",
                "positionAbsolute": {
                    "x": -79.00813355219623,
                    "y": 94.29259910068222
                },
                "dragging": false
            },
            {
                "width": 175,
                "height": 40,
                "id": "Re 2",
                "type": "textFieldNode",
                "position": {
                    "x": -174.81599988280195,
                    "y": 219.20686815881533
                },
                "data": {
                    "label": "Re 2",
                    "recordResolutionSLA": false,
                    "color": "#bf4040"
                },
                "targetPosition": "left",
                "sourcePosition": "right",
                "positionAbsolute": {
                    "x": -174.81599988280195,
                    "y": 219.20686815881533
                },
                "dragging": false,
                "selected": false
            }
        ]
        const resources = [
            {
                assigneeName: '',
                inProgress: 0,
                open: 1,
                resolved: 0,
                closed: 0,
            },
            {
                assigneeName: 'MOD Administrator',
                inProgress: 0,
                open: 0,
                resolved: 0,
                closed: 0,
            },
        ]
        const statusAssignee = {
            value: getStatusAssignee(resources)
        }
        console.log("status assignee", statusAssignee);
        /**
         * The both this variable are fetching tickets and workflows on instances other than the default state
         */
        const otherStatusOnInstance = workflow.filter((item) => !!!defaultStatus.includes(item.id));
        const otherStatusOnTickets = activeTickets.filter((item) => !!!defaultStatus.includes(item.status));

        /**
         * This variable represents all new statuses in the workflow (aside from the default) and existing workflow statuses in tickets, whether they still exist or have had their labels changed or even been deleted even on the instance.
         */
        let newStatus: object = {};
        console.log("other status on instance", otherStatusOnInstance);

        /**
         * Normal Case
         * This loop section is used to calculate tickets that use the new status and the status exists on the instance (has not been changed at all)
         */
        otherStatusOnInstance.forEach((item) => {
            const label: string = item.data.label;
            /**
             * Get unique assignee names in tickets
             */
            const uniqueAssigneeNames: string[] = activeTickets.map((ticket) => ticket.assigneeName).reduce((results: string[], value) => {
                if (!!!results.includes(value)) results.push(value);
                return results;
            }, []);
            console.log("label", label);
            console.log(uniqueAssigneeNames);
            /**
             * Initiate new status key to object
             */
            newStatus[label] = [];
            uniqueAssigneeNames.forEach((name) => {
                /**
                 * Filter tickets based on the assignee and status id of the ticket and on the workflow of the same instance and the status labels on the ticket workflow and the workflow on the instance are the same
                 */
                // MOD Admin -> resolution: 1
                // Blank -> resolution: 1, Re 2
                const filteredTickets = activeTickets.filter((ticket) => ticket.assigneeName == name).filter((ticket) => {
                    return (ticket.status == item.id) && (ticket.workflow?.find((flow) => flow.label == label))
                });
                console.log("name", name);
                console.log("tickets", filteredTickets);
                const countTicket = {
                    assigneeName: name ? name : 'Blank',
                    value: filteredTickets.length
                }
                console.log("new status", newStatus);
                newStatus[label].push(countTicket);
            });
        });

        console.log("new status after instance", newStatus);

        console.log("=================================================");
        console.log("Other status in ticket", otherStatusOnTickets);
        /**
         * Complex case
         * This section counts the number of tickets based on the status of tickets with the same status ID as the instance but with different label names and even counts tickets whose status no longer exists in the instance.
         */
        otherStatusOnTickets.forEach((item) => {
            /**
             * Status available on workflow in instance
             * current status label valid on ticket
             * Get unique assignee names in tickets
             */
            const statusAvailable = otherStatusOnInstance.find((status) => status.id == item.status);
            console.log("status available", statusAvailable);
            const currentStatusLabel: string = item.workflow.find((status) => status.id == item.status)?.label;
            console.log("current status available", currentStatusLabel);
            const assigneeNames: string[] = otherStatusOnTickets.map((ticket) => ticket.assigneeName).reduce((results: string[], value) => {
                if (!!!results.includes(value)) results.push(value);
                return results;
            }, []);

            function addNewStatus() {
                newStatus[currentStatusLabel] = [];
                assigneeNames.forEach((name) => {
                    const filteredTicket = otherStatusOnTickets.filter((ticket) => ticket.assigneeName == name).
                        filter((ticket) => ticket.workflow?.find((item) => item.label == currentStatusLabel));

                    newStatus[currentStatusLabel].push({
                        assigneeName: name ? name : "Blank",
                        value: filteredTicket.length
                    })

                });
            }
            /**
             * if: Status in ticket available on instance and different label status on instance and ticket
             * else if: Status in ticket not available on instance
             */
            if (statusAvailable && (currentStatusLabel !== statusAvailable.data.label)) addNewStatus();
            else if (!!!statusAvailable) addNewStatus();
        });

        console.log("new status after ticket", newStatus)

        /**
         * Added new statuses per assignee
         */
        let statusAssigneeResult: any[] = statusAssignee.value.map((item) => {
            let data = item;
            for (const key in newStatus) {
                const filterByName = newStatus[key]?.find((item) => item.assigneeName == data.assigneeName);
                const value = filterByName ? filterByName.value : 0;
                data[key] = value;
                data["total"] += value;
            }
            return data;
        });

        console.log("Status Assignee Result", statusAssigneeResult)

        // Calculate count total per status and grand total
        const countTotalPerStatus = {};
        for (const key in newStatus) {
            countTotalPerStatus[key] = newStatus[key]?.reduce((total: any, item: any) => {
                return total + item.value
            }, 0);
        }
        console.log("Count Total Per Status", countTotalPerStatus);
        // Loop keys and update the grandTotal  dynamically per status
        let grandTotal = 0;
        for (const key in countTotalPerStatus) {
            grandTotal += countTotalPerStatus[key];
        }
        console.log("grandTotal ", grandTotal);
        statusAssigneeResult = statusAssigneeResult.map((item) => {
            if (item.assigneeName == "Total") return ({ ...item, ...countTotalPerStatus, total: item.total + grandTotal });
            else return item;
        });

        console.log("status assignee result", statusAssigneeResult);
        console.log("Status Assignee Result", statusAssigneeResult);
        const defaultColumns = ["assigneeName", "open", "inProgress", "resolved", "closed", "total"];
        // Construct Columns
        let statusAssigneeColumns: any[] = [
            {
                key: 'assigneeName',
                fieldName: 'assigneeName',
                // name: text.container.Report.assigneeCol,
                // ariaLabel: text.container.Report.assigneeAria,
                minWidth: 80,
                maxWidth: 100,
                isRowHeader: true,
                isResizable: true,
                // isSorted: true,
                // isSortedDescending: false,
                // sortAscendingAriaLabel: 'Sorted A to Z',
                // sortDescendingAriaLabel: 'Sorted Z to A',
                // onColumnClick: _onColumnClick,
                data: 'string',
                // onRender: renderOtherCell,
                // isPadded: true,
            },
            {
                key: 'open',
                fieldName: 'open',
                // name: text.container.Report.openCol,
                minWidth: 40,
                maxWidth: 55,
                isResizable: true,
                // onColumnClick: _onColumnClick,
                data: 'number',
                // onRender: renderOtherCell,
                // isPadded: true,
            },
            // {
            //     key: 'reopened',
            //     fieldName: 'reopened',
            //     name: 'Reopened',
            //     minWidth: 20,
            //     maxWidth: 30,
            //     isResizable: true,
            //     onColumnClick: _onColumnClick,
            //     data: 'number',
            //     // isPadded: true,
            // },
            {
                key: 'inProgress',
                fieldName: 'inProgress',
                // name: text.container.Report.inProgressCol,
                minWidth: 70,
                maxWidth: 80,
                isResizable: true,
                // onColumnClick: _onColumnClick,
                data: 'number',
                // onRender: renderOtherCell,
                // isPadded: true,
            },
            {
                key: 'resolved',
                fieldName: 'resolved',
                // name: text.container.Report.resolvedCol,
                minWidth: 60,
                maxWidth: 70,
                isResizable: true,
                // onColumnClick: _onColumnClick,
                data: 'number',
                // onRender: renderOtherCell,
                // isPadded: true,
            },
            {
                key: 'closed',
                fieldName: 'closed',
                // name: text.container.Report.closedCol,
                minWidth: 40,
                maxWidth: 55,
                isResizable: true,
                // onColumnClick: _onColumnClick,
                data: 'number',
                // onRender: renderOtherCell,
                // isPadded: true,
            },
            {
                key: 'total',
                fieldName: 'total',
                // name: text.container.Report.totalCol,
                minWidth: 40,
                maxWidth: 55,
                isResizable: true,
                // onColumnClick: _onColumnClick,
                data: 'number',
                // isPadded: true,
                isRowHeader: true,
                // onRender: renderOtherCell,
            },
        ];;
        const totalColumns = statusAssigneeColumns.pop();
        for (const key in statusAssigneeResult.pop()) {
            if (!!!defaultColumns.includes(key)) {
                statusAssigneeColumns.push({
                    key: key,
                    fieldName: key,
                    name: key,
                    minWidth: 40,
                    maxWidth: 55,
                    isResizable: true,
                    // onColumnClick: _onColumnClick,
                    data: "number",
                    isRowHeader: true,
                    // onRender: renderOtherCell
                })
            }
        }
        statusAssigneeColumns = [...statusAssigneeColumns, totalColumns];
        console.log(statusAssigneeColumns)

    }

    const handleRenderNodeItem: any = (props: ReactFlow.NodeProps<INodeData>, defaultRender: ReactFlow.NodeProps<INodeData>): JSX.Element => {
        // console.log(props);
        return (
            <Stack horizontal tokens={{ childrenGap: 5 }} verticalAlign="center">
                <Stack style={{ backgroundColor: props.data.color, width: 15, height: 15 }}></Stack>
                <Stack>
                    {props.data.label}
                </Stack>
            </Stack>
        )
    }

    const onRenderOptionIcon = (option: IDropdownOption): JSX.Element => {
        return (
            <div>
                {option && (
                    <Icon style={iconStyles} iconName={String(option.key)} aria-hidden="true" title={String(option.key)} />
                )}
                <span>{option.text}</span>
            </div>
        );
    };
    const onRenderTitle = (options: IDropdownOption[] | IDropdownOption): JSX.Element => {
        const option = options[0];

        return (
            <div>
                {option && (
                    <Icon style={iconStyles} iconName={String(option.key)} aria-hidden="true" title={String(option.key)} />
                )}
                <span>{option.text}</span>
            </div>
        );
    };
    const onChangeIcon = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
        // console.log(option);
        setSelectedIcon(String(option.key));
    }
    const handleDownload = () => {
        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify({ nodes, edges })
        )}`;

        console.log(jsonString);
        reactDownload(jsonString, "workflow.json");
    }
    useEffect(() => {
        setNodes(initialNodes);
        setEdges(initialEdges);
        loadData();

        let data = [
            {
                "date": "2023-10-30T00:00:00.0000000Z",
                "resolved": 0,
                "created": 8
            },
            {
                "date": "2023-10-27T00:00:00.0000000Z",
                "resolved": 0,
                "created": 2
            },
            {
                "date": "2023-09-15T00:00:00.0000000Z",
                "resolved": 1,
                "created": 1
            },
            {
                "date": "2023-09-13T00:00:00.0000000Z",
                "resolved": 0,
                "created": 4
            },
            {
                "date": "2023-09-12T00:00:00.0000000Z",
                "resolved": 0,
                "created": 2
            },
            {
                "date": "2023-09-02T00:00:00.0000000Z",
                "resolved": 1,
                "created": 1
            },
            {
                "date": "2023-09-01T00:00:00.0000000Z",
                "resolved": 0,
                "created": 1
            },
            {
                "date": "2023-08-31T00:00:00.0000000Z",
                "resolved": 0,
                "created": 1
            },
            {
                "date": "2023-08-30T00:00:00.0000000Z",
                "resolved": 0,
                "created": 1
            },
            {
                "date": "2023-08-29T00:00:00.0000000Z",
                "resolved": 0,
                "created": 4
            },
            {
                "date": "2023-08-25T00:00:00.0000000Z",
                "resolved": 0,
                "created": 6
            },
            {
                "date": "2023-08-23T00:00:00.0000000Z",
                "resolved": 3,
                "created": 6
            },
            {
                "date": "2023-08-22T00:00:00.0000000Z",
                "resolved": 1,
                "created": 4
            },
            {
                "date": "2023-08-15T00:00:00.0000000Z",
                "resolved": 3,
                "created": 3
            },
            {
                "date": "2023-08-14T00:00:00.0000000Z",
                "resolved": 2,
                "created": 8
            },
            {
                "date": "2023-08-13T00:00:00.0000000Z",
                "resolved": 0,
                "created": 4
            },
            {
                "date": "2023-08-09T00:00:00.0000000Z",
                "resolved": 0,
                "created": 1
            },
            {
                "date": "2023-08-08T00:00:00.0000000Z",
                "resolved": 0,
                "created": 4
            },
            {
                "date": "2023-08-07T00:00:00.0000000Z",
                "resolved": 0,
                "created": 5
            },
            {
                "date": "2023-08-04T00:00:00.0000000Z",
                "resolved": 0,
                "created": 3
            },
            {
                "date": "2023-08-03T00:00:00.0000000Z",
                "resolved": 0,
                "created": 1
            },
            {
                "date": "2023-08-01T00:00:00.0000000Z",
                "resolved": 0,
                "created": 4
            },
            {
                "date": "2023-07-31T00:00:00.0000000Z",
                "resolved": 0,
                "created": 4
            },
            {
                "resolved": 1,
                "created": 1
            },
            {
                "date": "2023-07-30T00:00:00.0000000Z",
                "resolved": 3,
                "created": 5
            },
            {
                "date": "2023-07-27T00:00:00.0000000Z",
                "resolved": 1,
                "created": 1
            },
            {
                "date": "2023-07-26T00:00:00.0000000Z",
                "resolved": 0,
                "created": 3
            },
            {
                "date": "2023-07-25T00:00:00.0000000Z",
                "resolved": 0,
                "created": 1
            },
            {
                "date": "2023-07-18T00:00:00.0000000Z",
                "resolved": 1,
                "created": 1
            },
            {
                "date": "2023-07-11T00:00:00.0000000Z",
                "resolved": 1,
                "created": 4
            },
            {
                "date": "2023-07-10T00:00:00.0000000Z",
                "resolved": 0,
                "created": 3
            },
            {
                "date": "2023-07-07T00:00:00.0000000Z",
                "resolved": 0,
                "created": 6
            },
            {
                "date": "2023-06-26T00:00:00.0000000Z",
                "resolved": 0,
                "created": 1
            },
            {
                "date": "2023-05-26T00:00:00.0000000Z",
                "resolved": 4,
                "created": 19
            },
            {
                "date": "2023-05-25T00:00:00.0000000Z",
                "resolved": 0,
                "created": 2
            },
            {
                "date": "2023-05-22T00:00:00.0000000Z",
                "resolved": 0,
                "created": 1
            },
            {
                "date": "2023-05-17T00:00:00.0000000Z",
                "resolved": 0,
                "created": 2
            },
            {
                "date": "2023-05-03T00:00:00.0000000Z",
                "resolved": 0,
                "created": 1
            },
            {
                "date": "2023-03-28T00:00:00.0000000Z",
                "resolved": 0,
                "created": 1
            },
            {
                "date": "2023-04-13T00:00:00.0000000Z",
                "resolved": 0,
                "created": 1
            },
            {
                "date": "2023-04-12T00:00:00.0000000Z",
                "resolved": 0,
                "created": 2
            },
            {
                "date": "2023-03-30T00:00:00.0000000Z",
                "resolved": 1,
                "created": 2
            },
            {
                "date": "2023-03-29T00:00:00.0000000Z",
                "resolved": 1,
                "created": 1
            },
            {
                "date": "2023-02-28T00:00:00.0000000Z",
                "resolved": 0,
                "created": 15
            },
            {
                "date": "2023-02-20T00:00:00.0000000Z",
                "resolved": 0,
                "created": 1
            },
            {
                "date": "2023-01-05T00:00:00.0000000Z",
                "resolved": 3,
                "created": 5
            },
            {
                "date": "2023-01-04T00:00:00.0000000Z",
                "resolved": 1,
                "created": 2
            },
            {
                "date": "2022-12-08T00:00:00.0000000Z",
                "resolved": 0,
                "created": 1
            },
            {
                "date": "2022-12-02T00:00:00.0000000Z",
                "resolved": 0,
                "created": 1
            },
            {
                "date": "2022-12-01T00:00:00.0000000Z",
                "resolved": 0,
                "created": 5
            },
            {
                "date": "2022-11-30T00:00:00.0000000Z",
                "resolved": 2,
                "created": 4
            },
            {
                "date": "2022-11-29T00:00:00.0000000Z",
                "resolved": 1,
                "created": 4
            },
            {
                "date": "2022-11-27T00:00:00.0000000Z",
                "resolved": 0,
                "created": 1
            },
            {
                "date": "2022-11-25T00:00:00.0000000Z",
                "resolved": 9,
                "created": 9
            },
            {
                "date": "2022-11-23T00:00:00.0000000Z",
                "resolved": 2,
                "created": 2
            },
            {
                "date": "2022-11-21T00:00:00.0000000Z",
                "resolved": 1,
                "created": 2
            },
            {
                "date": "2022-11-17T00:00:00.0000000Z",
                "resolved": 0,
                "created": 1
            },
            {
                "date": "2022-11-16T00:00:00.0000000Z",
                "resolved": 0,
                "created": 1
            },
            {
                "date": "2022-11-12T00:00:00.0000000Z",
                "resolved": 0,
                "created": 2
            },
            {
                "date": "2022-11-08T00:00:00.0000000Z",
                "resolved": 1,
                "created": 1
            },
            {
                "date": "2022-11-07T00:00:00.0000000Z",
                "resolved": 1,
                "created": 1
            },
            {
                "date": "2022-11-02T00:00:00.0000000Z",
                "resolved": 2,
                "created": 2
            }
        ];

    }, []);

    return (
        <div className='ms-Grid' dir='ltr'>
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm9 ms-md9 ms-lg9">
                    <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
                        <PrimaryButton text="Save" onClick={saveWorkflow} disabled={isStatusOrTransitionActive || isDisabledSave} />
                        <DefaultButton
                            iconProps={{ iconName: "Upload" }}
                            text="Upload"
                        />
                        <DefaultButton
                            iconProps={{ iconName: "Download" }}
                            text="Download"
                            onClick={handleDownload}
                        />
                        <ActionButton iconProps={{ iconName: "Upload" }} text="Upload" onClick={upload} />
                        <ActionButton iconProps={{ iconName: "Download" }} text='Download' onClick={download} />
                    </Stack>
                    <div style={{ height: '100vh', position: "relative" }}>
                        <FlowEditor
                            defaultNodes={initialNodes}
                            defaultEdges={initialEdges}
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodeChange}
                            onEdgesChange={onEdgeChange}
                            onAddClick={addClick}
                            onConnect={onConnect}
                            onNodeClick={onNodeClick}
                            onEdgeClick={onEdgeClick}
                            onNodeDoubleCLick={onNodeClick}
                            // onEdgeDoubleClick={onEdgeClick}
                            // onConnect={undefined}
                            // onNodeClick={undefined}
                            // onEdgeClick={undefined}
                            // onNodeDoubleCLick={undefined}
                            // onEdgeDoubleClick={undefined}
                            background="dots"
                            showControls
                            importEnabled={false}
                            exportEnabled={false}
                            labels={labels}
                            onRenderNewNodeLabel={handleRenderNodeItem}
                        />
                        {/* <Stack horizontal horizontalAlign="end">
                            <PrimaryButton text="Save" styles={saveButtonStyles} onClick={saveWorkflow} disabled={(activeStatus || activeTransition) ? true : false} />
                        </Stack> */}
                    </div>
                </div>
                {/* {console.log("edges", edges)}
                {console.log("nodes", nodes)} */}
                <div className="ms-Grid-col ms-sm3 ms-md3 ms-lg3">
                    <div className={customPanelStyles.wrapper}>
                        {activeStatus &&
                            <StatusContent
                                activeStatus={activeStatus}
                                statusName={statusName}
                                onChangeStatusName={handleChangeStatusName}
                                recordResolution={recordResolutionSLA}
                                onChangeResolution={handleChangeResolutionSla}
                                color={color}
                                onChangeColor={handleChangeColor}
                                headerText={(action == "create") ? "Add New Status" : "Edit Status"}
                                onSave={(action == "create") ? addStatus : editStatus}
                                saveText={(action == "create") ? "Add" : "Save"}
                                disabledSaveButton={(action !== "create") && !!!editDetected}
                                onCancel={cancelStatus}
                                cancelText={(action == "create") ? "Cancel" : "Close"}
                            />
                        }
                        {activeTransition &&
                            <TransitionContent
                                activeTransition={activeTransition}
                                statusColor={statusColor}
                                transitionName={transitionName}
                                onChangeTransitionName={handleChangeTransitionName}
                                recordComment={recordComment}
                                onChangeRecordComment={handleChangeRecordComment}
                                authorizedUsers={authorizedUsers}
                                onChangeAuthorized={handleChangeAuthorized}
                                options={options}
                                headerText={(action == "create") ? "Add New Transition" : "Edit Transition"}
                                onSave={saveTransition}
                                saveText={(action == "create") ? "Add" : "Save"}
                                disabledSaveButton={(authorizedUsers.length == 0) || (action !== "create") && !!!editDetected}
                                onCancel={cancelTransition}
                                cancelText={(action == "create") ? "Cancel" : "Close"}
                                iconOptions={iconOptions}
                                onRenderOptionIcon={onRenderOptionIcon}
                                selectedIcon={selectedIcon}
                                onChangeIcon={onChangeIcon}
                                onRenderOptionTitleIcon={onRenderTitle}
                            />
                        }
                        {(!!!activeStatus && !!!activeTransition) &&
                            <Stack className={customPanelStyles.header}>
                                <Text variant={"large"}>No states and transitions are selected</Text>
                            </Stack>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Board;