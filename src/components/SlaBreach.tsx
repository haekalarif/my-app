import { IPersonaProps } from "@fluentui/react";
import moment from "moment";
import React, { useEffect } from "react";
import { ICase } from "./TicketWorkflow/Workflow";
import { IInstance } from "./AutomationRules";

interface IAlertNotificationSLA {
    slaWeek?: string,
    slaStartTime?: {
        hours: number,
        minutes: number
    },
    slaEndTime?: {
        hours: number,
        minutes: number
    },
    // isFirstResponseTime?: boolean,
    isBreachesFirstResponseTime?: boolean,
    breachesHoursFirstResponseTime?: number,
    breachesAssigneeFirstResponseTime?: IPersonaProps[]

    isFrtUrgent: boolean,
    frtUrgentDuration?: number | string,
    frtUrgentTime?: string,

    isFrtImportant: boolean,
    frtImportantDuration?: number | string,
    frtImportantTime?: string,

    isFrtMedium: boolean,
    frtMediumDuration?: number | string,
    frtMediumTime?: string,

    isFrtLow: boolean,
    frtLowDuration?: number | string,
    frtLowTime?: string,

    // isResolutionTime?: boolean,
    isBreachesResolutionTime?: boolean,
    breachesHoursResolutionTime?: number,
    breachesAssigneeResolutionTime?: IPersonaProps[]

    isRtUrgent: boolean,
    rtUrgentDuration?: number | string,
    rtUrgentTime?: string,

    isRtImportant: boolean,
    rtImportantDuration?: number | string,
    rtImportantTime?: string,

    isRtMedium: boolean,
    rtMediumDuration?: number | string,
    rtMediumTime?: string,

    isRtLow: boolean,
    rtLowDuration?: number | string,
    rtLowTime?: string,


}

interface IAlertNotificationExpDate {
    isDueInNotifOn?: boolean,
    isDueTodayNotifOn?: boolean,
    isOverdueNotifOn?: boolean,
    dueInNotifDays?: number,
    overdueNotifDays?: number
}

interface IAlertNotificationTime {
    isUrgent: boolean,
    urgentTime: string,
    urgentDuration: number | string,
    isImportant: boolean,
    importantTime: string,
    importantDuration: number | string,
    isLow: boolean,
    lowTime: string,
    lowDuration: number | string,
    isMedium: boolean,
    mediumTime: string,
    mediumDuration: number | string,

    // actual content is between hours to (time of first respond) / days to (time of resolution)
    // and assignee based on first response time / resolution time
    // breachesNTime?: number,
    // breachesAssigneeNTime? : IPersonaProps[]

    alertNotification?: IAlertNotification | any,

    isAutoAssignIdleTickets?: boolean,
    dayBeforeTicketsIdle?: number,
    idleTicketAssignedTo?: any[], // IPersonaProps[]
}

interface IAlertNotification {
    expectedDate?: IAlertNotificationExpDate,
    serviceLevelAgreement?: IAlertNotificationSLA
}

const SlaBreach = () => {

    //Start hour must be less than end hour, if start hour equal to end hour we assume working valid it's same like 24 working hour
    function isWorkingHourValid(startHour, endHour): boolean {
        return (startHour < endHour) ? true : (startHour === endHour);
    }

    function hourUTCToLocal(hour) {
        let now = new Date();
        let resultHour = hour - (now.getTimezoneOffset() / 60);

        return resultHour;
    }

    // Limit date is initially ticket created date
    function setLimitDateDays(
        createdDateTime: string,
        alertNotification: IAlertNotification,
        durations,
    ) {

        let startWorkingHour = alertNotification.serviceLevelAgreement.slaStartTime.hours;
        let endWorkingHour = alertNotification.serviceLevelAgreement.slaEndTime.hours;

        if (!!!isWorkingHourValid(startWorkingHour, endWorkingHour))
            return null;

        const week = alertNotification.serviceLevelAgreement.slaWeek;

        if (startWorkingHour == endWorkingHour) {
            startWorkingHour = 0;
            endWorkingHour = 24;
        }

        let startTime = {
            hour: startWorkingHour,
            minutes: alertNotification.serviceLevelAgreement.slaStartTime.minutes,
        };
        let endTime = {
            hour: endWorkingHour,
            minutes: alertNotification.serviceLevelAgreement.slaEndTime.minutes,
        };

        // const ticketCreated = new Date(ticketCreatedDate);
        let limitDate = moment(createdDateTime).seconds(0).milliseconds(0);
        let workStartDate = moment(createdDateTime)
            .hour(startTime.hour)
            .minute(startTime.minutes)
            .seconds(0)
            .milliseconds(0);
        let workEndDate = moment(createdDateTime)
            .hour(endTime.hour)
            .minute(endTime.minutes)
            .seconds(0)
            .milliseconds(0);

        // check if sla type weekdays only
        if (week.includes("weekdays")) {
            while (limitDate.days() == 6 || limitDate.days() == 0) {
                workStartDate.add(1, "days");
                workEndDate.add(1, "days");
                limitDate = workStartDate.clone();
            }
        }

        if (limitDate.isBefore(workStartDate, "minutes")) {
            limitDate = workStartDate.clone();
        } else if (limitDate.isSameOrAfter(workEndDate, "minutes")) {
            workStartDate.add(1, "days");
            limitDate = workStartDate.clone();
        }

        let remainingDuration: number = durations;

        while (remainingDuration > 0) {
            if (week.includes("weekdays") && (limitDate.days() == 6 || limitDate.days() == 0)) {
                limitDate.add(1, "days");
            } else {
                limitDate.add(1, "days");

                if (week.includes("weekdays")) {
                    if (limitDate.days() == 6) {
                        limitDate.add(2, "days");
                    } else if (limitDate.days() == 0) {
                        limitDate.add(1, "days");
                    }
                }
                remainingDuration--;
            }
        }
        return limitDate;
    }

    // At the start limitDate is the ticket creation date
    function setLimitDateHrs(
        createdDateTime: string,
        alertNotification: IAlertNotification,
        durations,
    ) {
        // let startWorkingHour = hourUTCToLocal(alertNotification.serviceLevelAgreement.slaStartTime.hours);
        // let endWorkingHour = hourUTCToLocal(alertNotification.serviceLevelAgreement.slaEndTime.hours);

        let startWorkingHour = alertNotification.serviceLevelAgreement.slaStartTime.hours;
        let endWorkingHour = alertNotification.serviceLevelAgreement.slaEndTime.hours;

        console.log("start working hour ", startWorkingHour);
        console.log("");

        console.log("end working hour ", endWorkingHour);
        console.log("");

        if (!!!isWorkingHourValid(startWorkingHour, endWorkingHour))
            return null;

        const week = alertNotification.serviceLevelAgreement.slaWeek;

        if (startWorkingHour == endWorkingHour) {
            startWorkingHour = 0;
            endWorkingHour = 24;
        }

        let startTime = {
            hour: startWorkingHour,
            minutes: alertNotification.serviceLevelAgreement.slaStartTime.minutes,
        };
        let endTime = {
            hour: endWorkingHour,
            minutes: alertNotification.serviceLevelAgreement.slaEndTime.minutes,
        };
        const workingHour = endTime.hour - startTime.hour; // number of working hour

        console.log("Total working hour ", workingHour);
        console.log("");

        let limitDate = moment(createdDateTime).seconds(0).milliseconds(0);

        let workStartDate = moment(createdDateTime)
            .hour(startTime.hour)
            .minute(startTime.minutes)
            .seconds(0)
            .millisecond(0);
        let workEndDate = moment(createdDateTime)
            .hour(endTime.hour)
            .minute(endTime.minutes)
            .seconds(0)
            .milliseconds(0);
        console.log("diff date :", limitDate.add(Math.abs(startTime.hour),'hours').date() !== workStartDate.date())
        console.log("limit date :", limitDate.add(Math.abs(startTime.hour),'hours').date())
        console.log("work date :", workStartDate.date())

        // If start hour under 0, moment js made start working hour less 1 day, so we have to add 1 day manually
        if (startTime.hour < 0 && (limitDate.add(Math.abs(startTime.hour),'hours').date() !== workStartDate.date())) {
            workStartDate = workStartDate.add(1, "days");
            workEndDate = workEndDate.add(1, "days");
        }

        let slaHour = durations;

        console.log("PART 1");

        console.log("sla hour", slaHour);
        console.log("");
        console.log("limit date ", moment(limitDate).toLocaleString());
        console.log("");
        console.log("work start date ", moment(workStartDate).toLocaleString());
        console.log("");
        console.log("work end date ", moment(workEndDate).toLocaleString());
        console.log("");

        // Use setLimitDateDays if slaHour is more than the number of working hour in a day
        if (slaHour > workingHour) {
            const daysCount: number = Math.floor(slaHour / workingHour);

            limitDate = setLimitDateDays(createdDateTime, alertNotification, daysCount);

            const dayDifference = limitDate.diff(moment(createdDateTime), 'days');
            workStartDate.add(dayDifference, 'days');
            workEndDate.add(dayDifference, 'days');

            slaHour = slaHour - daysCount * workingHour;
        }

        // // helperDate value is the same as limitDate at the start
        // if ticket created before working hour
        if (limitDate.isBefore(workStartDate, "minutes")) {
            // ticket working hours start from working hours sla, then added working hours with SLA limits per priority (First response time / Resolution time)
            limitDate = workStartDate.clone();
            // if ticket created after end time working hour
        } else if (limitDate.isSameOrAfter(workEndDate, "minutes")) {
            workStartDate.add(1, "days");
            workEndDate.add(1, "days");
            limitDate = workStartDate.clone();
        }
        console.log("PART 2");
        console.log("sla hour", slaHour);
        console.log("");
        console.log("limit date ", moment(limitDate).toLocaleString());
        console.log("");
        console.log("work start date ", moment(workStartDate).toLocaleString());
        console.log("");
        console.log("work end date ", moment(workEndDate).toLocaleString());
        console.log("");
        let remainingTime: number = slaHour;

        console.log("remaining time ", remainingTime);

        console.log(Math.floor((workEndDate.unix() - limitDate.unix()) / 3600))
        while (remainingTime > 0) {
            if (week.includes("weekdays") && (limitDate.days() == 6 || limitDate.days() == 0)) {

                workStartDate.add(1, "days");
                workEndDate.add(1, "days");
                limitDate = workStartDate.clone();
            } else {
                if (remainingTime < Math.floor((workEndDate.unix() - limitDate.unix()) / 3600)) {
                    limitDate.add(remainingTime, "hours");
                    remainingTime = 0;
                } else {
                    if (limitDate.clone().add(1, 'hours').isSameOrBefore(workEndDate, "minutes")) {
                        limitDate.add(1, 'hours');
                        remainingTime--;
                    } else {
                        const overWorkhourMinutes: number = Math.floor((limitDate.clone().add(1, 'hours').unix() - workEndDate.unix()) / 60);

                        workStartDate.add(1, "days");
                        workEndDate.add(1, "days");
                        limitDate = workStartDate.clone().add(overWorkhourMinutes, 'minutes');
                        // remainingTime--;

                        if (week.includes("weekdays")) {
                            if (limitDate.days() == 6) {
                                limitDate.add(2, "days");
                                workStartDate.add(2, "days");
                                workEndDate.add(2, "days");
                            } else if (limitDate.days() == 0) {
                                limitDate.add(1, "days");
                                workStartDate.add(1, "days");
                                workEndDate.add(1, "days");
                            }
                        }
                        remainingTime--;
                    }
                }
            }

        }
        return limitDate;
    }

    // Function definitions
    function isTicketBreachedSLA(
        ticket: ICase,
        instance: IInstance,
        type: "frt" | "rt",
    ): boolean | undefined {
        // console.log("Running Ops " + type);
        const alertNotification: IAlertNotification = instance.alertNotification;
        let isTimeRecorded: boolean = false;

        let currTime: string = moment().toISOString();

        let ticketDate = moment();
        let limitDate = moment(); // The ticket limit date

        let slaSettings: IAlertNotificationTime;
        if (type == "frt") {
            if (ticket.firstTimeResponse) {
                isTimeRecorded = true;
                ticketDate = moment(ticket.firstTimeResponse);
            } else {
                ticketDate = moment(currTime);
            }

            slaSettings = {
                isUrgent: alertNotification?.serviceLevelAgreement?.isFrtUrgent,
                urgentTime: alertNotification?.serviceLevelAgreement?.frtUrgentTime,
                urgentDuration:
                    alertNotification?.serviceLevelAgreement?.frtUrgentDuration,
                isImportant: alertNotification?.serviceLevelAgreement?.isFrtImportant,
                importantTime: alertNotification?.serviceLevelAgreement?.frtImportantTime,
                importantDuration:
                    alertNotification?.serviceLevelAgreement?.frtImportantDuration,
                isLow: alertNotification?.serviceLevelAgreement?.isFrtLow,
                lowTime: alertNotification?.serviceLevelAgreement?.frtLowTime,
                lowDuration: alertNotification?.serviceLevelAgreement?.frtLowDuration,
                isMedium: alertNotification?.serviceLevelAgreement?.isFrtMedium,
                mediumTime: alertNotification?.serviceLevelAgreement?.frtMediumTime,
                mediumDuration:
                    alertNotification?.serviceLevelAgreement?.frtMediumDuration,
            };
        } else {
            if (ticket.timeResolution) {
                isTimeRecorded = true;
                ticketDate = moment(ticket.timeResolution);
            } else {
                ticketDate = moment(currTime);
            }

            slaSettings = {
                isUrgent: alertNotification?.serviceLevelAgreement?.isRtUrgent,
                urgentTime: alertNotification?.serviceLevelAgreement?.rtUrgentTime,
                urgentDuration:
                    alertNotification?.serviceLevelAgreement?.rtUrgentDuration,
                isImportant: alertNotification?.serviceLevelAgreement?.isRtImportant,
                importantTime: alertNotification?.serviceLevelAgreement?.rtImportantTime,
                importantDuration:
                    alertNotification?.serviceLevelAgreement?.rtImportantDuration,
                isLow: alertNotification?.serviceLevelAgreement?.isRtLow,
                lowTime: alertNotification?.serviceLevelAgreement?.rtLowTime,
                lowDuration: alertNotification?.serviceLevelAgreement?.rtLowDuration,
                isMedium: alertNotification?.serviceLevelAgreement?.isRtMedium,
                mediumTime: alertNotification?.serviceLevelAgreement?.rtMediumTime,
                mediumDuration:
                    alertNotification?.serviceLevelAgreement?.rtMediumDuration,
            };
        }

        // console.log(type + " " + ticket.id + ` ticketTime: ${ticketTime}`)

        switch (ticket.priority?.split("_").pop()) {
            case "Urgent":
                if (slaSettings.isUrgent) {
                    if (slaSettings.urgentTime.includes("days")) {
                        // console.log(
                        //   'day :',
                        //   `${alertNotification.serviceLevelAgreement.slaStartTime.hours}:${alertNotification.serviceLevelAgreement.slaStartTime.minutes}`, slaSettings.urgentDuration);
                        limitDate = setLimitDateDays(
                            ticket.createdDateTime,
                            alertNotification,
                            slaSettings.urgentDuration
                        );
                    } else {
                        // console.log('hr :', slaSettings.urgentDuration);
                        limitDate = setLimitDateHrs(
                            ticket.createdDateTime,
                            alertNotification,
                            Number(slaSettings.urgentDuration)
                        );
                    }
                } else {
                    // console.log('Not running');
                    return undefined;
                }
                break;
            case "Important":
                if (slaSettings.isImportant) {
                    if (slaSettings.importantTime.includes("days")) {
                        // console.log('day :', slaSettings.importantDuration);
                        limitDate = setLimitDateDays(
                            ticket.createdDateTime,
                            alertNotification,
                            slaSettings.importantDuration
                        );
                    } else {
                        // console.log('hr :', slaSettings.importantDuration);
                        limitDate = setLimitDateHrs(
                            ticket.createdDateTime,
                            alertNotification,
                            Number(slaSettings.importantDuration)
                        );
                    }
                } else {
                    // console.log('Not running');
                    return undefined;
                }
                break;
            case "Low":
                if (slaSettings.isLow) {
                    if (slaSettings.lowTime.includes("days")) {
                        // console.log('day :', slaSettings.lowDuration);
                        limitDate = setLimitDateDays(
                            ticket.createdDateTime,
                            alertNotification,
                            slaSettings.lowDuration
                        );
                    } else {
                        // console.log('hr :', slaSettings.lowDuration);
                        limitDate = setLimitDateHrs(
                            ticket.createdDateTime,
                            alertNotification,
                            Number(slaSettings.lowDuration)
                        );
                    }
                } else {
                    // console.log('Not running');
                    return undefined;
                }
                break;
            case "Medium":
                if (slaSettings.isMedium) {
                    if (slaSettings.mediumTime.includes("days")) {
                        // console.log('day :', slaSettings.mediumDuration);
                        limitDate = setLimitDateDays(
                            ticket.createdDateTime,
                            alertNotification,
                            slaSettings.mediumDuration
                        );
                    } else {
                        // console.log('hr :', slaSettings.mediumDuration);
                        limitDate = setLimitDateHrs(
                            ticket.createdDateTime,
                            alertNotification,
                            Number(slaSettings.mediumDuration)
                        );
                    }
                } else {
                    // console.log('Not running');
                    return undefined;
                }
                break;
            default:
                break;
        }


        console.log("current time");
        console.log(moment(ticketDate).toLocaleString());
        console.log("");

        console.log("created date time");
        console.log(moment(ticket.createdDateTime).toLocaleString());
        console.log("");

        console.log("deadline");
        console.log(moment(limitDate).toLocaleString());
        console.log("");

        console.log("is time recorded");
        console.log(isTimeRecorded);
        console.log("");

        const isBreached = ticketDate.isAfter(limitDate, "minutes");
        if (!!!isTimeRecorded && !!!isBreached) return undefined;
        return isBreached;
    }

    //AUS TIMEZONE
    const instance: any = {
        "name": "Ticketing Dev",
        "displayName": "Ticketing Dev",
        "groupId": "ba584504-5f52-4629-b0e5-35408b7d8a1f",
        "enabled": true,
        "tenantId": "ad1565a3-587e-4976-a416-e556be5eb44e",
        "teamId": "19:90Bz51MLy8kGQ1XyOlvNLyTYZLFzJeJXpYlxm-U8owo1@thread.tacv2",
        "channelId": "19:90Bz51MLy8kGQ1XyOlvNLyTYZLFzJeJXpYlxm-U8owo1@thread.tacv2",
        "entityId": "ticketing_TicketingDev",
        "assignees": {
            "type": "customAssignee",
            "peoples": [
                {
                    "id": "666cc49a-83ce-4e23-90dc-99d58a059891",
                    "text": "Alex Wilber",
                    "imageInitials": "AW",
                    "imageUrl": "",
                    "secondaryText": "AlexW@M365x95149415.OnMicrosoft.com",
                    "key": "undefined"
                },
                {
                    "id": "1407a7ee-d7f3-4a6e-806b-1ae4910f753c",
                    "text": "Adele Vance",
                    "imageInitials": "AV",
                    "imageUrl": "",
                    "secondaryText": "AdeleV@M365x95149415.OnMicrosoft.com",
                    "key": "undefined"
                },
                {
                    "id": "1e85e536-124b-43aa-8662-7ba03f5ea87d",
                    "text": "MOD Administrator",
                    "secondaryText": "admin@M365x95149415.onmicrosoft.com",
                    "imageInitials": "MA",
                    "key": "undefined"
                },
                {
                    "id": "607041f6-c19a-405d-becd-f78338b5bda0",
                    "text": "Lynne Robbins",
                    "imageInitials": "LR",
                    "imageUrl": "",
                    "secondaryText": "LynneR@M365x95149415.OnMicrosoft.com",
                    "key": "undefined"
                }
            ]
        },
        "customFields": [],
        "customFieldsLeft": [
            {
                "id": "a96c6452-8823-49d3-8fd1-da9630c2a439",
                "title": "Departments",
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
                        "key": "0feb4d0d-3d1d-4f7c-8c72-1ed14e39f6f1",
                        "text": "IT",
                        "isDefault": false
                    },
                    {
                        "key": "b322107b-a159-4b38-b974-e214501bd7e2",
                        "text": "Engineering",
                        "isDefault": false
                    },
                    {
                        "key": "59702fe7-81be-4db7-9345-193de0d22533",
                        "text": "Accounting",
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
        "customFieldsRight": [],
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
                "id": "b830c56b-e97e-49c2-a5ef-e9aead54a5ad",
                "conditions": [
                    {
                        "id": "14425caf-4502-4aaa-864b-226c535d7a08",
                        "key": "a96c6452-8823-49d3-8fd1-da9630c2a439_listIncludesAny",
                        "value": [
                            "0feb4d0d-3d1d-4f7c-8c72-1ed14e39f6f1"
                        ]
                    }
                ],
                "actions": [
                    {
                        "id": "3d5879d0-48c1-40e0-aeea-512700ed28b4",
                        "key": "priority",
                        "value": "3_Important"
                    }
                ],
                "isStopProcessingMoreRules": false,
                "enable": false
            },
            {
                "id": "f4f333b3-5e0e-492a-8b3b-16f8c1ea7d24",
                "conditions": [
                    {
                        "id": "8313350f-a723-448e-9ea3-f094de7adf1f",
                        "key": "a96c6452-8823-49d3-8fd1-da9630c2a439_listIncludesAny",
                        "value": [
                            "b322107b-a159-4b38-b974-e214501bd7e2"
                        ]
                    }
                ],
                "actions": [
                    {
                        "id": "7e1fd3ea-bf86-4ca3-b078-307fcb7ca515",
                        "key": "priority",
                        "value": "4_Urgent"
                    }
                ],
                "isStopProcessingMoreRules": false,
                "enable": true
            },
            {
                "id": "51afe379-5cd0-45d8-8578-e28ed8c7b097",
                "conditions": [
                    {
                        "id": "964091ce-b0e2-402d-9e73-e08ea250fb1b",
                        "key": "a96c6452-8823-49d3-8fd1-da9630c2a439_listIncludesAny",
                        "value": [
                            "59702fe7-81be-4db7-9345-193de0d22533"
                        ]
                    }
                ],
                "actions": [
                    {
                        "id": "15330a0d-8010-4db0-8cf4-4705d11a68ee",
                        "key": "assignee",
                        "value": [
                            {
                                "id": "666cc49a-83ce-4e23-90dc-99d58a059891",
                                "text": "Alex Wilber",
                                "imageInitials": "AW",
                                "imageUrl": "",
                                "secondaryText": "AlexW@M365x95149415.OnMicrosoft.com",
                                "key": "undefined"
                            }
                        ]
                    }
                ],
                "isStopProcessingMoreRules": true,
                "enable": true
            },
            {
                "id": "96b82d24-f0a2-43ba-a730-33b0f9dfd1cd",
                "conditions": [
                    {
                        "id": "fc8e6e60-f21b-4d98-9569-1e3cbe5e9e9b",
                        "key": "titleIncludes",
                        "value": "ticket"
                    }
                ],
                "actions": [
                    {
                        "id": "ac5e881f-1e1e-4d9c-aa13-ef51a1e066fc",
                        "key": "expectedDateTo",
                        "value": "2025-06-25T17:00:00.000Z"
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
                "actions": [
                    {
                        "id": "5a82fa0d-c278-42aa-ba1d-f05141be0b60",
                        "key": "assignee",
                        "value": [
                            {
                                "id": "1e85e536-124b-43aa-8662-7ba03f5ea87d",
                                "text": "MOD Administrator",
                                "secondaryText": "admin@M365x95149415.onmicrosoft.com",
                                "imageInitials": "MA",
                                "key": "undefined"
                            }
                        ]
                    }
                ],
                "isStopProcessingMoreRules": false,
                "enable": true
            }
        ],
        "isAutoAssignIdleTickets": false,
        "dayBeforeTicketsIdle": 2,
        "alertNotification": {
            "expectedDate": {
                "isDueInNotifOn": false,
                "dueInNotifDays": 3,
                "isDueTodayNotifOn": false,
                "isOverdueNotifOn": false,
                "overdueNotifDays": 7
            },
            "serviceLevelAgreement": {
                "slaWeek": "1_weekdays",
                "slaStartTime": {
                    "hours": -4,
                    "minutes": 0
                },
                "slaEndTime": {
                    "hours": 7,
                    "minutes": 0
                },
                "isBreachesFirstResponseTime": false,
                "breachesHoursFirstResponseTime": 0,
                "breachesAssigneeFirstResponseTime": [],
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
                "breachesHoursResolutionTime": 3,
                "breachesAssigneeResolutionTime": [
                    {
                        "id": "1407a7ee-d7f3-4a6e-806b-1ae4910f753c",
                        "text": "Adele Vance",
                        "imageInitials": "AV",
                        "imageUrl": "",
                        "secondaryText": "AdeleV@M365x95149415.OnMicrosoft.com",
                        "key": "undefined"
                    }
                ],
                "isRtUrgent": true,
                "rtUrgentDuration": 1,
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
                "key": "e6236186-c160-4bdf-9dcd-a0447e37db46",
                "selectedKey": "1_allCanEdit"
            },
            {
                "key": "a96c6452-8823-49d3-8fd1-da9630c2a439",
                "selectedKey": "1_allCanEdit"
            }
        ],
        "isNewInstance": true,
        "userList": {
            "owners": [
                {
                    "id": "1e85e536-124b-43aa-8662-7ba03f5ea87d",
                    "text": "MOD Administrator",
                    "secondaryText": "admin@M365x95149415.onmicrosoft.com",
                    "imageInitials": "MA"
                }
            ],
            "members": []
        },
        "notifyOnNoAssignee": false,
        "noAssigneeNotifRecipients": [],
        "appVersion": "1.30.4",
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
        "color": "#0b261c",
        "favoriteFilters": [],
        "userManagementMode": "manual",
        "createdDateTime": "2025-06-02T03:28:48.529Z",
        "assigneeVisibility": "1_seeAll",
        "membershipType": "Regular",
        "hasNewEmailNotificationConfig": true,
        "emailSync": {
            "creatorId": "",
            "creatorTenantId": "",
            "displayName": "",
            "emailAddress": "",
            "objectId": "",
            "tenantId": "",
            "isActive": false
        },
        "id": "fae3d540-995b-40f3-846e-c1137ee70718",
        "_rid": "RPh2AIxJHo6kAAAAAAAAAA==",
        "_self": "dbs/RPh2AA==/colls/RPh2AIxJHo4=/docs/RPh2AIxJHo6kAAAAAAAAAA==/",
        "_etag": "\"21006000-0000-0100-0000-687476850000\"",
        "_attachments": "attachments/",
        "lastTicketUpdated": "2025-07-14T03:16:20.195Z",
        "isAutomaticAssignTickets": true,
        "_ts": 1752462981
    }

    const ticket: any = {
        "title": "Ticket 53",
        "department": "",
        "requestorName": "MOD Administrator",
        "requestorId": "1e85e536-124b-43aa-8662-7ba03f5ea87d",
        "category": "",
        "status": "Open",
        "customFields": {
            "a96c6452-8823-49d3-8fd1-da9630c2a439": []
        },
        "instanceId": "fae3d540-995b-40f3-846e-c1137ee70718",
        "expectedDate": "",
        "assigneeName": "Lynne Robbins",
        "assigneeId": "607041f6-c19a-405d-becd-f78338b5bda0",
        "priority": "4_Urgent",
        "attachments": [],
        "description": "",
        "createdDateTime": "2025-07-14T03:16:08.764Z",
        "tags": [],
        "lastInteraction": "2025-07-14T03:16:08.764Z",
        "firstTimeResponse": "",
        "timeResolution": "",
        "isFrtEscalated": false,
        "isRtEscalated": false,
        "isFrtBreached": false,
        "isRtBreached": false,
        "createdBy": {
            "id": "1e85e536-124b-43aa-8662-7ba03f5ea87d",
            "text": "MOD Administrator",
            "secondaryText": "admin@M365x95149415.onmicrosoft.com"
        },
        "lastUpdatedBy": {
            "id": "1e85e536-124b-43aa-8662-7ba03f5ea87d",
            "text": "MOD Administrator",
            "secondaryText": "admin@M365x95149415.onmicrosoft.com"
        },
        "requestorEmail": "admin@M365x95149415.onmicrosoft.com",
        "assigneeEmail": "LynneR@M365x95149415.OnMicrosoft.com",
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
        "ticketId": 53,
        "origin": "WebApp",
        "requestorUnseenEventCnt": 0,
        "assigneeUnseenEventCnt": 1,
        "id": "5307c3f8-bd5e-4968-b2c9-243ba14cb394",
        "_rid": "RPh2ANl1k9liCAAAAAAAAA==",
        "_self": "dbs/RPh2AA==/colls/RPh2ANl1k9k=/docs/RPh2ANl1k9liCAAAAAAAAA==/",
        "_etag": "\"1200fdaa-0000-0100-0000-687476840000\"",
        "_attachments": "attachments/",
        "_ts": 1752462980
    }

    //IDN TIMEZONE
    // const instance: any = {
    //     "name": "Ticketing ",
    //     "displayName": "Ticketing ",
    //     "groupId": "ba584504-5f52-4629-b0e5-35408b7d8a1f",
    //     "enabled": true,
    //     "tenantId": "ad1565a3-587e-4976-a416-e556be5eb44e",
    //     "teamId": "19:90Bz51MLy8kGQ1XyOlvNLyTYZLFzJeJXpYlxm-U8owo1@thread.tacv2",
    //     "channelId": "19:90Bz51MLy8kGQ1XyOlvNLyTYZLFzJeJXpYlxm-U8owo1@thread.tacv2",
    //     "entityId": "ticketing_Ticketing",
    //     "assignees": {
    //         "type": "customAssignee",
    //         "peoples": [
    //             {
    //                 "id": "c4937347-46d7-46d0-8c17-5d3c3c4c8f45",
    //                 "text": "Christie Cline",
    //                 "imageInitials": "CC",
    //                 "imageUrl": "",
    //                 "secondaryText": "ChristieC@M365x95149415.OnMicrosoft.com",
    //                 "key": "undefined"
    //             },
    //             {
    //                 "id": "607041f6-c19a-405d-becd-f78338b5bda0",
    //                 "text": "Lynne Robbins",
    //                 "imageInitials": "LR",
    //                 "imageUrl": "",
    //                 "secondaryText": "LynneR@M365x95149415.OnMicrosoft.com",
    //                 "key": "undefined"
    //             },
    //             {
    //                 "id": "1e85e536-124b-43aa-8662-7ba03f5ea87d",
    //                 "text": "MOD Administrator",
    //                 "secondaryText": "admin@M365x95149415.onmicrosoft.com",
    //                 "imageInitials": "MA",
    //                 "key": "undefined"
    //             }
    //         ]
    //     },
    //     "customFields": [],
    //     "customFieldsLeft": [],
    //     "customFieldsRight": [],
    //     "optionalFieldsLeft": [
    //         {
    //             "id": "5_tags",
    //             "title": "Tags",
    //             "status": "visible",
    //             "type": "dropdown",
    //             "isMandatory": false,
    //             "defaultValue": "",
    //             "choosePeopleFrom": "",
    //             "isSeeTicket": false,
    //             "isReceiveNotification": false,
    //             "isMultipleSection": false
    //         },
    //         {
    //             "id": "2_priority",
    //             "title": "Priority",
    //             "status": "visible",
    //             "type": "dropdown",
    //             "isMandatory": false,
    //             "defaultValue": "",
    //             "choosePeopleFrom": "",
    //             "isSeeTicket": false,
    //             "isReceiveNotification": false,
    //             "isMultipleSection": false
    //         }
    //     ],
    //     "optionalFieldsRight": [
    //         {
    //             "id": "4_expecteddate",
    //             "title": "Expected Date",
    //             "status": "visible",
    //             "type": "date",
    //             "isMandatory": false,
    //             "defaultValue": "",
    //             "choosePeopleFrom": "",
    //             "isSeeTicket": false,
    //             "isReceiveNotification": false,
    //             "isMultipleSection": false
    //         }
    //     ],
    //     "automationRules": [],
    //     "defaultAutomationRules": [
    //         {
    //             "id": "999",
    //             "conditions": [
    //                 {
    //                     "id": "99999999-9999-9999-9999-999999999999",
    //                     "key": "999_otherwise",
    //                     "value": "Otherwise"
    //                 }
    //             ],
    //             "actions": [],
    //             "isStopProcessingMoreRules": false,
    //             "enable": true
    //         }
    //     ],
    //     "isAutoAssignIdleTickets": false,
    //     "dayBeforeTicketsIdle": 2,
    //     "alertNotification": {
    //         "expectedDate": {
    //             "isDueInNotifOn": false,
    //             "dueInNotifDays": 3,
    //             "isDueTodayNotifOn": false,
    //             "isOverdueNotifOn": false,
    //             "overdueNotifDays": 7
    //         },
    //         "serviceLevelAgreement": {
    //             "slaWeek": "1_weekdays",
    //             "slaStartTime": {
    //                 "hours": -1,
    //                 "minutes": 0
    //             },
    //             "slaEndTime": {
    //                 "hours": 10,
    //                 "minutes": 0
    //             },
    //             "isBreachesFirstResponseTime": false,
    //             "breachesHoursFirstResponseTime": 0,
    //             "breachesAssigneeFirstResponseTime": [],
    //             "isFrtUrgent": true,
    //             "frtUrgentDuration": 2,
    //             "frtUrgentTime": "2_hours",
    //             "isFrtImportant": false,
    //             "frtImportantDuration": 1,
    //             "frtImportantTime": "2_hours",
    //             "isFrtMedium": false,
    //             "frtMediumDuration": 1,
    //             "frtMediumTime": "2_hours",
    //             "isFrtLow": false,
    //             "frtLowDuration": 1,
    //             "frtLowTime": "2_hours",
    //             "isBreachesResolutionTime": true,
    //             "breachesHoursResolutionTime": 3,
    //             "breachesAssigneeResolutionTime": [
    //                 {
    //                     "id": "c4937347-46d7-46d0-8c17-5d3c3c4c8f45",
    //                     "text": "Christie Cline",
    //                     "imageInitials": "CC",
    //                     "imageUrl": "",
    //                     "secondaryText": "ChristieC@M365x95149415.OnMicrosoft.com",
    //                     "key": "undefined"
    //                 }
    //             ],
    //             "isRtUrgent": true,
    //             "rtUrgentDuration": 2,
    //             "rtUrgentTime": "2_hours",
    //             "isRtImportant": false,
    //             "rtImportantDuration": 1,
    //             "rtImportantTime": "2_hours",
    //             "isRtMedium": false,
    //             "rtMediumDuration": 1,
    //             "rtMediumTime": "2_hours",
    //             "isRtLow": false,
    //             "rtLowDuration": 1,
    //             "rtLowTime": "2_hours"
    //         }
    //     },
    //     "userPermission": [
    //         {
    //             "key": "title",
    //             "selectedKey": "1_allCanEdit"
    //         },
    //         {
    //             "key": "description",
    //             "selectedKey": "1_allCanEdit"
    //         },
    //         {
    //             "key": "assignee",
    //             "selectedKey": "1_allCanEdit"
    //         },
    //         {
    //             "key": "expectedDate",
    //             "selectedKey": "1_allCanEdit"
    //         },
    //         {
    //             "key": "priority",
    //             "selectedKey": "1_allCanEdit"
    //         }
    //     ],
    //     "isNewInstance": true,
    //     "userList": {
    //         "owners": [
    //             {
    //                 "id": "1e85e536-124b-43aa-8662-7ba03f5ea87d",
    //                 "text": "MOD Administrator",
    //                 "secondaryText": "admin@M365x95149415.onmicrosoft.com",
    //                 "imageInitials": "MA"
    //             }
    //         ],
    //         "members": []
    //     },
    //     "notifyOnNoAssignee": false,
    //     "noAssigneeNotifRecipients": [],
    //     "appVersion": "1.30.5",
    //     "workflows": {
    //         "ticket": [
    //             {
    //                 "nodes": [
    //                     {
    //                         "id": "Open",
    //                         "type": "startNode",
    //                         "position": {
    //                             "x": -205.2049180327868,
    //                             "y": -57.13934426229507
    //                         },
    //                         "data": {
    //                             "label": "Open",
    //                             "recordResolutionSLA": false,
    //                             "color": "#fff"
    //                         },
    //                         "targetPosition": "left",
    //                         "sourcePosition": "right",
    //                         "deletable": false
    //                     },
    //                     {
    //                         "id": "In Progress",
    //                         "type": "textFieldNode",
    //                         "position": {
    //                             "x": -24.368177503993962,
    //                             "y": -213.619285456832
    //                         },
    //                         "data": {
    //                             "label": "In Progress",
    //                             "recordResolutionSLA": false,
    //                             "color": "#1cd9d6"
    //                         },
    //                         "targetPosition": "left",
    //                         "sourcePosition": "right"
    //                     },
    //                     {
    //                         "id": "Closed",
    //                         "type": "textFieldNode",
    //                         "position": {
    //                             "x": 773.1812215977077,
    //                             "y": -62.75364748022107
    //                         },
    //                         "data": {
    //                             "label": "Closed",
    //                             "recordResolutionSLA": true,
    //                             "color": "#28b05f"
    //                         },
    //                         "targetPosition": "left",
    //                         "sourcePosition": "right"
    //                     },
    //                     {
    //                         "id": "Reopened",
    //                         "type": "textFieldNode",
    //                         "position": {
    //                             "x": 502.7629135476956,
    //                             "y": -398.0035164745823
    //                         },
    //                         "data": {
    //                             "label": "Reopened",
    //                             "recordResolutionSLA": false,
    //                             "color": "#ff970f"
    //                         },
    //                         "targetPosition": "left",
    //                         "sourcePosition": "right"
    //                     },
    //                     {
    //                         "width": 175,
    //                         "height": 40,
    //                         "id": "Fixed",
    //                         "type": "textFieldNode",
    //                         "position": {
    //                             "x": 138.28218947316367,
    //                             "y": 76.31269437543403
    //                         },
    //                         "data": {
    //                             "label": "Closed",
    //                             "recordResolutionSLA": true,
    //                             "color": "#bf4040"
    //                         },
    //                         "targetPosition": "left",
    //                         "sourcePosition": "right",
    //                         "positionAbsolute": {
    //                             "x": 138.28218947316367,
    //                             "y": 76.31269437543403
    //                         },
    //                         "dragging": false,
    //                         "selected": true
    //                     }
    //                 ],
    //                 "edges": [
    //                     {
    //                         "id": "03143c6f-c8bd-425e-9eff-31be3011dff9",
    //                         "type": "labeledEdge",
    //                         "label": "Start Ticket",
    //                         "source": "Open",
    //                         "sourceHandle": null,
    //                         "target": "In Progress",
    //                         "targetHandle": null,
    //                         "markerEnd": {
    //                             "type": "arrowclosed",
    //                             "width": 25,
    //                             "height": 25
    //                         },
    //                         "data": {
    //                             "iconName": "Forward",
    //                             "isEditing": false,
    //                             "recordComment": false,
    //                             "authorizedUsers": [
    //                                 "owner",
    //                                 "assignee"
    //                             ]
    //                         }
    //                     },
    //                     {
    //                         "id": "bebee65c-974c-4afc-893e-b03672c168b4",
    //                         "type": "labeledEdge",
    //                         "label": "Close Ticket",
    //                         "source": "Open",
    //                         "sourceHandle": null,
    //                         "target": "Closed",
    //                         "targetHandle": null,
    //                         "markerEnd": {
    //                             "type": "arrowclosed",
    //                             "width": 25,
    //                             "height": 25
    //                         },
    //                         "data": {
    //                             "iconName": "Archive",
    //                             "isEditing": false,
    //                             "recordComment": true,
    //                             "authorizedUsers": [
    //                                 "owner",
    //                                 "assignee",
    //                                 "requestor"
    //                             ]
    //                         }
    //                     },
    //                     {
    //                         "id": "5a549dbb-fdbd-4874-88a7-b036d2653f8a",
    //                         "type": "labeledEdge",
    //                         "label": "Close Ticket",
    //                         "source": "In Progress",
    //                         "sourceHandle": null,
    //                         "target": "Closed",
    //                         "targetHandle": null,
    //                         "markerEnd": {
    //                             "type": "arrowclosed",
    //                             "width": 25,
    //                             "height": 25
    //                         },
    //                         "data": {
    //                             "iconName": "Archive",
    //                             "isEditing": false,
    //                             "recordComment": true,
    //                             "authorizedUsers": [
    //                                 "owner",
    //                                 "assignee",
    //                                 "requestor"
    //                             ]
    //                         }
    //                     },
    //                     {
    //                         "id": "4336ef9c-10b7-4c3f-9ac3-c1d9071786cd",
    //                         "type": "labeledEdge",
    //                         "label": "Reopen Ticket",
    //                         "source": "Closed",
    //                         "sourceHandle": null,
    //                         "target": "Reopened",
    //                         "targetHandle": null,
    //                         "markerEnd": {
    //                             "type": "arrowclosed",
    //                             "width": 25,
    //                             "height": 25
    //                         },
    //                         "data": {
    //                             "iconName": "Reply",
    //                             "isEditing": false,
    //                             "recordComment": true,
    //                             "authorizedUsers": [
    //                                 "owner",
    //                                 "assignee",
    //                                 "requestor"
    //                             ]
    //                         }
    //                     },
    //                     {
    //                         "id": "4e4d94ef-3fa0-4ec5-93c7-ba2e35c01727",
    //                         "type": "labeledEdge",
    //                         "label": "Close Ticket",
    //                         "source": "Reopened",
    //                         "sourceHandle": null,
    //                         "target": "Closed",
    //                         "targetHandle": null,
    //                         "markerEnd": {
    //                             "type": "arrowclosed",
    //                             "width": 25,
    //                             "height": 25
    //                         },
    //                         "data": {
    //                             "iconName": "Archive",
    //                             "isEditing": false,
    //                             "recordComment": true,
    //                             "authorizedUsers": [
    //                                 "owner",
    //                                 "assignee",
    //                                 "requestor"
    //                             ]
    //                         }
    //                     },
    //                     {
    //                         "id": "f5b86283-f6e0-4e39-8729-a6bd5512e219",
    //                         "type": "labeledEdge",
    //                         "label": "Closed",
    //                         "source": "Open",
    //                         "sourceHandle": null,
    //                         "target": "Fixed",
    //                         "targetHandle": null,
    //                         "markerEnd": {
    //                             "type": "arrowclosed",
    //                             "strokeWidth": 2,
    //                             "width": 25,
    //                             "height": 25
    //                         },
    //                         "data": {
    //                             "isEditing": false,
    //                             "recordComment": true,
    //                             "authorizedUsers": [
    //                                 "assignee",
    //                                 "owner",
    //                                 "requestor"
    //                             ],
    //                             "iconName": "Feedback"
    //                         }
    //                     },
    //                     {
    //                         "id": "85d8793b-d4d1-4f03-b6a4-baf26cd1d272",
    //                         "type": "labeledEdge",
    //                         "label": "Closed",
    //                         "source": "Fixed",
    //                         "sourceHandle": null,
    //                         "target": "Closed",
    //                         "targetHandle": null,
    //                         "markerEnd": {
    //                             "type": "arrowclosed",
    //                             "strokeWidth": 2,
    //                             "width": 25,
    //                             "height": 25
    //                         },
    //                         "data": {
    //                             "isEditing": false,
    //                             "recordComment": true,
    //                             "authorizedUsers": [
    //                                 "assignee",
    //                                 "owner",
    //                                 "requestor"
    //                             ],
    //                             "iconName": "InboxCheck"
    //                         }
    //                     }
    //                 ]
    //             }
    //         ],
    //         "isCustomWorkflow": true
    //     },
    //     "color": "#aa4567",
    //     "favoriteFilters": [],
    //     "userManagementMode": "manual",
    //     "createdDateTime": "2025-06-17T08:15:24.977Z",
    //     "assigneeVisibility": "1_seeAll",
    //     "membershipType": "Regular",
    //     "hasNewEmailNotificationConfig": true,
    //     "emailSync": {
    //         "emailAddress": "",
    //         "displayName": "",
    //         "objectId": "",
    //         "tenantId": "",
    //         "creatorTenantId": "",
    //         "creatorId": "",
    //         "isActive": true
    //     },
    //     "id": "516f12c0-5994-438a-a82c-070915743ec5",
    //     "_rid": "wTtJAOFgVuHdIgAAAAAAAA==",
    //     "_self": "dbs/wTtJAA==/colls/wTtJAOFgVuE=/docs/wTtJAOFgVuHdIgAAAAAAAA==/",
    //     "_etag": "\"20009cba-0000-0700-0000-6870ccf40000\"",
    //     "_attachments": "attachments/",
    //     "lastTicketUpdated": "2025-07-11T06:18:33.830Z",
    //     "api": {
    //         "primaryKey": "d9907ab37bbc45f88676b032363e4a46",
    //         "secondaryKey": "25ac0d41f61d433a9a9c742f392a56b9"
    //     },
    //     "_ts": 1752222964
    // }

    // const ticket: any = {
    //     "title": "Ticket 15",
    //     "department": "",
    //     "requestorName": "MOD Administrator",
    //     "requestorId": "1e85e536-124b-43aa-8662-7ba03f5ea87d",
    //     "category": "",
    //     "status": "Open",
    //     "customFields": {},
    //     "instanceId": "516f12c0-5994-438a-a82c-070915743ec5",
    //     "expectedDate": "2025-07-22T17:00:00.000Z",
    //     "assigneeName": "Christie Cline",
    //     "assigneeId": "c4937347-46d7-46d0-8c17-5d3c3c4c8f45",
    //     "priority": "4_Urgent",
    //     "attachments": [],
    //     "description": "",
    //     "createdDateTime": "2025-07-10T01:54:21.779Z",
    //     "tags": [],
    //     "lastInteraction": "2025-07-10T01:54:21.779Z",
    //     "firstTimeResponse": "",
    //     "timeResolution": "",
    //     "isFrtEscalated": false,
    //     "isRtEscalated": false,
    //     "isFrtBreached": false,
    //     "isRtBreached": false,
    //     "createdBy": {
    //         "id": "1e85e536-124b-43aa-8662-7ba03f5ea87d",
    //         "text": "MOD Administrator",
    //         "secondaryText": "admin@M365x95149415.onmicrosoft.com"
    //     },
    //     "lastUpdatedBy": {
    //         "id": "1e85e536-124b-43aa-8662-7ba03f5ea87d",
    //         "text": "MOD Administrator",
    //         "secondaryText": "admin@M365x95149415.onmicrosoft.com"
    //     },
    //     "requestorEmail": "admin@M365x95149415.onmicrosoft.com",
    //     "assigneeEmail": "ChristieC@M365x95149415.OnMicrosoft.com",
    //     "workflow": [
    //         {
    //             "id": "Open",
    //             "label": "Open",
    //             "color": "#fff",
    //             "recordResolutionSLA": false,
    //             "nextSteps": [
    //                 {
    //                     "targetId": "In Progress",
    //                     "transitionLabel": "Start Ticket",
    //                     "transitionIcon": "Forward",
    //                     "authorizedUsers": [
    //                         "owner",
    //                         "assignee"
    //                     ],
    //                     "recordComment": false,
    //                     "recordResolutionSLA": false
    //                 },
    //                 {
    //                     "targetId": "Closed",
    //                     "transitionLabel": "Close Ticket",
    //                     "transitionIcon": "Archive",
    //                     "authorizedUsers": [
    //                         "owner",
    //                         "assignee",
    //                         "requestor"
    //                     ],
    //                     "recordComment": true,
    //                     "recordResolutionSLA": true
    //                 },
    //                 {
    //                     "targetId": "Fixed",
    //                     "transitionLabel": "Closed",
    //                     "transitionIcon": "Feedback",
    //                     "authorizedUsers": [
    //                         "assignee",
    //                         "owner",
    //                         "requestor"
    //                     ],
    //                     "recordComment": true,
    //                     "recordResolutionSLA": true
    //                 }
    //             ]
    //         },
    //         {
    //             "id": "In Progress",
    //             "label": "In Progress",
    //             "color": "#1cd9d6",
    //             "recordResolutionSLA": false,
    //             "nextSteps": [
    //                 {
    //                     "targetId": "Closed",
    //                     "transitionLabel": "Close Ticket",
    //                     "transitionIcon": "Archive",
    //                     "authorizedUsers": [
    //                         "owner",
    //                         "assignee",
    //                         "requestor"
    //                     ],
    //                     "recordComment": true,
    //                     "recordResolutionSLA": true
    //                 }
    //             ]
    //         },
    //         {
    //             "id": "Closed",
    //             "label": "Closed",
    //             "color": "#28b05f",
    //             "recordResolutionSLA": true,
    //             "nextSteps": [
    //                 {
    //                     "targetId": "Reopened",
    //                     "transitionLabel": "Reopen Ticket",
    //                     "transitionIcon": "Reply",
    //                     "authorizedUsers": [
    //                         "owner",
    //                         "assignee",
    //                         "requestor"
    //                     ],
    //                     "recordComment": true,
    //                     "recordResolutionSLA": false
    //                 }
    //             ]
    //         },
    //         {
    //             "id": "Reopened",
    //             "label": "Reopened",
    //             "color": "#ff970f",
    //             "recordResolutionSLA": false,
    //             "nextSteps": [
    //                 {
    //                     "targetId": "Closed",
    //                     "transitionLabel": "Close Ticket",
    //                     "transitionIcon": "Archive",
    //                     "authorizedUsers": [
    //                         "owner",
    //                         "assignee",
    //                         "requestor"
    //                     ],
    //                     "recordComment": true,
    //                     "recordResolutionSLA": true
    //                 }
    //             ]
    //         },
    //         {
    //             "id": "Fixed",
    //             "label": "Closed",
    //             "color": "#bf4040",
    //             "recordResolutionSLA": true,
    //             "nextSteps": [
    //                 {
    //                     "targetId": "Closed",
    //                     "transitionLabel": "Closed",
    //                     "transitionIcon": "InboxCheck",
    //                     "authorizedUsers": [
    //                         "assignee",
    //                         "owner",
    //                         "requestor"
    //                     ],
    //                     "recordComment": true,
    //                     "recordResolutionSLA": true
    //                 }
    //             ]
    //         }
    //     ],
    //     "resolvedStatus": [
    //         "Closed",
    //         "Fixed"
    //     ],
    //     "isCustomWorkflow": true,
    //     "ticketId": 15,
    //     "origin": "WebApp",
    //     "requestorUnseenEventCnt": 0,
    //     "assigneeUnseenEventCnt": 1,
    //     "id": "f7060884-871a-449d-8207-a599cd36dd91",
    //     "_rid": "wTtJAN-sEFGtrgQAAAAAAA==",
    //     "_self": "dbs/wTtJAA==/colls/wTtJAN-sEFE=/docs/wTtJAN-sEFGtrgQAAAAAAA==/",
    //     "_etag": "\"0201be84-0000-0700-0000-686f78b80000\"",
    //     "_attachments": "attachments/",
    //     "_ts": 1752135864
    // }

    useEffect(() => {
        console.log("Ticket created date time");
        console.log(moment(ticket.createdDateTime).toLocaleString())
        const isFrtBreached = isTicketBreachedSLA(ticket, instance, "frt")
    }, []);

    return (
        <div>

        </div>
    )
};

export default SlaBreach;