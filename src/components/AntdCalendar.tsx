import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import '../App.css';
import { Badge, Calendar, Tag, Tooltip } from 'antd';
import format from 'date-fns/format';
import { ActionButton, FontIcon, IPanelStyleProps, IPanelStyles, IStyleFunctionOrObject, Panel, PanelType, Stack, Text, Dropdown, IDropdownStyles, IDropdownOption, TooltipHost, TooltipDelay, ITooltipHostStyles, DefaultButton, ITooltipProps, IconButton, PersonaSize, Persona, Label, Spinner, SpinnerSize } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import { add, eachDayOfInterval, endOfMonth, getDate, getMonth, getYear, setMonth, setYear, startOfMonth } from 'date-fns';
import { isMobile } from 'react-device-detect';
import scrollIntoView from 'scroll-into-view';
import moment from 'moment';

const data = [
    {
        "id": "3a9359ea-8078-4c76-9da8-4282540d4d31",
        "ticketId": 5,
        "title": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid odio veritatis ",
        "status": "Closed",
        "requestorId": "13c9d04a-e150-4ef8-9aba-fcf672d9f1b6",
        "requestorName": "Siti Atarfa Rahmida",
        "customFields": {},
        "priority": "4_Urgent",
        "department": "",
        "assigneeId": "c553f079-1e4d-49d3-a2a9-efc007452883",
        "category": "",
        "instanceId": "735a0974-d4d9-481d-babc-41d0b52f46b4",
        "expectedDate": "2023-06-07T17:00:00.000Z",
        "assigneeName": "Haekal Arif Rozikin",
        "createdDateTime": "2023-06-06T05:11:18.194Z",
        "tags": [
            {
                "tagCategoryId": "ab6087d0-2655-4bd3-bd4d-69798b69e4b6",
                "text": "enhancement"
            },
            {
                "tagCategoryId": "ab6087d0-2655-4bd3-bd4d-69798b69e4b6",
                "text": "new feature"
            },
            {
                "tagCategoryId": "82939677-2aca-44d7-8853-60238d04fdaa",
                "text": "v1.17 (subscription tab)"
            },
            {
                "tagCategoryId": "82939677-2aca-44d7-8853-60238d04fdaa",
                "text": "v1.19"
            }

        ],
        "lastInteraction": "2023-06-06T10:56:08.196Z",
        "firstTimeResponse": "",
        "timeResolution": "",
        "isFrtEscalated": false,
        "isRtEscalated": false,
        "createdBy": {
            "id": "c553f079-1e4d-49d3-a2a9-efc007452883",
            "secondaryText": "Haekal.rozikin@kitameraki.com",
            "text": "Haekal Arif Rozikin"
        },
        "lastUpdatedBy": {
            "id": "c553f079-1e4d-49d3-a2a9-efc007452883",
            "text": "Haekal Arif Rozikin",
            "secondaryText": "Haekal.rozikin@kitameraki.com"
        }
    },
    {
        "id": "3a9359ea-8078-4c76-9da8-4282540d4d33",
        "ticketId": 4,
        "title": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid odio veritatis ",
        "status": "Open",
        "requestorId": "13c9d04a-e150-4ef8-9aba-fcf672d9f1b6",
        "requestorName": "Siti Atarfa Rahmida",
        "customFields": {},
        "priority": "4_Urgent",
        "department": "",
        "assigneeId": "c553f079-1e4d-49d3-a2a9-efc007452883",
        "category": "",
        "instanceId": "735a0974-d4d9-481d-babc-41d0b52f46b4",
        "expectedDate": "2023-06-07T17:00:00.000Z",
        "assigneeName": "Haekal Arif Rozikin",
        "createdDateTime": "2023-06-06T05:11:18.194Z",
        "tags": [],
        "lastInteraction": "2023-06-06T10:56:08.196Z",
        "firstTimeResponse": "",
        "timeResolution": "",
        "isFrtEscalated": false,
        "isRtEscalated": false,
        "createdBy": {
            "id": "c553f079-1e4d-49d3-a2a9-efc007452883",
            "secondaryText": "Haekal.rozikin@kitameraki.com",
            "text": "Haekal Arif Rozikin"
        },
        "lastUpdatedBy": {
            "id": "c553f079-1e4d-49d3-a2a9-efc007452883",
            "text": "Haekal Arif Rozikin",
            "secondaryText": "Haekal.rozikin@kitameraki.com"
        }
    },
    {
        "id": "85f79336-8b4d-4d4a-b702-b7858a6e4b53",
        "ticketId": 3,
        "title": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid odio veritatis quibusdam corrupti consequuntur impedit temporibus repellat. Nam recusandae molestiae, molestias deleniti culpa autem ut, nisi officiis labore aperiam vel.",
        "status": "Resolved",
        "requestorId": "c553f079-1e4d-49d3-a2a9-efc007452883",
        "requestorName": "Haekal Arif Rozikin",
        "customFields": {},
        "priority": "3_Important",
        "department": "",
        "assigneeId": "059a8122-0069-4e9f-a616-5220006ea304",
        "category": "",
        "instanceId": "735a0974-d4d9-481d-babc-41d0b52f46b4",
        "expectedDate": "2023-06-07T17:00:00.000Z",
        "assigneeName": "Ingmar Shidqi",
        "createdDateTime": "2023-06-06T02:22:26.952Z",
        "tags": [],
        "lastInteraction": "2023-06-06T10:56:18.010Z",
        "firstTimeResponse": "",
        "timeResolution": "",
        "isFrtEscalated": false,
        "isRtEscalated": false,
        "createdBy": {
            "id": "c553f079-1e4d-49d3-a2a9-efc007452883",
            "text": "Haekal Arif Rozikin",
            "secondaryText": "Haekal.rozikin@kitameraki.com"
        },
        "lastUpdatedBy": {
            "id": "c553f079-1e4d-49d3-a2a9-efc007452883",
            "text": "Haekal Arif Rozikin",
            "secondaryText": "Haekal.rozikin@kitameraki.com"
        }
    },
    {
        "id": "092a2a5d-3300-4716-8407-ad17d4b7dfca",
        "ticketId": 2,
        "title": "Ticket ketiga",
        "status": "In Progress",
        "requestorId": "059a8122-0069-4e9f-a616-5220006ea304",
        "requestorName": "Ingmar Shidqi",
        "customFields": {},
        "priority": "2_Medium",
        "department": "",
        "assigneeId": "c553f079-1e4d-49d3-a2a9-efc007452883",
        "category": "",
        "instanceId": "735a0974-d4d9-481d-babc-41d0b52f46b4",
        "expectedDate": "2023-06-07T17:00:00.000Z",
        "assigneeName": "Haekal Arif Rozikin",
        "createdDateTime": "2023-06-02T07:03:20.031Z",
        "tags": [],
        "lastInteraction": "2023-06-06T10:56:26.524Z",
        "firstTimeResponse": "",
        "timeResolution": "",
        "isFrtEscalated": false,
        "isRtEscalated": false,
        "createdBy": {
            "id": "c553f079-1e4d-49d3-a2a9-efc007452883",
            "text": "Haekal Arif Rozikin",
            "secondaryText": "Haekal.rozikin@kitameraki.com"
        },
        "lastUpdatedBy": {
            "id": "c553f079-1e4d-49d3-a2a9-efc007452883",
            "text": "Haekal Arif Rozikin",
            "secondaryText": "Haekal.rozikin@kitameraki.com"
        }
    },
    {
        "id": "c7ba906c-75aa-4d9f-b1ab-11b0bea0cb69",
        "ticketId": 1,
        "title": "Ticket keempat",
        "status": "Reopened",
        "requestorId": "c553f079-1e4d-49d3-a2a9-efc007452883",
        "requestorName": "Haekal Arif Rozikin",
        "customFields": {},
        "priority": "1_Low",
        "department": "",
        "assigneeId": "059a8122-0069-4e9f-a616-5220006ea304",
        "category": "",
        "instanceId": "735a0974-d4d9-481d-babc-41d0b52f46b4",
        "expectedDate": "2023-06-07T17:00:00.000Z",
        "assigneeName": "Ingmar Shidqi",
        "resolution": "",
        "firstResolutionDate": "2023-06-06T02:25:07.819Z",
        "lastResolutionDate": "2023-06-06T02:34:36.993Z",
        "createdDateTime": "2023-06-02T07:02:59.506Z",
        "tags": [],
        "lastInteraction": "2023-06-06T10:56:34.614Z",
        "firstTimeResponse": "",
        "timeResolution": "",
        "isFrtEscalated": false,
        "isRtEscalated": false,
        "createdBy": {
            "id": "c553f079-1e4d-49d3-a2a9-efc007452883",
            "text": "Haekal Arif Rozikin",
            "secondaryText": "Haekal.rozikin@kitameraki.com"
        },
        "lastUpdatedBy": {
            "id": "c553f079-1e4d-49d3-a2a9-efc007452883",
            "text": "Haekal Arif Rozikin",
            "secondaryText": "Haekal.rozikin@kitameraki.com"
        },
        "lastResolutionComment": ""
    }
];

const tagCategories = [
    {
        "instanceId": "13678d43-455a-48da-99b8-5c32d86ab400",
        "text": "issue type",
        "color": "#5abf40",
        "tags": [
            {
                "text": "bug"
            },
            {
                "text": "regression"
            },
            {
                "text": "new feature"
            },
            {
                "text": "support"
            },
            {
                "text": "enhancement"
            }
        ],
        "id": "ab6087d0-2655-4bd3-bd4d-69798b69e4b6",
        "_rid": "wTtJAN+xEg0CAAAAAAAAAA==",
        "_self": "dbs/wTtJAA==/colls/wTtJAN+xEg0=/docs/wTtJAN+xEg0CAAAAAAAAAA==/",
        "_etag": "\"68020bb7-0000-0700-0000-627b468a0000\"",
        "_attachments": "attachments/",
        "_ts": 1652246154
    },
    {
        "instanceId": "13678d43-455a-48da-99b8-5c32d86ab400",
        "text": "version",
        "color": "#bf4040",
        "tags": [
            {
                "text": "maintenance"
            },
            {
                "text": "v2.0"
            },
            {
                "text": "v1.17 (subscription tab)"
            },
            {
                "text": "v1.18 (bug fixing)"
            },
            {
                "text": "v1.19"
            },
            {
                "text": "v1.20"
            },
            {
                "text": "v1.18 (appsource)"
            }
        ],
        "id": "82939677-2aca-44d7-8853-60238d04fdaa",
        "_rid": "wTtJAN+xEg1EAAAAAAAAAA==",
        "_self": "dbs/wTtJAA==/colls/wTtJAN+xEg0=/docs/wTtJAN+xEg1EAAAAAAAAAA==/",
        "_etag": "\"1f02728d-0000-0700-0000-647eeb5b0000\"",
        "_attachments": "attachments/",
        "_ts": 1686039387
    },
]

const iconlist = {
    "1_Low": {
        iconName: "SortDown",
        color: "blue",
        name: "Low"
    },
    "2_Medium": {
        iconName: "LocationDot",
        color: "green",
        name: "Medium"
    },
    "3_Important": {
        iconName: "SortUp",
        color: "red",
        name: "Important"
    },
    "4_Urgent": {
        iconName: "Warning12",
        color: "red",
        name: "Urgent"
    }
}

const iconOpenPanelStyles: any = {
    border: '1px solid #0078d4',
    height: 30,
    position: "absolute",
    top: "90%",
    right: 0,
    zIndex: 1,
    backgroundColor: '#fff',
    padding: '10px 0px'
}

const panelStyles: IStyleFunctionOrObject<IPanelStyleProps, IPanelStyles> = {
    navigation: {
        // minHeight: 70,
        height: 0,
        borderBottom: '2px solid #ededed',
        alignItems: "center",
        padding: '0px 20px'
    },
    main: {
        borderLeft: '1px solid #ededed',
        boxShadow: "",
    },
    footer: {
        // marginTop: 200
    }
}

const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 70 },
};

const StatusColorEnum = {
    open: "#fff",
    inProgress: "#1cd9d6",
    reopened: "#ff970f",
    resolved: "#34eb71",
    closed: "#28b05f"
}
const hostStyles: Partial<ITooltipHostStyles> = { root: { display: 'inline-block' } };


interface ICalendarView {
    tickets?: any
}

const AntdCalendar: React.FC<ICalendarView> = (props) => {

    const now = new Date();
    const [headerDate, setHeaderDate] = useState<string>(format(new Date(), "EEE, LLL d"));
    const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(isMobile ? false : true);
    const [tickets, setTickets] = useState<any>(data);
    const [selectDate, setSelectDate] = useState<any>(format(now, 'yyyy-MM-dd'));
    const [onDrag, setOnDrag] = useState<boolean>(false);
    const [viewMode, setViewMode] = useState<"list" | "calendar">("calendar");
    const [allDates, setAllDates] = useState<any[]>([]);
    const cellRenderFunc = (date): JSX.Element => {
        // console.log(new Date(date))
        // check on each ticket expected date
        const ticketList = tickets?.filter((item) => format(new Date(item.expectedDate), 'yyyy-MM-dd') == format(new Date(date), 'yyyy-MM-dd')) ?? [];

        const today = format(new Date(date), 'yyyy-MM-dd') == format(now, 'yyyy-MM-dd');
        const countTicket = ticketList.length;
        return (
            <Droppable droppableId={`event_${new Date(date)}`}>
                {(provided: any, snapshot: any) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        isDraggingOver={snapshot.isDraggingOver}

                    >
                        {/* ant-picker-cell-inner */}
                        <div className={`ant-picker-calendar-date ${today && 'ant-picker-calendar-date-today'}`}>
                            <div className="ant-picker-calendar-date-value">
                                {date.format("D")}
                            </div>
                            <div className="ant-picker-calendar-date-content">
                                {ticketList.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided: any, snapshot: any) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.dragHandleProps}
                                                {...provided.draggableProps}
                                                isDragging={snapshot.isDragging}
                                            >
                                                <Stack
                                                    style={{
                                                        border: `1px solid ${iconlist[item.priority].color}`,
                                                        borderRadius: 5,
                                                        margin: '3px 0px',
                                                        padding: '1px 6px',
                                                        background: "#fff",
                                                    }}
                                                    horizontal
                                                    tokens={{ childrenGap: 5 }}
                                                    verticalAlign="center"
                                                    title={item.title}
                                                >
                                                    <FontIcon
                                                        iconName={iconlist[item.priority].iconName} style={{ color: iconlist[item.priority].color, fontSize: 9 }}
                                                    />
                                                    <Text variant="small" style={{ whiteSpace: "nowrap", overflow: "hidden" }}>{item.title}</Text>
                                                </Stack>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                <Badge count={countTicket} color="red" />
                            </div>
                            {today &&
                                <ActionButton iconProps={{ iconName: "More" }} />
                            }

                        </div>
                        {/* {provided.placeholder} */}
                    </div>
                )}
            </Droppable>
        )
    };

    function headerRender({ value, type, onChange, onTypeChange }) {
        const start = 0;
        const end = 12;
        const yearOptions: IDropdownOption[] = [];
        const monthOptions: IDropdownOption[] = [];
        const months = [];
        const current = value.clone();
        const localeData = value.localeData();
        const month = selectDate ? getMonth(selectDate) : value.month();
        const year = selectDate ? getYear(selectDate) : value.year();

        console.log(getMonth(new Date(value)));
        console.log(year);
        for (let i = start; i < end; i++) {
            current.month(i);
            months.push(localeData.monthsShort(current));
        }
        for (let i = start; i < end; i++) {
            console.log(months[i])
            monthOptions.push({ key: i, text: months[i] });
        }
        for (let i = year - 5; i < year + 6; i += 1) {
            yearOptions.push({ key: i, text: String(i) });
        }
        return (
            <div style={{ padding: 10 }}>
                <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: '10' }}>
                    <Stack>

                        <Dropdown
                            placeholder="Select Year"
                            options={yearOptions}
                            styles={dropdownStyles}
                            selectedKey={year}
                            onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
                                const now = value.clone().year(option?.key);
                                onChange(now);
                            }}
                        />
                    </Stack>
                    <Stack>
                        <Dropdown
                            placeholder="Select Month"
                            options={monthOptions}
                            styles={dropdownStyles}
                            selectedKey={month}
                            onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
                                const newValue = value.clone();
                                console.log(getDate(new Date(newValue)))
                                newValue.month(parseInt(String(option?.key), 10));
                                onChange(newValue);
                                const params = `${year}-${newValue.month() + 1}`;
                                console.log(new Date(params));
                                console.log(format(startOfMonth(new Date(params)), "yyyy-MM-dd"))
                            }}
                        />
                    </Stack>
                </Stack>
            </div>
        );
    }

    function handleRenderNavigationContent(props) {
        return (<></>
            // <div className="header" style={{ width: '100%' }}>
            //     <Text variant="xLarge">{headerDate}</Text>
            // </div>
        )
    }
    function handleRenderFooterContent(props) {
        return (
            <div>
                <ActionButton
                    iconProps={{ iconName: "ClosePane" }}
                    style={{
                        border: '1px solid #0078d4',
                        height: 30
                    }}
                    onClick={dismissPanel}
                />
            </div>
        )
    }
    function handleOnDragEnd(data: DropResult) {
        console.log(data);
        const id = data.draggableId;
        let activeTicket = tickets.find((item) => item.id == id);
        activeTicket.expectedDate = format(new Date(data.destination.droppableId.split("_")[1]), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        setTickets((item) => item.map((i) => i.id == id ? activeTicket : i));
    }

    const handleScroll = (date) => {
        const element = document.querySelector<HTMLElement>(`.scroll-target-${format(new Date(date), 'yyyy-MM-dd')}`);
        if (element) {
            console.log('Scrolling into element');
            scrollIntoView(element, {
                align: {
                    top: 0,
                },
            });
        }
    }

    function handleSelectDate(date: any) {
        const value = format(new Date(date), 'yyyy-MM-dd');
        const currentDate = new Date(value); // Get the current date
        const startDate = startOfMonth(currentDate); // Get the start date of the current month
        const endDate = endOfMonth(currentDate); // Get the end date of the current month
        const allDates = eachDayOfInterval({ start: startDate, end: endDate });

        if (onDrag) return;
        if (selectDate == value) {
            setHeaderDate(format(new Date(value), "EEE, LLL d"));
            setAllDates(allDates);
            openPanel();
            setTimeout(() => {
                handleScroll(value);
            }, 100);
        }
        setSelectDate(value);
    }

    function StatusRender(props) {
        const item = props.item
        switch (item.status) {
            case "Open":
                return (
                    <Tag
                        color={StatusColorEnum.open}
                        key={`${item.id}_${item.status}`}
                        style={{ color: '#000000', border: '1px solid #000000', fontSize: 8 }}
                    >
                        Open
                    </Tag>
                )
            case "In Progress":
                return (
                    <Tag
                        color={StatusColorEnum.inProgress}
                        key={`${item.id}_${item.status}`}
                        style={{ fontSize: 8 }}
                    >
                        In Progress
                    </Tag>
                )
            case "Reopened":
                return (
                    <Tag
                        color={StatusColorEnum.reopened}
                        key={`${item.id}_${item.status}`}
                        style={{ fontSize: 8 }}
                    >
                        Reopened
                    </Tag>
                )
            case "Resolved":
                return (
                    <Tag
                        color={StatusColorEnum.resolved}
                        key={`${item.id}_${item.status}`}
                        style={{ fontSize: 8 }}
                    >
                        Resolved
                    </Tag>
                )
            case "Closed":
                return (
                    <Tag
                        color={StatusColorEnum.closed}
                        key={`${item.id}_${item.status}`}
                        style={{ fontSize: 8 }}
                    >
                        Closed
                    </Tag>
                )
            default:
                break;
        }
    }
    function TagRender(props) {
        const item = props.item
        const tags = item.tags;
        const sortedTags = tags ? tags.sort((a, b) => a.text > a.text ? 1 : ((b.text > a.text) ? -1 : 0)) : [];
        const rows: any = [];
        sortedTags.map((e, i) => {
            const tagCategory = tagCategories.find(o => o.id === e.tagCategoryId);
            if (i <= 1) {
                rows.push(
                    <Tooltip title={e.text.toUpperCase()} placement="top" >
                        <a style={{ display: "inline-block" }}>
                            <Tag
                                color={tagCategory ? tagCategory.color : "error"}
                                key={`${e.tagCategoryId}_${e.text}`}
                                style={{ fontSize: 8 }}
                            >
                                {e.text.toUpperCase()}
                            </Tag>
                        </a>
                    </Tooltip>
                )
            }
        })
        if (sortedTags.length > 2) {
            rows.push(<TooltipHost
                tooltipProps={{
                    onRenderContent: (): any => {
                        return (
                            sortedTags.map((e, i) => {
                                const tagCategory = tagCategories.find(o => o.id === e.tagCategoryId);
                                if (i > 1) {
                                    return (
                                        <Tooltip title={e.text.toUpperCase()} placement="top" >
                                            <a style={{ display: "inline-block" }}>
                                                <Tag
                                                    style={{ margin: 2, fontSize: 8 }}
                                                    color={tagCategory ? tagCategory.color : "error"}
                                                    key={`${e.tagCategoryId}_${e.text}`}>
                                                    {e.text.toUpperCase()}
                                                </Tag>
                                            </a>
                                        </Tooltip>
                                    )
                                }
                            })
                        )
                    },
                }}
                delay={TooltipDelay.zero}
                styles={hostStyles}
            >
                <IconButton iconProps={{ iconName: "More" }} />
            </TooltipHost>)
        }

        return (
            <Stack tokens={{ childrenGap: 3, }} horizontal>
                {rows.map((i) => (i))}
            </Stack>
        )
    }

    function CardRender(props) {
        const item = props.item;
        return (
            <Stack className="item-body" horizontal>
                <Stack tokens={{ childrenGap: 10 }} style={{ width: '60%' }}>
                    <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 25 }} horizontalAlign="start">
                        <Text style={{ color: "#797775", fontSize: 10 }}><strong>ID: {item.ticketId}</strong></Text>
                        <Stack horizontal verticalAlign="stretch" tokens={{ childrenGap: 5 }} style={{ width: 75 }}>
                            <FontIcon
                                iconName={iconlist[item.priority].iconName}
                                style={{ color: iconlist[item.priority].color }}
                            />
                            <Text style={{ fontSize: 10 }}>{iconlist[item.priority].name}</Text>
                        </Stack>
                        <StatusRender item={item} />
                    </Stack>
                    <Stack title={item.title}>{(item.title.length > 80) ? `${item.title.substring(0, isMobile ? 20 : 81)} ...` : item.title}</Stack>
                    <Stack>
                        <TagRender item={item} />
                    </Stack>
                </Stack>
                <Stack tokens={{ childrenGap: 8 }} style={{ marginLeft: isMobile ? 'auto' : '' }}>
                    {item?.requestorId &&
                        <Persona
                            text={item.requestorName}
                            size={PersonaSize.size24}
                            onRenderPrimaryText={isMobile ? () => (<></>) : undefined}
                        />
                    }
                    {item?.assigneeId &&
                        <Persona
                            text={item.assigneeName}
                            size={PersonaSize.size24}
                            onRenderPrimaryText={isMobile ? () => (<></>) : undefined}
                        />
                    }
                </Stack>
                <Stack>
                    <FontIcon iconName="MoreVertical" />
                </Stack>
            </Stack>
        )
    }

    async function handleOnScroll(e) {
        console.log("scroll event")
        const selectedDate = new Date(selectDate);
        let date: Date = new Date();
        let currentMonth = getMonth(selectedDate);
        let currentYear = getYear(selectedDate);
        let startDate;
        let endDate;
        let tickets;
        // scroll Top
        if ((e.target.scrollTop + e.target.offsetHeight + 1) >= e.target.scrollHeight) {
            if (currentMonth == 12) {
                currentMonth = 1;
                currentYear += 1;
            } else {
                currentMonth += 1;
            }
            date.setMonth(currentMonth);
            date.setFullYear(currentYear);
            startDate = format(startOfMonth(date), "yyyy-MM-dd"); // Get the start date of the current month
            endDate = format(endOfMonth(date), "yyyy-MM-dd"); // Get the end date of the current month
            console.log(startDate);
            console.log(endDate);

        } else if (e.target.scrollTop == 0) {//scroll Bottom
            if (currentMonth == 1) {
                currentMonth = 12;
                currentYear -= 1;
            } else {
                currentMonth -= 1;
            }
            date.setMonth(currentMonth);
            date.setFullYear(currentYear);
            startDate = format(startOfMonth(date), "yyyy-MM-dd"); // Get the start date of the current month
            endDate = format(endOfMonth(date), "yyyy-MM-dd"); // Get the end date of the current month
            console.log(startDate)
            console.log(endDate);

        }

    }
    useEffect(() => {
        const tableHeader = document.querySelector('.ant-picker-content thead tr');
        console.log(tableHeader)
        const columns = tableHeader.getElementsByTagName('th');
        console.log(columns);
        // Modify the content of each column
        for (let i = 0; i < columns.length; i++) {
            columns[i].textContent = `Column ${i + 1}`;
        }
    }, []);
    return (
        <DragDropContext
            onDragStart={() => setOnDrag(true)}
            onDragEnd={(date) => {
                handleOnDragEnd(date);
                setOnDrag(false);
            }}>
            <div style={{ padding: 20 }}>
                <div className="ms-Grid" dir="ltr">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-xl12">
                        <Stack horizontal>
                            <IconButton
                                checked={viewMode == "calendar"}
                                iconProps={{ iconName: "Calendar" }}
                                onClick={() => setViewMode("calendar")}
                                style={{
                                    border: '1px solid #a9a9a9',
                                    borderRadius: 0
                                }}
                            />
                            <IconButton
                                checked={viewMode == "list"}
                                iconProps={{ iconName: "BulletedListTextMirrored" }}
                                onClick={() => setViewMode("list")}
                                style={{
                                    border: '1px solid #a9a9a9',
                                    borderRadius: 0
                                }}
                            />
                        </Stack>
                    </div>
                    {(viewMode == "list") &&
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm12 ms-md12 ms-xl12">
                                <Text>Ticket List</Text>
                            </div>
                        </div>
                    }

                    {(viewMode == "calendar") &&
                        <div className="ms-Grid-row">
                            <div className={`ms-Grid-col ms-sm${isOpen ? '7' : '12'} ms-md${isOpen ? '7' : '12'} ms-xl${isOpen ? '7' : '12'}`}>
                                <Calendar
                                    dateFullCellRender={cellRenderFunc}
                                    mode="month"
                                    headerRender={headerRender}
                                    onSelect={handleSelectDate}
                                    className='defaultpanel'
                                    value={moment(new Date('2023-07-01'))}
                                // defaultValue={format(new Date('2023-07-01'), 'yyyy-MM-dd')}
                                />
                            </div>
                            <ActionButton
                                iconProps={{ iconName: "OpenPane" }}
                                style={iconOpenPanelStyles}
                                onClick={openPanel}
                            />
                            <Panel
                                styles={panelStyles}
                                isBlocking={false}
                                isOpen={isOpen}
                                onDismiss={dismissPanel}
                                closeButtonAriaLabel="Close"
                                type={PanelType.custom}
                                customWidth="551px"
                                onRenderNavigationContent={handleRenderNavigationContent}
                                onRenderFooterContent={handleRenderFooterContent}
                                isFooterAtBottom={true}
                            >

                                <div className="body" style={{ margin: '20px 0px', overflowY: "auto", maxHeight: `calc(100vh - 50px)` }} onScroll={(e) => handleOnScroll(e)} data-is-scrollable={true}>

                                    {allDates.map((date, index) => {
                                        return (
                                            <div style={{ marginBottom: 20 }}>
                                                {(index == 0) &&
                                                    <Stack horizontal verticalAlign='center' tokens={{ childrenGap: 15 }}>
                                                        <div className="line-with-text">
                                                            <div className="line"></div>
                                                            <div className="text">
                                                                <Text variant='large'>
                                                                    <strong>
                                                                        {format(date, 'MMM yyyy')}
                                                                    </strong>
                                                                </Text>
                                                            </div>
                                                            <div className="line"></div>
                                                        </div>
                                                    </Stack>
                                                }
                                                <Stack style={{ marginBottom: 10 }} className={`scroll-target-${format(new Date(date), 'yyyy-MM-dd')}`}>
                                                    <Text><strong>{format(date, 'd EEEE')}</strong></Text>
                                                </Stack>
                                                {data.filter((item) => format(new Date(item?.expectedDate), 'yyyy MM dd') == format(date, 'yyyy MM dd')).length > 0 &&
                                                    <Stack style={{ minHeight: 70 }}>
                                                        {data.filter((item) => format(new Date(item?.expectedDate), 'yyyy MM dd') == format(date, 'yyyy MM dd')).map((item) => {
                                                            return (<CardRender item={item} />)
                                                        })}
                                                    </Stack>
                                                }
                                                {data.filter((item) => format(new Date(item?.expectedDate), 'yyyy MM dd') == format(date, 'yyyy MM dd')).length == 0 &&
                                                    <Text>No Plans</Text>
                                                }
                                            </div>
                                        )
                                    })}
                                    {data.map((item) => {
                                        return (<CardRender item={item} />)
                                    })
                                    }
                                </div>
                            </Panel>
                        </div>
                    }
                </div>
            </div>
        </DragDropContext>
    )
}

export default AntdCalendar
