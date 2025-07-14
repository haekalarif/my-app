import axios from "axios";
import moment, { Moment } from "moment";
import React, { useEffect } from "react";
import en from "../lang/en.json";


const SlaCalculate: React.FC = (props) => {
    function alertNotificationBase(alertNotification) {
        return {
            "expectedDate": {
                "isDueInNotifOn": alertNotification?.expectedDate?.isDueInNotifOn ? alertNotification?.expectedDate?.isDueInNotifOn : false,
                "dueInNotifDays": Number(alertNotification?.expectedDate?.dueInNotifDays ? alertNotification?.expectedDate?.dueInNotifDays : 0),
                "isDueTodayNotifOn": alertNotification?.expectedDate?.isDueTodayNotifOn ? alertNotification?.expectedDate?.isDueTodayNotifOn : false,
                "isOverdueNotifOn": alertNotification?.expectedDate?.isOverdueNotifOn ? alertNotification?.expectedDate?.isOverdueNotifOn : false,
                "overdueNotifDays": Number(alertNotification?.expectedDate?.overdueNotifDays ? alertNotification?.expectedDate?.overdueNotifDays : 0)
            },
            "serviceLevelAgreement": {
                "slaWeek": alertNotification?.serviceLevelAgreement?.slaWeek ? alertNotification?.serviceLevelAgreement?.slaWeek : "",
                "slaStartTime": {
                    "hours": alertNotification?.serviceLevelAgreement?.slaStartTime?.hours ? alertNotification?.serviceLevelAgreement?.slaStartTime?.hours : 2,
                    "minutes": alertNotification?.serviceLevelAgreement?.slaStartTime?.minutes ? alertNotification?.serviceLevelAgreement?.slaStartTime?.minutes : 0,
                },
                "slaEndTime": {
                    "hours": alertNotification?.serviceLevelAgreement?.slaEndTime?.hours ? alertNotification?.serviceLevelAgreement?.slaEndTime?.hours : 10,
                    "minutes": alertNotification?.serviceLevelAgreement?.slaEndTime?.minutes ? alertNotification?.serviceLevelAgreement?.slaEndTime?.minutes : 0
                },
                "isBreachesFirstResponseTime": alertNotification?.serviceLevelAgreement?.isBreachesFirstResponseTime ? alertNotification?.serviceLevelAgreement?.isBreachesFirstResponseTime : false,
                "breachesHoursFirstResponseTime": alertNotification?.serviceLevelAgreement?.breachesHoursFirstResponseTime ? alertNotification?.serviceLevelAgreement?.breachesHoursFirstResponseTime : 1,
                "breachesAssigneeFirstResponseTime": alertNotification?.serviceLevelAgreement?.breachesAssigneeFirstResponseTime ? alertNotification?.serviceLevelAgreement?.breachesAssigneeFirstResponseTime : [],

                "isFrtUrgent": alertNotification?.serviceLevelAgreement?.isFrtUrgent ? alertNotification?.serviceLevelAgreement?.isFrtUrgent : false,
                "frtUrgentDuration": alertNotification?.serviceLevelAgreement?.frtUrgentDuration ? alertNotification?.serviceLevelAgreement?.frtUrgentDuration : 1,
                "frtUrgentTime": alertNotification?.serviceLevelAgreement?.frtUrgentTime ? alertNotification?.serviceLevelAgreement?.frtUrgentTime : "2_hours",

                "isFrtImportant": alertNotification?.serviceLevelAgreement?.isFrtImportant ? alertNotification?.serviceLevelAgreement?.isFrtImportant : false,
                "frtImportantDuration": alertNotification?.serviceLevelAgreement?.frtImportantDuration ? alertNotification?.serviceLevelAgreement?.frtImportantDuration : 1,
                "frtImportantTime": alertNotification?.serviceLevelAgreement?.frtImportantTime ? alertNotification?.serviceLevelAgreement?.frtImportantTime : "2_hours",

                "isFrtMedium": alertNotification?.serviceLevelAgreement?.isFrtMedium ? alertNotification?.serviceLevelAgreement?.isFrtMedium : false,
                "frtMediumDuration": alertNotification?.serviceLevelAgreement?.frtMediumDuration ? alertNotification?.serviceLevelAgreement?.frtMediumDuration : 1,
                "frtMediumTime": alertNotification?.serviceLevelAgreement?.frtMediumTime ? alertNotification?.serviceLevelAgreement?.frtMediumTime : "2_hours",

                "isFrtLow": alertNotification?.serviceLevelAgreement?.isFrtLow ? alertNotification?.serviceLevelAgreement?.isFrtLow : false,
                "frtLowDuration": alertNotification?.serviceLevelAgreement?.frtLowDuration ? alertNotification?.serviceLevelAgreement?.frtLowDuration : 1,
                "frtLowTime": alertNotification?.serviceLevelAgreement?.frtLowTime ? alertNotification?.serviceLevelAgreement?.frtLowTime : "2_hours",

                "isBreachesResolutionTime": alertNotification?.serviceLevelAgreement?.isBreachesResolutionTime ? alertNotification?.serviceLevelAgreement?.isBreachesResolutionTime : false,
                "breachesHoursResolutionTime": alertNotification?.serviceLevelAgreement?.breachesHoursResolutionTime ? alertNotification?.serviceLevelAgreement?.breachesHoursResolutionTime : 1,
                "breachesAssigneeResolutionTime": alertNotification?.serviceLevelAgreement?.breachesAssigneeResolutionTime ? alertNotification?.serviceLevelAgreement?.breachesAssigneeResolutionTime : [],

                "isRtUrgent": alertNotification?.serviceLevelAgreement?.isRtUrgent ? alertNotification?.serviceLevelAgreement?.isRtUrgent : false,
                "rtUrgentDuration": alertNotification?.serviceLevelAgreement?.rtUrgentDuration ? alertNotification?.serviceLevelAgreement?.rtUrgentDuration : 1,
                "rtUrgentTime": alertNotification?.serviceLevelAgreement?.rtUrgentTime ? alertNotification?.serviceLevelAgreement?.rtUrgentTime : "2_hours",

                "isRtImportant": alertNotification?.serviceLevelAgreement?.isRtImportant ? alertNotification?.serviceLevelAgreement?.isRtImportant : false,
                "rtImportantDuration": alertNotification?.serviceLevelAgreement?.rtImportantDuration ? alertNotification?.serviceLevelAgreement?.rtImportantDuration : 1,
                "rtImportantTime": alertNotification?.serviceLevelAgreement?.rtImportantTime ? alertNotification?.serviceLevelAgreement?.rtImportantTime : "2_hours",

                "isRtMedium": alertNotification?.serviceLevelAgreement?.isRtMedium ? alertNotification?.serviceLevelAgreement?.isRtMedium : false,
                "rtMediumDuration": alertNotification?.serviceLevelAgreement?.rtMediumDuration ? alertNotification?.serviceLevelAgreement?.rtMediumDuration : 1,
                "rtMediumTime": alertNotification?.serviceLevelAgreement?.rtMediumTime ? alertNotification?.serviceLevelAgreement?.rtMediumTime : "2_hours",

                "isRtLow": alertNotification?.serviceLevelAgreement?.isRtLow ? alertNotification?.serviceLevelAgreement?.isRtLow : false,
                "rtLowDuration": alertNotification?.serviceLevelAgreement?.rtLowDuration ? alertNotification?.serviceLevelAgreement?.rtLowDuration : 1,
                "rtLowTime": alertNotification?.serviceLevelAgreement?.rtLowTime ? alertNotification?.serviceLevelAgreement?.rtLowTime : "2_hours",

            }
        }
    }
    const shortenDuration = (dur: number, workHour: number): string => {
        // console.log(dur);
        // console.log(workHour);
        if (dur < 60) {
            return `${dur}m`
        } else if (dur < (60 * 24)) {
            return `${Math.round(dur / 60)}h`
        } else {
            return `${Math.round(dur / (60 * workHour))}d`
        }
    }

    function isDayWeekdays(week: string, newLimit: moment.Moment, workStartDate?: moment.Moment, workEndDate?: moment.Moment): void {
        if (week.includes("weekdays")) {
            while (newLimit.days() == 6 || newLimit.days() == 0) {
                newLimit.add(1, "days");
                workStartDate?.add(1, "days");
                workEndDate?.add(1, "days");
                // newLimit = workStartDate.clone();
            }
        }
    }

    function hourLocalToUTC(hour) {
        let now = new Date(new Date().setHours(hour));
        let resultHour = now.getHours() + (now.getTimezoneOffset() / 60);

        return resultHour;
    }

    function hourUTCToLocal(hour) {
        let now = new Date();
        let resultHour = hour - (now.getTimezoneOffset() / 60);

        return resultHour;
    }
    // Limit date is initially ticket created date
    function setLimitDateDays(
        createdDateTime: string,
        alertNotification: any,
        durations,
    ) {

        if (!!!isWorkingHourValid(hourUTCToLocal(alertNotification.serviceLevelAgreement.slaStartTime.hours), hourUTCToLocal(alertNotification.serviceLevelAgreement.slaEndTime.hours)))
            return null;

        const week = alertNotification.serviceLevelAgreement.slaWeek;
        let startWorkingHour = hourUTCToLocal(alertNotification.serviceLevelAgreement.slaStartTime.hours);
        let endWorkingHourHour = hourUTCToLocal(alertNotification.serviceLevelAgreement.slaEndTime.hours);

        if (startWorkingHour == endWorkingHourHour) {
            startWorkingHour = 0;
            endWorkingHourHour = 24;
        }

        let startTime = {
            hour: startWorkingHour,
            minutes: alertNotification.serviceLevelAgreement.slaStartTime.minutes,
        };
        let endTime = {
            hour: endWorkingHourHour,
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
        alertNotification: any,
        durations,
    ) {
        if (!!!isWorkingHourValid(hourUTCToLocal(alertNotification.serviceLevelAgreement.slaStartTime.hours), hourUTCToLocal(alertNotification.serviceLevelAgreement.slaEndTime.hours)))
            return null;

        const week = alertNotification.serviceLevelAgreement.slaWeek;
        let startWorkingHour = hourUTCToLocal(alertNotification.serviceLevelAgreement.slaStartTime.hours);
        let endWorkingHourHour = hourUTCToLocal(alertNotification.serviceLevelAgreement.slaEndTime.hours);

        if (startWorkingHour == endWorkingHourHour) {
            startWorkingHour = 0;
            endWorkingHourHour = 24;
        }

        let startTime = {
            hour: startWorkingHour,
            minutes: alertNotification.serviceLevelAgreement.slaStartTime.minutes,
        };
        let endTime = {
            hour: endWorkingHourHour,
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

    function durationControl(
        startDate: Date,
        endDate: Date,
        alertNotification: any
    ) {

        if (!!!isWorkingHourValid(hourUTCToLocal(alertNotification.serviceLevelAgreement.slaStartTime.hours), hourUTCToLocal(alertNotification.serviceLevelAgreement.slaEndTime.hours)))
            return null;

        let startWorkingHour = hourUTCToLocal(alertNotification.serviceLevelAgreement.slaStartTime.hours);
        let endWorkingHourHour = hourUTCToLocal(alertNotification.serviceLevelAgreement.slaEndTime.hours);

        if (startWorkingHour == endWorkingHourHour) {
            startWorkingHour = 0;
            endWorkingHourHour = 24;
        }

        const week = alertNotification.serviceLevelAgreement.slaWeek;
        const workHourStart: number = startWorkingHour;
        const workMinuteStart: number = alertNotification.serviceLevelAgreement.slaStartTime.minutes;

        const workHourEnd: number = endWorkingHourHour
        const workMinuteEnd: number = alertNotification.serviceLevelAgreement.slaEndTime.minutes;

        // let loopTime: Date = new Date(startDate);
        let loopTime = moment(startDate);
        let endTime = moment(endDate);

        let workStartDate = moment(startDate).hour(workHourStart).minute(workMinuteStart);
        let workEndDate = moment(startDate).hour(workHourEnd).minute(workMinuteEnd);

        let lifeTimeTicket: number = 0;

        if (loopTime.isBefore(workStartDate, "minutes")) {
            loopTime = workStartDate.clone();
        } else if (loopTime.isAfter(workEndDate, "minutes")) {
            workStartDate.add(1, 'days');
            workEndDate.add(1, 'days');
            loopTime = workStartDate.clone();
        }

        // if the ticket is made on a holiday which the sla arrangement is only on weekdays Monday - Friday
        if (week.includes("weekdays")) {
            while (loopTime.days() == 6 || loopTime.days() == 0) {
                workStartDate.add(1, "days");
                workEndDate.add(1, "days");
                loopTime = workStartDate.clone();
            }
        }
        // console.log("endTime", endTime.toDate());
        // console.log("workEndDate", workEndDate.toDate());
        while (endTime.isAfter(loopTime, "minutes")) {
            if (endTime.isBefore(workEndDate, "minutes")) {
                // console.log("case 1")
                lifeTimeTicket += endTime.diff(loopTime, 'minutes');
                break;
            } else {
                // console.log("case 2")
                lifeTimeTicket += workEndDate.diff(loopTime, 'minutes');

                workStartDate.add(1, "days");
                workEndDate.add(1, "days");
                loopTime = workStartDate.clone();

                isDayWeekdays(week, loopTime, workStartDate, workEndDate);
            }
            // console.log("Looptime", loopTime.toDate());
            // console.log("LifeTimeTicket", lifeTimeTicket);
        }
        return lifeTimeTicket;
    }

    //Start hour must be less than end hour, if start hour equal to end hour we assume working valid it's same like 24 working hour
    function isWorkingHourValid(startHour, endHour): boolean {
        return (startHour < endHour) ? true : (startHour === endHour);
    }

    function slaInfoControl(
        ticket: any,
        alertNotification: any,
        type: "frt" | "rt",
        text: any
    ) {
        const slaBlue = "#b4c7e7";
        const slaOrange = "#ffc000";
        const slaGreen = "#92d050";
        const slaRed = "#d91813";

        // If ticket is an old ticket (currently has no 'firstTimeResponse' and 'timeResolution')
        if (
            !!!ticket.hasOwnProperty("firstTimeResponse") ||
            !!!ticket.hasOwnProperty("timeResolution")
        ) {
            return null;
        }

        if (!!!ticket.priority) {
            return null;
        }

        const alertNotificationData = alertNotificationBase(alertNotification);
        let alertNotificationSla: any;

        if (type == "frt") {
            alertNotificationSla = {
                isUrgent: alertNotificationData?.serviceLevelAgreement?.isFrtUrgent,
                urgentTime: alertNotificationData?.serviceLevelAgreement?.frtUrgentTime,
                urgentDuration:
                    alertNotificationData?.serviceLevelAgreement?.frtUrgentDuration,
                isImportant: alertNotificationData?.serviceLevelAgreement?.isFrtImportant,
                importantTime:
                    alertNotificationData?.serviceLevelAgreement?.frtImportantTime,
                importantDuration:
                    alertNotificationData?.serviceLevelAgreement?.frtImportantDuration,
                isLow: alertNotificationData?.serviceLevelAgreement?.isFrtLow,
                lowTime: alertNotificationData?.serviceLevelAgreement?.frtLowTime,
                lowDuration: alertNotificationData?.serviceLevelAgreement?.frtLowDuration,
                isMedium: alertNotificationData?.serviceLevelAgreement?.isFrtMedium,
                mediumTime: alertNotificationData?.serviceLevelAgreement?.frtMediumTime,
                mediumDuration:
                    alertNotificationData?.serviceLevelAgreement?.frtMediumDuration,
            };
        } else {
            alertNotificationSla = {
                isUrgent: alertNotificationData?.serviceLevelAgreement?.isRtUrgent,
                urgentTime: alertNotificationData?.serviceLevelAgreement?.rtUrgentTime,
                urgentDuration:
                    alertNotificationData?.serviceLevelAgreement?.rtUrgentDuration,
                isImportant: alertNotificationData?.serviceLevelAgreement?.isRtImportant,
                importantTime:
                    alertNotificationData?.serviceLevelAgreement?.rtImportantTime,
                importantDuration:
                    alertNotificationData?.serviceLevelAgreement?.rtImportantDuration,
                isLow: alertNotificationData?.serviceLevelAgreement?.isRtLow,
                lowTime: alertNotificationData?.serviceLevelAgreement?.rtLowTime,
                lowDuration: alertNotificationData?.serviceLevelAgreement?.rtLowDuration,
                isMedium: alertNotificationData?.serviceLevelAgreement?.isRtMedium,
                mediumTime: alertNotificationData?.serviceLevelAgreement?.rtMediumTime,
                mediumDuration:
                    alertNotificationData?.serviceLevelAgreement?.rtMediumDuration,
            };
        }

        if (!!!alertNotificationSla.isUrgent && ticket.priority === "4_Urgent") {
            return null;
        }

        if (
            !!!alertNotificationSla.isImportant &&
            ticket.priority === "3_Important"
        ) {
            return null;
        }

        if (!!!alertNotificationSla.isMedium && ticket.priority === "2_Medium") {
            return null;
        }

        if (!!!alertNotificationSla.isLow && ticket.priority === "1_Low") {
            return null;
        }

        if (ticket.id) {
            let now = new Date();

            const createdDate = new Date(ticket.createdDateTime);

            if (!!!isWorkingHourValid(hourUTCToLocal(alertNotification.serviceLevelAgreement.slaStartTime.hours), hourUTCToLocal(alertNotification.serviceLevelAgreement.slaEndTime.hours)))
                return null

            const workingHour: number = (alertNotification.serviceLevelAgreement.slaStartTime.hours === alertNotification.serviceLevelAgreement.slaEndTime.hours) ? 24 :
                hourUTCToLocal(alertNotification.serviceLevelAgreement.slaEndTime.hours) - hourUTCToLocal(alertNotification.serviceLevelAgreement.slaStartTime.hours);

            // Calculate limit first response time
            let deadline: moment.Moment;
            switch (ticket.priority.split("_").pop()) {
                case "Urgent":
                    if (alertNotificationSla.isUrgent) {
                        if (alertNotificationSla.urgentTime.includes("days")) {
                            deadline = setLimitDateDays(
                                ticket.createdDateTime,
                                alertNotification,
                                alertNotificationSla.urgentDuration
                            );
                        } else {
                            deadline = setLimitDateHrs(
                                ticket.createdDateTime,
                                alertNotification,
                                alertNotificationSla.urgentDuration,
                            );
                        }
                    }
                    break;
                case "Important":
                    if (alertNotificationSla.isImportant) {
                        if (alertNotificationSla.importantTime.includes("days")) {
                            deadline = setLimitDateDays(
                                ticket.createdDateTime,
                                alertNotification,
                                alertNotificationSla.importantDuration
                            );
                        } else {
                            deadline = setLimitDateHrs(
                                ticket.createdDateTime,
                                alertNotification,
                                alertNotificationSla.importantDuration,
                            );
                        }
                    }
                    break;
                case "Low":
                    if (alertNotificationSla.isLow) {
                        if (alertNotificationSla.lowTime.includes("days")) {
                            deadline = setLimitDateDays(
                                ticket.createdDateTime,
                                alertNotification,
                                alertNotificationSla.lowDuration
                            );
                        } else {
                            deadline = setLimitDateHrs(
                                ticket.createdDateTime,
                                alertNotification,
                                alertNotificationSla.lowDuration,
                            );
                        }
                    }
                    break;
                case "Medium":
                    if (alertNotificationSla.isMedium) {
                        if (alertNotificationSla.mediumTime.includes("days")) {
                            deadline = setLimitDateDays(
                                ticket.createdDateTime,
                                alertNotification,
                                alertNotificationSla.mediumDuration
                            );
                        } else {
                            deadline = setLimitDateHrs(
                                ticket.createdDateTime,
                                alertNotification,
                                alertNotificationSla.mediumDuration,
                            );
                        }
                    }
                    break;
                default:
                    break;
            }

            let result: { text: string; backgroundColor: string, isSlaOngoing: boolean };

            console.log("deadline");
            console.log(deadline.toDate());

            if (type === "frt") {
                if (ticket.firstTimeResponse) {
                    const frt = new Date(ticket.firstTimeResponse);
                    const dur: number = durationControl(
                        createdDate,
                        frt,
                        alertNotification
                    );

                    if (frt < deadline.toDate()) {
                        result = {
                            text: `${text.container.ViewCase.firstResponseTime} ${shortenDuration(dur, workingHour)}`,
                            // text: shortenDuration(dur, workingHour),
                            backgroundColor: slaGreen,
                            isSlaOngoing: false,
                        };
                    } else {
                        result = {
                            text: `${text.container.ViewCase.firstResponseTime} ${shortenDuration(dur, workingHour)}`,
                            // text: shortenDuration(dur, workingHour),
                            backgroundColor: slaRed,
                            isSlaOngoing: false,
                        };
                    }
                } else {
                    if (now < deadline.toDate()) {
                        // const dur: number = durationControl(now, deadline, alertNotification);
                        const dur: number = Math.round(
                            (deadline.toDate().getTime() - now.getTime()) / (1000 * 60)
                        );
                        result = {
                            text: `${text.container.ViewCase.mustReply} ${shortenDuration(dur, 24)}`,
                            // text: shortenDuration(dur, 24),
                            backgroundColor: dur > 60 ? slaBlue : slaOrange,
                            isSlaOngoing: true
                        };
                    } else {
                        const dur: number = durationControl(
                            createdDate,
                            now,
                            alertNotification
                        );
                        result = {
                            text: `${text.container.ViewCase.notAnsweredFor} ${shortenDuration(dur, workingHour)}`,
                            // text: shortenDuration(dur, workingHour),
                            backgroundColor: slaRed,
                            isSlaOngoing: false,
                        };
                    }
                }
            } else {
                if (ticket.timeResolution) {
                    const rt = new Date(ticket.timeResolution);
                    const dur: number = durationControl(createdDate, rt, alertNotification);
                    if (new Date(ticket.timeResolution) < deadline.toDate()) {
                        result = {
                            text: `${text.container.ViewCase.resolution} ${shortenDuration(dur, workingHour)}`,
                            // text: shortenDuration(dur, workingHour),
                            backgroundColor: slaGreen,
                            isSlaOngoing: false,
                        };
                    } else {
                        result = {
                            text: `${text.container.ViewCase.resolution} ${shortenDuration(dur, workingHour)}`,
                            // text: shortenDuration(dur, workingHour),
                            backgroundColor: slaRed,
                            isSlaOngoing: false,
                        };
                    }
                } else {
                    if (now < deadline.toDate()) {
                        // const dur: number = durationControl(now, deadline, alertNotification);
                        const dur: number = Math.round(
                            (deadline.toDate().getTime() - now.getTime()) / (1000 * 60)
                        );
                        result = {
                            text: `${text.container.ViewCase.mustResolve} ${shortenDuration(dur, 24)}`,
                            // text: shortenDuration(dur, 24),
                            backgroundColor: dur > 60 * 24 ? slaBlue : slaOrange,
                            isSlaOngoing: true
                        };
                    } else {
                        const dur: number = durationControl(
                            createdDate,
                            now,
                            alertNotification
                        );
                        result = {
                            text: `${text.container.ViewCase.unresolvedFor} ${shortenDuration(dur, workingHour)}`,
                            // text: shortenDuration(dur, workingHour),
                            backgroundColor: slaRed,
                            isSlaOngoing: false,
                        };
                    }
                }
            }

            return result;
        }
    }


    useEffect(() => {


        const instance: any = {
            "name": "Ticketing ",
            "displayName": "Ticketing ",
            "groupId": "ba584504-5f52-4629-b0e5-35408b7d8a1f",
            "enabled": true,
            "tenantId": "ad1565a3-587e-4976-a416-e556be5eb44e",
            "teamId": "19:90Bz51MLy8kGQ1XyOlvNLyTYZLFzJeJXpYlxm-U8owo1@thread.tacv2",
            "channelId": "19:90Bz51MLy8kGQ1XyOlvNLyTYZLFzJeJXpYlxm-U8owo1@thread.tacv2",
            "entityId": "ticketing_Ticketing",
            "assignees": {
                "type": "customAssignee",
                "peoples": [
                    {
                        "id": "c4937347-46d7-46d0-8c17-5d3c3c4c8f45",
                        "text": "Christie Cline",
                        "imageInitials": "CC",
                        "imageUrl": "",
                        "secondaryText": "ChristieC@M365x95149415.OnMicrosoft.com",
                        "key": "undefined"
                    }
                ]
            },
            "customFields": [],
            "customFieldsLeft": [],
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
                        "hours": 15,
                        "minutes": 0
                    },
                    "isBreachesFirstResponseTime": false,
                    "breachesHoursFirstResponseTime": 0,
                    "breachesAssigneeFirstResponseTime": [],
                    "isFrtUrgent": true,
                    "frtUrgentDuration": 2,
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
                            "id": "c4937347-46d7-46d0-8c17-5d3c3c4c8f45",
                            "text": "Christie Cline",
                            "imageInitials": "CC",
                            "imageUrl": "",
                            "secondaryText": "ChristieC@M365x95149415.OnMicrosoft.com",
                            "key": "undefined"
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
            "appVersion": "1.30.5",
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
                                "width": 175,
                                "height": 40,
                                "id": "Fixed",
                                "type": "textFieldNode",
                                "position": {
                                    "x": 138.28218947316367,
                                    "y": 76.31269437543403
                                },
                                "data": {
                                    "label": "Closed",
                                    "recordResolutionSLA": true,
                                    "color": "#bf4040"
                                },
                                "targetPosition": "left",
                                "sourcePosition": "right",
                                "positionAbsolute": {
                                    "x": 138.28218947316367,
                                    "y": 76.31269437543403
                                },
                                "dragging": false,
                                "selected": true
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
                                "id": "f5b86283-f6e0-4e39-8729-a6bd5512e219",
                                "type": "labeledEdge",
                                "label": "Closed",
                                "source": "Open",
                                "sourceHandle": null,
                                "target": "Fixed",
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
                                    "iconName": "Feedback"
                                }
                            },
                            {
                                "id": "85d8793b-d4d1-4f03-b6a4-baf26cd1d272",
                                "type": "labeledEdge",
                                "label": "Closed",
                                "source": "Fixed",
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
                                    "iconName": "InboxCheck"
                                }
                            }
                        ]
                    }
                ],
                "isCustomWorkflow": true
            },
            "color": "#aa4567",
            "favoriteFilters": [],
            "userManagementMode": "manual",
            "createdDateTime": "2025-06-17T08:15:24.977Z",
            "assigneeVisibility": "1_seeAll",
            "membershipType": "Regular",
            "hasNewEmailNotificationConfig": true,
            "emailSync": {
                "emailAddress": "",
                "displayName": "",
                "objectId": "",
                "tenantId": "",
                "creatorTenantId": "",
                "creatorId": "",
                "isActive": true
            },
            "id": "516f12c0-5994-438a-a82c-070915743ec5",
            "_rid": "wTtJAOFgVuHdIgAAAAAAAA==",
            "_self": "dbs/wTtJAA==/colls/wTtJAOFgVuE=/docs/wTtJAOFgVuHdIgAAAAAAAA==/",
            "_etag": "\"1d00e068-0000-0700-0000-686f78c50000\"",
            "_attachments": "attachments/",
            "lastTicketUpdated": "2025-07-10T08:24:24.709Z",
            "api": {
                "primaryKey": "d9907ab37bbc45f88676b032363e4a46",
                "secondaryKey": "25ac0d41f61d433a9a9c742f392a56b9"
            },
            "_ts": 1752135877,
            "idleTicketAssignedTo": []
        }

        const ticket: any = {
            "title": "Ticket 15",
            "department": "",
            "requestorName": "MOD Administrator",
            "requestorId": "1e85e536-124b-43aa-8662-7ba03f5ea87d",
            "category": "",
            "status": "Open",
            "customFields": {},
            "instanceId": "516f12c0-5994-438a-a82c-070915743ec5",
            "expectedDate": "2025-07-22T17:00:00.000Z",
            "assigneeName": "Christie Cline",
            "assigneeId": "c4937347-46d7-46d0-8c17-5d3c3c4c8f45",
            "priority": "4_Urgent",
            "attachments": [],
            "description": "",
            "createdDateTime": "2025-07-10T08:22:49.820Z",
            "tags": [],
            "lastInteraction": "2025-07-10T08:24:24.422Z",
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
            "assigneeEmail": "ChristieC@M365x95149415.OnMicrosoft.com",
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
                            "targetId": "Fixed",
                            "transitionLabel": "Closed",
                            "transitionIcon": "Feedback",
                            "authorizedUsers": [
                                "assignee",
                                "owner",
                                "requestor"
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
                        }
                    ]
                },
                {
                    "id": "Fixed",
                    "label": "Closed",
                    "color": "#bf4040",
                    "recordResolutionSLA": true,
                    "nextSteps": [
                        {
                            "targetId": "Closed",
                            "transitionLabel": "Closed",
                            "transitionIcon": "InboxCheck",
                            "authorizedUsers": [
                                "assignee",
                                "owner",
                                "requestor"
                            ],
                            "recordComment": true,
                            "recordResolutionSLA": true
                        }
                    ]
                }
            ],
            "resolvedStatus": [
                "Closed",
                "Fixed"
            ],
            "isCustomWorkflow": true,
            "ticketId": 15,
            "origin": "WebApp",
            "requestorUnseenEventCnt": 0,
            "assigneeUnseenEventCnt": 1,
            "id": "f7060884-871a-449d-8207-a599cd36dd91",
            "_rid": "wTtJAN-sEFGtrgQAAAAAAA==",
            "_self": "dbs/wTtJAA==/colls/wTtJAN-sEFE=/docs/wTtJAN-sEFGtrgQAAAAAAA==/",
            "_etag": "\"0201be84-0000-0700-0000-686f78b80000\"",
            "_attachments": "attachments/",
            "_ts": 1752135864
        }

        const text = en;
        const alertNotification = instance.alertNotification;

        let info = slaInfoControl(ticket, alertNotification, "frt", text);
        console.log(info);

    }, []);
    return (<div></div>)
}
export default SlaCalculate;