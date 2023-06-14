import React, { useRef } from 'react'
import { Scheduler } from "@aldabil/react-scheduler";
import { ProcessedEvent, SchedulerRef } from '@aldabil/react-scheduler/types';
import { Button } from 'antd';
import { View } from '@aldabil/react-scheduler/components/nav/Navigation';

function ReactScheduler() {
    const calendarRef = useRef<SchedulerRef>(null);
    const EVENTS = [
        {
            event_id: 1,
            title: "Event 1",
            start: new Date(new Date(new Date().setHours(9)).setMinutes(0)),
            end: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
            disabled: true,
            admin_id: [1, 2, 3, 4]
        },
        {
            event_id: 2,
            title: "Event 2",
            start: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
            end: new Date(new Date(new Date().setHours(12)).setMinutes(0)),
            admin_id: 2,
            color: "#50b500"
        },
        {
            event_id: 3,
            title: "Event 3",
            start: new Date(new Date(new Date().setHours(11)).setMinutes(0)),
            end: new Date(new Date(new Date().setHours(12)).setMinutes(0)),
            admin_id: 1,
            editable: false,
            deletable: false
        },
        {
            event_id: 4,
            title: "Event 4",
            start: new Date(
                new Date(new Date(new Date().setHours(9)).setMinutes(30)).setDate(
                    new Date().getDate() - 2
                )
            ),
            end: new Date(
                new Date(new Date(new Date().setHours(11)).setMinutes(0)).setDate(
                    new Date().getDate() - 2
                )
            ),
            admin_id: 2,
            color: "#900000"
        },
        {
            event_id: 5,
            title: "Event 5",
            start: new Date(
                new Date(new Date(new Date().setHours(10)).setMinutes(30)).setDate(
                    new Date().getDate() - 2
                )
            ),
            end: new Date(
                new Date(new Date(new Date().setHours(14)).setMinutes(0)).setDate(
                    new Date().getDate() - 2
                )
            ),
            admin_id: 2,
            editable: true
        },
        {
            event_id: 6,
            title: "Event 6",
            start: new Date(
                new Date(new Date(new Date().setHours(10)).setMinutes(30)).setDate(
                    new Date().getDate() - 4
                )
            ),
            end: new Date(new Date(new Date().setHours(14)).setMinutes(0)),
            admin_id: 2
        }
    ];


    function handleSelectedDate(e) {
        console.log(e)
    }

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    return (
        <div>
            <div>
                <Button onClick={() => {
                    calendarRef.current.scheduler.handleState("day", "view");
                }}>
                    Change View
                </Button>
                <Button onClick={() => {
                    calendarRef.current.scheduler.triggerDialog(true, {
                        start: new Date(),
                        end: new Date
                    })
                }}>
                    Add Event Tomorrow
                </Button>
            </div>
            <Scheduler
                ref={calendarRef}
                events={EVENTS}
                view="month"
                selectedDate={new Date()}
                navigation={false}
                disableViewNavigator={true}
                month={{
                    weekDays: [0, 1, 2, 3, 4, 5],
                    weekStartOn: 6,
                    startHour: 9,
                    endHour: 17,
                    // cellRenderer: (props: any) => {
                       
                    // },
                    // navigation: true,
                    disableGoToDay: true
                }}
                onEventClick={(event: ProcessedEvent): void => {
                    console.log(event);
                }}
                onSelectedDateChange={(date: Date) => {
                    console.log(date)
                }}
                onViewChange={(view: View) => {
                    console.log(view)
                }}
            // eventRenderer={(event) => {
            //     console.log(event)
            //     return(<>hahaha</>)
            // }}
            // getRemoteEvents={(viewEvent: any) => {
            //     console.log(viewEvent)
            // }}
            />
        </div>
    )
}

export default ReactScheduler