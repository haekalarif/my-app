import React, { useState } from 'react';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { DefaultButton, Label, PrimaryButton, Stack, TextField, initializeIcons, Text, FontIcon, ActionButton } from "@fluentui/react"

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FontWeights, IButtonStyles, IIconProps, IStackProps, IconButton, getTheme, mergeStyleSets } from '@fluentui/react';
import { TimePicker, Modal } from 'antd';
import { SliderPicker, ColorResult } from "react-color"
import { v4 as uuidv4 } from 'uuid';

import 'antd/dist/antd.css';

const localizer = momentLocalizer(moment);
// const DnDCalendar = withDragAndDrop(Calendar);

initializeIcons();

const cancelIcon: IIconProps = { iconName: 'Cancel' };
const theme = getTheme();
const contentStyles = mergeStyleSets({
    container: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'stretch',
    },
    header: [
        {
            flex: '1 1 auto',
            // borderTop: `4px solid ${theme.palette.themePrimary}`,
            color: theme.palette.neutralPrimary,
            display: 'flex',
            alignItems: 'center',
            fontWeight: FontWeights.semibold,
            padding: '12px 0px',
        },
    ],
    heading: {
        color: theme.palette.neutralPrimary,
        fontWeight: FontWeights.semibold,
        // fontSize: 'inherit',
        margin: '0',
    },
    body: {
        flex: '4 4 auto',
        padding: '0 24px 24px 24px',
        overflowY: 'hidden',
        selectors: {
            p: { margin: '14px 0' },
            'p:first-child': { marginTop: 0 },
            'p:last-child': { marginBottom: 0 },
        },
        background: "#fff"
        // width: 300
    },
});
const stackProps: Partial<IStackProps> = {
    horizontal: true,
    tokens: { childrenGap: 40 },
    styles: { root: { marginBottom: 20 } },
};
const iconButtonStyles: Partial<IButtonStyles> = {
    root: {
        color: theme.palette.neutralPrimary,
        marginLeft: 'auto',
        marginTop: '4px',
        marginRight: '2px',
    },
    rootHovered: {
        color: theme.palette.neutralDark,
    },
};

function ReactBigCalendar(props) {
    // const [events, setEvents] = React.useState([
    //   {
    //     start: new Date(),
    //     end: new Date(new Date().setHours(new Date().getHours() + 2)),
    //     title: "Some title",
    //     color: "#15e65e"
    //   },
    // ]);
    const [events, setEvents] = React.useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [color, setColor] = React.useState<string>("#bf4040");
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [startHour, setStartHour] = useState<any>("00:00");
    const [endHour, setEndHour] = useState<any>("00:00");
    const [dateInfo, setDateInfo] = useState<string>("");
    const [action, setAction] = useState<"create" | "view" | "edit" | string>("");
    const [headerTitle, setHeaderTitle] = useState<string>("");
    const [idEvent, setIdEvent] = useState<string>("");

    const onEventDrop = (data) => {
        console.log(data);
        const updatedEvent: any = {
            ...data.event,
            start: new Date(data.start),
            end: new Date(data.end),
        };
        setEvents((event: any) => event.map((e) => e.id == updatedEvent.id ? updatedEvent : e));
    };

    const addEvent = (slotInfo) => {
        setTitle("");
        setDescription("");
        setDateInfo(slotInfo.slots[0]);
        setStartHour(moment('00:00', 'HH:mm'));
        setEndHour(moment('00:00', 'HH:mm'));
        setColor("#bf4040");

    };

    const eventStyleGetter = (event, start, end, isSelected) => {
        return {
            event,
            start,
            end,
            isSelected,
            style: { backgroundColor: event.color }
        };
    };

    function handleChangeTitle(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) {
        if (newValue) setTitle(newValue)
        else setTitle('');
    }
    function handleChangeDescription(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) {
        if (newValue) setDescription(newValue)
        else setDescription('');
    }
    function handleStartHour(time: any, timeString: string) {
        setStartHour(timeString);
    }
    function handleEndHour(time: any, timeString: string) {
        setEndHour(timeString);
    }
    function handleChangeComplete(color: ColorResult, event: any) {
        setColor(color.hex);
    };

    function save() {
        let startDate = new Date(dateInfo);
        let startHourMinute = startHour.split(":");
        let endHourMinute = endHour.split(":");
        startDate.setHours(Number(startHourMinute[0]));
        startDate.setMinutes(Number(startHourMinute[1]));

        let endDate = new Date(startDate);
        endDate.setHours(Number(endHourMinute[0]));
        endDate.setMinutes(Number(endHourMinute[1]));
        const newEvent = {
            id: uuidv4(),
            title: title,
            description: description,
            start: startDate,
            end: endDate,
            color: color
        };
        setEvents((event: any) => [...event, newEvent]);
    }
    function edit() {
        let startDate = new Date(dateInfo);
        let startHourMinute = startHour.split(":");
        let endHourMinute = endHour.split(":");
        startDate.setHours(Number(startHourMinute[0]));
        startDate.setMinutes(Number(startHourMinute[1]));

        let endDate = new Date(startDate);
        endDate.setHours(Number(endHourMinute[0]));
        endDate.setMinutes(Number(endHourMinute[1]));
        const editEvent = {
            id: idEvent,
            title: title,
            description: description,
            start: startDate,
            end: endDate,
            color: color
        };
        setEvents((event: any) => event.map((e) => e.id == editEvent?.id ? editEvent : e));
    }

    function onClickEvent(event) {
        const startHour: any = new Date(event?.start);
        const endHour: any = new Date(event?.end);
        setDateInfo(String(startHour));
        setIdEvent(event?.id);
        setTitle(event?.title);
        setDescription(event?.description);
        setStartHour(moment(startHour).format("HH:mm"));
        setEndHour(moment(endHour).format("HH:mm"));
        setColor(event?.color);
    }

    return (
        <div className="App">
            {/* <DnDCalendar
                defaultDate={moment().toDate()}
                defaultView="month"
                events={events}
                localizer={localizer}
                onEventDrop={onEventDrop}
                onEventResize={onEventDrop}
                resizable
                style={{ height: "100vh" }}
                onSelectEvent={(event) => {
                    setIsModalOpen(true);
                    setAction("view");
                    setHeaderTitle("View Event");
                    onClickEvent(event);
                }}
                onSelectSlot={(slotInfo) => {
                    setIsModalOpen(true);
                    setAction("create");
                    setHeaderTitle("Add Event");
                    addEvent(slotInfo);
                }}
                selectable={true}
                eventPropGetter={eventStyleGetter}
            /> */}
            <PrimaryButton
                text={"Open modal"}
                onClick={() => setIsModalOpen(true)}
            />
            <Modal
                visible={isModalOpen}
                destroyOnClose={true}
                modalRender={() => {
                    return (
                        <div className={contentStyles.body} style={{ pointerEvents: 'auto' }}>
                            <div className={contentStyles.header}>
                                <h2 className={contentStyles.heading}>
                                    {headerTitle}
                                </h2>
                                <IconButton
                                    styles={iconButtonStyles}
                                    iconProps={cancelIcon}
                                    ariaLabel="Close popup modal"
                                    onClick={() => setIsModalOpen(false)}
                                />
                            </div>
                            <div>
                                <Text>{moment(dateInfo).format('dddd, DD / MM / YYYY')}</Text>
                            </div>
                            <div style={{ marginBottom: 15 }}>
                                <TextField label="Title" onChange={handleChangeTitle} value={title} disabled={action == "view"} autoFocus />
                            </div>
                            <div style={{ marginBottom: 15 }}>
                                <TextField label="Description" multiline rows={3} onChange={handleChangeDescription} value={description} disabled={action == "view"} />
                            </div>
                            <div style={{ marginBottom: 15 }}>
                                <Label>Color</Label>
                                <SliderPicker
                                    color={color!}
                                    onChangeComplete={handleChangeComplete}
                                    disabled={action == "view"}
                                />
                            </div>
                            <Stack horizontal tokens={{ childrenGap: 20 }} style={{ marginBottom: 15 }} >
                                <div>
                                    <Label>Start</Label>
                                    <TimePicker
                                        format={"HH:mm"}
                                        getPopupContainer={(node: any) => node.parentNode}
                                        onChange={handleStartHour}
                                        value={startHour ? moment(startHour, 'HH:mm') : moment("00:00", "HH:mm")}
                                        style={{
                                            border: '1px solid'
                                        }}
                                        disabled={action == "view"}
                                    />
                                </div>
                                <div>
                                    <Label>End</Label>
                                    <TimePicker
                                        format={"HH:mm"}
                                        getPopupContainer={(node: any) => node.parentNode}
                                        onChange={handleEndHour}
                                        value={endHour ? moment(endHour, 'HH:mm') : moment("00:00", "HH:mm")}
                                        style={{
                                            border: '1px solid'
                                        }}
                                        disabled={action == "view"}
                                    />
                                </div>
                            </Stack>
                            {(action == "create" || action == "edit") &&
                                <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 10 }} >
                                    <DefaultButton text='Cancel' onClick={() => setIsModalOpen(false)} />
                                    <PrimaryButton text='Save' onClick={() => {
                                        if (action == "create") save();
                                        else edit();
                                        setIsModalOpen(false);
                                    }} />
                                </Stack>
                            }
                            {(action == "view") &&
                                <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 10 }} >
                                    <PrimaryButton onClick={() => {
                                        setAction("edit");
                                        setHeaderTitle("Edit Event");
                                    }}>
                                        <Stack tokens={{ childrenGap: 10 }} horizontal horizontalAlign="space-between" verticalAlign='center'>
                                            <FontIcon iconName="edit" />
                                            <Text style={{ color: '#fff' }}>Edit</Text>
                                        </Stack>
                                    </PrimaryButton>
                                </Stack>
                            }
                        </div>
                    )
                }}
            >
            </Modal>

            {/* <Modal
                isOpen={isModalOpen}
            >
                <TextField label="Title" onChange={handleChangeTitle} value={title} disabled={action == "view"} autoFocus />
            </Modal> */}
        </div>
    );
}

export default ReactBigCalendar