import axios from "axios";
import moment, { Moment } from "moment";
import React, { useEffect } from "react";



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

    function slaInfoControl(createdDateTime, alertNotification, type: 'frt' | 'rt') {
        const slaBlue = "#b4c7e7";
        const slaOrange = "#ffc000";
        const slaGreen = "#92d050";
        const slaRed = "#d91813";

        const alertNotificationData = alertNotificationBase(alertNotification);
        let alertNotificationSla;

        if (type == "frt") {
            alertNotificationSla = {
                "isUrgent": alertNotificationData?.serviceLevelAgreement?.isFrtUrgent,
                "urgentTime": alertNotificationData?.serviceLevelAgreement?.frtUrgentTime,
                "urgentDuration": alertNotificationData?.serviceLevelAgreement?.frtUrgentDuration,
                "isImportant": alertNotificationData?.serviceLevelAgreement?.isFrtImportant,
                "importantTime": alertNotificationData?.serviceLevelAgreement?.frtImportantTime,
                "importantDuration": alertNotificationData?.serviceLevelAgreement?.frtImportantDuration,
                "isLow": alertNotificationData?.serviceLevelAgreement?.isFrtLow,
                "lowTime": alertNotificationData?.serviceLevelAgreement?.frtLowTime,
                "lowDuration": alertNotificationData?.serviceLevelAgreement?.frtLowDuration,
                "isMedium": alertNotificationData?.serviceLevelAgreement?.isFrtMedium,
                "mediumTime": alertNotificationData?.serviceLevelAgreement?.frtMediumTime,
                "mediumDuration": alertNotificationData?.serviceLevelAgreement?.frtMediumDuration,
            }
        } else {
            alertNotificationSla = {
                "isUrgent": alertNotificationData?.serviceLevelAgreement?.isRtUrgent,
                "urgentTime": alertNotificationData?.serviceLevelAgreement?.rtUrgentTime,
                "urgentDuration": alertNotificationData?.serviceLevelAgreement?.rtUrgentDuration,
                "isImportant": alertNotificationData?.serviceLevelAgreement?.isRtImportant,
                "importantTime": alertNotificationData?.serviceLevelAgreement?.rtImportantTime,
                "importantDuration": alertNotificationData?.serviceLevelAgreement?.rtImportantDuration,
                "isLow": alertNotificationData?.serviceLevelAgreement?.isRtLow,
                "lowTime": alertNotificationData?.serviceLevelAgreement?.rtLowTime,
                "lowDuration": alertNotificationData?.serviceLevelAgreement?.rtLowDuration,
                "isMedium": alertNotificationData?.serviceLevelAgreement?.isRtMedium,
                "mediumTime": alertNotificationData?.serviceLevelAgreement?.rtMediumTime,
                "mediumDuration": alertNotificationData?.serviceLevelAgreement?.rtMediumDuration,
            }
        }


        let now = new Date();
        // const createdDate = new Date(createdDateTime);
        // const workingHour: number = alertNotification.serviceLevelAgreement.slaEndTime.hours - alertNotification.serviceLevelAgreement.slaStartTime.hours;

        // Calculate limit first response time
        let deadline: Moment;

        if (alertNotificationSla.isUrgent) {
            if (alertNotificationSla.urgentTime.includes("days")) {
                deadline = setLimitDateDays(createdDateTime, alertNotification, alertNotificationSla.urgentDuration)
            } else {
                deadline = setLimitDateHrs(createdDateTime, alertNotification, alertNotificationSla.urgentDuration)
            }
        }


        let result: { text: string, backgroundColor: string };
        if (type === 'frt') {
            // if (ticket.firstTimeResponse) {
            //     const frt = new Date(ticket.firstTimeResponse);
            //     const dur: number = durationControl(createdDate, frt, alertNotification);
            //     if (frt < deadline) {
            //         result = {
            //             text: `${text.container.ViewCase.firstResponseTime} ${shortenDuration(dur, workingHour)}`,
            //             backgroundColor: slaGreen,
            //         }
            //     } else {
            //         result = {
            //             text: `${text.container.ViewCase.firstResponseTime} ${shortenDuration(dur, workingHour)}`,
            //             backgroundColor: slaRed,
            //         }
            //     }
            // } else {
            console.log("deadline", deadline)
            console.log("now", now)
            // now = new Date("2023-09-07T11:26:31.440Z")
            // if (now < deadline) {
            //     // const dur: number = durationControl(now, deadline, alertNotification);
            //     const dur: number = Math.round((deadline.getTime() - now.getTime()) / (1000 * 60));
            //     console.log("duration", dur);
            //     result = {
            //         text: `${shortenDuration(dur, 24)}`,
            //         backgroundColor: dur > 60 ? slaBlue : slaOrange,
            //     }
            // } else {
            //     console.log("created date", createdDate);
            //     console.log("now", now)
            //     const dur: number = durationControl(createdDate, now, alertNotification);
            //     result = {
            //         text: `${shortenDuration(dur, workingHour)}`,
            //         backgroundColor: slaRed,
            //     }
            // }
            // }
        } else {
            // if (ticket.timeResolution) {
            //     const rt = new Date(ticket.timeResolution);
            //     const dur: number = durationControl(createdDate, rt, alertNotification);
            //     if (new Date(ticket.timeResolution) < deadline) {
            //         result = {
            //             text: `${text.container.ViewCase.resolution} ${shortenDuration(dur, workingHour)}`,
            //             backgroundColor: slaGreen,
            //         }
            //     } else {
            //         result = {
            //             text: `${text.container.ViewCase.resolution} ${shortenDuration(dur, workingHour)}`,
            //             backgroundColor: slaRed,
            //         }
            //     }
            // } else {
            //     if (now < deadline) {
            //         // const dur: number = durationControl(now, deadline, alertNotification);
            //         const dur: number = Math.round((deadline.getTime() - now.getTime()) / (1000 * 60));
            //         result = {
            //             text: `${text.container.ViewCase.mustResolve} ${shortenDuration(dur, 24)}`,
            //             backgroundColor: dur > (60 * 24) ? slaBlue : slaOrange,
            //         }
            //     } else {
            //         const dur: number = durationControl(createdDate, now, alertNotification);
            //         result = {
            //             text: `${text.container.ViewCase.unresolvedFor} ${shortenDuration(dur, workingHour)}`,
            //             backgroundColor: slaRed,
            //         }
            //     }
            // }
        }

        return result;

    }
    function isMoreThanEndTime
        (
            slaHour: number,
            limitDate: moment.Moment,
            startTime: { hour: number, minutes: number },
            hourSpent: number,
            week: string
        ) {
        let newLimitDate = moment(limitDate);

        while (slaHour > 0) {
            newLimitDate.add(1, 'days');
            newLimitDate.hours(startTime.hour).minutes(startTime.minutes);
            newLimitDate.add((slaHour - hourSpent), 'hours');

            let helperDate = newLimitDate.clone();
            helperDate.hours(startTime.hour).minutes(startTime.minutes);

            let remain = newLimitDate.diff(helperDate, 'hours');

            slaHour = slaHour - (hourSpent + remain);
            hourSpent = remain;

            // if weekdays only
            if (week.includes('weekdays')) {
                while (newLimitDate.days() == 6 || newLimitDate.days() == 0) {
                    newLimitDate.add(1, 'days');
                }
            }

        }
        return newLimitDate;
    }

    // function calculateLimitHours(ticketCreatedDate: Date, alertNotification, durations: number, timezoneOffset): Date {

    //     const week = alertNotification.serviceLevelAgreement.slaWeek;
    //     let slaHour = durations;
    //     let startTime = {
    //         "hour": hourUTCToLocal(alertNotification.serviceLevelAgreement.slaStartTime.hours, timezoneOffset),
    //         "minutes": alertNotification.serviceLevelAgreement.slaStartTime.minutes
    //     }
    //     let endTime = {
    //         "hour": hourUTCToLocal(alertNotification.serviceLevelAgreement.slaEndTime.hours, timezoneOffset),
    //         "minutes": alertNotification.serviceLevelAgreement.slaEndTime.minutes
    //     }

    //     // Use setLimitDateDays if slaHour is more than the number of working hour in a day
    //     // console.log("ticket created date sebelum di initiate", ticketCreatedDate);
    //     let newLimit: Date = new Date(ticketCreatedDate);
    //     // console.log("ticket created date sesudah di initiate", newLimit);
    //     // console.log("ticket created date get hour", newLimit.getHours());
    //     const workingHour = endTime.hour - startTime.hour; // number of working hour
    //     // console.log("ticket created date time", newLimit.toISOString());
    //     // console.log("working hour", workingHour);
    //     // console.log("sla hour duration", slaHour);
    //     if (slaHour > workingHour) {
    //         const daysCount: number = Math.floor(slaHour / workingHour);

    //         newLimit = calculateLimitDays(newLimit, alertNotification, daysCount, timezoneOffset !== undefined ? timezoneOffset : undefined);
    //         slaHour = slaHour - (daysCount * workingHour);
    //     }

    //     // this is ticket created date
    //     // this is ticket created date + sla hours per priority
    //     // this is remaining hour ticket from ticket created - limit hour sla
    //     let limitEndTimeWorkHour: Date = new Date(new Date(newLimit).setHours(endTime.hour, endTime.minutes));
    //     let remainingTime = Math.ceil((limitEndTimeWorkHour.getTime() - newLimit.getTime()) / (1000 * 3600));

    //     // console.log("limit end time work hour", limitEndTimeWorkHour.toISOString());
    //     // console.log("Remaining Time", remainingTime);

    //     // if the ticket is made on a holiday which the sla arrangement is only on weekdays Monday - Friday
    //     if (week.includes('weekdays')) {
    //         if (newLimit.getDay() == 6 || newLimit.getDay() == 0) {
    //             while (newLimit.getDay() == 6 || newLimit.getDay() == 0) {
    //                 newLimit.setDate(newLimit.getDate() + 1);
    //             }
    //         }
    //     }
    //     console.log("new limit", newLimit);
    //     // console.log("new limit get hour", newLimit.getHours());
    //     // console.log("new limit hour", hourLocalToUTC(newLimit.getHours()));
    //     // console.log("start time hour", startTime.hour);
    //     // console.log("end time hour", endTime.hour);
    //     // if ticket created before start time working hour
    //     if (newLimit.getHours() < startTime.hour) {

    //         // ticket working hours start from working hours sla, then added working hours with SLA limits per priority (First response time / Resolution time)
    //         newLimit.setHours(startTime.hour, startTime.minutes);
    //         // newLimit.setHours(newLimit.getHours() + slaHour);
    //         newLimit.setHours(newLimit.getHours() + slaHour);

    //         // if the limit of working hours per priority > end of working hours sla
    //         // if (newLimit > limitEndTimeWorkHour) {
    //         limitEndTimeWorkHour.setDate(newLimit.getDate());
    //         limitEndTimeWorkHour.setMonth(newLimit.getMonth());
    //         limitEndTimeWorkHour.setFullYear(newLimit.getFullYear());
    //         if (newLimit > limitEndTimeWorkHour) {
    //             isMoreThanEndTime(slaHour, newLimit, startTime, remainingTime, week);
    //         }
    //         // if ticket created after end time working hour
    //     } else if (newLimit.getHours() > endTime.hour) {

    //         console.log("new Limit before result", newLimit);
    //         // console.log("new Limit getDate", newLimit.getDate());
    //         newLimit.setDate(newLimit.getDate() + 1);
    //         newLimit.setHours(startTime.hour, startTime.minutes);
    //         console.log("new Limit after", newLimit);
    //         // console.log("new Limit", newLimit.toISOString());
    //         // console.log("new Limit getHours", newLimit.getHours());
    //         // console.log(convertIndonesiaHourToUTCHour(newLimit.getHours()))
    //         // console.log(hourLocalToUTC(newLimit.getHours()))
    //         // console.log("sla hour duration", hourLocalToUTC(newLimit.getHours()) + slaHour);
    //         newLimit.setHours(newLimit.getHours() + slaHour);

    //         // console.log("new Limit result", newLimit.toISOString());
    //         console.log("new Limit result", newLimit);

    //         limitEndTimeWorkHour.setDate(newLimit.getDate());
    //         limitEndTimeWorkHour.setMonth(newLimit.getMonth());
    //         limitEndTimeWorkHour.setFullYear(newLimit.getFullYear());
    //         console.log("limit end time work hour result", limitEndTimeWorkHour);

    //         isDayWeekdays(week, newLimit);
    //         isDayWeekdays(week, limitEndTimeWorkHour);
    //         // if (newLimit > limitEndTimeWorkHour) {
    //         if (newLimit > limitEndTimeWorkHour) {
    //             isMoreThanEndTime(slaHour, newLimit, startTime, remainingTime, week);
    //         }
    //         // if ticket created after on time working hour
    //     } else {
    //         // console.log("new Limit before result", newLimit.toISOString());
    //         // console.log("new Limit getHour", newLimit.getHours());
    //         // console.log("new Limit getHourUTC", (hourLocalToUTC(newLimit.getHours()) + slaHour));
    //         newLimit.setHours(newLimit.getHours() + slaHour); //18
    //         console.log("new Limit result", newLimit);
    //         // console.log("new Limit result", newLimit.toISOString());

    //         limitEndTimeWorkHour.setDate(newLimit.getDate());
    //         limitEndTimeWorkHour.setMonth(newLimit.getMonth());
    //         limitEndTimeWorkHour.setFullYear(newLimit.getFullYear());
    //         console.log("limit end time work hour result", limitEndTimeWorkHour);
    //         // if (newLimit > limitEndTimeWorkHour) {
    //         // console.log(convertIndonesiaToUTC(newLimit))
    //         // console.log(convertIndonesiaToUTC(limitEndTimeWorkHour))
    //         // if (newLimit > limitEndTimeWorkHour) {
    //         if (newLimit > limitEndTimeWorkHour) {
    //             isMoreThanEndTime(slaHour, newLimit, startTime, remainingTime, week);
    //         }
    //     }

    //     return newLimit;
    // }
    // function calculateLimitDays(ticketCreatedDate: Date, alertNotification, durations: number, timezoneOffset): Date {

    //     const week = alertNotification.serviceLevelAgreement.slaWeek;
    //     const ticketCreated = new Date(ticketCreatedDate);

    //     let startTime = {
    //         "hour": alertNotification.serviceLevelAgreement.slaStartTime.hours,
    //         "minutes": alertNotification.serviceLevelAgreement.slaStartTime.minutes
    //     }
    //     let endTime = {
    //         "hour": alertNotification.serviceLevelAgreement.slaEndTime.hours,
    //         "minutes": alertNotification.serviceLevelAgreement.slaEndTime.minutes
    //     }

    //     let newLimit = new Date(ticketCreatedDate);

    //     // check if sla type weekdays only
    //     if (week.includes('weekdays')) {
    //         if (ticketCreated.getDay() == 6 || ticketCreated.getDay() == 0) {
    //             while (newLimit.getDay() == 6 || newLimit.getDay() == 0) {
    //                 newLimit.setDate(newLimit.getDate() + 1);
    //             }
    //         }
    //     }

    //     if (newLimit.getHours() < startTime.hour) {

    //         newLimit.setHours(startTime.hour, startTime.minutes);
    //         newLimit.setDate(newLimit.getDate() + durations);

    //         // check if sla type weekdays only
    //         isDayWeekdays(week, newLimit);
    //         // if(week.includes('weekdays')){
    //         //   while(newLimit.getDay() == 6 || newLimit.getDay() == 0){
    //         //     newLimit.setDate(newLimit.getDate() + 1);
    //         //   }
    //         // }

    //     } else if (newLimit.getHours() > endTime.hour) {

    //         newLimit.setHours(startTime.hour, startTime.minutes);
    //         newLimit.setDate(newLimit.getDate() + 1);

    //         // check if sla type weekdays only
    //         isDayWeekdays(week, newLimit);
    //         newLimit.setDate(newLimit.getDate() + durations);
    //         // check if sla type weekdays only
    //         isDayWeekdays(week, newLimit);


    //     } else {
    //         // newLimit.setHours(startTime.hour, startTime.minutes);
    //         newLimit.setDate(newLimit.getDate() + durations);
    //         // check if sla type weekdays only
    //         isDayWeekdays(week, newLimit);
    //     }

    //     return newLimit;
    // }
    function isDayWeekdays(week: string, newLimit: moment.Moment) {
        if (week.includes('weekdays')) {
            while (newLimit.days() == 6 || newLimit.days() == 0) {
                newLimit.add(1, 'days');
            }
        }

        return newLimit;
    }

    function durationControl(startDate: Date, endDate: Date, alertNotification) {
        const workingDays = alertNotification.serviceLevelAgreement.slaWeek;
        // const slaStartTime = hourUTCToLocal(alertNotification.serviceLevelAgreement.slaStartTime.hours), alertNotification.serviceLevelAgreement.slaStartTime.minutes));
        const workHourStart: number = hourUTCToLocal(alertNotification.serviceLevelAgreement.slaStartTime.hours);
        const workMinuteStart: number = alertNotification.serviceLevelAgreement.slaStartTime.minutes;
        const workHourEnd: number = hourUTCToLocal(alertNotification.serviceLevelAgreement.slaEndTime.hours);
        const workMinuteEnd: number = alertNotification.serviceLevelAgreement.slaEndTime.minutes;

        let loopTime: Date = new Date(startDate);
        let lifeTimeTicket: number = 0;

        // console.log("sla start time", slaStartTime)
        // console.log("sla end time", slaEndTime)

        // console.log("Start: ", startDate);
        // console.log("End: ", endDate);
        console.log("================================================")
        console.log("work hour start", workHourStart)
        console.log("work hour end", workHourEnd)
        console.log("loopTime", loopTime);
        console.log("endDate", endDate);
        endDate.setDate(endDate.getDate() + 1)
        // 2023-08-28T03:00:00.963Z
        while (loopTime <= endDate) {
            if (workingDays.includes("weekdays")) {
                if (loopTime.getDay() === 0 || loopTime.getDay() === 6) {
                    loopTime.setDate(loopTime.getDate() + 1);
                    loopTime.setHours(workHourStart, workMinuteStart);
                }
            }
            console.log("loopTime getHours", loopTime.getHours());
            // now is not weekend
            if (loopTime.getHours() >= workHourStart) {
                // ticket created date < slaEndTime hours
                if (loopTime.getHours() < workHourEnd) {
                    // (ticket created date + one houres) < slaEndTime hours
                    if ((loopTime.getHours() + 1) <= workHourEnd) {
                        // lifetimeticket = lifeTimeTicket + one hours(in hours) + (looptime + 1 hours)
                        loopTime.setHours(loopTime.getHours() + 1);
                        if (loopTime < endDate) {
                            lifeTimeTicket += 60;
                        } else {
                            const min = Math.ceil((endDate.getTime() - (loopTime.getTime() - (1000 * 60 * 60))) / (60000));
                            lifeTimeTicket += min;
                        }
                    } else {
                        if (loopTime.getMinutes() <= workMinuteEnd) {
                            lifeTimeTicket += 60;
                        } else {
                            let min = (60 - (loopTime.getMinutes() - workMinuteEnd));
                            lifeTimeTicket += min;

                            loopTime.setDate(loopTime.getDate() + 1);
                            loopTime.setHours(workHourStart, workMinuteStart);

                            if (workingDays.includes("weekdays")) {
                                if (loopTime.getDay() === 0 || loopTime.getDay() === 6) {
                                    loopTime.setDate(loopTime.getDate() + 1);
                                }
                            }
                        }
                    }
                } else {
                    // console.log("loopTime", loopTime);
                    // console.log("loopTime", loopTime);
                    // console.log("loopTime + 1", loopTime);

                    loopTime.setDate(loopTime.getDate() + 1);
                    loopTime.setHours(workHourStart, workMinuteStart);
                    console.log("loopTime", loopTime);

                    if (workingDays.includes("weekdays")) {
                        if (loopTime.getDay() === 0 || loopTime.getDay() === 6) {
                            loopTime.setDate(loopTime.getDate() + 1);
                        }
                    }
                }
            } else {
                loopTime.setHours(workHourStart, workHourEnd);
            }
        }
        // console.log("loopTime", loopTime);
        console.log(lifeTimeTicket);
        return lifeTimeTicket;
    }
    function hourUTCToLocal(hour, timezoneOffset?: number) {
        let now = new Date();
        let resultHour = hour - (timezoneOffset / 60);

        return resultHour;
    }
    const shortenDuration = (dur: number, workHour: number): string => {
        if (dur < 60) {
            return `${dur}m`
        } else if (dur < (60 * 24)) {
            return `${Math.round(dur / 60)}h`
        } else {
            return `${Math.round(dur / (60 * workHour))}d`
        }
    }
    const alertNotification = {
        "expectedDate": {
            "isDueInNotifOn": false,
            "dueInNotifDays": 3,
            "isDueTodayNotifOn": true,
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
                "hours": 12,
                "minutes": 0
            },
            "isBreachesFirstResponseTime": true,
            "breachesHoursFirstResponseTime": 1,
            "breachesAssigneeFirstResponseTime": [
                {
                    "id": "c6d3d65c-fb88-4e0f-a447-b034bd515221",
                    "text": "Irvin Sayers",
                    "imageInitials": "IS",
                    "imageUrl": "",
                    "secondaryText": "IrvinS@M365B400491.OnMicrosoft.com"
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
            "breachesHoursResolutionTime": 1,
            "breachesAssigneeResolutionTime": [
                {
                    "id": "54cb35ee-d84b-43c3-b0f2-cb593b3bcffa",
                    "text": "Alex Wilber",
                    "imageInitials": "AW",
                    "imageUrl": "",
                    "secondaryText": "AlexW@M365B400491.OnMicrosoft.com"
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
    }


    function setLimitDateHrs(createdDateTime: string, alertNotification: any, durations) {
        const week = alertNotification.serviceLevelAgreement.slaWeek;
        const startTime = {
            "hour": alertNotification.serviceLevelAgreement.slaStartTime.hours,
            "minutes": alertNotification.serviceLevelAgreement.slaStartTime.minutes
        }
        let endTime = {
            "hour": alertNotification.serviceLevelAgreement.slaEndTime.hours,
            "minutes": alertNotification.serviceLevelAgreement.slaEndTime.minutes
        }
        const workingHour = endTime.hour - startTime.hour; // number of working hour

        let limitDate = moment(createdDateTime);
        console.log("limit date 1", limitDate);
        let slaHour = durations;

        // console.log("limit date before operation (hours)", limitDate);

        // Use setLimitDateDays if slaHour is more than the number of working hour in a day
        if (slaHour > workingHour) {
            const daysCount: number = Math.floor(slaHour / workingHour);

            limitDate = setLimitDateDays(createdDateTime, alertNotification, daysCount);
            slaHour = slaHour - (daysCount * workingHour);
        }
        console.log("limit date 2", limitDate);

        // if the ticket is made on a holiday which the sla arrangement is only on weekdays Monday - Friday
        if (week.includes('weekdays')) {
            while (limitDate.days() == 6 || limitDate.days() == 0) {
                limitDate.add(1, 'days');
            }
        }
        console.log("limit date 3", limitDate);
        // helperDate value is the same as limitDate at the start
        let workingHourEndTime = moment(limitDate);
        workingHourEndTime.hours(endTime.hour).minutes(endTime.minutes);

        console.log("Working Hour Start Time")
        console.log(moment(limitDate).hours(startTime.hour).minutes(startTime.minutes));
        console.log("");

        console.log("Working Hour End Time")
        console.log(workingHourEndTime);
        console.log("");

        let hourSpent = workingHourEndTime.diff(limitDate, 'hours');

        console.log("Different hour created ticket & working end time");
        console.log(hourSpent);
        console.log("");

        console.log("Created Date Time Ticket")
        console.log(limitDate);
        console.log("");

        // if ticket created before working hour
        if (limitDate.hours() < startTime.hour) {
            console.log("Case 1")
            // ticket working hours start from working hours sla, then added working hours with SLA limits per priority (First response time / Resolution time)
            console.log("limit date")
            console.log(limitDate);
            limitDate.hours(startTime.hour).minutes(startTime.minutes);
            console.log(limitDate);
            limitDate.add(slaHour, 'hours');
            console.log(limitDate);

            // if the limit of working hours > working hours
            if (limitDate.isAfter(workingHourEndTime)) {
                limitDate = isMoreThanEndTime(slaHour, limitDate, startTime, hourSpent, week);
                console.log(limitDate);
            }

            // if ticket created after end time working hour
        } else if (limitDate.hours() > endTime.hour) {
            console.log("Case 2")
            console.log("limit date")
            console.log(limitDate);
            limitDate.add(1, 'days');
            console.log(limitDate);
            limitDate.hours(startTime.hour).minutes(startTime.minutes);
            console.log(limitDate);
            limitDate.add(slaHour, 'hours');
            console.log(limitDate);

            if (limitDate.isAfter(workingHourEndTime)) {
                limitDate = isMoreThanEndTime(slaHour, limitDate, startTime, hourSpent, week);
                console.log(limitDate);
            }
            // if ticket created after on time working hour
        } else {
            console.log("Case 3")
            console.log("limit date")
            console.log(limitDate);
            limitDate.add(slaHour, 'hours');
            console.log(limitDate);

            if (limitDate.isAfter(workingHourEndTime)) {
                limitDate = isMoreThanEndTime(slaHour, limitDate, startTime, hourSpent, week);
                console.log(limitDate);
            }

            console.log("Created Date Time after Start time working hour")
            console.log(limitDate);
            console.log("");
        }

        // context.log("limit date after operation (hours)", limitDate);
        return limitDate;
    }

    function setLimitDateDays(createdDateTime: string, alertNotification: any, durations) {
        const week = alertNotification.serviceLevelAgreement.slaWeek;
        // const ticketCreated = new Date(ticketCreatedDate);
        let limitDate = moment(createdDateTime);
        console.log("limit date 1", limitDate);

        let startTime = {
            "hour": alertNotification.serviceLevelAgreement.slaStartTime.hours,
            "minutes": alertNotification.serviceLevelAgreement.slaStartTime.minutes
        }
        let endTime = {
            "hour": alertNotification.serviceLevelAgreement.slaEndTime.hours,
            "minutes": alertNotification.serviceLevelAgreement.slaEndTime.minutes
        }

        // check if sla type weekdays only
        if (week.includes('weekdays')) {
            while (limitDate.days() == 6 || limitDate.days() == 0) {
                limitDate.add(1, 'days');
            }
        }
        console.log("limit date 2", limitDate);

        if (limitDate.hours() < startTime.hour) {
            console.log("Case 1");
            console.log("limit date")
            console.log(limitDate);
            limitDate.hours(startTime.hour).minutes(startTime.minutes);
            console.log(limitDate);
            limitDate.add(1, 'days');
            console.log(limitDate);

            // check if sla type weekdays only
            isDayWeekdays(week, limitDate);
            console.log(limitDate);
            // if(week.includes('weekdays')){
            //   while(limitDate.getDay() == 6 || limitDate.getDay() == 0){
            //     limitDate.setDate(limitDate.getDate() + 1);
            //   }
            // }

        } else if (limitDate.hours() > endTime.hour) {
            console.log("Case 2");
            console.log("limit date")
            console.log(limitDate);
            limitDate.hours(startTime.hour).minutes(startTime.minutes);
            console.log(limitDate);
            limitDate.add(1, 'days');
            console.log(limitDate);

            // check if sla type weekdays only
            isDayWeekdays(week, limitDate);
            console.log(limitDate);
            limitDate.add(durations, 'days');
            console.log(limitDate);
            // check if sla type weekdays only
            isDayWeekdays(week, limitDate);
            console.log(limitDate);


        } else {
            console.log("Case 3");
            console.log("limit date")
            console.log(limitDate);
            // limitDate.setHours(startTime.hour, startTime.minutes);
            limitDate.add(durations, 'days');
            console.log(limitDate);
            // check if sla type weekdays only
            isDayWeekdays(week, limitDate);
            console.log(limitDate);
        }

        // console.log("limit date after operation (days)", limitDate);
        return limitDate;
    }

    useEffect(() => {
        // 2023-08-31T11:20:36.108Z
        // 2023-08-28T10:43:33.963Z
        // 2023-08-28T06:00:00.963Z

        // 2023-08-29T02:02:32.218Z
        // const result = slaInfoControl('2023-09-07T11:26:31.282Z', alertNotification, 'frt')
        // console.log(result)
        // let timezoneOffset = -420
        // let now = new Date();
        // if (timezoneOffset) now.setHours(hourUTCToLocal(now.getHours(), timezoneOffset));
        // console.log(now);
        const alertNotification = {
            expectedDate: {
                isDueInNotifOn: true,
                dueInNotifDays: 1,
                isDueTodayNotifOn: true,
                isOverdueNotifOn: true,
                overdueNotifDays: 7
            },
            serviceLevelAgreement: {
                slaWeek: '1_weekdays',
                slaStartTime: { hours: -1, minutes: 0 },
                slaEndTime: { hours: 14, minutes: 0 },
                isBreachesFirstResponseTime: true,
                breachesHoursFirstResponseTime: 0,
                breachesAssigneeFirstResponseTime: [[Object]],
                isFrtUrgent: true,
                frtUrgentDuration: 1,
                frtUrgentTime: '2_hours',
                isFrtImportant: true,
                frtImportantDuration: 4,
                frtImportantTime: '2_hours',
                isFrtMedium: true,
                frtMediumDuration: 2,
                frtMediumTime: '1_days',
                isFrtLow: true,
                frtLowDuration: 24,
                frtLowTime: '2_hours',
                isBreachesResolutionTime: true,
                breachesHoursResolutionTime: 2,
                breachesAssigneeResolutionTime: [[Object]],
                isRtUrgent: true,
                rtUrgentDuration: 3,
                rtUrgentTime: '2_hours',
                isRtImportant: true,
                rtImportantDuration: 1,
                rtImportantTime: '2_hours',
                isRtMedium: true,
                rtMediumDuration: 20,
                rtMediumTime: '2_hours',
                isRtLow: true,
                rtLowDuration: 1,
                rtLowTime: '2_hours'
            }
        }
        const createdDateTime = new Date("2023-12-28T03:29:49.077Z");
        const slaInfo = slaInfoControl(createdDateTime, alertNotification, "frt");
        console.log(slaInfo);
    }, []);
    return (<div></div>)
}
export default SlaCalculate;