import React, { useEffect } from "react";
import { ICase } from "./TicketWorkflow/Workflow";
import { IInstance } from "./AutomationRules";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

interface IAlertNotification {
    expectedDate?: IAlertNotificationExpDate,
    serviceLevelAgreement?: IAlertNotificationSLA
}
interface IAlertNotificationExpDate {
    isDueInNotifOn?: boolean,
    isDueTodayNotifOn?: boolean,
    isOverdueNotifOn?: boolean,
    dueInNotifDays?: number,
    overdueNotifDays?: number
}
interface IPersonaProps {
    id?: string,
    imageInitials?: string,
    text?: string,
    imageUrl: string,
    secondaryText: string,
}
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
interface INotificationLog {
    id: string,
    tenantId: string,
    ticket: {
        id: string,
        ticketId: number,
        title: string,
        priority: string,
        assigneeId?: string // For escalated ticket
    },
    receiverId: string,
    cardContent: { //Parameter for construct message and card notification
        type: "noComment",
        action: "daily sla reminder" | "breached" | "escalated",
        days?: number,
        slaType?: "frt" | "rt" //First response time OR Resolution time
    },
    cardData: { //Parameters for create deeplink
        ticketingAppUrl: string,
        channelId: string,
        entityId: string,
        timezoneOffset: number
    }
    status: "success" | "waiting" | "undelivered" | "failed",
    scheduledAt: string,
    retryCount: number
}
const auditTrailActionConst = {
    attach: "attached",
    create: "created",
    edit: "edited",
    start: "started",
    resolve: "resolved",
    close: "closed",
    reopen: "reopened",
    comment: "commented",
    assign: "assigned",
    escalate: "escalated",
    breach: "breached",
    idle: "idle",
    dueToday: "due today",
    isDueIn: "is due in",
    overdue: "overdue",
    dailySlaReminder: "daily sla reminder"
}
const NotificationLog: React.FunctionComponent = () => {


    function hourUTCToLocal(hour) {
        let now = new Date();
        let resultHour = hour - (now.getTimezoneOffset() / 60);

        return resultHour;
    }
    const getEntityId = (instanceName: string) => {
        let newValueArray: string[] = instanceName.trim().split(" ");
        let strippedNewInstanceName: string = "";
        newValueArray.forEach((element) => {
            strippedNewInstanceName = strippedNewInstanceName.concat(element);
        });
        return "ticketing_" + strippedNewInstanceName;
    };

    /**
 * This function purpose for add deadline of sla breach and escalate in ticket
 * 
 * @param ticket 
 * @param instance 
 * @returns 
 */
    function setSlaTime(ticket: ICase, instance: IInstance): ICase {
        // console.log(ticket);
        const breachFrtDeadline = getDeadline(ticket, instance, "breached", "frt");
        console.log(breachFrtDeadline)
        const breachRtDeadline = getDeadline(ticket, instance, "breached", "rt");
        const escalateFrtDeadline = getDeadline(ticket, instance, "escalated", "frt");
        const escalateRtDeadline = getDeadline(ticket, instance, "escalated", "rt");
        // console.log(breachFrtDeadline.utc().format());
        ticket.breachFrtAt = breachFrtDeadline ? breachFrtDeadline.toISOString() : undefined;
        ticket.breachRtAt = breachRtDeadline ? breachRtDeadline.toISOString() : undefined;
        ticket.escalateFrtAt = escalateFrtDeadline ? escalateFrtDeadline.toISOString() : undefined;
        ticket.escalateRtAt = escalateRtDeadline ? escalateRtDeadline.toISOString() : undefined;
        return ticket;
    }

    function setLimitDateDays(
        createdDateTime: string,
        alertNotification: IAlertNotification,
        durations,
    ) {
        const week = alertNotification.serviceLevelAgreement.slaWeek;

        let startTime = {
            // hour: alertNotification.serviceLevelAgreement.slaStartTime.hours,
            hour: hourUTCToLocal(alertNotification.serviceLevelAgreement.slaStartTime.hours),
            minutes: alertNotification.serviceLevelAgreement.slaStartTime.minutes,
        };
        let endTime = {
            hour: hourUTCToLocal(alertNotification.serviceLevelAgreement.slaEndTime.hours),
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

    function setLimitDateHrs(
        createdDateTime: string,
        alertNotification: IAlertNotification,
        durations,
    ) {
        const week = alertNotification.serviceLevelAgreement.slaWeek;
        const startTime = {
            hour: hourUTCToLocal(alertNotification.serviceLevelAgreement.slaStartTime.hours),
            minutes: alertNotification.serviceLevelAgreement.slaStartTime.minutes,
        };
        let endTime = {
            hour: hourUTCToLocal(alertNotification.serviceLevelAgreement.slaEndTime.hours),
            minutes: alertNotification.serviceLevelAgreement.slaEndTime.minutes,
        };
        const workingHour = endTime.hour - startTime.hour; // number of working hour

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
        let slaHour = durations;

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

        let remainingTime: number = slaHour;

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

    /**
     * 
     * This function purpose for determine deadline of sla breach and escalate
     * 
     * @param ticket 
     * @param instance 
     * @param action 
     * @param type 
     * @returns 
     */

    function getDeadline(
        ticket: ICase,
        instance: IInstance,
        action: "breached" | "escalated" | "daily sla reminder",
        type: "frt" | "rt"
    ): Date {

        const alertNotification: IAlertNotification = instance.alertNotification;
        const week = alertNotification.serviceLevelAgreement.slaWeek;

        let deadline = moment();
        let slaSettings: IAlertNotificationTime;
        if (type == "frt") {
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

        // context.log(type + " " + ticket.id + ` ticketTime: ${ticketTime}`)

        switch (ticket.priority?.split("_").pop()) {
            case "Urgent":
                if (slaSettings.isUrgent) {
                    if (slaSettings.urgentTime.includes("days")) {
                        deadline = setLimitDateDays(
                            ticket.createdDateTime,
                            alertNotification,
                            slaSettings.urgentDuration
                        );
                    } else {
                        deadline = setLimitDateHrs(
                            ticket.createdDateTime,
                            alertNotification,
                            Number(slaSettings.urgentDuration)
                        );
                    }
                } else {
                    return undefined;
                }
                break;
            case "Important":
                if (slaSettings.isImportant) {
                    if (slaSettings.importantTime.includes("days")) {
                        deadline = setLimitDateDays(
                            ticket.createdDateTime,
                            alertNotification,
                            slaSettings.importantDuration
                        );
                    } else {
                        deadline = setLimitDateHrs(
                            ticket.createdDateTime,
                            alertNotification,
                            Number(slaSettings.importantDuration)
                        );
                    }
                } else {
                    return undefined;
                }
                break;
            case "Low":
                if (slaSettings.isLow) {
                    if (slaSettings.lowTime.includes("days")) {
                        deadline = setLimitDateDays(
                            ticket.createdDateTime,
                            alertNotification,
                            slaSettings.lowDuration
                        );
                    } else {
                        deadline = setLimitDateHrs(
                            ticket.createdDateTime,
                            alertNotification,
                            Number(slaSettings.lowDuration)
                        );
                    }
                } else {
                    return undefined;
                }
                break;
            case "Medium":
                if (slaSettings.isMedium) {
                    if (slaSettings.mediumTime.includes("days")) {
                        deadline = setLimitDateDays(
                            ticket.createdDateTime,
                            alertNotification,
                            slaSettings.mediumDuration
                        );
                    } else {
                        deadline = setLimitDateHrs(
                            ticket.createdDateTime,
                            alertNotification,
                            Number(slaSettings.mediumDuration)
                        );
                    }
                } else {
                    return undefined;
                }
                break;
            default:
                break;
        }

        /**
         * Escalated ticket deadline
         */
        if (action == auditTrailActionConst.escalate) {
            let breachesHour: number = 0;
            if (type == "frt") {
                if (!!!alertNotification.serviceLevelAgreement.isBreachesFirstResponseTime) return undefined;
                breachesHour = alertNotification?.serviceLevelAgreement?.breachesHoursFirstResponseTime;
            } else {
                if (!!!alertNotification.serviceLevelAgreement.isBreachesResolutionTime) return undefined;
                breachesHour = alertNotification?.serviceLevelAgreement?.breachesHoursResolutionTime;
            }

            deadline = setLimitDateHrs(
                deadline.toISOString(),
                alertNotification,
                breachesHour
            )
            if (week.includes('weekdays')) {
                while (deadline.days() == 6 || deadline.days() == 0) {
                    deadline.add(1, 'days')
                }
            }
        }

        return deadline.toDate();
    }

    function generateNotificationLogItems(ticket: ICase, instance: IInstance, actionType: "breached" | "escalated" | "daily sla reminder", slaType?: "frt" | "rt"): INotificationLog[] {

        let ticketItem = ticket;
        if (!!!ticketItem.priority) return [];

        let receiverIds: string[] = [];
        let items: INotificationLog[] = [];
        let scheduledAt: Date;
        let newItem: INotificationLog = {
            id: uuidv4(),
            tenantId: instance.tenantId,
            ticket: {
                id: ticketItem.id,
                ticketId: Number(ticketItem.ticketId),
                title: ticketItem.title,
                priority: ticketItem.priority ?? "",
                assigneeId: ticketItem?.assigneeId ?? ""
            },
            receiverId: "",
            cardContent: {
                type: "noComment",
                action: "breached",
                days: 0,
                slaType: "frt"
            },
            cardData: {
                ticketingAppUrl: "ticketingAppUrl",
                channelId: instance.channelId,
                entityId: getEntityId(instance.name),
                timezoneOffset: 0
            },
            status: "waiting",
            scheduledAt: undefined,
            retryCount: 0
        }


        switch (actionType) {
            case auditTrailActionConst.breach:
                /**
                 * Check is the sla setting is enabled ? 
                 */
                scheduledAt = getDeadline(ticketItem, instance, actionType, slaType);
                /**
                 * If the setting sla is disabled, so there is no deadline.
                 */
                if (!!!scheduledAt) return [];
                /**
                 * Get receiver ids
                 */
                receiverIds = getReceiverIds(ticketItem, instance, actionType);
                for (const id of receiverIds) {
                    newItem = {
                        ...newItem,
                        id: uuidv4(),
                        receiverId: id,
                        cardContent: {
                            ...newItem.cardContent,
                            action: actionType,
                            slaType: slaType
                        },
                        scheduledAt: scheduledAt.toISOString()
                    }
                    delete newItem.cardContent.days;
                    items.push(newItem);
                };

                break;
            case auditTrailActionConst.escalate:

                /**
                * Check is the sla setting is enabled ? 
                */
                scheduledAt = getDeadline(ticketItem, instance, actionType, slaType);
                /**
               * If the setting sla escalate is disabled, so there is no deadline.
               */
                if (!!!scheduledAt) return [];

                /**
                * Get receiver ids by escalate type (frt or rt)
                */
                receiverIds = getReceiverIds(ticketItem, instance, actionType, slaType);
                for (const id of receiverIds) {
                    newItem = {
                        ...newItem,
                        id: uuidv4(),
                        receiverId: id,
                        cardContent: {
                            ...newItem.cardContent,
                            action: actionType,
                            slaType: slaType
                        },
                        scheduledAt: scheduledAt.toISOString(),
                        ticket: {
                            ...newItem.ticket,
                            assigneeId: id
                        }
                    }
                    items.push(newItem);
                }


                break;
            case auditTrailActionConst.dailySlaReminder:
                //Daily sla reminder
                const initialDeadline = getDeadline(ticketItem, instance, actionType, "rt");
                if (initialDeadline) {
                    const afterFifteenDays = moment(initialDeadline).clone().add(15, 'days');
                    /**
                     * Get receiver ids
                     */
                    receiverIds = getReceiverIds(ticketItem, instance, actionType);

                    let deadline = moment(initialDeadline);
                    while (deadline.isBefore(afterFifteenDays)) {
                        deadline.add(1, "days");
                        const diffDays = deadline.diff(moment(initialDeadline), "days");
                        for (const id of receiverIds) {
                            newItem = {
                                ...newItem,
                                id: uuidv4(),
                                receiverId: id,
                                cardContent: {
                                    ...newItem.cardContent,
                                    action: actionType,
                                    days: diffDays,
                                },
                                scheduledAt: deadline.utc().format(),
                            }

                            items.push(newItem);
                        }
                    }
                }
                break;
            default:
                break;
        }
        return items;
    }

    /**
     * This function for get receivers ids from ticket (assignee or requestor), custom fields (people picker)
     * 
     * @param ticket 
     * @param instance 
     * @returns 
     */
    function getReceiverIds(ticket: ICase, instance: IInstance, action: "breached" | "escalated" | "daily sla reminder", type?: "frt" | "rt"): string[] {
        let items: string[] = [];
        let followerIds: string[] = [];

        const peoplePickerCustomFields = instance.customFieldsLeft?.concat(instance.customFieldsRight).filter((cf) => cf.type.key == "6_peoplepicker").map((item) => item.id);

        const assigneeId: string = ticket?.assigneeId ?? "";

        /**
         * Just get people picker fields
         */
        const peoplePickerFields = Object.keys(ticket.customFields)
            .filter(key => peoplePickerCustomFields.includes(key))
            .reduce((acc, key) => {
                acc[key] = ticket.customFields[key];
                return acc;
            }, {});

        for (const key in peoplePickerFields) {
            if (Array.isArray(peoplePickerFields[key]) && peoplePickerFields[key].length > 0) {
                peoplePickerFields[key]?.forEach((user) => followerIds.push(user.id));
            }
        }

        const assigneeEscalateFrt = instance.alertNotification.serviceLevelAgreement.breachesAssigneeFirstResponseTime[0]?.id;
        const assigneeEscalateRt = instance.alertNotification.serviceLevelAgreement.breachesAssigneeResolutionTime[0]?.id;
        const isFrtEscalatedEnabled = instance.alertNotification.serviceLevelAgreement.isBreachesFirstResponseTime;
        const isRtEscalatedEnabled = instance.alertNotification.serviceLevelAgreement.isBreachesResolutionTime;

        switch (action) {
            case auditTrailActionConst.breach:
                if (assigneeId) items.push(assigneeId);
                items.push(...followerIds);

                break;
            case auditTrailActionConst.escalate:
                if (type == "frt" && isFrtEscalatedEnabled && assigneeEscalateFrt) items.push(assigneeEscalateFrt);
                if (type == "rt" && isRtEscalatedEnabled && assigneeEscalateRt) items.push(assigneeEscalateRt);
                break;
            case auditTrailActionConst.dailySlaReminder:
                if (assigneeId) items.push(assigneeId);
                items.push(...followerIds);

                break;
            default:
                break;
        }
        const uniqueArray = items.reduce((accumulator, current) => {
            if (!accumulator.includes(current)) {
                accumulator.push(current);
            }
            return accumulator;
        }, []);

        return uniqueArray;
    }
    const instance: IInstance = {
        "name": "Ticketing Dev",
        "displayName": "Ticketing Dev",
        "groupId": "2f8c67d7-3fd1-4ee2-b280-cd5be1141185",
        "enabled": true,
        "tenantId": "052edf75-205c-440a-af7f-b62ae40acd59",
        "teamId": "19:Z6Uw_8yYzHwQ_2QHW3FwUlTp6ejjrR6ERDgvfsWyZgo1@thread.tacv2",
        "channelId": "19:Z6Uw_8yYzHwQ_2QHW3FwUlTp6ejjrR6ERDgvfsWyZgo1@thread.tacv2",
        "entityId": "",
        "assignees": {
            "type": "customAssignee",
            "peoples": [
                {
                    "id": "462e8c88-b2cc-464a-b209-c844fb968ac7",
                    "text": "Irvin Sayers",
                    "imageInitials": "IS",
                    "imageUrl": "",
                    "secondaryText": "irvins@m365x45146571.onmicrosoft.com",
                    "key": "undefined"
                },
                {
                    "id": "e34413df-0183-43f8-8f8a-786cd1a034e9",
                    "text": "Alex Wilber",
                    "secondaryText": "AlexW@M365x70741828.OnMicrosoft.com",
                    "imageInitials": "AW",
                    "key": "undefined"
                }
            ]
        },
        "customFields": [
            {
                "id": "bf140744-3e52-4efb-87d5-05467192ccd8",
                "title": "Additional info",
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
            }
        ],
        "customFieldsLeft": [],
        "customFieldsRight": [
            {
                "id": "2f80da33-b522-4e3c-94ac-4cf39366a6ff",
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
                "isMultipleSection": true,
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
        "automationRules": [],
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
                "isDueInNotifOn": false,
                "dueInNotifDays": 3,
                "isDueTodayNotifOn": false,
                "isOverdueNotifOn": false,
                "overdueNotifDays": 7
            },
            "serviceLevelAgreement": {
                "slaWeek": "1_weekdays",
                "slaStartTime": {
                    "hours": 2,
                    "minutes": 0
                },
                "slaEndTime": {
                    "hours": 16,
                    "minutes": 0
                },
                "isBreachesFirstResponseTime": true,
                "breachesHoursFirstResponseTime": 1,
                "breachesAssigneeFirstResponseTime": [
                    {
                        "id": "462e8c88-b2cc-464a-b209-c844fb968ac7",
                        "text": "Irvin Sayers",
                        "imageInitials": "IS",
                        "imageUrl": "",
                        "secondaryText": "irvins@m365x45146571.onmicrosoft.com",
                        "key": "undefined"
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
                "isBreachesResolutionTime": false,
                "breachesHoursResolutionTime": 1,
                "breachesAssigneeResolutionTime": [
                    {
                        "id": "e34413df-0183-43f8-8f8a-786cd1a034e9",
                        "text": "Alex Wilber",
                        "secondaryText": "AlexW@M365x70741828.OnMicrosoft.com",
                        "imageInitials": "AW",
                        "key": "undefined"
                    }
                ],
                "isRtUrgent": false,
                "rtUrgentDuration": 3,
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
                "key": "bf140744-3e52-4efb-87d5-05467192ccd8",
                "selectedKey": "1_allCanEdit"
            },
            {
                "key": "2f80da33-b522-4e3c-94ac-4cf39366a6ff",
                "selectedKey": "1_allCanEdit"
            }
        ],
        "isNewInstance": true,
        "userList": {
            "owners": [
                {
                    "id": "0f37ca65-a29a-48c3-99b1-fe776b4bc999",
                    "text": "MOD Administrator",
                    "secondaryText": "admin@M365x70741828.onmicrosoft.com",
                    "imageInitials": "MA"
                }
            ],
            "members": [
                {
                    "id": "18a08a73-9490-45d4-afa1-5ce17d053d56",
                    "text": "Adele Vance",
                    "secondaryText": "AdeleV@M365x70741828.OnMicrosoft.com",
                    "imageInitials": "AV",
                    "key": "undefined"
                },
                {
                    "id": "e34413df-0183-43f8-8f8a-786cd1a034e9",
                    "text": "Alex Wilber",
                    "secondaryText": "AlexW@M365x70741828.OnMicrosoft.com",
                    "imageInitials": "AW",
                    "key": "undefined"
                }
            ]
        },
        "notifyOnNoAssignee": false,
        "noAssigneeNotifRecipients": [],
        "appVersion": "1.27.0",
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
        "favoriteFilters": [
            {
                "id": "59886421-eeda-4170-b1f5-d1b27c6e8628",
                "creatorId": "0f37ca65-a29a-48c3-99b1-fe776b4bc999",
                "name": "Tes Cuyyy",
                "visibility": "personal",
                "filter": {
                    "search": "ticket",
                    "priority": "3_important",
                    "tags": "",
                    "orderBy": "customFields['bf140744-3e52-4efb-87d5-05467192ccd8']",
                    "order": "asc",
                    "statusFilterKey": "unresolved ticket",
                    "status": "OpenIn ProgressReopened",
                    "assigneeId": "",
                    "unassigned": false,
                    "column": [
                        {
                            "id": "column2",
                            "value": "asasasasasasas",
                            "type": "1_text"
                        },
                        {
                            "id": "column8",
                            "value": [
                                "Reopened"
                            ],
                            "type": "2_list"
                        }
                    ]
                },
                "columnsSetting": [
                    {
                        "key": "column8",
                        "sorted": "none",
                        "width": 169,
                        "isVisible": true,
                        "isRender": true
                    },
                    {
                        "key": "column2",
                        "sorted": "none",
                        "width": 338,
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
                        "key": "bf140744-3e52-4efb-87d5-05467192ccd8",
                        "isVisible": true,
                        "sorted": "asc",
                        "width": 164,
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
                        "width": 20,
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
        "id": "8d84c93b-b79f-4415-9862-a144acb5b754",
        "_rid": "RPh2AIxJHo6HAAAAAAAAAA==",
        "_self": "dbs/RPh2AA==/colls/RPh2AIxJHo4=/docs/RPh2AIxJHo6HAAAAAAAAAA==/",
        "_etag": "\"0a000dec-0000-0100-0000-670747010000\"",
        "_attachments": "attachments/",
        "userManagementMode": "manual",
        "_ts": 1728530177,
        "idleTicketAssignedTo": []
    }

    let ticket: ICase = {
        "title": "Ticket 26",
        "department": "",
        "requestorName": "MOD Administrator",
        "requestorId": "0f37ca65-a29a-48c3-99b1-fe776b4bc999",
        "category": "",
        "status": "Open",
        "customFields": {
            "2f80da33-b522-4e3c-94ac-4cf39366a6ff": [
                {
                    "id": "18a08a73-9490-45d4-afa1-5ce17d053d56",
                    "text": "Adele Vance",
                    "secondaryText": "AdeleV@M365x70741828.OnMicrosoft.com",
                    "imageInitials": "AV",
                    "key": "undefined"
                }
            ]
        },
        "instanceId": "8d84c93b-b79f-4415-9862-a144acb5b754",
        "expectedDate": "",
        "assigneeName": "Alex Wilber",
        "assigneeId": "e34413df-0183-43f8-8f8a-786cd1a034e9",
        "priority": "4_Urgent",
        "attachments": [],
        "description": "",
        "createdDateTime": "2024-10-08T04:44:38.540Z",
        "tags": [],
        "lastInteraction": "2024-10-10T10:32:02.899Z",
        "firstTimeResponse": "",
        "timeResolution": "",
        "isFrtEscalated": true,
        "isRtEscalated": true,
        "isFrtBreached": true,
        "isRtBreached": true,
        "createdBy": {
            "id": "0f37ca65-a29a-48c3-99b1-fe776b4bc999",
            "text": "MOD Administrator",
            "secondaryText": "admin@M365x70741828.onmicrosoft.com"
        },
        "lastUpdatedBy": {
            "id": "0f37ca65-a29a-48c3-99b1-fe776b4bc999",
            "text": "MOD Administrator",
            "secondaryText": "admin@M365x70741828.onmicrosoft.com"
        },
        "requestorEmail": "admin@M365x70741828.onmicrosoft.com",
        "assigneeEmail": "AlexW@M365x70741828.OnMicrosoft.com",
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
        "ticketId": 26,
        "origin": "WebApp",
        "requestorUnseenEventCnt": 0,
        "assigneeUnseenEventCnt": 2,
        "id": "5cd05901-3fa3-453e-892b-7c9089d8d300",
        "_rid": "RPh2ANl1k9n3BQAAAAAAAA==",
        "_self": "dbs/RPh2AA==/colls/RPh2ANl1k9k=/docs/RPh2ANl1k9n3BQAAAAAAAA==/",
        "_etag": "\"1d002474-0000-0100-0000-6707ad230000\"",
        "_attachments": "attachments/",
        "_ts": 1728556323
    }



    ticket = setSlaTime(ticket, instance);
    const breachFrtItems = generateNotificationLogItems(ticket, instance, "breached", "frt");
    const breachRtItems = generateNotificationLogItems(ticket, instance, "breached", "rt");
    const escalateFrtItems = generateNotificationLogItems(ticket, instance, "escalated", "frt");
    const escalateRtItems = generateNotificationLogItems(ticket, instance, "escalated", "rt");
    const dailyReminderItems = generateNotificationLogItems(ticket, instance, "daily sla reminder");
    console.log("Breach frt items", breachFrtItems);
    console.log("Breach rt items", breachRtItems);
    console.log("Escalate frt items", escalateFrtItems);
    console.log("Escalate rt items", escalateRtItems);
    console.log("Daily reminder items", dailyReminderItems);

    let data = {
        id: 1,
        name: "haha"
    }

    console.log(data);
    console.log(JSON.parse(JSON.stringify(data)));

    return (<></>);
}

export default NotificationLog;