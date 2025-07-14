import React, { Fragment, useEffect, useState } from "react";
import { useBoolean } from "@fluentui/react-hooks";
import { Dropdown, DropdownMenuItemType, IDropdownOption, IPersonaProps, Panel, Label, ActionButton, IIconProps, IconNames, IDropdownStyles, PanelType, Stack, TextField, DatePicker, IconButton, Toggle, Icon, DefaultButton, PrimaryButton, BaseButton, Button, IColumn } from "@fluentui/react";
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';
import { PeoplePickerNormalExample } from "./PeoplePickerNormalExample";
import SpecialList from "./SpecialList";
import axios from "axios";

interface IField {
    id: string,
    title: string,
    isMandatory: boolean,
    status: "hidden" | "visible"
    defaultValue: any,

    // People Picker Type Variables
    choosePeopleFrom: any,
    isSeeTicket: boolean,
    isReceiveNotification: boolean,
    isMultipleSection: boolean,

    isReceiveEmailNotification?: boolean,

    // List Field Type Variables
    options?: any[]
    isMultiple?: boolean
}

export interface ICustomField extends IField {
    type: {
        key: "1_text" | "3_date" | "2_textarea" | "4_toggle" | "5_list" | "6_peoplepicker" | "7_emailpicker",
        text: string,
        data: {
            icon: string,
            color: string
        }
    }
}

export interface IInstance {
    id?: string,
    groupId: string | null,
    name: string,
    enabled: boolean,
    tenantId: string,
    teamId: string,
    channelId: string,
    subscriptionId?: string,
    isWizardShown?: boolean,
    entityId?: string,
    // properties for custoom fields
    customFields?: ICustomField[],
    customFieldsLeft?: ICustomField[],
    customFieldsRight?: ICustomField[],

    optionalFieldsLeft?: any[],
    optionalFieldsRight?: any[],

    assignees?: {
        type: 'teamsOwner' | 'customAssignee',
        peoples?: IPersonaProps[]
    }

    assigneeRules?: any[],
    defaultRuleAssignee?: any[],


    /**
     * So we have plan the automation will be applied in the status & transition
     */
    ticketWorkflowAutomationRules?: [
        {
            /**
             * This can also to be idStatus or idTransition
             */
            idStep: string,

            /**
             * true for status
             * false for transition
             */
            isAutomationForStatus: boolean,
            automations: IAutomation[]
        }
    ]
    //assigneeRules -> ticketCreationAutomationRules
    automationRules: IAutomation[],

    // defaultRuleAssignee -> ticketCreationDefaultAutomationRules
    defaultAutomationRules: IAutomation[],
    isAutomaticAssignTickets?: boolean,
    alertNotification?: any

    isAutoAssignIdleTickets?: boolean,
    dayBeforeTicketsIdle?: number,
    idleTicketAssignedTo?: IPersonaProps[],
    userPermission?: any[],
    isNewInstance?: boolean,
    userList?: {
        owners: IPersonaProps[],
        members: IPersonaProps[]
    },

    // properties for user management apply when app version more than or the same as 1.18.1
    // isUserManagedManually?: boolean,
    // isUserListControlled?: boolean,
    userManagementMode?: "teams" | "manual"
    appVersion: string,
    api?: {
        primaryKey: string,
        secondaryKey: string,
    },

    notifyOnNoAssignee?: boolean,
    noAssigneeNotifRecipients?: IPersonaProps[],
    displayName: string,
    workflows: any,
    color?: string,
    // favoriteFilters?: IFavoriteFilter[]
    favoriteFilters?: any[]
}

interface ITicketTag {
    tagCategoryId?: string,
    text: string,
    deleted?: boolean
}


interface ICase {
    id?: string;
    ticketId?: string | number;
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
    attachments: any[];
    assigneeName: string;
    resolution: string;
    firstResolutionDate?: Date;
    lastResolutionDate?: Date;
    createdDateTime?: Date | string;
    tags?: ITicketTag[];
    lastInteraction?: Date | string;
    firstTimeResponse: Date | string;
    timeResolution: Date | string;
    isFrtEscalated?: boolean,
    isRtEscalated?: boolean,
    isFrtBreached?: boolean,
    isRtBreached?: boolean,
    trackingId?: string, // tracking id for ticket created from email
    mailbox?: string, // the mailbox address from where the ticket is created from
    messageId?: string, // The id of the last email sent by the requestor,
    messageIds?: string[], //The ids collections of email sent by requestor
    lastUpdatedBy?: IPersonaProps,
    lastResolutionComment?: string,
    createdBy?: IPersonaProps,
    requestorEmail?: string,
    assigneeEmail?: string,
    workflow?: any[],
    resolvedStatus?: string[],
    isCustomWorkflow?: boolean,
    cc?: string[],
};


export interface ICondition {
    id: string,
    key: string | number,
    value: any
};

export interface IAutomation {
    id: string,
    conditions: ICondition[],
    actions: ICondition[],
    isStopProcessingMoreRules: boolean,
    enable: boolean,
}


/**
 * Icons
 */
const addIcon: IIconProps = { iconName: "Add" };
const cancelIcon: IIconProps = { iconName: 'Cancel' };


/**
 * Styles
 */
const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: "100%" },
};


interface IValueField {
    condition: ICondition,
    onChange: (id: string, value: any) => void,
    instance: IInstance
}
const ValueField: React.FunctionComponent<IValueField> = (props: IValueField) => {

    const condition = props.condition;
    const onChange = props.onChange;
    const instance = props.instance;

    const customFields: ICustomField[] = [...instance?.customFieldsLeft, ...instance?.customFieldsRight];

    let options: IDropdownOption[] = [];
    switch (condition.key) {
        case "1_department":
            options = [{ key: "IT", text: "IT" }, { key: "Accounting", text: "Accounting" }];
            return (
                <Dropdown
                    multiSelect
                    options={options}
                    onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption<any>, index?: number) => {
                        let newValue = Array.isArray(condition.value) ? condition.value : [];

                        if (condition.value?.includes(option.key)) newValue = condition.value.filter(item => item !== option.key);
                        else newValue = newValue.concat(option.key);

                        onChange(condition.id, newValue);
                    }}
                />
            );
        case "2_category":
            options = [{ key: "Complain", text: "Complain" }, { key: "Issue", text: "Issue" }];
            return (
                <Dropdown
                    multiSelect
                    options={options}
                    onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption<any>, index?: number) => {
                        let newValue = Array.isArray(condition.value) ? condition.value : [];

                        if (condition.value?.includes(option.key)) newValue = condition.value.filter(item => item !== option.key);
                        else newValue = newValue.concat(option.key);

                        onChange(condition.id, newValue);
                    }}
                />
            );
        case "3_priority":
            options = [
                { key: '4_Urgent', text: "Urgent" },
                { key: '3_Important', text: "Important" },
                { key: '2_Medium', text: "Medium" },
                { key: '1_Low', text: "Low" },
            ];
            return (
                <Dropdown
                    multiSelect
                    options={options}
                    onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption<any>, index?: number) => {
                        let newValue = Array.isArray(condition.value) ? condition.value : [];

                        if (condition.value?.includes(option.key)) newValue = condition.value.filter(item => item !== option.key);
                        else newValue = newValue.concat(option.key);

                        onChange(condition.id, newValue);
                    }}
                />
            );
        case "4_tag":
            options = [
                { key: "bc109de0-a4c9-4900-9e7d-9865cdcbd09a", text: "Snack" },
                { key: "bc109de0-a4c9-4900-9e7d-9865cdcbd09b", text: "Drink" }
            ];
            return (
                <Dropdown
                    multiSelect
                    options={options}
                    onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption<any>, index?: number) => {
                        let newValue = Array.isArray(condition.value) ? condition.value : [];

                        if (condition.value?.includes(option.key)) newValue = condition.value.filter(item => item !== option.key);
                        else newValue = newValue.concat(option.key);

                        onChange(condition.id, newValue);
                    }}
                />
            );
        case "5_requestor":
            return (
                <PeoplePickerNormalExample
                    onChange={(items: IPersonaProps[]) => onChange(condition.id, items)}
                />
            );
        case "6_requestorEmail":
        case "7_title":
            return (
                <TextField
                    onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => onChange(condition.id, newValue)}
                />
            );
        case "8_description":
            return (
                <TextField
                    multiline
                    rows={3}
                    onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => onChange(condition.id, newValue)}
                />
            );
        case "9_expectedDate":
            return (
                <DatePicker
                    // DatePicker uses English strings by default. For localized apps, you must override this prop.
                    onSelectDate={(date) => onChange(condition.id, date)}
                />);
        case "assignTo":
            return (
                <PeoplePickerNormalExample
                    onChange={(items: IPersonaProps[]) => onChange(condition.id, items)}
                />
            );
        case "priorityTo":
            options = [
                { key: '4_Urgent', text: "Urgent" },
                { key: '3_Important', text: "Important" },
                { key: '2_Medium', text: "Medium" },
                { key: '1_Low', text: "Low" },
            ];
            return (
                <Dropdown
                    multiSelect
                    options={options}
                    onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption<any>, index?: number) => {
                        let newValue = Array.isArray(condition.value) ? condition.value : [];

                        if (condition.value?.includes(option.key)) newValue = condition.value.filter(item => item !== option.key);
                        else newValue = newValue.concat(option.key);

                        onChange(condition.id, newValue);
                    }}
                />
            );
        case "addTags":
            options = [
                { key: "bc109de0-a4c9-4900-9e7d-9865cdcbd09a", text: "Snack" },
                { key: "bc109de0-a4c9-4900-9e7d-9865cdcbd09b", text: "Drink" }
            ];
            return (
                <Dropdown
                    multiSelect
                    options={options}
                    onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption<any>, index?: number) => {
                        let newValue = Array.isArray(condition.value) ? condition.value : [];

                        if (condition.value?.includes(option.key)) newValue = condition.value.filter(item => item !== option.key);
                        else newValue = newValue.concat(option.key);

                        onChange(condition.id, newValue);
                    }}
                />
            );
        default:
            const field = customFields.find((item) => item.id === condition.key);
            switch (field?.type?.key) {
                case "1_text":
                    return (
                        <TextField
                            onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => onChange(condition.id, newValue)}
                        />
                    );
                case "2_textarea":
                    return (
                        <TextField
                            multiline
                            rows={3}
                            onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => onChange(condition.id, newValue)}
                        />
                    )
                case "3_date":
                    return (
                        <DatePicker onSelectDate={(date) => onChange(condition.id, date)} />);
                case "4_toggle":
                    return (
                        <Toggle

                            inlineLabel
                            onText="Enabled"
                            offText="Disabled"
                            onChange={(event: React.MouseEvent<HTMLElement, MouseEvent>, checked?: boolean) => onChange(condition.id, checked)}
                            style={{ marginBottom: 0 }}
                        />
                    )
                case "5_list":
                    return (
                        <Dropdown
                            multiSelect
                            options={field?.options}
                            onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption<any>, index?: number) => {
                                let newValue = Array.isArray(condition.value) ? condition.value : [];

                                if (condition.value?.includes(option.key)) newValue = condition.value.filter(item => item !== option.key);
                                else newValue = newValue.concat(option.key);

                                onChange(condition.id, newValue);
                            }}
                        />
                    );

                case "6_peoplepicker":
                    return (
                        <PeoplePickerNormalExample
                            onChange={(items: IPersonaProps[]) => onChange(condition.id, items)}
                        />
                    );
                case "7_emailpicker":
                    return (
                        <Dropdown
                            options={field.options}
                            multiSelect={field.isMultiple}
                            onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption<any>, index?: number) => {
                                let newValue = Array.isArray(condition.value) ? condition.value : [];

                                if (condition.value?.includes(option.key)) newValue = condition.value.filter(item => item !== option.key);
                                else newValue = newValue.concat(option.key);

                                onChange(condition.id, newValue);
                            }}
                            selectedKey={condition?.value}
                            selectedKeys={condition?.value}
                            onRenderCaretDown={(event) => {
                                return (
                                    <Stack horizontal verticalAlign={"center"}>
                                        {(condition?.value.length > 0) && (
                                            <Icon
                                                iconName="Cancel"
                                                styles={{
                                                    root: {
                                                        color: "rgb(96, 94, 92)",
                                                        paddingRight: ".7em",
                                                        "&:hover": {
                                                            fontWeight: 800
                                                        }
                                                    }
                                                }}
                                                onClick={() => onChange(condition.id, [])}
                                            />
                                        )}
                                        <Icon
                                            iconName="ChevronDown"
                                            styles={{
                                                root: {
                                                    color: "rgb(96, 94, 92)",
                                                    "&:hover": {
                                                        fontWeight: 800
                                                    }
                                                }
                                            }}
                                            onClick={(event: any) => event.currentTarget.parentNode.onClick}
                                        />
                                    </Stack>
                                );
                            }}
                        />
                    );
                default:
                    return <></>;

            }



        /**
         * Custom field handling
         */

    }
}

interface ISpecialField {
    label: string,
    placeholder: string,

    options: IDropdownOption[],
    onChange: (items: ICondition[]) => void,
    instance: IInstance,

    addButtonText: string,
}

const SpecialField: React.FunctionComponent<ISpecialField> = (props: ISpecialField) => {

    const instance = props.instance;

    const [conditions, setConditions] = useState<ICondition[]>([]);

    /**
     * id is condition id, because we can have multiple same condition so we need id to different it
     */
    const handleChangeCondition = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number, id?: string) => {
        // console.log(option);
        const key = option.key;
        const newCondition: ICondition[] = id ?
            conditions.map((item) => (item.id === id && item.key !== key) ? { ...item, key: key } : item)
            :
            conditions.concat({
                id: uuidv4(),
                key: key,
                value: ""
            });
        setConditions(newCondition);
        props.onChange(newCondition);

    }

    const onChange = (id: string, value: any) => {
        const newCondition: ICondition[] = conditions.map((item) => (item.id === id) ? { ...item, value: value } : item);
        setConditions(newCondition);
        props.onChange(newCondition);
    }

    const addCondition = () => {
        const newCondition = conditions.concat({ id: uuidv4(), key: "", value: "" });
        setConditions(newCondition);
        props.onChange(newCondition);
    };

    const deleteCondition = (id: string) => {
        const newCondition = conditions?.filter((condition) => condition.id !== id);
        setConditions(newCondition);
        props.onChange(newCondition);
    };

    return (
        <div className="ms-Grid" dir="ltr">
            <div className="ms-Grid-row">
                <Label>{props.label}</Label>
                {(conditions?.length === 0) &&
                    <Dropdown
                        placeholder={props.placeholder}
                        options={props.options}
                        onChange={handleChangeCondition}
                    />
                }
            </div>
            {/* {console.log(conditions)} */}
            {(conditions?.length > 0) &&
                conditions.map((condition) => {
                    const id = condition.id;
                    const selectedKey = condition.key;
                    return (
                        <div className="ms-Grid-row" style={{ marginBottom: 10 }}>
                            <div className="ms-Grid-col ms-sm6 ms-lg6">
                                <Dropdown
                                    placeholder={!!!selectedKey && "And..."}
                                    options={props.options}
                                    onChange={(event, option, index) => handleChangeCondition(event, option, index, id)}
                                    selectedKey={selectedKey}
                                />
                            </div>
                            <div className="ms-Grid-col ms-sm6 ms-lg6">
                                <Stack
                                    horizontal
                                    verticalAlign="center"
                                    tokens={selectedKey && { childrenGap: 3 }}
                                >
                                    <div style={{ width: selectedKey && "95%" }}>
                                        <ValueField
                                            condition={condition}
                                            instance={instance}
                                            onChange={onChange}
                                        />
                                    </div>
                                    {(conditions.length > 1) &&
                                        <IconButton
                                            iconProps={cancelIcon}
                                            onClick={() => deleteCondition(id)}
                                        />
                                    }
                                </Stack>
                            </div>
                        </div>)
                })
            }
            <div className="ms-Grid-row">
                {((conditions.length > 0) && (conditions?.every((condition) => condition.key))) &&
                    <ActionButton
                        text={props.addButtonText}
                        styles={{ root: { color: "#0078d4" } }}
                        onClick={addCondition}
                    />
                }
            </div>

        </div>
    )
}

const OnRenderFooterContent = (props: { onSave, onCancel: React.MouseEventHandler<HTMLDivElement | HTMLAnchorElement | HTMLButtonElement | BaseButton | Button | HTMLSpanElement>, conditions: ICondition[], actions: ICondition[] }) => {
    return (
        <div style={{ marginBottom: '10px' }}>
            <Stack horizontal tokens={{ childrenGap: 10 }} horizontalAlign={"center"} style={{ padding: '0px 8px' }}>
                <DefaultButton
                    text={"Cancel"}
                    onClick={props.onCancel}
                />

                <PrimaryButton
                    text={"Add"}
                    onClick={(e: any) => props.onSave({ conditions: props.conditions, actions: props.actions })}
                />
            </Stack>
        </div>
    )
}

export const ConditionKey = {
    RequestorHeader: "requestorHeader",
    RequestorAny: "requestorAny",
    RequestorEmailContains: "requestorEmailContains",
    TitleHeader: "titleHeader",
    TitleIncludes: "titleIncludes",
    TitleOrDescriptionIncludes: "titleOrDescriptionIncludes",
    DescriptionHeader: "descriptionHeader",
    DescriptionIncludes: "descriptionIncludes",
    DescriptionIsBlank: "descriptionIsBlank",
    ExpectedDateHeader: "expectedDateHeader",
    ExactDateIs: "exactDateIs",
    ExactDateIsBefore: "exactDateIsBefore",
    ExactDateIsAfter: "exactDateIsAfter",
    RelativeDateIs: "relativeDateIs",
    RelativeDateIsBefore: "relativeDateIsBefore",
    RelativeDateIsAfter: "relativeDateIsAfter",
    TagsHeader: "tagsHeader",
    TagsIncludesAny: "tagsIncludesAny",
    TagsIncludesAll: "tagsIncludesAll",
    TagsIsBlank: "tagsIsBlank",
    PriorityHeader: "priorityHeader",
    PriorityIsAny: "priorityIsAny",
    PriorityIsBlank: "priorityIsBlank",
    DepartmentHeader: "departmentHeader",
    DepartmentIncludesAny: "departmentIncludesAny",
    DepartmentIsBlank: "departmentIsBlank",
    CategoryHeader: "categoryHeader",
    CategoryIncludesAny: "categoryIncludesAny",
    CategoryIsBlank: "categoryIsBlank",
    ToggleIsTrue: "toggleIsTrue",
    ToggleIsFalse: "toggleIsFalse",
    ListIncludesAny: "listIncludesAny",
    ListIncludesAll: "listIncludesAll",
    ListIsBlank: "listIsBlank",
    PeoplePickerIncludesAny: "peoplePickerIncludesAny",
    PeoplePickerIncludesAll: "peoplePickerIncludesAll",
    PeoplePickerIsBlank: "peoplePickerIsBlank",
    EmailPickerIncludesAny: "emailPickerIncludesAny",
    EmailPickerIncludesAll: "emailPickerIncludesAll",
    EmailPickerIsBlank: "emailPickerIsBlank",
    Assignee: "assignee",
    Priority: "priority",
    Tags: "tags"
}
export const ActionKey = {
    Assignee: "assignee",
    Priority: "priority",
    Tags: "tags",
    ExpectedDateTo: "expectedDateTo",
    ExpectedDateRelativeDateTo: "expectedDateRelativeDateTo",
    CustomFieldHeader: "customFields",
    TextField: "textFieldContains",
    TextArea: "textAreaContains",
    ExactDateTo: "exactDateTo",
    RelativeDateTo: "relativeDateTo",
    ToggleType: "toggleType",
    MultipleList: "multipleList",
    SingleList: "singleList",
    MultiplePeople: "multiplePeople",
    SinglePeople: "singlePeople",
    MultipleEmail: "multipleEmail",
    SingleEmail: "singleEmail"
}


export const textFormat = (string: string, keyValuePair: any): string => {
    let keys = Object.keys(keyValuePair)
    keys = keys.filter((key) => key !== "situational");
    if (keys.length === 0) return "";
    keys.forEach(key => {
        string = string.replace(`{${key}}`, keyValuePair[key])
    })
    if (keyValuePair?.situational) {
        string = string.replace(/\[(.*?)\]/g, (_, value) => value);
    } else {
        string = string.replace(/\[(.*?)\]/g, (_, value) => '');
    }
    return string
}

export const formatComponent = (string: string, keyValuePair: any): JSX.Element => {
    if (keyValuePair?.situational) {
        string = string.replace(/\[(.*?)\]/g, (_, value) => value);
    } else {
        string = string.replace(/\[(.*?)\]/g, (_, value) => '');
    }
    let keys = Object.keys(keyValuePair)
    keys = keys.filter((key) => key !== "situational");
    if (keys.length === 0) return (<Fragment>{string}</Fragment>);

    let splitStrings = string.split(/(\{.*?\})/g);
    keys.forEach(key => {
        const placeholderIndex = splitStrings.findIndex(placeholder => placeholder === `{${key}}`);
        if (placeholderIndex !== -1) {
            splitStrings[placeholderIndex] = keyValuePair[key];
        }
    });
    return (
        <Fragment>
            {splitStrings.map((string, index) => <Fragment key={index}>{string}</Fragment>)}
        </Fragment>
    );
}

const AutomationRules = (props) => {

    /**
     * start back end side
     */
    let instance: IInstance = {
        "name": "Dev",
        "displayName": "Dev",
        "groupId": "e072af2a-1067-494d-ae48-2aacc892bb1b",
        "enabled": true,
        "tenantId": "23237f45-7fc4-40bb-8288-54c8cade491b",
        "teamId": "19:dFUt0xjVBXtaIpOi0YOLPVj_eM0XbZ6QoNyJVjqbJ5A1@thread.tacv2",
        "channelId": "19:dFUt0xjVBXtaIpOi0YOLPVj_eM0XbZ6QoNyJVjqbJ5A1@thread.tacv2",
        "entityId": "",
        "assignees": {
            "type": "customAssignee",
            "peoples": [
                {
                    "id": "4d7048b4-f1df-42fa-b749-f7edfa144d00",
                    "text": "MOD Administrator",
                    "secondaryText": "admin@M365x86451899.onmicrosoft.com",
                    "imageInitials": "MA",
                    "key": "undefined"
                },
                {
                    "id": "9bedbebc-1d1c-4de5-b7c7-3411500b01c6",
                    "text": "Alex Wilber",
                    "imageInitials": "AW",
                    "imageUrl": "",
                    "secondaryText": "AlexW@M365x86451899.OnMicrosoft.com",
                    "key": "undefined"
                },
                {
                    "id": "a237d5db-7b92-42c4-a66f-f70743013a01",
                    "text": "Adele Vance",
                    "imageInitials": "AV",
                    "imageUrl": "",
                    "secondaryText": "AdeleV@M365x86451899.OnMicrosoft.com",
                    "key": "undefined"
                },
                {
                    "id": "3ac96da4-c5ac-4dd3-a901-5990098724f2",
                    "text": "Lidia Holloway",
                    "imageInitials": "LH",
                    "imageUrl": "",
                    "secondaryText": "LidiaH@M365x86451899.OnMicrosoft.com",
                    "key": "undefined"
                }
            ]
        },
        "customFields": [],
        "customFieldsLeft": [],
        "customFieldsRight": [
            {
                "id": "fcfd41d6-5a25-4481-8f53-4e4c39f29bf9",
                "title": "Text field",
                "type": {
                    "key": "1_text",
                    "text": "Text",
                    "data": {
                        "icon": "HalfAlpha",
                        "color": "black"
                    }
                },
                "isMandatory": false,
                "status": "hidden",
                "defaultValue": "",
                "choosePeopleFrom": "",
                "options": [],
                "isSeeTicket": false,
                "isReceiveNotification": false,
                "isMultipleSection": false,
                "isMultiple": false,
                "isReceiveEmailNotification": false
            },
            {
                "id": "c32bb0c4-7977-4251-870d-ba30266154d7",
                "title": "Text area",
                "type": {
                    "key": "2_textarea",
                    "text": "Text Area",
                    "data": {
                        "icon": "List",
                        "color": "black"
                    }
                },
                "isMandatory": false,
                "status": "hidden",
                "defaultValue": "",
                "choosePeopleFrom": "",
                "options": [],
                "isSeeTicket": false,
                "isReceiveNotification": false,
                "isMultipleSection": false,
                "isMultiple": false,
                "isReceiveEmailNotification": false
            },
            {
                "id": "5059b714-4640-4d63-b223-7c2e04e07717",
                "title": "Date",
                "type": {
                    "key": "3_date",
                    "text": "Date",
                    "data": {
                        "icon": "EventDate",
                        "color": "black"
                    }
                },
                "isMandatory": false,
                "status": "hidden",
                "defaultValue": false,
                "choosePeopleFrom": "",
                "options": [],
                "isSeeTicket": false,
                "isReceiveNotification": false,
                "isMultipleSection": false,
                "isMultiple": false,
                "isReceiveEmailNotification": false
            },
            {
                "id": "60f13d4f-657a-4530-bc93-2c9c40aa6517",
                "title": "Toggle",
                "type": {
                    "key": "4_toggle",
                    "text": "Toggle",
                    "data": {
                        "icon": "ToggleLeft",
                        "color": "black"
                    }
                },
                "isMandatory": false,
                "status": "hidden",
                "defaultValue": "",
                "choosePeopleFrom": "",
                "options": [],
                "isSeeTicket": false,
                "isReceiveNotification": false,
                "isMultipleSection": false,
                "isMultiple": false,
                "isReceiveEmailNotification": false
            },
            {
                "id": "748426a1-da51-4936-9eb8-d4482cc5a6aa",
                "title": "Follower",
                "type": {
                    "key": "6_peoplepicker",
                    "text": "People Picker",
                    "data": {
                        "icon": "People",
                        "color": "black"
                    }
                },
                "isMandatory": false,
                "status": "hidden",
                "defaultValue": [
                    {
                        "id": "a237d5db-7b92-42c4-a66f-f70743013a01",
                        "text": "Adele Vance",
                        "imageInitials": "AV",
                        "imageUrl": "",
                        "secondaryText": "AdeleV@M365x86451899.OnMicrosoft.com"
                    }
                ],
                "choosePeopleFrom": {
                    "key": "2_members",
                    "text": "Team Members"
                },
                "options": [],
                "isSeeTicket": true,
                "isReceiveNotification": true,
                "isMultipleSection": false,
                "isMultiple": false,
                "isReceiveEmailNotification": false
            },
            {
                "id": "e0d5f23e-3994-449c-854a-c521e882e4f4",
                "title": "Follower 2",
                "type": {
                    "key": "6_peoplepicker",
                    "text": "People Picker",
                    "data": {
                        "icon": "People",
                        "color": "black"
                    }
                },
                "isMandatory": false,
                "status": "hidden",
                "defaultValue": [
                    {
                        "id": "9bedbebc-1d1c-4de5-b7c7-3411500b01c6",
                        "text": "Alex Wilber",
                        "secondaryText": "AlexW@M365x86451899.OnMicrosoft.com",
                        "imageInitials": "AW",
                        "key": "undefined"
                    }
                ],
                "choosePeopleFrom": {
                    "key": "1_owners",
                    "text": "Team Owners"
                },
                "options": [],
                "isSeeTicket": false,
                "isReceiveNotification": false,
                "isMultipleSection": true,
                "isMultiple": false,
                "isReceiveEmailNotification": false
            },
            {
                "id": "68112971-cc83-475e-9d12-5431133ee341",
                "title": "Email",
                "type": {
                    "key": "7_emailpicker",
                    "text": "Email Picker",
                    "data": {
                        "icon": "Mail",
                        "color": "black"
                    }
                },
                "isMandatory": false,
                "status": "hidden",
                "defaultValue": "",
                "choosePeopleFrom": "",
                "options": [
                    {
                        "key": "3827958f-8193-4d8a-ad8a-1c0b2ed68abb",
                        "text": "admin@gmail.com",
                        "isDefault": false
                    },
                    {
                        "key": "1776b78e-8bb8-4a34-bb8f-27194943b0ea",
                        "text": "andi@gmail.com",
                        "isDefault": false
                    }
                ],
                "isSeeTicket": false,
                "isReceiveNotification": false,
                "isMultipleSection": false,
                "isMultiple": false,
                "isReceiveEmailNotification": false
            },
            {
                "id": "a79e85c5-5c96-4092-b9a5-1118a170edb3",
                "title": "Email 2",
                "type": {
                    "key": "7_emailpicker",
                    "text": "Email Picker",
                    "data": {
                        "icon": "Mail",
                        "color": "black"
                    }
                },
                "isMandatory": false,
                "status": "hidden",
                "defaultValue": "",
                "choosePeopleFrom": "",
                "options": [
                    {
                        "key": "26caa2a2-aa48-46b9-97d4-950fae06ffac",
                        "text": "admin@gmail.com",
                        "isDefault": false
                    },
                    {
                        "key": "744c4499-328f-447c-8f9f-32aa05f0d4f4",
                        "text": "admin2@gmail.com",
                        "isDefault": false
                    }
                ],
                "isSeeTicket": false,
                "isReceiveNotification": false,
                "isMultipleSection": false,
                "isMultiple": true,
                "isReceiveEmailNotification": false
            },
            {
                "id": "64575b01-f01e-4e84-8b62-e88fa7875f14",
                "title": "List",
                "type": {
                    "key": "5_list",
                    "text": "List",
                    "data": {
                        "icon": "BulletedList",
                        "color": "black"
                    }
                },
                "isMandatory": false,
                "status": "hidden",
                "defaultValue": [],
                "choosePeopleFrom": "",
                "options": [
                    {
                        "key": "15ea8917-9336-4e64-9807-8ec0d0a67e72",
                        "text": "e",
                        "isDefault": false
                    },
                    {
                        "key": "9fabb7d5-bc90-4a58-ac3b-1760c9100d93",
                        "text": "b",
                        "isDefault": false
                    },
                    {
                        "key": "c6f13dd7-be7a-4a73-a0fb-280b84a3ec12",
                        "text": "c",
                        "isDefault": false
                    }
                ],
                "isSeeTicket": false,
                "isReceiveNotification": false,
                "isMultipleSection": false,
                "isMultiple": false,
                "isReceiveEmailNotification": false
            },
            {
                "id": "fd99ef6b-33d4-417c-92ef-a0a940394005",
                "title": "List 2",
                "type": {
                    "key": "5_list",
                    "text": "List",
                    "data": {
                        "icon": "BulletedList",
                        "color": "black"
                    }
                },
                "isMandatory": false,
                "status": "hidden",
                "defaultValue": [],
                "choosePeopleFrom": "",
                "options": [
                    {
                        "key": "9a843f76-8b6d-4a9e-95fe-e90a3913d25a",
                        "text": "a",
                        "isDefault": false
                    },
                    {
                        "key": "bce52b81-c9fd-4c17-be09-96a792966560",
                        "text": "b",
                        "isDefault": false
                    },
                    {
                        "key": "3ee4e583-daaf-46a4-a2d8-870feb542602",
                        "text": "c",
                        "isDefault": false
                    }
                ],
                "isSeeTicket": false,
                "isReceiveNotification": false,
                "isMultipleSection": false,
                "isMultiple": true,
                "isReceiveEmailNotification": false
            }
        ],
        "optionalFieldsLeft": [
            {
                "id": "5_tags",
                "title": "Etiquettes",
                "status": "visible",
                "type": "dropdown",
                "isMandatory": false,
                "defaultValue": "",
                "choosePeopleFrom": "",
                "isSeeTicket": false,
                "isReceiveNotification": false,
                "isMultipleSection": false
            },
            {
                "id": "1_department",
                "title": "Department",
                "status": "visible",
                "type": "dropdown",
                "isMandatory": false,
                "defaultValue": "",
                "choosePeopleFrom": "",
                "isSeeTicket": false,
                "isReceiveNotification": false,
                "isMultipleSection": false
            },
            {
                "id": "2_priority",
                "title": "Priorité",
                "status": "visible",
                "type": "dropdown",
                "isMandatory": false,
                "defaultValue": "",
                "choosePeopleFrom": "",
                "isSeeTicket": false,
                "isReceiveNotification": false,
                "isMultipleSection": false
            }
        ],
        "optionalFieldsRight": [
            {
                "id": "3_category",
                "title": "Category",
                "status": "visible",
                "type": "dropdown",
                "isMandatory": false,
                "defaultValue": "",
                "choosePeopleFrom": "",
                "isSeeTicket": false,
                "isReceiveNotification": false,
                "isMultipleSection": false
            },
            {
                "id": "4_expecteddate",
                "title": "Date prévue",
                "status": "visible",
                "type": "date",
                "isMandatory": false,
                "defaultValue": "",
                "choosePeopleFrom": "",
                "isSeeTicket": false,
                "isReceiveNotification": false,
                "isMultipleSection": false
            }
        ],
        "assigneeRules": [
            {
                "id": "0c8ff992-4660-42fe-a657-ec56924228f7",
                "type": "2_category",
                "condition": [
                    "Bug"
                ],
                "assignee": [
                    {
                        "id": "a237d5db-7b92-42c4-a66f-f70743013a01",
                        "text": "Adele Vance",
                        "imageInitials": "AV",
                        "imageUrl": "",
                        "secondaryText": "AdeleV@M365x86451899.OnMicrosoft.com",
                        "key": "undefined"
                    }
                ],
                "enable": true
            },
            {
                "id": "fda3583f-5561-4101-b9a0-a0670bc67f68",
                "type": "1_department",
                "condition": [
                    "IT"
                ],
                "assignee": [
                    {
                        "id": "4d7048b4-f1df-42fa-b749-f7edfa144d00",
                        "text": "MOD Administrator",
                        "secondaryText": "admin@M365x86451899.onmicrosoft.com",
                        "imageInitials": "MA",
                        "key": "undefined"
                    }
                ],
                "enable": true
            },
            {
                "id": "e289f4a1-1ae2-4478-bbec-31399bc8ef03",
                "type": "3_priority",
                "condition": [
                    "4_Urgent",
                    "3_Important"
                ],
                "assignee": [
                    {
                        "id": "9bedbebc-1d1c-4de5-b7c7-3411500b01c6",
                        "text": "Alex Wilber",
                        "imageInitials": "AW",
                        "imageUrl": "",
                        "secondaryText": "AlexW@M365x86451899.OnMicrosoft.com",
                        "key": "undefined"
                    }
                ],
                "enable": true
            },
            {
                "id": "111be26c-813c-4c59-9401-75a048b4d29c",
                "type": "4_tag",
                "condition": [
                    "d800cfbd-b524-4a4f-b3d0-f540aa16fd30_v1.1",
                    "4382646c-948d-4ac0-94ee-2dee6f1f82c4_hotfix"
                ],
                "assignee": [
                    {
                        "id": "3ac96da4-c5ac-4dd3-a901-5990098724f2",
                        "text": "Lidia Holloway",
                        "imageInitials": "LH",
                        "imageUrl": "",
                        "secondaryText": "LidiaH@M365x86451899.OnMicrosoft.com",
                        "key": "undefined"
                    }
                ],
                "enable": true
            }
        ],
        "defaultRuleAssignee": [
            {
                "id": "999",
                "type": "999_otherwise",
                "condition": "Otherwise",
                "assignee": [],
                "enable": true
            }
        ],
        "isAutoAssignIdleTickets": true,
        "dayBeforeTicketsIdle": 2,
        "alertNotification": {
            "expectedDate": {
                "isDueInNotifOn": true,
                "dueInNotifDays": 3,
                "isDueTodayNotifOn": true,
                "isOverdueNotifOn": true,
                "overdueNotifDays": 7
            },
            "serviceLevelAgreement": {
                "slaWeek": "1_weekdays",
                "slaStartTime": {
                    "hours": 2,
                    "minutes": 0
                },
                "slaEndTime": {
                    "hours": 15,
                    "minutes": 0
                },
                "isBreachesFirstResponseTime": true,
                "breachesHoursFirstResponseTime": 0,
                "breachesAssigneeFirstResponseTime": [
                    {
                        "id": "a237d5db-7b92-42c4-a66f-f70743013a01",
                        "text": "Adele Vance",
                        "imageInitials": "AV",
                        "imageUrl": "",
                        "secondaryText": "AdeleV@M365x86451899.OnMicrosoft.com"
                    }
                ],
                "isFrtUrgent": true,
                "frtUrgentDuration": 1,
                "frtUrgentTime": "2_hours",
                "isFrtImportant": false,
                "frtImportantDuration": 1,
                "frtImportantTime": "2_hours",
                "isFrtMedium": false,
                "frtMediumDuration": 1,
                "frtMediumTime": "2_hours",
                "isFrtLow": false,
                "frtLowDuration": 1,
                "frtLowTime": "2_hours",
                "isBreachesResolutionTime": true,
                "breachesHoursResolutionTime": 0,
                "breachesAssigneeResolutionTime": [
                    {
                        "id": "9bedbebc-1d1c-4de5-b7c7-3411500b01c6",
                        "text": "Alex Wilber",
                        "imageInitials": "AW",
                        "imageUrl": "",
                        "secondaryText": "AlexW@M365x86451899.OnMicrosoft.com"
                    }
                ],
                "isRtUrgent": true,
                "rtUrgentDuration": 2,
                "rtUrgentTime": "2_hours",
                "isRtImportant": false,
                "rtImportantDuration": 1,
                "rtImportantTime": "2_hours",
                "isRtMedium": false,
                "rtMediumDuration": 1,
                "rtMediumTime": "2_hours",
                "isRtLow": false,
                "rtLowDuration": 1,
                "rtLowTime": "2_hours"
            }
        },
        "userPermission": [
            {
                "key": "title",
                "selectedKey": "1_allCanEdit"
            },
            {
                "key": "description",
                "selectedKey": "1_allCanEdit"
            },
            {
                "key": "assignee",
                "selectedKey": "1_allCanEdit"
            },
            {
                "key": "expectedDate",
                "selectedKey": "1_allCanEdit"
            },
            {
                "key": "priority",
                "selectedKey": "1_allCanEdit"
            },
            {
                "key": "748426a1-da51-4936-9eb8-d4482cc5a6aa",
                "selectedKey": "1_allCanEdit"
            },
            {
                "key": "fcfd41d6-5a25-4481-8f53-4e4c39f29bf9",
                "selectedKey": "1_allCanEdit"
            },
            {
                "key": "c32bb0c4-7977-4251-870d-ba30266154d7",
                "selectedKey": "1_allCanEdit"
            },
            {
                "key": "5059b714-4640-4d63-b223-7c2e04e07717",
                "selectedKey": "1_allCanEdit"
            },
            {
                "key": "60f13d4f-657a-4530-bc93-2c9c40aa6517",
                "selectedKey": "1_allCanEdit"
            },
            {
                "key": "dcbe0c28-10f8-4c0e-bd78-eeae140f0741",
                "selectedKey": "1_allCanEdit"
            },
            {
                "key": "68112971-cc83-475e-9d12-5431133ee341",
                "selectedKey": "1_allCanEdit"
            },
            {
                "key": "64575b01-f01e-4e84-8b62-e88fa7875f14",
                "selectedKey": "1_allCanEdit"
            },
            {
                "key": "fd99ef6b-33d4-417c-92ef-a0a940394005",
                "selectedKey": "1_allCanEdit"
            },
            {
                "key": "a79e85c5-5c96-4092-b9a5-1118a170edb3",
                "selectedKey": "1_allCanEdit"
            },
            {
                "key": "e0d5f23e-3994-449c-854a-c521e882e4f4",
                "selectedKey": "1_allCanEdit"
            }
        ],
        "userList": {
            "owners": [
                {
                    "id": "4d7048b4-f1df-42fa-b749-f7edfa144d00",
                    "text": "MOD Administrator",
                    "secondaryText": "admin@M365x86451899.onmicrosoft.com",
                    "imageInitials": "MA"
                },
                {
                    "id": "9bedbebc-1d1c-4de5-b7c7-3411500b01c6",
                    "text": "Alex Wilber",
                    "secondaryText": "AlexW@M365x86451899.OnMicrosoft.com",
                    "imageInitials": "AW"
                }
            ],
            "members": [
                {
                    "id": "cd03b2d0-18ee-4ca0-8b77-727fd602826b",
                    "text": "Debra Berger",
                    "secondaryText": "DebraB@M365x86451899.OnMicrosoft.com",
                    "imageInitials": "DB",
                    "key": "undefined"
                },
                {
                    "id": "c940c840-e888-499e-9b6f-6840b325a6a7",
                    "text": "Allan Deyoung",
                    "secondaryText": "AllanD@M365x86451899.OnMicrosoft.com",
                    "imageInitials": "AD",
                    "key": "undefined"
                },
                {
                    "id": "edd8baf8-b94d-4e03-ae22-ef2890af9397",
                    "text": "Christie Cline",
                    "secondaryText": "ChristieC@M365x86451899.OnMicrosoft.com",
                    "imageInitials": "CC",
                    "key": "undefined"
                }
            ]
        },
        "notifyOnNoAssignee": false,
        "noAssigneeNotifRecipients": [],
        "appVersion": "1.25.0",
        "workflows": {
            "ticket": [
                {
                    "nodes": [
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
                                "x": 441.63182249600595,
                                "y": -395.619285456832
                            },
                            "data": {
                                "label": "In Progress",
                                "recordResolutionSLA": false,
                                "color": "#1cd9d6"
                            },
                            "targetPosition": "left",
                            "sourcePosition": "right",
                            "positionAbsolute": {
                                "x": 441.63182249600595,
                                "y": -395.619285456832
                            },
                            "dragging": false
                        },
                        {
                            "width": 175,
                            "height": 40,
                            "id": "Resolved",
                            "type": "textFieldNode",
                            "position": {
                                "x": 192.4423425992039,
                                "y": 48.0957024410327
                            },
                            "data": {
                                "label": "Resolved",
                                "recordResolutionSLA": true,
                                "color": "#34eb71"
                            },
                            "targetPosition": "left",
                            "sourcePosition": "right",
                            "positionAbsolute": {
                                "x": 192.4423425992039,
                                "y": 48.0957024410327
                            },
                            "dragging": false
                        },
                        {
                            "id": "Closed",
                            "type": "textFieldNode",
                            "position": {
                                "x": 1127.1812215977077,
                                "y": 83.24635251977895
                            },
                            "data": {
                                "label": "Closed",
                                "recordResolutionSLA": true,
                                "color": "#28b05f"
                            },
                            "targetPosition": "left",
                            "sourcePosition": "right",
                            "positionAbsolute": {
                                "x": 1127.1812215977077,
                                "y": 83.24635251977895
                            },
                            "dragging": false
                        },
                        {
                            "id": "Reopened",
                            "type": "textFieldNode",
                            "position": {
                                "x": -195.23708645230437,
                                "y": -512.0035164745823
                            },
                            "data": {
                                "label": "Reopened",
                                "recordResolutionSLA": false,
                                "color": "#ff970f"
                            },
                            "targetPosition": "left",
                            "sourcePosition": "right",
                            "positionAbsolute": {
                                "x": -195.23708645230437,
                                "y": -512.0035164745823
                            },
                            "dragging": false
                        },
                        {
                            "width": 175,
                            "height": 40,
                            "id": "On Hold",
                            "type": "textFieldNode",
                            "position": {
                                "x": 528.8881517824603,
                                "y": -703.3809818304152
                            },
                            "data": {
                                "label": "On Hold",
                                "recordResolutionSLA": false,
                                "color": "#bfa640"
                            },
                            "targetPosition": "left",
                            "sourcePosition": "right",
                            "positionAbsolute": {
                                "x": 528.8881517824603,
                                "y": -703.3809818304152
                            },
                            "dragging": false
                        },
                        {
                            "width": 175,
                            "height": 40,
                            "id": "Test OK",
                            "type": "textFieldNode",
                            "position": {
                                "x": 1053.6881517824604,
                                "y": -389.3809818304152
                            },
                            "data": {
                                "label": "Tested OK",
                                "recordResolutionSLA": true,
                                "color": "#b3e6bf"
                            },
                            "targetPosition": "left",
                            "sourcePosition": "right",
                            "positionAbsolute": {
                                "x": 1053.6881517824604,
                                "y": -389.3809818304152
                            },
                            "dragging": false
                        },
                        {
                            "width": 175,
                            "height": 40,
                            "id": "Ready in Test",
                            "type": "textFieldNode",
                            "position": {
                                "x": 975.6881517824604,
                                "y": -713.3809818304152
                            },
                            "data": {
                                "label": "Ready in Test",
                                "recordResolutionSLA": true,
                                "color": "#a940bf"
                            },
                            "targetPosition": "left",
                            "sourcePosition": "right",
                            "positionAbsolute": {
                                "x": 975.6881517824604,
                                "y": -713.3809818304152
                            },
                            "dragging": false
                        },
                        {
                            "id": "Approved",
                            "type": "textFieldNode",
                            "position": {
                                "x": 109.68815178246035,
                                "y": -301.3809818304152
                            },
                            "data": {
                                "label": "Approved",
                                "recordResolutionSLA": false,
                                "color": "#be40bf"
                            },
                            "targetPosition": "left",
                            "sourcePosition": "right",
                            "positionAbsolute": {
                                "x": 109.68815178246035,
                                "y": -301.3809818304152
                            },
                            "dragging": false
                        }
                    ],
                    "edges": [
                        {
                            "id": "bebee65c-974c-4afc-893e-b03672c168b4",
                            "type": "labeledEdge",
                            "label": "Reject Ticket",
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
                            }
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
                        },
                        {
                            "id": "b93e1972-f153-4da8-a30e-265bdc827fd0",
                            "type": "labeledEdge",
                            "label": "On Hold Ticket",
                            "source": "In Progress",
                            "sourceHandle": null,
                            "target": "On Hold",
                            "targetHandle": null,
                            "markerEnd": {
                                "type": "arrowclosed",
                                "strokeWidth": 2,
                                "width": 25,
                                "height": 25
                            },
                            "data": {
                                "isEditing": false,
                                "recordComment": true,
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "iconName": "Clock"
                            }
                        },
                        {
                            "id": "29a14281-023e-47db-97bc-a72de1bb3b9d",
                            "type": "labeledEdge",
                            "label": "Resume Ticket",
                            "source": "On Hold",
                            "sourceHandle": null,
                            "target": "In Progress",
                            "targetHandle": null,
                            "markerEnd": {
                                "type": "arrowclosed",
                                "strokeWidth": 2,
                                "width": 25,
                                "height": 25
                            },
                            "data": {
                                "isEditing": false,
                                "recordComment": true,
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "iconName": "Forward"
                            }
                        },
                        {
                            "id": "4bb7b070-9554-470f-919c-0978ac1a2156",
                            "type": "labeledEdge",
                            "label": "Close Ticket",
                            "source": "On Hold",
                            "sourceHandle": null,
                            "target": "Closed",
                            "targetHandle": null,
                            "markerEnd": {
                                "type": "arrowclosed",
                                "strokeWidth": 2,
                                "width": 25,
                                "height": 25
                            },
                            "data": {
                                "isEditing": false,
                                "recordComment": true,
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "iconName": "CheckMark"
                            }
                        },
                        {
                            "id": "8ae5381f-17bb-42ae-83da-a76feb65d7b1",
                            "type": "labeledEdge",
                            "label": "Start Ticket",
                            "source": "Reopened",
                            "sourceHandle": null,
                            "target": "In Progress",
                            "targetHandle": null,
                            "markerEnd": {
                                "type": "arrowclosed",
                                "strokeWidth": 2,
                                "width": 25,
                                "height": 25
                            },
                            "data": {
                                "isEditing": false,
                                "recordComment": true,
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "iconName": "Forward"
                            }
                        },
                        {
                            "id": "7b66c939-6fcd-46a0-b790-cd3237e55baa",
                            "type": "labeledEdge",
                            "label": "On Hold Ticket",
                            "source": "Reopened",
                            "sourceHandle": null,
                            "target": "On Hold",
                            "targetHandle": null,
                            "markerEnd": {
                                "type": "arrowclosed",
                                "strokeWidth": 2,
                                "width": 25,
                                "height": 25
                            },
                            "data": {
                                "isEditing": false,
                                "recordComment": true,
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "iconName": "Clock"
                            }
                        },
                        {
                            "id": "ec2ec001-27f8-4ab7-b4ba-7157605ce738",
                            "type": "labeledEdge",
                            "label": "Delivered to Production",
                            "source": "Test OK",
                            "sourceHandle": null,
                            "target": "Closed",
                            "targetHandle": null,
                            "markerEnd": {
                                "type": "arrowclosed",
                                "strokeWidth": 2,
                                "width": 25,
                                "height": 25
                            },
                            "data": {
                                "isEditing": false,
                                "recordComment": true,
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "iconName": "Archive"
                            }
                        },
                        {
                            "id": "fcb6887e-4c1d-4ab9-b1bf-7b13234aadff",
                            "type": "labeledEdge",
                            "label": "Test OK",
                            "source": "Ready in Test",
                            "sourceHandle": null,
                            "target": "Test OK",
                            "targetHandle": null,
                            "markerEnd": {
                                "type": "arrowclosed",
                                "strokeWidth": 2,
                                "width": 25,
                                "height": 25
                            },
                            "data": {
                                "isEditing": false,
                                "recordComment": true,
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "iconName": "CheckMark"
                            }
                        },
                        {
                            "id": "3361c45b-fbf6-4745-bdd9-3c82aa7162b9",
                            "type": "labeledEdge",
                            "label": "Ready to Test",
                            "source": "Resolved",
                            "sourceHandle": null,
                            "target": "Ready in Test",
                            "targetHandle": null,
                            "markerEnd": {
                                "type": "arrowclosed",
                                "strokeWidth": 2,
                                "width": 25,
                                "height": 25
                            },
                            "data": {
                                "isEditing": false,
                                "recordComment": true,
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "iconName": "RecycleBin"
                            }
                        },
                        {
                            "id": "8bf9d429-b4f8-44ac-9d0d-27f2cc30993f",
                            "type": "labeledEdge",
                            "label": "Test Fail",
                            "source": "Ready in Test",
                            "sourceHandle": null,
                            "target": "Reopened",
                            "targetHandle": null,
                            "markerEnd": {
                                "type": "arrowclosed",
                                "strokeWidth": 2,
                                "width": 25,
                                "height": 25
                            },
                            "data": {
                                "isEditing": false,
                                "recordComment": true,
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "iconName": "Cancel"
                            }
                        },
                        {
                            "id": "c94bb9dc-2ce8-4f72-83fa-03c289a5791a",
                            "type": "labeledEdge",
                            "label": "Start Ticket",
                            "source": "Approved",
                            "sourceHandle": null,
                            "target": "In Progress",
                            "targetHandle": null,
                            "markerEnd": {
                                "type": "arrowclosed",
                                "strokeWidth": 2,
                                "width": 25,
                                "height": 25
                            },
                            "data": {
                                "isEditing": false,
                                "recordComment": true,
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "iconName": "Forward"
                            }
                        },
                        {
                            "id": "1e3b8b5f-44cf-4340-8a75-d209a749cb17",
                            "type": "labeledEdge",
                            "label": "Resolve Ticket",
                            "source": "Approved",
                            "sourceHandle": null,
                            "target": "Resolved",
                            "targetHandle": null,
                            "markerEnd": {
                                "type": "arrowclosed",
                                "strokeWidth": 2,
                                "width": 25,
                                "height": 25
                            },
                            "data": {
                                "isEditing": false,
                                "recordComment": true,
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "iconName": "CheckMark"
                            }
                        },
                        {
                            "id": "f623b8df-ffc7-45cf-909c-8657a7d8971a",
                            "type": "labeledEdge",
                            "label": "Approve Ticket",
                            "source": "Open",
                            "sourceHandle": null,
                            "target": "Approved",
                            "targetHandle": null,
                            "markerEnd": {
                                "type": "arrowclosed",
                                "color": "#0078D4"
                            },
                            "data": {
                                "isEditing": false,
                                "recordComment": true,
                                "authorizedUsers": [
                                    "assignee",
                                    "owner"
                                ],
                                "iconName": "CheckMark"
                            },
                            "selected": true,
                            "style": {
                                "strokeWidth": 2,
                                "stroke": "#0078D4"
                            }
                        },
                        {
                            "id": "88a7304f-2d7e-47fc-8ef9-e1f6b7d80e69",
                            "type": "labeledEdge",
                            "label": "Ready to Test",
                            "source": "In Progress",
                            "sourceHandle": null,
                            "target": "Ready in Test",
                            "targetHandle": null,
                            "markerEnd": {
                                "type": "arrowclosed",
                                "strokeWidth": 2,
                                "width": 25,
                                "height": 25
                            },
                            "data": {
                                "isEditing": false,
                                "recordComment": true,
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "iconName": "RecycleBin"
                            }
                        },
                        {
                            "id": "83fe10fe-b3a4-43bc-93b2-9ae40b6c6df6",
                            "type": "labeledEdge",
                            "label": "Close Ticket",
                            "source": "In Progress",
                            "sourceHandle": null,
                            "target": "Closed",
                            "targetHandle": null,
                            "markerEnd": {
                                "type": "arrowclosed",
                                "strokeWidth": 2,
                                "width": 25,
                                "height": 25
                            },
                            "data": {
                                "isEditing": false,
                                "recordComment": true,
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "iconName": "CheckMark"
                            }
                        }
                    ]
                }
            ],
            "isCustomWorkflow": true
        },
        "color": "#2d0b01",
        "favoriteFilters": [
            {
                "id": "65739afd-7b17-4ed0-b3a7-c4ef6b0d3f97",
                "creatorId": "4d7048b4-f1df-42fa-b749-f7edfa144d00",
                "name": "Tes",
                "visibility": "personal",
                "filter": {
                    "search": "ticket",
                    "priority": "2_medium",
                    "tags": "",
                    "orderBy": "title",
                    "order": "asc",
                    "statusFilterKey": "unresolved ticket",
                    "status": "OpenIn ProgressReopened",
                    "assigneeId": "",
                    "unassigned": false,
                    "column": []
                },
                "columnsSetting": [
                    {
                        "key": "column8",
                        "sorted": "none",
                        "width": 406,
                        "isVisible": true,
                        "isRender": true
                    },
                    {
                        "key": "column1",
                        "sorted": "none",
                        "width": 35,
                        "isVisible": true,
                        "isRender": true
                    },
                    {
                        "key": "column2",
                        "sorted": "asc",
                        "width": 225,
                        "isVisible": true,
                        "isRender": true
                    },
                    {
                        "key": "column3",
                        "sorted": "none",
                        "width": 60,
                        "isVisible": true,
                        "isRender": true
                    },
                    {
                        "key": "column4",
                        "sorted": "none",
                        "width": 100,
                        "isVisible": true,
                        "isRender": true
                    },
                    {
                        "key": "column17",
                        "sorted": "none",
                        "width": 100,
                        "isVisible": true,
                        "isRender": true
                    },
                    {
                        "key": "column5",
                        "sorted": "none",
                        "width": 100,
                        "isVisible": true,
                        "isRender": true
                    },
                    {
                        "key": "column18",
                        "sorted": "none",
                        "width": 100,
                        "isVisible": true,
                        "isRender": true
                    },
                    {
                        "key": "column6",
                        "sorted": "none",
                        "width": 80,
                        "isVisible": true,
                        "isRender": true
                    },
                    {
                        "key": "column11",
                        "sorted": "none",
                        "width": 80,
                        "isVisible": true,
                        "isRender": true
                    },
                    {
                        "key": "column7",
                        "sorted": "none",
                        "width": 80,
                        "isVisible": true,
                        "isRender": true
                    },
                    {
                        "key": "column0",
                        "sorted": "none",
                        "width": 50,
                        "isVisible": true,
                        "isRender": true
                    },
                    {
                        "key": "column12",
                        "sorted": "none",
                        "width": 100,
                        "isVisible": true,
                        "isRender": true
                    },
                    {
                        "key": "column15",
                        "sorted": "none",
                        "width": 100,
                        "isVisible": true,
                        "isRender": true
                    },
                    {
                        "key": "column13",
                        "sorted": "none",
                        "width": 100,
                        "isVisible": true,
                        "isRender": true
                    },
                    {
                        "key": "column16",
                        "sorted": "none",
                        "width": 100,
                        "isVisible": true,
                        "isRender": true
                    },
                    {
                        "key": "column14",
                        "sorted": "none",
                        "width": 120,
                        "isVisible": true,
                        "isRender": true
                    },
                    {
                        "key": "column9",
                        "sorted": "none",
                        "width": 160,
                        "isVisible": false,
                        "isRender": true
                    },
                    {
                        "key": "column10",
                        "sorted": "none",
                        "width": 160,
                        "isVisible": false,
                        "isRender": true
                    }
                ]
            }
        ],
        "id": "4f6f3185-964c-4b59-9a69-f69fd1cc8e24",
        "userManagementMode": "manual",
        "idleTicketAssignedTo": [
            {
                "id": "a237d5db-7b92-42c4-a66f-f70743013a01",
                "text": "Adele Vance",
                "imageInitials": "AV",
                "imageUrl": "",
                "secondaryText": "AdeleV@M365x86451899.OnMicrosoft.com"
            }
        ],
        "api": {
            "primaryKey": "703194c31b074ba0a5d3db9a7da650e0",
            "secondaryKey": "77e9500ca3c8466d9a1a2c088bb30999"
        },
        // "resolution": "Fixed",
        "isAutomaticAssignTickets": true,
        automationRules: [],
        defaultAutomationRules: []
    }
    let ticket: ICase = {
        "id": "c7658452-5ddd-41d7-86a1-a9c4c931dbab",
        "ticketId": 169,
        "title": "One hundred sixty fourth ticket",
        "status": "Open",
        "requestorId": "4d7048b4-f1df-42fa-b749-f7edfa144d00",
        "requestorName": "MOD Administrator",
        "requestorEmail": "admin@M365x86451899.onmicrosoft.com",
        "customFields": {
            "74f0e0e4-b2fe-4783-9add-6befa473591c": [
                {
                    "id": "a237d5db-7b92-42c4-a66f-f70743013a01",
                    "text": "Adele Vance",
                    "imageInitials": "AV",
                    "imageUrl": "",
                    "secondaryText": "AdeleV@M365x86451899.OnMicrosoft.com"
                }
            ],
            "dcbe0c28-10f8-4c0e-bd78-eeae140f0741": [
                "50ed5a94-2c4f-4c9e-b837-f5eaacfd8e55"
            ]
        },
        "priority": "3_Important",
        "department": "IT",
        "assigneeId": "9bedbebc-1d1c-4de5-b7c7-3411500b01c6",
        "category": "",
        "instanceId": "21d6788b-103d-49a6-ba6e-896c5782d62d",
        "expectedDate": "",
        "assigneeName": "Alex Wilber",
        "assigneeEmail": "AlexW@M365x86451899.OnMicrosoft.com",
        "createdDateTime": "2024-05-31T06:47:00.418Z",
        "tags": [],
        "lastInteraction": "2024-05-31T06:48:24.743Z",
        "firstTimeResponse": "2024-05-31T06:48:23.683Z",
        "timeResolution": "",
        "isFrtBreached": false,
        "isRtBreached": false,
        "isFrtEscalated": false,
        "isRtEscalated": false,
        "createdBy": {
            "id": "4d7048b4-f1df-42fa-b749-f7edfa144d00",
            "text": "MOD Administrator",
            "secondaryText": "admin@M365x86451899.onmicrosoft.com"
        },
        "lastUpdatedBy": {
            "id": "cd03b2d0-18ee-4ca0-8b77-727fd602826b",
            "text": "Queen Debra Huraaa",
            "secondaryText": "DebraB@M365x86451899.OnMicrosoft.com"
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
            }
        ],
        "isCustomWorkflow": false,
        "resolvedStatus": [
            "Resolved",
            "Closed"
        ],
        "description": "",
        "attachments": [],
        "resolution": ""
    }

    /**
     * Convert old automation into new automation data structure
     * 
     * @param instance 
     * @returns instace
     */
    function convertOldToNewAutomation(instance: IInstance) {

        /**
         * It supposed to convert old key to new key that will be used, except for otherwise rule
         */
        const oldKey = {
            "1_department": ConditionKey.DepartmentIncludesAny,
            "2_category": ConditionKey.CategoryIncludesAny,
            "3_priority": ConditionKey.PriorityIsAny,
            "4_tag": ConditionKey.TagsIncludesAll,
        }

        const newAutomationRules: IAutomation[] = instance.assigneeRules.map((item) => {
            return {
                id: item.id,
                conditions: [{ id: uuidv4(), key: oldKey[item.type], value: item.condition }],
                actions: [{ id: uuidv4(), key: "assignee", value: item.assignee }],
                isStopProcessingMoreRules: false,
                enable: item.enable
            }
        });
        const otherwise: IAutomation[] = instance.defaultRuleAssignee.map((item) => {
            return {
                id: item.id,
                conditions: [{ id: item.id, key: item.type, value: item.condition }],
                actions: item.assignee.length > 0 ? [{ id: uuidv4(), key: "assignee", value: item.assignee }] : [],
                isStopProcessingMoreRules: false,
                enable: item.enable
            }
        });

        instance = {
            ...instance,
            assigneeRules: [],
            defaultRuleAssignee: [],
            automationRules: newAutomationRules,
            defaultAutomationRules: otherwise
        }
        return instance;
    }

    function applyAutomationRules(instance: IInstance, ticket: ICase) {
        // console.log(instance);
        // console.log(ticket);
        /**
         * Apply if there is no automation rules, so we apply the defaultAutomation
         */
        if (instance?.defaultAutomationRules[0]?.actions?.length > 0) {
            instance.defaultAutomationRules[0].actions.forEach(item => {
                const key = item.key;
                const value = item.value;
                switch (key) {
                    case "assignTo":
                        ticket.assigneeId = value[0]?.id;
                        ticket.assigneeName = value[0]?.text;
                        ticket.assigneeEmail = value[0]?.secondaryText
                        break;
                    case "priorityTo":
                        ticket.priority = value;
                        break;
                    case "addTags":
                        ticket.tags = value.filter((val) => !!!ticket.tags?.some((tag) => (val.tagCategoryId === tag.tagCategoryId) && (val.text === tag.text)));
                        break;
                    default:
                        /**
                         * Set value in custom field from action
                         */
                        ticket.customFields[key] = value;
                        break;
                }

            });
        }

        /**
         * We have to filter the enable automation
         */
        const activeRules: IAutomation[] = instance.automationRules?.filter((automation) => automation.enable);

        if (activeRules?.length > 0) {
            activeRules.forEach((item: IAutomation) => {

                /**
                 * The conditions we use AND opeartor
                 */
                const isValidCondition = item.conditions.map((condition) => {
                    const key = condition.key;
                    const value = condition.value;
                    switch (key) {
                        case "1_department":
                            return (value?.length > 0) && value.includes(ticket.department);
                        case "2_category":
                            return (value?.length > 0) && value.includes(ticket.category);
                        case "3_priority":
                            return (value?.length > 0) && value.includes(ticket.priority);
                        case "4_tag":
                            if (value?.length > 0) {
                                if (!!!ticket.tags) return (!!!ticket.tags);
                                const tagStringTicket: string[] = ticket.tags.map((tag) => `${tag.tagCategoryId}_${tag.text}`);
                                return (value.sort().join(",") === tagStringTicket.sort().join(","))
                            }
                            break;
                        case "5_requestor":
                            if ((value?.length > 0) && (value[0])) return (ticket.requestorId === value[0].id);
                            break;
                        case "6_requestorEmail":
                            return (value && (value === ticket.requestorId));
                        case "7_title":
                            return (value && (value.toLowerCase() === ticket.title?.toLowerCase()))
                        case "8_description":
                            /**
                             * We assume desciprtion in ticket has been sterelization from html tag
                             */
                            return (value && (value.toLowerCase() === ticket.description?.toLowerCase()))
                        case "9_expectedDate":
                            return (value && ticket?.expectedDate) && (moment(value).format("DD-MM-YYYY") === moment(ticket.expectedDate).format("DD-MM-YYYY"));
                        default:
                            /**
                             * Custom field handling
                             */
                            const allowedType = [...instance.customFieldsLeft, ...instance.customFieldsRight]
                                ?.filter((item) => ["1_text", "2_textarea", "5_list"]
                                    .includes(item?.type?.key))?.find((item) => item.id === key);

                            const customFieldTicket = ticket.customFields[key];
                            if (allowedType && customFieldTicket) {
                                /**
                                 * Handle list & string type
                                 */
                                if (Array.isArray(customFieldTicket) && customFieldTicket?.length > 0) return customFieldTicket.some((item) => value.includes(item));
                                else return (customFieldTicket.toLowerCase() === value.toLowerCase())
                            }

                            break;
                    }
                })?.every((value) => value);

                /**
                 * IF condition is valid, we run actions
                 */
                if (isValidCondition && item.actions.length > 0) {
                    item.actions.forEach((action) => {
                        const key = action.key;
                        const value = action.value;
                        switch (key) {
                            case "assignTo":
                                ticket.assigneeId = value[0]?.id;
                                ticket.assigneeName = value[0]?.text;
                                ticket.assigneeEmail = value[0]?.secondaryText
                                break;
                            case "priorityTo":
                                ticket.priority = value;
                                break;
                            case "addTags":
                                ticket.tags = value.filter((val) => !!!ticket.tags?.some((tag) => (val.tagCategoryId === tag.tagCategoryId) && (val.text === tag.text)));
                                break;
                            default:
                                /**
                                 * Set value in custom field from action
                                 */
                                ticket.customFields[key] = value;
                                break;
                        }
                    });

                }
            });

        }

        return ticket;
    }

    /**
     * This mean we need to convert old to new automation then we patch instance
     */

    if (instance.defaultRuleAssignee.length > 0) {
        instance = convertOldToNewAutomation(instance);
        /**
         * Then patch instance here
         */
    }
    instance = {
        ...instance,
        automationRules: [
            ...instance.automationRules,
            {
                "id": "1",
                "conditions": [
                    {
                        "id": "111",
                        "key": "3_priority",
                        "value": [
                            "4_Urgent",
                            "3_Important"
                        ]
                    },
                    {
                        "id": "222",
                        "key": "1_department",
                        "value": [
                            "IT"
                        ]
                    },

                ],
                "actions": [
                    {
                        "id": "333",
                        "key": "assignTo",
                        "value": [
                            {
                                "id": "9bedbebc-1d1c-4de5-b7c7-3411500b01c6",
                                "text": "Alex Wilber",
                                "imageInitials": "AW",
                                "imageUrl": "",
                                "secondaryText": "AlexW@M365x86451899.OnMicrosoft.com",
                                "key": "undefined"
                            }
                        ]
                    },
                    {
                        "id": "444",
                        "key": "68112971-cc83-475e-9d12-5431133ee341",
                        "value": [
                            "1776b78e-8bb8-4a34-bb8f-27194943b0ea"
                        ]
                    }
                ],
                "isStopProcessingMoreRules": false,
                "enable": true
            }
        ]
    }
    // console.log(instance);
    const res = applyAutomationRules(instance, ticket);
    // console.log(res);

    /**
    * end back end side
    */


    const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
    const [optionConditions, setOptionConditions] = useState<IDropdownOption[]>([]);
    const [optionActions, setOptionActions] = useState<IDropdownOption[]>([]);
    const [conditions, setConditions] = useState<ICondition[]>([]);
    const [actions, setActions] = useState<ICondition[]>([]);

    /**
     * id is condition id, because we can have multiple same condition so we need id to different it
     */
    const handleChangeCondition = (items: ICondition[]) => {
        console.log(items);
        setConditions(items);
    }
    const handleChangeAction = (items: ICondition[]) => {
        console.log(items);
        setActions(items);
    }

    // const onChange = (id: string, value: any) => {
    //     // console.log(id);
    //     // console.log(value);
    //     const newCondition: ICondition[] = conditions.map((item) => (item.id === id) ? { ...item, value: value } : item);
    //     setConditions(newCondition);
    // }

    // const addCondition = () => setConditions(conditions.concat({ id: uuidv4(), key: "", value: "" }));

    // const deleteCondition = (id: string) => setConditions(conditions?.filter((condition) => condition.id !== id));

    function loadData() {
        let options: IDropdownOption[] = [
            { key: 'conditions', text: 'Conditions', itemType: DropdownMenuItemType.Header },
            { key: '5_requestor', text: 'Requestor' },
            { key: '6_requestorEmail', text: 'Requestor Email' },
            { key: '7_title', text: 'Title' },
            { key: '8_description', text: 'Description' },
            { key: '9_expectedDate', text: 'Expected Date' },
            { key: '4_tag', text: 'Tags' },
            { key: '3_priority', text: 'Priority' },
            { key: '1_department', text: 'Department' },
            { key: '2_category', text: 'Category' },
        ];

        let optionsAction: IDropdownOption[] = [
            { key: 'actions', text: 'Actions', itemType: DropdownMenuItemType.Header },
            { key: 'assignTo', text: 'Assign to' },
            { key: 'priorityTo', text: 'Set Priority to' },
            { key: 'addTags', text: 'Add Tags' },
        ];



        /**
         * We add also few type custom field that allowed to be condition
         */
        [...instance?.customFieldsLeft, ...instance?.customFieldsRight]?.forEach((item, index) => {

            /**
             * push header item into options
             */
            if (index === 0) {
                options.push({
                    key: "customfields",
                    text: "Custom Fields",
                    itemType: DropdownMenuItemType.Header
                });
                optionsAction.push({
                    key: "customfields",
                    text: "Custom Fields",
                    itemType: DropdownMenuItemType.Header
                });
            }

            /**
             * Conditions just allow some in custom fields
             */
            if (["1_text", "2_textarea", "5_list"].includes(item.type.key)) {
                options.push({
                    key: item.id,
                    text: item.title
                });
            }

            optionsAction.push({
                key: item.id,
                text: item.title
            });
        });

        setOptionConditions(options);
        setOptionActions(optionsAction);

    }

    function onSave(data: { conditions: ICondition, actions: ICondition }) {
        console.log(data);
    }

    function onCancel() {

    }
    const columns: IColumn[] = [
        {
            key: "-",
            name: "",
            minWidth: 70,
            maxWidth: 80,
            fieldName: '-'
        },
        {
            key: "conditions",
            name: "Conditions",
            minWidth: 300,
            maxWidth: 350,
            fieldName: "conditions"
        },
        {
            key: "actions",
            name: "Actions",
            minWidth: 250,
            maxWidth: 280,
            fieldName: "actions"
        },
        {
            key: "status",
            name: "Status",
            minWidth: 80,
            maxWidth: 120,
            fieldName: "status"
        },
        {
            key: "action",
            name: "Action",
            minWidth: 100,
            maxWidth: 150,
            fieldName: 'action',
        }
    ];

    const items: IAutomation[] = [
        {
            "id": "8c1f9de4-50d8-4139-8b3e-f6b2cb924ab6",
            "conditions": [
                {
                    "id": "3e7fdeb2-7b51-4420-9a0d-947fc0e88680",
                    "key": "requestorAny",
                    "value": [
                        {
                            "id": "cd03b2d0-18ee-4ca0-8b77-727fd602826b",
                            "text": "Debra Berger",
                            "secondaryText": "DebraB@M365x86451899.OnMicrosoft.com",
                            "imageInitials": "DB",
                            "key": "undefined"
                        },
                        {
                            "id": "c940c840-e888-499e-9b6f-6840b325a6a7",
                            "text": "Allan Deyoung",
                            "secondaryText": "AllanD@M365x86451899.OnMicrosoft.com",
                            "imageInitials": "AD",
                            "key": "undefined"
                        }
                    ]
                },
                {
                    "id": "e3457025-601e-436a-adef-d11557c04002",
                    "key": "requestorEmailContains",
                    "value": "kitameraki.com"
                },
                {
                    "id": "1f8ee781-f4ba-407c-a91c-7ea0ab9ba243",
                    "key": "titleIncludes",
                    "value": "Test"
                },
                {
                    "id": "958994df-2ea1-458d-a050-ba91effcdc56",
                    "key": "titleOrDescriptionIncludes",
                    "value": "haha"
                },
                {
                    "id": "ffb62f6f-3a5d-415e-9cd5-ab68c87e8d30",
                    "key": "descriptionIncludes",
                    "value": "desciprtionnnnn"
                },
                {
                    "id": "e08ac611-86e1-4bfe-956c-b18bd7a0b951",
                    "key": "descriptionIsBlank",
                    "value": ""
                },
                {
                    "id": "dab43c9e-f8b6-4d97-a837-3cac78698371",
                    "key": "exactDateIs",
                    "value": "2024-06-23T17:00:00.000Z"
                },
                {
                    "id": "fe87c15c-3806-433a-9468-ab2914e75e99",
                    "key": "relativeDateIs",
                    "value": "2"
                },
                {
                    "id": "f69c9171-4e05-454a-aeec-cddb46cfd985",
                    "key": "tagsIncludesAny",
                    "value": [
                        "d800cfbd-b524-4a4f-b3d0-f540aa16fd30_v1.1",
                        "d800cfbd-b524-4a4f-b3d0-f540aa16fd30_v1.2"
                    ]
                },
                {
                    "id": "9812404a-4a83-4484-9c16-5d59c9518d7a",
                    "key": "tagsIncludesAll",
                    "value": [
                        "4382646c-948d-4ac0-94ee-2dee6f1f82c4_hotfix",
                        "4382646c-948d-4ac0-94ee-2dee6f1f82c4_patch"
                    ]
                },
                {
                    "id": "1b38190e-ecf6-4612-82a0-49577900c8f1",
                    "key": "priorityIsAny",
                    "value": [
                        "1_Low",
                        "2_Medium"
                    ]
                },
                {
                    "id": "da26787f-b489-48fb-8084-8500c59f73b5",
                    "key": "priorityIsBlank",
                    "value": []
                },
                {
                    "id": "0eb2d995-9605-476a-b0d6-f8f85d568c31",
                    "key": "departmentIncludesAny",
                    "value": [
                        "Finance",
                        "IT"
                    ]
                },
                {
                    "id": "56bf9435-6e0b-46cb-9c51-6aeae3d50e6c",
                    "key": "departmentIsBlank",
                    "value": []
                },
                {
                    "id": "144a6523-a429-412a-9773-ff863fc99d84",
                    "key": "categoryIncludesAny",
                    "value": [
                        "Bug",
                        "Feature"
                    ]
                },
                {
                    "id": "02cf552b-20e9-478c-8b45-ec48c562ee78",
                    "key": "categoryIsBlank",
                    "value": []
                }
            ],
            "actions": [
                {
                    "id": "672e3a94-514b-4ce4-9bd8-57b442658003",
                    "key": "assignee",
                    "value": [
                        {
                            "id": "a237d5db-7b92-42c4-a66f-f70743013a01",
                            "text": "Adele Vance",
                            "imageInitials": "AV",
                            "imageUrl": "",
                            "secondaryText": "AdeleV@M365x86451899.OnMicrosoft.com",
                            "key": "undefined"
                        }
                    ]
                },
                {
                    "id": "60f67227-7b96-4ad2-9819-2d9a0be3c0eb",
                    "key": "priority",
                    "value": "4_Urgent"
                },
                {
                    "id": "d1299b57-e1c8-479f-8d52-961295428c0c",
                    "key": "tags",
                    "value": [
                        "",
                        "4382646c-948d-4ac0-94ee-2dee6f1f82c4_hotfix",
                        "4382646c-948d-4ac0-94ee-2dee6f1f82c4_patch"
                    ]
                }
            ],
            "isStopProcessingMoreRules": true,
            "enable": true
        },
        {
            "id": "1111111111111111111111111111111111111",
            "conditions": [
                {
                    "id": "3e7fdeb2-7b51-4420-9a0d-947fc0e88680",
                    "key": "fcfd41d6-5a25-4481-8f53-4e4c39f29bf9_textContains",
                    "value": "hoho"
                },
                {
                    "id": "e3457025-601e-436a-adef-d11557c04002",
                    "key": "c32bb0c4-7977-4251-870d-ba30266154d7_textContains",
                    "value": "hihihi"
                },
                {
                    "id": "1f8ee781-f4ba-407c-a91c-7ea0ab9ba243",
                    "key": "5059b714-4640-4d63-b223-7c2e04e07717_exactDateIs",
                    "value": "2024-06-24T17:00:00.000Z"
                },
                {
                    "id": "958994df-2ea1-458d-a050-ba91effcdc56",
                    "key": "5059b714-4640-4d63-b223-7c2e04e07717_relativeDateIs",
                    "value": 1
                },
                {
                    "id": "ffb62f6f-3a5d-415e-9cd5-ab68c87e8d30",
                    "key": "60f13d4f-657a-4530-bc93-2c9c40aa6517_toggleIsTrue",
                    "value": true
                },
                {
                    "id": "e08ac611-86e1-4bfe-956c-b18bd7a0b951",
                    "key": "60f13d4f-657a-4530-bc93-2c9c40aa6517_toggleIsFalse",
                    "value": false
                },
                {
                    "id": "dab43c9e-f8b6-4d97-a837-3cac78698371",
                    "key": "748426a1-da51-4936-9eb8-d4482cc5a6aa_peoplePickerIncludesAny",
                    "value": [
                        {
                            "id": "9bedbebc-1d1c-4de5-b7c7-3411500b01c6",
                            "text": "Alex Wilber",
                            "secondaryText": "AlexW@M365x86451899.OnMicrosoft.com",
                            "imageInitials": "AW",
                            "key": "undefined"
                        },
                        {
                            "id": "c940c840-e888-499e-9b6f-6840b325a6a7",
                            "text": "Allan Deyoung",
                            "secondaryText": "AllanD@M365x86451899.OnMicrosoft.com",
                            "imageInitials": "AD",
                            "key": "undefined"
                        }
                    ]
                },
                {
                    "id": "fe87c15c-3806-433a-9468-ab2914e75e99",
                    "key": "748426a1-da51-4936-9eb8-d4482cc5a6aa_peoplePickerIsBlank",
                    "value": []
                },
                {
                    "id": "f69c9171-4e05-454a-aeec-cddb46cfd985",
                    "key": "e0d5f23e-3994-449c-854a-c521e882e4f4_peoplePickerIncludesAny",
                    "value": [
                        {
                            "id": "9bedbebc-1d1c-4de5-b7c7-3411500b01c6",
                            "text": "Alex Wilber",
                            "secondaryText": "AlexW@M365x86451899.OnMicrosoft.com",
                            "imageInitials": "AW",
                            "key": "undefined"
                        },
                        {
                            "id": "4d7048b4-f1df-42fa-b749-f7edfa144d00",
                            "text": "MOD Administrator",
                            "secondaryText": "admin@M365x86451899.onmicrosoft.com",
                            "imageInitials": "MA",
                            "key": "undefined"
                        }
                    ]
                },
                {
                    "id": "9812404a-4a83-4484-9c16-5d59c9518d7a",
                    "key": "e0d5f23e-3994-449c-854a-c521e882e4f4_peoplePickerIncludesAll",
                    "value": [
                        {
                            "id": "4d7048b4-f1df-42fa-b749-f7edfa144d00",
                            "text": "MOD Administrator",
                            "secondaryText": "admin@M365x86451899.onmicrosoft.com",
                            "imageInitials": "MA",
                            "key": "undefined"
                        },
                        {
                            "id": "9bedbebc-1d1c-4de5-b7c7-3411500b01c6",
                            "text": "Alex Wilber",
                            "secondaryText": "AlexW@M365x86451899.OnMicrosoft.com",
                            "imageInitials": "AW",
                            "key": "undefined"
                        }
                    ]
                },
                {
                    "id": "1b38190e-ecf6-4612-82a0-49577900c8f1",
                    "key": "e0d5f23e-3994-449c-854a-c521e882e4f4_peoplePickerIsBlank",
                    "value": []
                },
                {
                    "id": "da26787f-b489-48fb-8084-8500c59f73b5",
                    "key": "68112971-cc83-475e-9d12-5431133ee341_emailPickerIncludesAny",
                    "value": [
                        "3827958f-8193-4d8a-ad8a-1c0b2ed68abb",
                        "1776b78e-8bb8-4a34-bb8f-27194943b0ea"
                    ]
                },
                {
                    "id": "0eb2d995-9605-476a-b0d6-f8f85d568c31",
                    "key": "68112971-cc83-475e-9d12-5431133ee341_emailPickerIsBlank",
                    "value": []
                },
                {
                    "id": "56bf9435-6e0b-46cb-9c51-6aeae3d50e6c",
                    "key": "a79e85c5-5c96-4092-b9a5-1118a170edb3_emailPickerIncludesAny",
                    "value": [
                        "26caa2a2-aa48-46b9-97d4-950fae06ffac",
                        "744c4499-328f-447c-8f9f-32aa05f0d4f4"
                    ]
                },
                {
                    "id": "144a6523-a429-412a-9773-ff863fc99d84",
                    "key": "a79e85c5-5c96-4092-b9a5-1118a170edb3_emailPickerIncludesAll",
                    "value": [
                        "26caa2a2-aa48-46b9-97d4-950fae06ffac",
                        "744c4499-328f-447c-8f9f-32aa05f0d4f4"
                    ]
                },
                {
                    "id": "02cf552b-20e9-478c-8b45-ec48c562ee78",
                    "key": "a79e85c5-5c96-4092-b9a5-1118a170edb3_emailPickerIsBlank",
                    "value": []
                },
                {
                    "id": "50c89863-7c2f-4b2a-b07b-e9f41cd248ea",
                    "key": "64575b01-f01e-4e84-8b62-e88fa7875f14_listIncludesAny",
                    "value": [
                        "15ea8917-9336-4e64-9807-8ec0d0a67e72",
                        "9fabb7d5-bc90-4a58-ac3b-1760c9100d93",
                        "c6f13dd7-be7a-4a73-a0fb-280b84a3ec12"
                    ]
                },
                {
                    "id": "5f5ff62a-b018-4373-a002-1ef15f01060c",
                    "key": "64575b01-f01e-4e84-8b62-e88fa7875f14_listIsBlank",
                    "value": []
                },
                {
                    "id": "77a04615-3212-4291-bd50-10fc228ddc3c",
                    "key": "fd99ef6b-33d4-417c-92ef-a0a940394005_listIncludesAny",
                    "value": [
                        "bce52b81-c9fd-4c17-be09-96a792966560",
                        "9a843f76-8b6d-4a9e-95fe-e90a3913d25a",
                        "3ee4e583-daaf-46a4-a2d8-870feb542602"
                    ]
                },
                {
                    "id": "cf995c1d-a3bd-4604-ac5a-12f102b98b39",
                    "key": "fd99ef6b-33d4-417c-92ef-a0a940394005_listIncludesAll",
                    "value": [
                        "3ee4e583-daaf-46a4-a2d8-870feb542602",
                        "bce52b81-c9fd-4c17-be09-96a792966560"
                    ]
                },
                {
                    "id": "32080f04-942e-4d7f-b6d5-137a33c3f1b9",
                    "key": "fd99ef6b-33d4-417c-92ef-a0a940394005_listIsBlank",
                    "value": []
                }
            ],
            "actions": [
                {
                    "id": "672e3a94-514b-4ce4-9bd8-57b442658003",
                    "key": "fcfd41d6-5a25-4481-8f53-4e4c39f29bf9",
                    "value": "asasasasasasas"
                },
                {
                    "id": "60f67227-7b96-4ad2-9819-2d9a0be3c0eb",
                    "key": "c32bb0c4-7977-4251-870d-ba30266154d7",
                    "value": "tessssssssss"
                },
                {
                    "id": "d1299b57-e1c8-479f-8d52-961295428c0c",
                    "key": "5059b714-4640-4d63-b223-7c2e04e07717",
                    "value": "2024-06-24T17:00:00.000Z"
                },
                {
                    "id": "387e2320-018f-457a-a28b-3056287ef5a6",
                    "key": "60f13d4f-657a-4530-bc93-2c9c40aa6517",
                    "value": true
                },
                {
                    "id": "d2849456-cb80-4da1-9562-93d4ce287448",
                    "key": "748426a1-da51-4936-9eb8-d4482cc5a6aa",
                    "value": [
                        {
                            "id": "edd8baf8-b94d-4e03-ae22-ef2890af9397",
                            "text": "Christie Cline",
                            "secondaryText": "ChristieC@M365x86451899.OnMicrosoft.com",
                            "imageInitials": "CC",
                            "key": "undefined"
                        }
                    ]
                },
                {
                    "id": "1f32c1af-4de3-4b98-ab00-771551a3e287",
                    "key": "e0d5f23e-3994-449c-854a-c521e882e4f4",
                    "value": [
                        {
                            "id": "4d7048b4-f1df-42fa-b749-f7edfa144d00",
                            "text": "MOD Administrator",
                            "secondaryText": "admin@M365x86451899.onmicrosoft.com",
                            "imageInitials": "MA",
                            "key": "undefined"
                        },
                        {
                            "id": "9bedbebc-1d1c-4de5-b7c7-3411500b01c6",
                            "text": "Alex Wilber",
                            "secondaryText": "AlexW@M365x86451899.OnMicrosoft.com",
                            "imageInitials": "AW",
                            "key": "undefined"
                        }
                    ]
                },
                {
                    "id": "80c2197a-2f8b-484d-9abc-0b492071f36e",
                    "key": "68112971-cc83-475e-9d12-5431133ee341",
                    "value": [
                        "1776b78e-8bb8-4a34-bb8f-27194943b0ea"
                    ]
                },
                {
                    "id": "1228062c-9878-48e0-b410-b45dc52b7fd6",
                    "key": "a79e85c5-5c96-4092-b9a5-1118a170edb3",
                    "value": [
                        "744c4499-328f-447c-8f9f-32aa05f0d4f4",
                        "26caa2a2-aa48-46b9-97d4-950fae06ffac"
                    ]
                },
                {
                    "id": "867b1a2b-14b8-478f-ad1a-adb74986ff60",
                    "key": "64575b01-f01e-4e84-8b62-e88fa7875f14",
                    "value": [
                        "c6f13dd7-be7a-4a73-a0fb-280b84a3ec12"
                    ]
                },
                {
                    "id": "6922197e-5422-4b39-8f72-09049d999d55",
                    "key": "fd99ef6b-33d4-417c-92ef-a0a940394005",
                    "value": [
                        "3ee4e583-daaf-46a4-a2d8-870feb542602",
                        "bce52b81-c9fd-4c17-be09-96a792966560",
                        "9a843f76-8b6d-4a9e-95fe-e90a3913d25a"
                    ]
                }
            ],
            "isStopProcessingMoreRules": false,
            "enable": true
        },
        {
            "id": "999",
            "conditions": [],
            "actions": [
                {
                    "id": "634854d1-9b76-4525-af76-180f399d0684",
                    "key": "assignee",
                    "value": [
                        {
                            "id": "a237d5db-7b92-42c4-a66f-f70743013a01",
                            "text": "Adele Vance",
                            "imageInitials": "AV",
                            "imageUrl": "",
                            "secondaryText": "AdeleV@M365x86451899.OnMicrosoft.com",
                            "key": "undefined"
                        }
                    ]
                },
            ],
            "isStopProcessingMoreRules": false,
            "enable": true
        }
    ]
    const tagCategories = [
        {
            "instanceId": "4f6f3185-964c-4b59-9a69-f69fd1cc8e24",
            "text": "release",
            "color": "#40bf48",
            "tags": [
                {
                    "text": "v1.1"
                },
                {
                    "text": "v1.2"
                }
            ],
            "deleted": false,
            "id": "d800cfbd-b524-4a4f-b3d0-f540aa16fd30",
            "_rid": "RPh2ANEgdsszAAAAAAAAAA==",
            "_self": "dbs/RPh2AA==/colls/RPh2ANEgdss=/docs/RPh2ANEgdsszAAAAAAAAAA==/",
            "_etag": "\"0b007e14-0000-0100-0000-6670fff50000\"",
            "_attachments": "attachments/",
            "_ts": 1718681589
        },
        {
            "instanceId": "4f6f3185-964c-4b59-9a69-f69fd1cc8e24",
            "text": "issue",
            "color": "#bf4040",
            "tags": [
                {
                    "text": "hotfix"
                },
                {
                    "text": "patch"
                }
            ],
            "deleted": false,
            "id": "4382646c-948d-4ac0-94ee-2dee6f1f82c4",
            "_rid": "RPh2ANEgdss0AAAAAAAAAA==",
            "_self": "dbs/RPh2AA==/colls/RPh2ANEgdss=/docs/RPh2ANEgdss0AAAAAAAAAA==/",
            "_etag": "\"0b007b14-0000-0100-0000-6670ffe50000\"",
            "_attachments": "attachments/",
            "_ts": 1718681573
        }
    ]

    const effect = () => {
        const now = new Date();
        let expDate = "2024-06-29T06:47:00.418Z";
        let value: any = "2024-06-27T06:47:00.418Z"
        // console.log(moment(value).format("YYYY-MM-DD") === moment(expDate).format("YYYY-MM-DD"))
        // console.log(moment(value, "YYYY-MM-DD").isSame(moment(expDate, "YYYY-MM-DD")))


        // console.log(moment('2010-10-20').isBetween('2010-10-19', '2010-10-25')); // true
        value = '2';
        // console.log(moment(expDate, "YYYY-MM-DD").isBetween(moment(now, "YYYY-MM-DD"), moment(now, "YYYY-MM-DD").add(value, "days")))
    }

    /**
         * This functio purpose to set ticket automation that we have configured in setting
         */
    const runTicketAutomation = (item: ICase, instance: IInstance): ICase => {

        let ticket: ICase = item;
        const now = new Date();

        const customFields = instance.customFieldsLeft.concat(instance.customFieldsRight);
        let activeAutomation: IAutomation[] = instance?.automationRules?.filter((item) => item.enable);

        // console.log(ticket);
        /**
         * If there are enable rules we have to run active automation Otherwise we run else statement
         */
        if (activeAutomation.length > 0) {

            let allConditions: boolean[] = [];
            for (const item of activeAutomation) {
                /**
                 * Check condition for a rule and we use AND operator for all conditions, so make sure the all of this is true
                 */
                console.log(item);
                const isValidCondition: boolean = item.conditions.every((condition: ICondition) => {
                    const key: string = String(condition.key);
                    const value: any = condition.value;

                    //Required properties
                    const requestorId = ticket.requestorId?.toLowerCase();
                    const title = ticket.title?.toLowerCase();

                    //Optional properties
                    const tags: ITicketTag[] = (ticket?.tags?.length > 0) ? ticket.tags : [];
                    const description = ticket?.description
                        ?.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
                        ?.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
                        ?.replace(/<\/?[^>]+(>|$)/g, "")?.toLowerCase() ?? "";
                    const priority = ticket?.priority ? ticket.priority : "";
                    const expectedDate = ticket?.expectedDate ?
                        new Date(ticket.expectedDate) :
                        new Date();


                    switch (key) {
                        case ConditionKey.RequestorAny:
                            return (value?.some((requestor: IPersonaProps) => requestor.id?.toLowerCase() == requestorId));

                        case ConditionKey.RequestorEmailContains:
                            return (requestorId.includes(value?.toLowerCase()));

                        case ConditionKey.TitleIncludes:
                            return (title.includes(value?.toLowerCase()));

                        case ConditionKey.TitleOrDescriptionIncludes:
                            return (title.includes(value?.toLowerCase()) || description.includes(value?.toLowerCase()));

                        case ConditionKey.DescriptionIncludes:
                            return (description.includes(value?.toLowerCase()));

                        case ConditionKey.DescriptionIsBlank:
                            return (!!!description);

                        case ConditionKey.ExactDateIs:
                            return (moment(new Date(expectedDate), "YYYY-MM-DD").isSame(moment(new Date(value), "YYYY-MM-DD")));

                        case ConditionKey.ExactDateIsBefore:
                            return (moment(new Date(expectedDate), "YYYY-MM-DD").isBefore(moment(new Date(value), "YYYY-MM-DD")));

                        case ConditionKey.ExactDateIsAfter:
                            return (moment(new Date(expectedDate), "YYYY-MM-DD").isAfter(moment(new Date(value), "YYYY-MM-DD")));

                        case ConditionKey.RelativeDateIs:
                            return (moment(new Date(expectedDate), "YYYY-MM-DD").isSame(moment(now, "YYYY-MM-DD").add(value, "days"), 'day'));

                        case ConditionKey.RelativeDateIsBefore:
                            return (moment(new Date(expectedDate), "YYYY-MM-DD").isBefore(moment(now, "YYYY-MM-DD").add(value, "days"), "day"));

                        case ConditionKey.RelativeDateIsAfter:
                            return (moment(new Date(expectedDate), "YYYY-MM-DD").isAfter(moment(now, "YYYY-MM-DD").add(value, "days"), "day"));

                        case ConditionKey.TagsIncludesAny:
                            console.log(tags);
                            console.log(tags.map((tag) => `${tag.tagCategoryId}_${tag.text}`));
                            return (tags.map((tag) => `${tag.tagCategoryId}_${tag.text}`).some((tag) => value.includes(tag)));

                        case ConditionKey.TagsIncludesAll:
                            return (tags.map((tag) => `${tag.tagCategoryId}_${tag.text}`).sort().join(',') === value.sort().join(','));

                        case ConditionKey.TagsIsBlank:
                            return (tags.length == 0);

                        case ConditionKey.PriorityIsAny:
                            return value.includes(priority);

                        case ConditionKey.PriorityIsBlank:
                            return (!!!priority);

                        default:

                            const splitedKey = key.split("_");
                            const shiftKey = splitedKey.shift();
                            const popKey = splitedKey.pop();

                            const field: ICustomField = customFields?.find((item) => item.id == shiftKey);

                            /**
                             * IF custom field doesn't exist, the condition will be ignored
                             */
                            if (!!!field) return false;

                            const customFieldValue = ticket?.customFields[field.id];

                            switch (field.type.key) {
                                case "1_text":
                                case "2_textarea":
                                    return (customFieldValue?.toLowerCase().includes(value?.toLowerCase()));
                                case "3_date":
                                    switch (popKey) {

                                        case ConditionKey.ExactDateIs:
                                            return (moment(new Date(customFieldValue), "YYYY-MM-DD").isSame(moment(new Date(value), "YYYY-MM-DD")));

                                        case ConditionKey.ExactDateIsBefore:
                                            return (moment(new Date(customFieldValue), "YYYY-MM-DD").isBefore(moment(new Date(value), "YYYY-MM-DD")));

                                        case ConditionKey.ExactDateIsAfter:
                                            return (moment(new Date(customFieldValue), "YYYY-MM-DD").isAfter(moment(new Date(value), "YYYY-MM-DD")));

                                        case ConditionKey.RelativeDateIs:
                                            return (customFieldValue && (moment(new Date(customFieldValue), "YYYY-MM-DD").isSame(moment(now, "YYYY-MM-DD").add(value, "days"), "day")));

                                        case ConditionKey.RelativeDateIsBefore:
                                            return (customFieldValue && (moment(new Date(customFieldValue), "YYYY-MM-DD").isBefore(moment(now, "YYYY-MM-DD").add(value, "days"), "day")));

                                        case ConditionKey.RelativeDateIsAfter:
                                            return (customFieldValue && (moment(new Date(customFieldValue), "YYYY-MM-DD").isAfter(moment(now, "YYYY-MM-DD").add(value, "days"), "day")));


                                        default:
                                            break;
                                    }

                                case "4_toggle":
                                    switch (popKey) {
                                        case ConditionKey.ToggleIsTrue:
                                            return (customFieldValue);
                                        case ConditionKey.ToggleIsFalse:
                                            return (!!!customFieldValue);
                                        default:
                                            break;
                                    }

                                case "6_peoplepicker":
                                    switch (popKey) {
                                        case ConditionKey.PeoplePickerIncludesAny:
                                            return (customFieldValue?.some((item: IPersonaProps) => {
                                                return (value.some((val: IPersonaProps) => val.id == item.id));
                                            }));

                                        case ConditionKey.ListIncludesAll:
                                            return (customFieldValue?.every((item: IPersonaProps) => {
                                                return (value.every((val: IPersonaProps) => val.id == item.id));
                                            }));

                                        case ConditionKey.ListIsBlank:
                                            return (customFieldValue?.length == 0);
                                        default:
                                            break;
                                    }

                                case "5_list":
                                case "7_emailpicker":
                                    switch (popKey) {
                                        case ConditionKey.ListIncludesAny:
                                            return (customFieldValue?.some((item) => value.includes(item)));

                                        case ConditionKey.ListIncludesAll:
                                            return (customFieldValue?.every((item) => value.includes(item)));

                                        case ConditionKey.ListIsBlank:
                                            return (customFieldValue?.length == 0);

                                        default:
                                            break;
                                    }
                                default:
                                    break;
                            }

                            break;
                    }
                });

                allConditions.push(isValidCondition);

                console.log(isValidCondition);
                // console.log(ticket);
                if (isValidCondition) ticket = applyAction(item.actions, ticket, instance);
                if (item.isStopProcessingMoreRules) return ticket;

            }

            /**
             * We apply Otherwise automation too if there is other rules, but the all rules is false
             */

            if ((allConditions.every((con) => !!!con)) && (instance.defaultAutomationRules?.length > 0 && instance.defaultAutomationRules[0].enable)) {
                ticket = applyAction(instance.defaultAutomationRules[0].actions, ticket, instance);
            }

        } else {
            /**
             * Otherwise
             */
            if ((instance.defaultAutomationRules?.length > 0) &&
                (instance.defaultAutomationRules[0].enable)) {
                ticket = applyAction(instance.defaultAutomationRules[0].actions, ticket, instance);
            }
        }



        return ticket;
    }

    function applyAction(actions: ICondition[], item: ICase, instance: IInstance): ICase {
        let ticket: ICase = item;
        const customFields = instance.customFieldsLeft.concat(instance.customFieldsRight);
        actions.forEach((item) => {
            let value = item.value
            switch (item.key) {
                case ActionKey.Assignee:
                    ticket.assigneeId = value[0]?.id;
                    ticket.assigneeName = value[0]?.text;
                    ticket.assigneeEmail = value[0]?.secondaryText;
                    break;
                case ActionKey.Priority:
                    ticket.priority = value;
                    break;
                case ActionKey.Tags:
                    let ticketTags: ITicketTag[] = Array.isArray(ticket?.tags) ? ticket.tags : [];
                    const newTags = getTicketTag(value).filter((val) => !!!ticketTags?.some((ttag) => (ttag.tagCategoryId === val.tagCategoryId) && (ttag.text === val.text)));
                    ticket.tags = ticketTags.concat(newTags);
                    break;
                case ActionKey.ExpectedDateTo:
                    ticket.expectedDate = value;
                    break;
                case ActionKey.ExpectedDateRelativeDateTo:
                    ticket.expectedDate = moment(new Date()).add(value, "days").toISOString()
                    break;
                default:

                    const splitedKey = String(item.key)?.split("_");
                    const shiftKey = splitedKey?.shift();
                    const popKey = splitedKey?.pop();

                    if (popKey == ActionKey.RelativeDateTo) value = moment(new Date()).add(value, "days").toISOString();


                    /**
                     * IF custom field doesn't exist, the action will be ignored
                     */
                    const field: ICustomField = customFields?.find((item) => item.id == shiftKey);
                    if (!!!field) break;

                    ticket.customFields[shiftKey] = value;
                    break;
            }
        });
        return ticket;
    }

    const getTicketTag = (tags: string[]): ITicketTag[] => {
        let ticketTags: ITicketTag[] = [];
        if (tags) {
            for (let index = 0; index < tags.length; index++) {
                const element = tags[index];
                const tagsValues: string[] = element.split("_", 2); // First element is always the id of the tag category, the rest is the tag title
                // const tagsValues: string[] = element.split("_", 3); // First element is always the id of the tag category, the rest is the tag title
                const ticketTag: any = {
                    tagCategoryId: tagsValues[0],
                    text: tagsValues[1],
                    // deleted: tagsValues[2] !== undefined ? tagsValues[2] : true 
                }
                ticketTags.push(ticketTag);
            }
        }
        return ticketTags;
    }

    function runAutomation() {
        let ticket: any = {
            "title": "test 47",
            "department": "",
            "requestorName": "MOD Administrator",
            "requestorId": "36755639-d31a-491b-96d6-32e5361666a4",
            "category": "",
            "status": "Open",
            "customFields": {
                "a2e39280-6254-4e33-b42a-5a44a0de36e5": [],
                "80fa0819-25b8-4aa3-81b9-b3e634bc6394": []
            },
            "instanceId": "5836423c-e281-49c9-9c30-3170858f8662",
            "expectedDate": "",
            "assigneeName": "",
            "assigneeId": "",
            "priority": "",
            "attachments": [],
            "description": "",
            "createdDateTime": "2025-03-18T07:13:17.913Z",
            "tags": [],
            "lastInteraction": "2025-03-18T07:13:17.913Z",
            "firstTimeResponse": "",
            "timeResolution": "",
            "isFrtEscalated": false,
            "isRtEscalated": false,
            "isFrtBreached": false,
            "isRtBreached": false,
            "createdBy": {
                "id": "36755639-d31a-491b-96d6-32e5361666a4",
                "text": "MOD Administrator",
                "secondaryText": "admin@M365x78560627.onmicrosoft.com"
            },
            "lastUpdatedBy": {
                "id": "36755639-d31a-491b-96d6-32e5361666a4",
                "text": "MOD Administrator",
                "secondaryText": "admin@M365x78560627.onmicrosoft.com"
            },
            "requestorEmail": "admin@M365x78560627.onmicrosoft.com",
            "assigneeEmail": "",
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
                }
            ],
            "resolvedStatus": [
                "Resolved",
                "Closed"
            ],
            "isCustomWorkflow": false,
            "ticketId": 47,
            "origin": "WebApp",
            "requestorUnseenEventCnt": 0,
            "assigneeUnseenEventCnt": 0,
            "id": "7d3d86f8-5c67-410a-b2a4-e350a6b9d896",
            "_rid": "RPh2ANl1k9mqBgAAAAAAAA==",
            "_self": "dbs/RPh2AA==/colls/RPh2ANl1k9k=/docs/RPh2ANl1k9mqBgAAAAAAAA==/",
            "_etag": "\"19004716-0000-0100-0000-67d91d110000\"",
            "_attachments": "attachments/",
            "_ts": 1742282001
        }

        let instance: any = {
            "name": "Ticketing Dev",
            "displayName": "Ticketing Dev",
            "groupId": "401d66cb-bdb2-4705-a08e-2836ad289202",
            "enabled": true,
            "tenantId": "2d95428a-8548-47e9-b6a0-6063cd3320b3",
            "teamId": "19:QVJv6VIRRxs6gnqO8z8Vb56dVSEIiCm6GcdzmGmAgaM1@thread.tacv2",
            "channelId": "19:QVJv6VIRRxs6gnqO8z8Vb56dVSEIiCm6GcdzmGmAgaM1@thread.tacv2",
            "entityId": "ticketing_TicketingDev",
            "assignees": {
                "type": "customAssignee",
                "peoples": [
                    {
                        "id": "7cbb9d18-0d7c-43dd-8ffe-a37a6daaf06d",
                        "text": "Adele Vance",
                        "secondaryText": "AdeleV@M365x78560627.OnMicrosoft.com",
                        "imageInitials": "AV",
                        "key": "undefined"
                    },
                    {
                        "id": "9b82d54f-ea34-4df9-b791-bfcca45a5ed1",
                        "text": "Alex Wilber",
                        "secondaryText": "AlexW@M365x78560627.OnMicrosoft.com",
                        "imageInitials": "AW",
                        "key": "undefined"
                    },
                    {
                        "id": "36755639-d31a-491b-96d6-32e5361666a4",
                        "text": "MOD Administrator",
                        "secondaryText": "admin@M365x78560627.onmicrosoft.com",
                        "imageInitials": "MA",
                        "key": "undefined"
                    }
                ]
            },
            "customFields": [],
            "customFieldsLeft": [
                {
                    "id": "a2e39280-6254-4e33-b42a-5a44a0de36e5",
                    "title": "Follower",
                    "type": {
                        "key": "6_peoplepicker",
                        "text": "People Picker",
                        "data": {
                            "icon": "People",
                            "color": "black"
                        }
                    },
                    "isMandatory": false,
                    "status": "hidden",
                    "defaultValue": [],
                    "choosePeopleFrom": {
                        "key": "2_members",
                        "text": "Team Members"
                    },
                    "options": [],
                    "isSeeTicket": true,
                    "isReceiveNotification": true,
                    "isMultipleSection": false,
                    "isMultiple": false,
                    "isReceiveEmailNotification": false
                }
            ],
            "customFieldsRight": [
                {
                    "id": "80fa0819-25b8-4aa3-81b9-b3e634bc6394",
                    "title": "Subscribers",
                    "type": {
                        "key": "6_peoplepicker",
                        "text": "People Picker",
                        "data": {
                            "icon": "People",
                            "color": "black"
                        }
                    },
                    "isMandatory": false,
                    "status": "hidden",
                    "defaultValue": [],
                    "choosePeopleFrom": {
                        "key": "2_members",
                        "text": "Team Members"
                    },
                    "options": [],
                    "isSeeTicket": false,
                    "isReceiveNotification": false,
                    "isMultipleSection": false,
                    "isMultiple": false,
                    "isReceiveEmailNotification": false
                }
            ],
            "optionalFieldsLeft": [
                {
                    "id": "5_tags",
                    "title": "Tags",
                    "status": "visible",
                    "type": "dropdown",
                    "isMandatory": false,
                    "defaultValue": "",
                    "choosePeopleFrom": "",
                    "isSeeTicket": false,
                    "isReceiveNotification": false,
                    "isMultipleSection": false
                },
                {
                    "id": "2_priority",
                    "title": "Priority",
                    "status": "visible",
                    "type": "dropdown",
                    "isMandatory": false,
                    "defaultValue": "",
                    "choosePeopleFrom": "",
                    "isSeeTicket": false,
                    "isReceiveNotification": false,
                    "isMultipleSection": false
                }
            ],
            "optionalFieldsRight": [
                {
                    "id": "4_expecteddate",
                    "title": "Expected Date",
                    "status": "visible",
                    "type": "date",
                    "isMandatory": false,
                    "defaultValue": "",
                    "choosePeopleFrom": "",
                    "isSeeTicket": false,
                    "isReceiveNotification": false,
                    "isMultipleSection": false
                }
            ],
            "automationRules": [
                {
                    "id": "670d2ee2-2a73-44cb-99f5-2db83cdc2062",
                    "conditions": [
                        {
                            "id": "0744e881-eae8-41b4-90a2-e7ff72102b81",
                            "key": "titleIncludes",
                            "value": "test"
                        }
                    ],
                    "actions": [
                        {
                            "id": "df0f0c9c-8a9f-4888-b913-33a675459554",
                            "key": "tags",
                            "value": [
                                "6eb3d883-7f13-499e-8896-e2b84e913abb_v1"
                            ]
                        }
                    ],
                    "isStopProcessingMoreRules": false,
                    "enable": true
                },
                {
                    "id": "b287fbc5-c95a-45c1-bd71-0207a509704d",
                    "conditions": [
                        {
                            "id": "42225acc-19df-4185-91da-f8ac789458b3",
                            "key": "tagsIncludesAny",
                            "value": [
                                "6eb3d883-7f13-499e-8896-e2b84e913abb_v1"
                            ]
                        }
                    ],
                    "actions": [
                        {
                            "id": "83b180f2-217b-47d3-bdab-e9ee59ad0ad5",
                            "key": "assignee",
                            "value": [
                                {
                                    "id": "7cbb9d18-0d7c-43dd-8ffe-a37a6daaf06d",
                                    "text": "Adele Vance",
                                    "secondaryText": "AdeleV@M365x78560627.OnMicrosoft.com",
                                    "imageInitials": "AV",
                                    "key": "undefined"
                                }
                            ]
                        }
                    ],
                    "isStopProcessingMoreRules": false,
                    "enable": true
                }
            ],
            "defaultAutomationRules": [
                {
                    "id": "999",
                    "conditions": [
                        {
                            "id": "99999999-9999-9999-9999-999999999999",
                            "key": "999_otherwise",
                            "value": "Otherwise"
                        }
                    ],
                    "actions": [],
                    "isStopProcessingMoreRules": false,
                    "enable": true
                }
            ],
            "isAutoAssignIdleTickets": false,
            "dayBeforeTicketsIdle": 2,
            "alertNotification": {
                "expectedDate": {
                    "isDueInNotifOn": true,
                    "dueInNotifDays": 3,
                    "isDueTodayNotifOn": true,
                    "isOverdueNotifOn": true,
                    "overdueNotifDays": 7
                },
                "serviceLevelAgreement": {
                    "slaWeek": "1_weekdays",
                    "slaStartTime": {
                        "hours": -7,
                        "minutes": 0
                    },
                    "slaEndTime": {
                        "hours": -2,
                        "minutes": 0
                    },
                    "isBreachesFirstResponseTime": false,
                    "breachesHoursFirstResponseTime": 0,
                    "breachesAssigneeFirstResponseTime": [],
                    "isFrtUrgent": true,
                    "frtUrgentDuration": 1,
                    "frtUrgentTime": "2_hours",
                    "isFrtImportant": true,
                    "frtImportantDuration": 3,
                    "frtImportantTime": "1_days",
                    "isFrtMedium": false,
                    "frtMediumDuration": 1,
                    "frtMediumTime": "2_hours",
                    "isFrtLow": false,
                    "frtLowDuration": 1,
                    "frtLowTime": "2_hours",
                    "isBreachesResolutionTime": false,
                    "breachesHoursResolutionTime": 0,
                    "breachesAssigneeResolutionTime": [],
                    "isRtUrgent": false,
                    "rtUrgentDuration": 2,
                    "rtUrgentTime": "2_hours",
                    "isRtImportant": false,
                    "rtImportantDuration": 1,
                    "rtImportantTime": "2_hours",
                    "isRtMedium": false,
                    "rtMediumDuration": 1,
                    "rtMediumTime": "2_hours",
                    "isRtLow": false,
                    "rtLowDuration": 1,
                    "rtLowTime": "2_hours"
                }
            },
            "userPermission": [
                {
                    "key": "title",
                    "selectedKey": "1_allCanEdit"
                },
                {
                    "key": "description",
                    "selectedKey": "1_allCanEdit"
                },
                {
                    "key": "assignee",
                    "selectedKey": "1_allCanEdit"
                },
                {
                    "key": "expectedDate",
                    "selectedKey": "1_allCanEdit"
                },
                {
                    "key": "priority",
                    "selectedKey": "1_allCanEdit"
                },
                {
                    "key": "a2e39280-6254-4e33-b42a-5a44a0de36e5",
                    "selectedKey": "1_allCanEdit"
                },
                {
                    "key": "ec89d45f-380a-4ff6-82e7-c57d8f59d846",
                    "selectedKey": "1_allCanEdit"
                },
                {
                    "key": "80fa0819-25b8-4aa3-81b9-b3e634bc6394",
                    "selectedKey": "1_allCanEdit"
                }
            ],
            "isNewInstance": true,
            "userList": {
                "owners": [
                    {
                        "id": "36755639-d31a-491b-96d6-32e5361666a4",
                        "text": "MOD Administrator",
                        "secondaryText": "admin@M365x78560627.onmicrosoft.com",
                        "imageInitials": "MA"
                    },
                    {
                        "id": "9b82d54f-ea34-4df9-b791-bfcca45a5ed1",
                        "text": "Alex Wilber",
                        "secondaryText": "AlexW@M365x78560627.OnMicrosoft.com",
                        "imageInitials": "AW",
                        "key": "undefined"
                    },
                    {
                        "id": "7cbb9d18-0d7c-43dd-8ffe-a37a6daaf06d",
                        "text": "Adele Vance",
                        "secondaryText": "AdeleV@M365x78560627.OnMicrosoft.com",
                        "imageInitials": "AV",
                        "key": "undefined"
                    },
                    {
                        "id": "b971639b-772d-42d9-832b-2604f487d585",
                        "text": "Haekal Arif Rozikin",
                        "secondaryText": "haekal.rozikin@kitameraki.com",
                        "imageInitials": "HA",
                        "key": "undefined"
                    }
                ],
                "members": [
                    {
                        "id": "e5d94ba5-1831-403f-92cc-2fa30ec5e040",
                        "text": "Conf Room Adams",
                        "secondaryText": "Adams@M365x78560627.OnMicrosoft.com",
                        "imageInitials": "CR",
                        "key": "undefined"
                    },
                    {
                        "id": "c09f3c37-a8b8-4d21-8524-6d800df8bfb1",
                        "text": "Addison",
                        "secondaryText": "Addison@M365x78560627.onmicrosoft.com",
                        "imageInitials": "A",
                        "key": "undefined"
                    }
                ]
            },
            "notifyOnNoAssignee": false,
            "noAssigneeNotifRecipients": [
                {
                    "id": "7cbb9d18-0d7c-43dd-8ffe-a37a6daaf06d",
                    "text": "Adele Vance",
                    "secondaryText": "AdeleV@M365x78560627.OnMicrosoft.com",
                    "imageInitials": "AV",
                    "key": "undefined"
                },
                {
                    "id": "e5d94ba5-1831-403f-92cc-2fa30ec5e040",
                    "text": "Conf Room Adams",
                    "secondaryText": "Adams@M365x78560627.OnMicrosoft.com",
                    "imageInitials": "CR",
                    "key": "undefined"
                }
            ],
            "appVersion": "1.28.0",
            "workflows": {
                "ticket": [
                    {
                        "nodes": [
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
                            }
                        ],
                        "edges": [
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
                                }
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
                    }
                ],
                "isCustomWorkflow": false
            },
            "color": "#c9b3e6",
            "favoriteFilters": [],
            "userManagementMode": "manual",
            "id": "5836423c-e281-49c9-9c30-3170858f8662",
            "_rid": "RPh2AIxJHo6OAAAAAAAAAA==",
            "_self": "dbs/RPh2AA==/colls/RPh2AIxJHo4=/docs/RPh2AIxJHo6OAAAAAAAAAA==/",
            "_etag": "\"0900a45b-0000-0100-0000-67d91d110000\"",
            "_attachments": "attachments/",
            "lastTicketUpdated": "2025-03-18T07:13:20.647Z",
            "api": {
                "primaryKey": "c42375b7c178415b8fff99793b1eca16",
                "secondaryKey": "d0b676bb8ce64d7d9b529d8ace366929"
            },
            "assigneeVisibility": "1_seeAll",
            "isAutomaticAssignTickets": true,
            "membershipType": "Regular",
            "hasNewEmailNotificationConfig": true,
            "emailSync": {
                "creatorId": "",
                "creatorTenantId": "",
                "displayName": "",
                "emailAddress": "",
                "objectId": "",
                "tenantId": ""
            },
            "_ts": 1742282001
        }

        let newTicket = runTicketAutomation(ticket, instance);
        console.log(newTicket);
    }

    async function callApi() {
        const apiKey = "59c12ea8453e41f6977dba815a551905";
        const urlEndpoint = `https://teamswork.azure-api.net/ticketing/v1/instance?key=${apiKey}&timezone=0`;
        const response = await axios.get(urlEndpoint);
        console.log(response);
    }
    function test() {
        let a = `257c7899f3e203bbeebf4206044518a6,
                be66da54aae60df01a74353c56f458a4,
                215d4e781888e8f7d3ab0080e1cedb6c,
                5e67c95573018d98b7cd7d5cd15cbbae,
                4dffe1510aa4d48a88b56b5e522f8fa7,
                eb57bf5a94faff1616138b7df469fe64,
                0ad1ea3c39521613563f445ecf68cbde,
                11b290bc6b822bd1b17710edb99625f6,
                c5a913d932ca354bd038ac31353c7fcf,
                9df23b4a96424e4bc5c4387c0cae6cef,
                0cbb41f26757c3217fcbfad7479257a5,
                1fc47060a77462c315ac5bfca7b0e90a,
                399a21669300a4f95f9466b7bce54db1,
                b40ef3060e3e62534e184ef618582853,
                e5a37c5a2fba25c0050f6b87a875b2bd,
                002d54ac50998869ccf3cc9077c1588f,
                2d3eec8d0fb491d7e94bad8edc54580a,
                e42f92c7a872317233c7cdd4e81a817a,
                38f1eba88e949d285f929703c27829d6,
                8df7ecaa70f0c6e05642e47f661f5397,
                5977762d663ba3d9429af485e0cf1954,
                e5b6d1479e78863f4b5cedd77016d535,
                3aab74724132e80abaace7559bccf882,
                ee74806342753f0110f33e8a8baa4e82,
                b18b62f342824a5f6731ccb41512749c,
                7e8330e2f5b952f0a1f0c775f12f0131,
                5124f51f4073613e6770e8065e988f35,
                27249854f48b2096c54452bba723f54d,
                8db4f5f7ff196a05846b09b9f83f08a2,
                8adbc93750969f55a2485bddc3ade579,
                3620265c31c63cc123fbb90003e55346,
                365baa61a4ffd125d042bcd85fda676c,
                3ce24d239994790e3dc3eb83f2322b6c,
                6c4ffdfa1433cc42e0f8daabda0ab86b,
                5784535cc7a22001936cb0641a18da3f,
                3aa67e3b8deed189500cd5b622b3c8eb,
                e692264f1536da215caecc412d65c1bd,
                bae65b8da121a8d50af0be61c1f40f67,
                9812bc330c036a653c764307ee602234,
                4f186377982cde478a69904e7d75f10c,
                b06df2e8d7efa9c7dc994371f649d263,
                84523dea7e127d453bf3e08c9f3cd458,
                00f7df079fcfc93fcd74cc77a987d72c,
                d200819b98d22ca0da302dc434d24bef,
                e3c7c1ba60e26f8df62d1d80d1ffdab3,
                8f85904395b4bc5151b648d92ff345c2,
                369565d6389564ed857669ae2a5c1230,
                90ca0c92a5bafecfd226e4cf13e49d89,
                c404de2dd6d1c18b4c03a38d96f8a951,
                8f1124d35f95e8f05ea2b2b5ba37b353,
                b74bfd18b7f74cb1115035dfb7cbba38,
                bcf61ed9ecde3863521cd053d203f376,
                0b7f6a84e28aa6900eb33cb2ffe0300c,
                4c5383868cea7518ff99cf7fe3887742,
                40905c288c7022c2ed39d141863b6063,
                68d8a66ddd299cc39374da2e550cd22f,
                68600de0c8aee2beadd75a37a983ee19,
                35ae899ffd254fe98265e84058fc1c08,
                b3371fb6468f2505fdc8c09eb3f6ef59,
                e31168c1bf58451e61acbb39057501f4,
                320e4a27e709cbc1300ebcb27df2c52e,
                6c68bb918fcd289866efa35eb07790c8,
                ee124df646ab97d06f307461ecea823a,
                0c47b22ecc226c2eca08c9bebf4563a5,
                e7b4c64dd9823d2cdb6dc661032c65c4,
                5eaa468a7f1d92235b84844031e88310,
                bea2265a109543fad578a042bf7e273a,
                2a10f9a9881b5b5e7c0e51f3e02bac73,
                484d8a467609d910d7e48113731becd6,
                3802d89bf37789cd7a9f44dd69db44fe,
                054ef9dfd5230f1d68d5eaebfb25a18f,
                6462521ef30780d4869b850099ab370b,
                eb07fad1cfe3a2b2c3db9b08c470a2dc,
                4a016ca935de932bac83dfeff14d0a7c,
                c68fb77e79d4d7665230d82ebe7457fe,
                e9a045440fa948f739d30f70992561eb,
                813ca51efa241ee75cd2e6fb29a49e57,
                e53e9ccd3a88b6745d7d8e18021b3f8f,
                cffb81792a95be3dc30ca5e991c8433f,
                813a75158e306915f189b55b00c6667b,
                42ea7fd946796fb48f2b095ac99b1a40,
                0a994d56b24b38187120df1aec43f6b8,
                8838880d02513388564c485b293d44f2,
                7307af5e21b51b53deb0ac241d8e5c1f,
                e389518155a9e14ddf1b9b0535b21a20,
                eb5dd7c19c8a1d8314feadc8acfade5a,
                fc2a3eadc50663def2f185f0c9c2d9ea,
                7fdedc8fc23f5dfed7f1bd0400834fe8,
                c0e48bd0e318bd4f9d77d3a97723d823,
                6470230b99df405a18b9459891b7485d,
                69c5ea0cda2f573190126116dd598973,
                7bb7d3e307a28e475e403c62414638c3,
                3a20523c42a8a87cc31f9babcd3c44ba,
                05f552171980468b38a0ea32a02c20a4,
                4210f172d59544f5da1a7d664d39004e,
                99174e0d123aa8948d55b4c4e8ccecbd,
                7cceeac9af3392514358cfb557c3f7be,
                2320a5466043965d62899257173192c7,
                e631f9f454208fed32dc29f18fba1589,
                fbc0af6fffb237a76661e637077be3ea,
                95164cfada23cb7f715bde73c89dfc17,
                156a23bf4aa56910bd3df354725add8a,
                d364ba8522798ea081912eff4a1bb08c,
                4c2e5d3bcbade36b16efa235f6e8e866,
                bbe446f413bc16dd45ee99b91034a6a4,
                ed4fb3fdd4f14492e74c6f7e293aa47d,
                c3d84dd40a371714bd21f81ce8a60f7a,
                29241c99f8450b7f3d47ae16359c1ce7,
                5d53d399e759a5077c0a5ca97780232c,
                f8c3f87756ddffa5aeb5a5d3ba8b42c7,
                838e9c20b2595c35825714fa99268983,
                3f30dbf318a2cb5e5a37a56b64eef062,
                cd7a5a0ae604c582472bb071300eff14,
                3bb16a3adb5d31e82700e8fb847153c5,
                19046e2d4d8d8e50c1052272be9d7a81,
                bb625834dfd68f0dabb7d3feda589c4b,
                db4083b2efaa9a55b4590f40d46bfc14,
                62c1fadac6c8c87692dba18d17cece26,
                5bebe5f845579f169d88f23c29b6b658,
                87a674bfeb8d93af44b15a64d5f67576,
                9bf38dc044b58b6fddaab3de7158069f,
                d1cb25b8f0eab9bb986fa24c68c11a9a,
                220c9f5ffac8945dbe9b1a782408b567,
                17a4946660283333da5b85543d8d9cb0,
                3b3961856aeaec6e5a987b569aaa8802,
                fd565d530efe03bb5ad32854c523f400,
                c0ff72a10ef746a56a94c6e0ffc5a096,
                4e45c3197574866ae02d64f4d2885ea8,
                0144d46a209941715c140212efc79e17,
                d05d14fc99cf72f0e0965958583b6a31,
                9cd31a4c658357d9e7aa6538b6af4026,
                2bc0adf8f5085385ef277514186a5485,
                fd054ee8ed07e3d17c35c4f0185d858d,
                c248b12b13313db5b8b6dd8095a50949,
                7d3f95d6add8024ed49b8262c1a7d3ad,
                f2b7076fe9e17460ff82a1d402a08d1f,
                c3a918529a92b09384e11f4e990ce4b3,
                3d43e91efa77e3c8e421479f4c75ab0f,
                06c71ab51fd294b6092ca5acaea2ea5f,
                6af6be47f89dfa1ec5de26664ffb21e1,
                a95c647c4c67a7918fa6f40a49798d41,
                a3e35718a2c1a4f4c0cae00b53ae34d0,
                713d1631b27f8a1eb6703cf5a093e68e,
                37917cef162828d75f6009815292cfb2,
                0893fceb0b93d759d6d9421e58ae67e7,
                8303b7a247c3622db3358aa11f2dad0f,
                942b1ad99bcfbcfd852a40b5cd389b71,
                8aa630c825edf14803b416da221de6ba,
                98a6376277774e6ba455605aec09e233,
                7cccb24b9dbb43635dc040c5cb21d7c9,
                690a4e23b8bdbea04a5a0522262080af,
                5322bc1dd815ad9bd198abae0018cddd,
                146f13035e377586e86fe0a19f563b22,
                c43672386548ab117e0c3137dc4a6f83,
                753acbd22bdabe59c9d723584f0dea63,
                c1e9f00b5bdaafa093c1d0d54be78a09,
                a6dbe8051134a64aa6639796fb3591f1,
                da4fe115da69d7c5f19ce9b3af10c7e6,
                e547594783a994eb9601827ef3129af9,
                0abc802c31d9ba16e26d0ae6f166c98d,
                17d6e80b1177a8a470e100599b4331c4,
                3795329ea3c40bf0821b7bcc6ec0229b,
                3ea6990c148455113b32a749fbf9c8ca,
                20d6f1fa799f1321bc8eea01d9cf9c54,
                271068afe1c5e59a5c077d2ea1b67fb0,
                d1331ae9100ad0414b87118c763c7e6b,
                c91f66876899a0781858c3d2839c8d6e,
                ca89da06f1f09e990fe95bd2a327308f,
                e0aa852cccfe1d6fa9e5777e3ef7b722,
                db07e6d5cf5dcb71a48e63aa6cf6e12d,
                2b25c3c7d96c5c769ae7536fb20306a4,
                fdac089be451953f9c1c5db1278c7bfc,
                e6688438d9011526c03e85874fdfba08,
                19153944899e04505505ff148419eed6,
                6ed874d35b328fef8315337e3e6910ae,
                b1d3f2fcf18ca094ad912370da600fee,
                675983afccb867d6eb86fc3051cac727,
                fb5f55ff18c1c06babd88b7a674d9d84,
                19c69281161c336481604020bec3ac17,
                deb1b188d36145f1f10a475987f3eb3a,
                49a07da83d2c4d56cb1bfc6999ee6378,
                ffd6f25ae3cce871e077056bbdc71f5e,
                e123eb78638e846a9dd61fca96cbff9a,
                54e12ff13e788d62cf470abdbc97164d,
                054ab0c13ab48eca1432ea0a53a394df,
                4dbffe96be5c6dc01fd1d16ab3e7ccbc,
                090c82cc045c128292757dd48a0a574d,
                23fbd37a484a3857ef6c7cab98d6b490,
                dbe294da5f757c80793563f321791da3,
                1a1e9634c45e8c4a1761b3ad4707d215,
                2b96e4329c1962ca56a4941b5a03f1b8,
                da75da8be8244845b6242a590d3927a9,
                8ec6058f90b4d1d6d2eda6fcd023de8c,
                6a9cb870af712a87d2d9afa1391744b6,
                f09d002d736487378f62269835b501c3,
                ac8aa0d2501cae0ed184fca64035f1b7,
                dc19058137fbb771313dfa703ca2813e,
                125633af01bb397cb5a032acb4eb67d9,
                cbb9a5556b8ea4d20fbfac9ebed1c839,
                5a17204df827cdbc592fb30b7a38a05d,
                c8f6e3325b8e85b6d2ce0ec25f47ea65,
                5082d82453790bfa8538c74ac3e8ce6c,
                e0f9c74e9586f36cd9549cf58ac358e3,
                884ca6c0fbdc9cb5e7ac9a6e34b05142,
                e0834e342bef6b3d37e51319af618309,
                ed8f1576640304a16182a4fab618f6d8,
                f8d26bb80c986e680fc3bf1e3072ef39,
                5a0b3257c036dbbc71e98ae1db5f7107,
                48afaa44cd174f0dbd82e18fb4155c06,
                4bdb3c16cab326756771a87d59bd95d3,
                d4f5f9567ae3afd02a0f5dc74a376408,
                56b6c8e8a8bf5d1f2535cb718329cf5f,
                bc99540044fe5a7853915b70d8811ea1,
                571e71eff8000e792fafe826b4b0ea30,
                364a8c9b2e18a33612e603115810ab4d,
                fc41f45e873c7a739a683bd0e0af3cc4,
                749b5d6413086764c7a6257fc1a04162,
                88c3e0300821a3517a7b91800b677973,
                049616e83f0c0d1ef57d691cbe5546b5,
                bc4dd33ca39e81b3083b8746729f2c35,
                23b7f598f41bb63d72d0ffa3ccf2d705,
                edd22cc7ac0969fe999922cb4026bf60,
                7c63defcc1c92aa42c6906d3c4349f4a,
                3ea1199a68827e947f6b07a9c07c180e,
                b0ba984fb392d455af43569b50f59f3b,
                9427a4ec2cc7f74fc59ae6ae087f86b4,
                d88f3887c3c8c2655c755ee37884ccf7,
                3fcbb7ff0e17e03ed6ae8cc50c2fb571,
                ad536b27534fe8b59a373d9abba8635b,
                33b83c2362287c9ca09cec2b50c873c3,
                f8fcbceae9adedade41b7aebc0813885,
                c36b7052dd5498bda50a66c8c40406cc,
                47696d75b3938a6bac6805e1a6545be4,
                5bb16e78cf20c0ea907ad283b8dbcee4,
                0acd6bba76955e4fa0a7502123e6cd5f,
                342c80c756f841be960f6f34a36433b5,
                d089b07acfd809d53d549889ebb60214,
                3df13b3f86210023805d5a3ea5016ba1,
                fe636c3d2b15c8d15af297d2b31182b7,
                56028d5b1acbb1a158ab70a635ff54ed,
                c1d8ee3432e4ca7d343f085cd01762a9,
                138ccd81289389f2a98864f0475c0a41,
                a3547e3aea24bc600957614224f62736,
                877190ad0f970edd54ce8e1b811a6121,
                24667102a3bfc571cc695e2c56f16502,
                09055f9f25de2fd7cb9591b93eb3a280,
                401d55fce3227b77743b4090365a2338,
                ad6c6755f9620c805dee097fd152744d,
                2a7b994e10a9b1162c548abb1d3799bf,
                1830462ca3e72e16eb62d264480d7ff9,
                c088258e04a6a3c39812a112fea3285c,
                bac21613b04c121932aa3cd38a9d95db,
                7c34b0b70daa33c40d774115cc1a6507,
                27dd9b14174d304ab1e5dc5ec7864a8f,
                89914098b5b516229b53839cad5fd969,
                3234ac6d4f0d2c98ee5c6f9262d6889c,
                9a268a702f1e05c6c964681dc77db960,
                1e54d45961745ff1965ac378524f9172,
                880fe2186750f05bd1f64fa8b1cb6d0c,
                88f4231e03da682691e319f19f15ad7b,
                d337dccca6c40328884fa60fdba73b82,
                dd255d8f6987e76ea4d6d5d0ca4840e8,
                0a6915bb826809269f9c66e41873b412,
                c98f019590d166ba8559f2080520cd2c,
                9f8ffee10d38a4193e8915ab38cbf521,
                2d6165a758fec5e7425da490c2839c17,
                97f9ff34210fe343d9f370128712af59,
                e30426c3ba6d6da39e7c8899e02e1e67,
                1c59cc716f4bc7dcdb5602ec6929e511,
                3829f942e95179cdb99b02ed14161d7e,
                79327f214afefb8e60bdc34ec95d44b5,
                97820df5445fa94026c210d83dc16e96,
                a2f39a7e564611d38d56e581dd548d1f,
                9fd76a56095e138324fcd4eed8eed9a4,
                b5ea707100d8693c7c7fd97d8b980d4b,
                7225d0617697ac26ef290cc0a55b9922,
                4e45c3197574866ae02d64f4d2885ea8,
                0144d46a209941715c140212efc79e17,
                d05d14fc99cf72f0e0965958583b6a31,
                9cd31a4c658357d9e7aa6538b6af4026,
                2bc0adf8f5085385ef277514186a5485,
                fd054ee8ed07e3d17c35c4f0185d858d,
                c248b12b13313db5b8b6dd8095a50949,
                7d3f95d6add8024ed49b8262c1a7d3ad,
                f2b7076fe9e17460ff82a1d402a08d1f,
                c3a918529a92b09384e11f4e990ce4b3,
                3d43e91efa77e3c8e421479f4c75ab0f,
                06c71ab51fd294b6092ca5acaea2ea5f,
                6af6be47f89dfa1ec5de26664ffb21e1,
                a95c647c4c67a7918fa6f40a49798d41,
                a3e35718a2c1a4f4c0cae00b53ae34d0,
                713d1631b27f8a1eb6703cf5a093e68e,
                37917cef162828d75f6009815292cfb2,
                0893fceb0b93d759d6d9421e58ae67e7,
                8303b7a247c3622db3358aa11f2dad0f,
                942b1ad99bcfbcfd852a40b5cd389b71,
                8aa630c825edf14803b416da221de6ba,
                98a6376277774e6ba455605aec09e233,
                7cccb24b9dbb43635dc040c5cb21d7c9,
                690a4e23b8bdbea04a5a0522262080af,
                5322bc1dd815ad9bd198abae0018cddd,
                146f13035e377586e86fe0a19f563b22,
                c43672386548ab117e0c3137dc4a6f83,
                753acbd22bdabe59c9d723584f0dea63,
                c1e9f00b5bdaafa093c1d0d54be78a09,
                a6dbe8051134a64aa6639796fb3591f1,
                da4fe115da69d7c5f19ce9b3af10c7e6,
                e547594783a994eb9601827ef3129af9,
                0abc802c31d9ba16e26d0ae6f166c98d,
                17d6e80b1177a8a470e100599b4331c4,
                3795329ea3c40bf0821b7bcc6ec0229b,
                3ea6990c148455113b32a749fbf9c8ca,
                20d6f1fa799f1321bc8eea01d9cf9c54,
                271068afe1c5e59a5c077d2ea1b67fb0,
                d1331ae9100ad0414b87118c763c7e6b`;

        let operationIds = a.split(",");
        let cleanedIds = operationIds.map(id => id.trim());

        console.log(cleanedIds);
    }
    useEffect(() => {
        // loadData();
        // effect();
        // runAutomation();

        callApi();
        test();
    }, []);

    return (
        <div>
            <ActionButton
                iconProps={addIcon}
                onClick={openPanel}
                text={"Add"}
            />
            <Panel
                headerText={"Add rule"}
                isOpen={false}
                onDismiss={dismissPanel}
                isFooterAtBottom={true}
                onRenderFooterContent={() => <OnRenderFooterContent onSave={onSave} onCancel={onCancel} conditions={conditions} actions={actions} />}
                customWidth="500px"
                type={PanelType.custom}
            >
                <SpecialField
                    label={"Add a condition"}
                    placeholder={"Select a condition"}
                    addButtonText={"Add another condition"}
                    onChange={handleChangeCondition}
                    instance={instance}
                    options={optionConditions}
                />
                <SpecialField
                    label={"Add an action"}
                    placeholder={"Select an action"}
                    addButtonText={"Add another action"}
                    onChange={handleChangeAction}
                    instance={instance}
                    options={optionActions}
                />
            </Panel>

            <SpecialList
                columns={columns}
                items={items}
                instance={instance}
                tagCategories={tagCategories}
            />
        </div >
    )
}

export default AutomationRules;