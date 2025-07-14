import React from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { IPersonaProps } from "@fluentui/react";
import moment from "moment";

const ExportExcel = () => {
    const exportExcel = async (data: { checklist, checklistActivity, tasklist, taskActivity, isExportChecklist, isExportTasklist, isExportActivity }) => {
        const { checklist, checklistActivity, tasklist, isExportChecklist, isExportTasklist, isExportActivity } = data;
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Checklist");

        console.log(worksheet);

        if (isExportChecklist) {
            /**
             * Checklist table
             */
            worksheet.addTable({
                name: 'Checklist',
                ref: 'A1',
                headerRow: false,
                totalsRow: false,
                style: {
                    showFirstColumn: true
                },
                columns: [
                    { name: 'field', totalsRowLabel: "field" },
                    { name: 'value', totalsRowLabel: "value" },

                ],
                rows: [
                    ["Checklist Title", checklist.title],
                    ["Requestor", checklist.requestor[0]?.text],
                    ["Followers", checklist.follower?.map((item: IPersonaProps) => item.text).join(", ")],
                    ["Event Date", moment(checklist.eventdateformated).format("DD MMM YYYY")],
                    ["Calendar", checklist.calendar.text ?? ""],
                    ["Checklist Tag", checklist.tag.length > 0 ? checklist.tag.map((item: any) => item.split('\\').pop()).join(", ") : ""],
                    ["Description", checklist.description],
                    ["", ""]
                ],
            });

        }

        let activityRowCount = isExportChecklist ? 9 : 1;
        if (isExportChecklist && isExportActivity) {
            /**
             * Checklist activity table
             */
            let activities: any[] = checklistActivity?.map((activity) => {
                const dateTime = moment(activity.date).format("DD MMM YYYY hh:mm");
                const comment: string = (activity.action === "comment") ? `${activity.userName} commented: ${activity.comment}` : activity.comment.replaceAll(/<\/?[^>]+(>|$)/g, "");
                return [dateTime, activity.userName, comment]
            });
            /**
             * Empty row
             */
            activities.push(["", "", ""]);




            console.log(activities)
            worksheet.addTable({
                name: 'Checklist Activity',
                ref: 'A9',
                headerRow: true,
                totalsRow: false,
                columns: [
                    { name: 'DateTime', totalsRowLabel: "datetime" },
                    { name: 'User', totalsRowLabel: "user" },
                    { name: 'Activity', totalsRowLabel: "activity" },
                ],
                rows: activities,
            })
            worksheet.getRow(9).font = { bold: true };
            activityRowCount += activities.length;
        }


        if (isExportTasklist) {
            /**
             * Task list header
             */
            const taskHeaderRow = isExportChecklist ? (activityRowCount + 1) : activityRowCount;
            worksheet.addTable({
                name: 'Task Header',
                ref: `A${taskHeaderRow}`,
                headerRow: true,
                totalsRow: false,
                columns: [
                    { name: 'ID', totalsRowLabel: "id", },
                    { name: 'Tag', totalsRowLabel: "tag" },
                    { name: 'Task', totalsRowLabel: "task" },
                    { name: 'Assignee', totalsRowLabel: "assignee" },
                    { name: 'Reviewer', totalsRowLabel: "reviewer" },
                    { name: 'Status', totalsRowLabel: "status" },
                    { name: 'Due Date', totalsRowLabel: "due date" },
                ],
                rows: [],
            });

            const cells = ["A", "B", "C", "D", "E", "F", "G"]
            worksheet.getRow(taskHeaderRow).font = { bold: true };
            cells.forEach((cell) => {
                worksheet.getCell(`${cell}${taskHeaderRow}`).fill = {
                    pattern: "solid",
                    type: "pattern",
                    fgColor: {
                        argb: "538DD5FF"
                    }
                }
            });



            /**
             * Tasklist 
             */
            /**
             * 14
             */
            /**
             * refTaskRow is for the next task line position, so we need attention this
             */
            let refTaskRow = (taskHeaderRow + 1);
            tasklist.forEach((task) => {
                /**
                 * Task
                 */
                worksheet.addTable({
                    name: `Task-${task.id}`,
                    ref: `A${refTaskRow}`,
                    headerRow: false,
                    totalsRow: false,
                    columns: [
                        { name: 'ID', totalsRowLabel: "id", },
                        { name: 'Tag', totalsRowLabel: "tag" },
                        { name: 'Task', totalsRowLabel: "task" },
                        { name: 'Assignee', totalsRowLabel: "assignee" },
                        { name: 'Reviewer', totalsRowLabel: "reviewer" },
                        { name: 'Status', totalsRowLabel: "status" },
                        { name: 'Due date', totalsRowLabel: "due date" },
                    ],
                    rows: [
                        [task.number, "", task.task, task?.assignee?.length > 0 ? task.assignee[0].text : "", task?.reviewer?.length > 0 ? task.reviewer[0].text : "", task.status, moment(task.duedate).format("DD MMM YYYY")]
                    ],
                });
                cells.forEach((cell) => {
                    worksheet.getCell(`${cell}${refTaskRow}`).style = {
                        fill: {
                            pattern: "solid",
                            type: "pattern",
                            fgColor: {
                                argb: "DCE6F1FF"
                            }
                        },
                        alignment: {
                            horizontal: "left"
                        }
                    }
                });


                if (isExportActivity) {
                    /**
                     * Task activity
                     */

                    let taskActivityMap = taskActivity.find((item) => item.taskId == task.id)?.activities.map((item) => {
                        const dateTime = moment(item.datecomment).format("DD MMM YYYY hh:mm");
                        return [dateTime, item.userName, item.id]
                    });

                    taskActivityMap.push(["", "", ""]);
                    refTaskRow++;

                    worksheet.addTable({
                        name: `Task Activity Header ${task.id}`,
                        ref: `A${(refTaskRow)}`,
                        headerRow: true,
                        totalsRow: false,
                        columns: [
                            { name: 'DateTime', totalsRowLabel: "datetime" },
                            { name: 'User', totalsRowLabel: "user" },
                            { name: 'Activity', totalsRowLabel: "activity" },
                        ],
                        rows: taskActivityMap,

                    })
                    /**
                     * Just cols ABC
                     */
                    cells.slice(0, 3).forEach((cell) => {
                        worksheet.getCell(`${cell}${refTaskRow}`).style = {
                            font: {
                                bold: true
                            },
                            fill: {
                                type: "pattern",
                                pattern: "solid",
                                fgColor: {
                                    argb: "FFFFFF"
                                }
                            }
                        }
                    })


                    /**
                     * We set line position for the next task
                     */
                    refTaskRow += taskActivityMap.length + 1;
                }
            });
        }
        try {
            const buffer: any = await workbook.xlsx.writeBuffer();
            saveAs(new Blob([buffer]), `test_feedback.xlsx`);
        } catch (err) {
            console.log("Error writing excel export", err);
        }
    };


    const data = {
        "checklist": {
            "requestor": [
                {
                    "id": "4d7048b4-f1df-42fa-b749-f7edfa144d00",
                    "imageInitials": "MA",
                    "secondaryText": "admin@M365x86451899.onmicrosoft.com",
                    "text": "MOD Administrator"
                }
            ],
            "number": 8,
            "eventdateformated": "2024-07-05T00:00:00",
            "taskStatus": [
                "open",
                "dueWithinTwoDays"
            ],
            "origin": null,
            "originRef": null,
            "id": "eeea47ff-2814-4966-5b4a-b9738202bdf6",
            "subscriptionid": "9bc5ab58-b0c1-4339-a291-f8c22171bcb3",
            "tenantid": "23237f45-7fc4-40bb-8288-54c8cade491b",
            "instanceId": "cd7e5c68-412a-89f4-a883-9abf1de89372",
            "title": "HR Onboarding godot",
            "description": "Tesssssss",
            "status": 1,
            "calendar": {
                "key": "dca031f7-83a5-4431-adb1-03d0f608a22a",
                "text": "Working Days",
                "tag": null
            },
            "tag": [
                "SUPPORT\\MAINTENANCE",
                "BUG\\CRITICAL"
            ],
            "follower": [
                {
                    "id": "a237d5db-7b92-42c4-a66f-f70743013a01",
                    "imageInitials": "AV",
                    "secondaryText": "AdeleV@M365x86451899.OnMicrosoft.com",
                    "text": "Adele Vance"
                },
                {
                    "id": "d39bbf40-a529-4b37-a7fe-c8d61968ce3b",
                    "imageInitials": "a",
                    "secondaryText": "admin@m365b498269.onmicrosoft.com",
                    "text": "admin"
                }
            ],
            "contributor": [
                {
                    "id": "9bedbebc-1d1c-4de5-b7c7-3411500b01c6",
                    "imageInitials": "AW",
                    "secondaryText": "AlexW@M365x86451899.OnMicrosoft.com",
                    "text": "Alex Wilber"
                }
            ],
            "taskSort": [
                "3c11967d-82cf-4bf0-ab07-344bafae5064",
                "1072ddb1-2a29-463a-a788-c14bff143cee",
                "628039b4-36ff-48d6-9d8f-aebc70799e54",
                "929a6359-5c92-4670-b03f-0f5576b37fae",
                "40e10b52-dad2-4864-a5f2-d0365cfdd50b",
                "573d0658-fdf8-44fa-a79d-6ca62ffd9db7",
                "d5a75a14-9af9-4011-afb1-6ee9fb0ae1cb",
                "79c4ec7d-722c-48c8-9c6a-7a879549c9f8",
                "76b91ddd-6a4f-40cc-8d04-e03405965670",
                "8824b2f1-1ded-43a7-8014-c014e66e2ce5"
            ],
            "memberCanViewList": [
                "admin@M365x86451899.onmicrosoft.com",
                "AlexW@M365x86451899.OnMicrosoft.com",
                "AdeleV@M365x86451899.OnMicrosoft.com",
                "admin@m365b498269.onmicrosoft.com",
                "admin@m365x53068480.onmicrosoft.com"
            ],
            "disabledTaskFields": [],
            "datecreated": "2024-07-03T07:07:08.008349Z",
            "deleted": null
        },
        "tasklist": [
            {
                "status": "Open",
                "duedate": "2024-07-12",
                "resolved_at": "0001-01-01T00:00:00",
                "closed_at": "0001-01-01T00:00:00",
                "comment_reopen": null,
                "id": "3c11967d-82cf-4bf0-ab07-344bafae5064",
                "task": "Establish Document Organization and Naming Conventions",
                "number": 1,
                "subscription_id": "9bc5ab58-b0c1-4339-a291-f8c22171bcb3",
                "instance_id": "cd7e5c68-412a-89f4-a883-9abf1de89372",
                "checklist_id": "eeea47ff-2814-4966-5b4a-b9738202bdf6",
                "checklist_name": "HR Onboarding godot",
                "duedatenumber": 0,
                "tasktag": [],
                "assignee": [
                    {
                        "id": "a237d5db-7b92-42c4-a66f-f70743013a01",
                        "imageInitials": "AV",
                        "secondaryText": "AdeleV@M365x86451899.OnMicrosoft.com",
                        "text": "Adele Vance"
                    }
                ],
                "reviewer": [
                    {
                        "id": "1b003421-b31b-472e-ac38-4093c8353cfa",
                        "imageInitials": "MA",
                        "secondaryText": "admin@m365x53068480.onmicrosoft.com",
                        "text": "MOD Administrator"
                    }
                ],
                "attachment": [],
                "customFieldInput": [],
                "created_at": "2024-07-03T07:07:08.0568561Z",
                "deleted": null,
                "deleted_at": "0001-01-01T00:00:00",
                "deleted_by": null
            },
            {
                "status": "Open",
                "duedate": "2024-07-05T00:00:00",
                "resolved_at": "0001-01-01T00:00:00",
                "closed_at": "0001-01-01T00:00:00",
                "comment_reopen": null,
                "id": "1072ddb1-2a29-463a-a788-c14bff143cee",
                "task": "Implement Version Control and Document Tracking Systems",
                "number": 2,
                "subscription_id": "9bc5ab58-b0c1-4339-a291-f8c22171bcb3",
                "instance_id": "cd7e5c68-412a-89f4-a883-9abf1de89372",
                "checklist_id": "eeea47ff-2814-4966-5b4a-b9738202bdf6",
                "checklist_name": "HR Onboarding godot",
                "duedatenumber": 0,
                "tasktag": [],
                "assignee": [],
                "reviewer": [],
                "attachment": [],
                "customFieldInput": [],
                "created_at": "2024-07-03T07:07:08.057098Z",
                "deleted": null,
                "deleted_at": "0001-01-01T00:00:00",
                "deleted_by": null
            },
            {
                "status": "Open",
                "duedate": "2024-07-05T00:00:00",
                "resolved_at": "0001-01-01T00:00:00",
                "closed_at": "0001-01-01T00:00:00",
                "comment_reopen": null,
                "id": "628039b4-36ff-48d6-9d8f-aebc70799e54",
                "task": "Define Document Access and Permissions",
                "number": 3,
                "subscription_id": "9bc5ab58-b0c1-4339-a291-f8c22171bcb3",
                "instance_id": "cd7e5c68-412a-89f4-a883-9abf1de89372",
                "checklist_id": "eeea47ff-2814-4966-5b4a-b9738202bdf6",
                "checklist_name": "HR Onboarding godot",
                "duedatenumber": 0,
                "tasktag": [],
                "assignee": [],
                "reviewer": [],
                "attachment": [],
                "customFieldInput": [],
                "created_at": "2024-07-03T07:07:08.0571636Z",
                "deleted": null,
                "deleted_at": "0001-01-01T00:00:00",
                "deleted_by": null
            },
            {
                "status": "Open",
                "duedate": "2024-07-12T00:00:00",
                "resolved_at": "0001-01-01T00:00:00",
                "closed_at": "0001-01-01T00:00:00",
                "comment_reopen": null,
                "id": "929a6359-5c92-4670-b03f-0f5576b37fae",
                "task": "Create Document Templates and Standard Formats",
                "number": 4,
                "subscription_id": "9bc5ab58-b0c1-4339-a291-f8c22171bcb3",
                "instance_id": "cd7e5c68-412a-89f4-a883-9abf1de89372",
                "checklist_id": "eeea47ff-2814-4966-5b4a-b9738202bdf6",
                "checklist_name": "HR Onboarding godot",
                "duedatenumber": 7,
                "tasktag": [],
                "assignee": [],
                "reviewer": [],
                "attachment": [],
                "customFieldInput": [],
                "created_at": "2024-07-03T07:07:08.0572171Z",
                "deleted": null,
                "deleted_at": "0001-01-01T00:00:00",
                "deleted_by": null
            },
            {
                "status": "Open",
                "duedate": "2024-07-12T00:00:00",
                "resolved_at": "0001-01-01T00:00:00",
                "closed_at": "0001-01-01T00:00:00",
                "comment_reopen": null,
                "id": "40e10b52-dad2-4864-a5f2-d0365cfdd50b",
                "task": "Ensure Document Security and Confidentiality",
                "number": 5,
                "subscription_id": "9bc5ab58-b0c1-4339-a291-f8c22171bcb3",
                "instance_id": "cd7e5c68-412a-89f4-a883-9abf1de89372",
                "checklist_id": "eeea47ff-2814-4966-5b4a-b9738202bdf6",
                "checklist_name": "HR Onboarding godot",
                "duedatenumber": 7,
                "tasktag": [],
                "assignee": [],
                "reviewer": [],
                "attachment": [],
                "customFieldInput": [],
                "created_at": "2024-07-03T07:07:08.0572682Z",
                "deleted": null,
                "deleted_at": "0001-01-01T00:00:00",
                "deleted_by": null
            },
            {
                "status": "Open",
                "duedate": "2024-07-19T00:00:00",
                "resolved_at": "0001-01-01T00:00:00",
                "closed_at": "0001-01-01T00:00:00",
                "comment_reopen": null,
                "id": "573d0658-fdf8-44fa-a79d-6ca62ffd9db7",
                "task": "Establish Document Archiving and Retention Policies",
                "number": 6,
                "subscription_id": "9bc5ab58-b0c1-4339-a291-f8c22171bcb3",
                "instance_id": "cd7e5c68-412a-89f4-a883-9abf1de89372",
                "checklist_id": "eeea47ff-2814-4966-5b4a-b9738202bdf6",
                "checklist_name": "HR Onboarding godot",
                "duedatenumber": 14,
                "tasktag": [],
                "assignee": [],
                "reviewer": [],
                "attachment": [],
                "customFieldInput": [],
                "created_at": "2024-07-03T07:07:08.0573185Z",
                "deleted": null,
                "deleted_at": "0001-01-01T00:00:00",
                "deleted_by": null
            },
            {
                "status": "Open",
                "duedate": "2024-08-02T00:00:00",
                "resolved_at": "0001-01-01T00:00:00",
                "closed_at": "0001-01-01T00:00:00",
                "comment_reopen": null,
                "id": "d5a75a14-9af9-4011-afb1-6ee9fb0ae1cb",
                "task": "Conduct Document Audits and Reviews",
                "number": 7,
                "subscription_id": "9bc5ab58-b0c1-4339-a291-f8c22171bcb3",
                "instance_id": "cd7e5c68-412a-89f4-a883-9abf1de89372",
                "checklist_id": "eeea47ff-2814-4966-5b4a-b9738202bdf6",
                "checklist_name": "HR Onboarding godot",
                "duedatenumber": 30,
                "tasktag": [],
                "assignee": [],
                "reviewer": [],
                "attachment": [],
                "customFieldInput": [],
                "created_at": "2024-07-03T07:07:08.0573676Z",
                "deleted": null,
                "deleted_at": "0001-01-01T00:00:00",
                "deleted_by": null
            },
            {
                "status": "Open",
                "duedate": "2024-08-02T00:00:00",
                "resolved_at": "0001-01-01T00:00:00",
                "closed_at": "0001-01-01T00:00:00",
                "comment_reopen": null,
                "id": "79c4ec7d-722c-48c8-9c6a-7a879549c9f8",
                "task": "Train Employees on Document Management Best Practices",
                "number": 8,
                "subscription_id": "9bc5ab58-b0c1-4339-a291-f8c22171bcb3",
                "instance_id": "cd7e5c68-412a-89f4-a883-9abf1de89372",
                "checklist_id": "eeea47ff-2814-4966-5b4a-b9738202bdf6",
                "checklist_name": "HR Onboarding godot",
                "duedatenumber": 30,
                "tasktag": [],
                "assignee": [],
                "reviewer": [],
                "attachment": [],
                "customFieldInput": [],
                "created_at": "2024-07-03T07:07:08.0574196Z",
                "deleted": null,
                "deleted_at": "0001-01-01T00:00:00",
                "deleted_by": null
            },
            {
                "status": "Open",
                "duedate": "2024-08-02T00:00:00",
                "resolved_at": "0001-01-01T00:00:00",
                "closed_at": "0001-01-01T00:00:00",
                "comment_reopen": null,
                "id": "76b91ddd-6a4f-40cc-8d04-e03405965670",
                "task": "Regularly Backup and Protect Electronic Documents",
                "number": 9,
                "subscription_id": "9bc5ab58-b0c1-4339-a291-f8c22171bcb3",
                "instance_id": "cd7e5c68-412a-89f4-a883-9abf1de89372",
                "checklist_id": "eeea47ff-2814-4966-5b4a-b9738202bdf6",
                "checklist_name": "HR Onboarding godot",
                "duedatenumber": 30,
                "tasktag": [],
                "assignee": [],
                "reviewer": [],
                "attachment": [],
                "customFieldInput": [],
                "created_at": "2024-07-03T07:07:08.0574682Z",
                "deleted": null,
                "deleted_at": "0001-01-01T00:00:00",
                "deleted_by": null
            },
            {
                "status": "Open",
                "duedate": "2024-08-02T00:00:00",
                "resolved_at": "0001-01-01T00:00:00",
                "closed_at": "0001-01-01T00:00:00",
                "comment_reopen": null,
                "id": "8824b2f1-1ded-43a7-8014-c014e66e2ce5",
                "task": "Implement Document Change Control Procedures",
                "number": 10,
                "subscription_id": "9bc5ab58-b0c1-4339-a291-f8c22171bcb3",
                "instance_id": "cd7e5c68-412a-89f4-a883-9abf1de89372",
                "checklist_id": "eeea47ff-2814-4966-5b4a-b9738202bdf6",
                "checklist_name": "HR Onboarding godot",
                "duedatenumber": 30,
                "tasktag": [],
                "assignee": [],
                "reviewer": [],
                "attachment": [],
                "customFieldInput": [],
                "created_at": "2024-07-03T07:07:08.0575177Z",
                "deleted": null,
                "deleted_at": "0001-01-01T00:00:00",
                "deleted_by": null
            }
        ],
        "standardFields": [
            {
                "id": "standardField_taskTag",
                "title": "Task Tag",
                "iconName": "Tag",
                "isEnabled": true
            },
            {
                "id": "standardField_reviewer",
                "title": "Reviewer",
                "iconName": "People",
                "isEnabled": true
            },
            {
                "id": "standardField_dueDate",
                "title": "Due Date",
                "iconName": "Calendar",
                "isEnabled": true
            }
        ],
        "customFields": [],
        "checklistActivity": [
            {
                "id": "c6b9e69b-7e90-4326-a32c-30170df6c0e7",
                "userId": "4d7048b4-f1df-42fa-b749-f7edfa144d00",
                "userName": "MOD Administrator",
                "date": "2024-07-03T07:12:33.2988731Z",
                "comment": "MOD Administrator <strong>submitted this checklist</strong>, event date is 05 Jul 2024",
                "action": "submitted"
            },
            {
                "id": "c1b9c09b-c4f2-427c-9999-160f48cb0cbe",
                "userId": "4d7048b4-f1df-42fa-b749-f7edfa144d00",
                "userName": "MOD Administrator",
                "date": "2024-07-03T07:07:08.1184838Z",
                "comment": "MOD Administrator <strong>created</strong> this new checklist",
                "action": "createdChecklist"
            }
        ],
        "exportChecklist": true,
        "exportTasklist": true,
        "exportActivity": false,
        "newType": true
    }

    const taskActivity = [
        {
            "taskId": "3c11967d-82cf-4bf0-ab07-344bafae5064",
            "activities": [
                {
                    "id": "d77cb33b-794b-4964-b1bb-7deb18baeab8",
                    "userName": "MOD Administrator",
                    "userId": "4d7048b4-f1df-42fa-b749-f7edfa144d00",
                    "checklistId": null,
                    "taskId": "3c11967d-82cf-4bf0-ab07-344bafae5064",
                    "action": "createdTask",
                    "comment": "",
                    "datecomment": "2024-07-03T07:12:30.434177Z",
                    "oldValue": null,
                    "newValue": null,
                    "assignee": "Adele Vance",
                    "reviewer": "MOD Administrator",
                    "dueDate": "2024-07-05T00:00:00",
                    "eventDate": "0001-01-01T00:00:00"
                },
                {
                    "id": "0b25243e-421a-4613-85d2-55adcdff7682",
                    "userName": "MOD Administrator",
                    "userId": "4d7048b4-f1df-42fa-b749-f7edfa144d00",
                    "checklistId": null,
                    "taskId": "3c11967d-82cf-4bf0-ab07-344bafae5064",
                    "action": "changedDueDate",
                    "comment": "",
                    "datecomment": "2024-07-03T07:12:51.8582526Z",
                    "oldValue": "05 Jul 2024",
                    "newValue": "12 Jul 2024",
                    "assignee": null,
                    "reviewer": null,
                    "dueDate": "0001-01-01T00:00:00",
                    "eventDate": "0001-01-01T00:00:00"
                }
            ]
        },
        {
            "taskId": "1072ddb1-2a29-463a-a788-c14bff143cee",
            "activities": [
                {
                    "id": "dd3a24ae-7b9e-4158-8daa-551916517a4f",
                    "userName": "MOD Administrator",
                    "userId": "4d7048b4-f1df-42fa-b749-f7edfa144d00",
                    "checklistId": null,
                    "taskId": "1072ddb1-2a29-463a-a788-c14bff143cee",
                    "action": "createdTask",
                    "comment": "",
                    "datecomment": "2024-07-03T07:12:30.4363056Z",
                    "oldValue": null,
                    "newValue": null,
                    "assignee": "",
                    "reviewer": "",
                    "dueDate": "2024-07-05T00:00:00",
                    "eventDate": "0001-01-01T00:00:00"
                }
            ]
        },
        {
            "taskId": "628039b4-36ff-48d6-9d8f-aebc70799e54",
            "activities": [
                {
                    "id": "6758b52b-3ffa-467f-9ff3-bad8bdc04119",
                    "userName": "MOD Administrator",
                    "userId": "4d7048b4-f1df-42fa-b749-f7edfa144d00",
                    "checklistId": null,
                    "taskId": "628039b4-36ff-48d6-9d8f-aebc70799e54",
                    "action": "createdTask",
                    "comment": "",
                    "datecomment": "2024-07-03T07:12:30.4363188Z",
                    "oldValue": null,
                    "newValue": null,
                    "assignee": "",
                    "reviewer": "",
                    "dueDate": "2024-07-05T00:00:00",
                    "eventDate": "0001-01-01T00:00:00"
                }
            ]
        },
        {
            "taskId": "929a6359-5c92-4670-b03f-0f5576b37fae",
            "activities": [
                {
                    "id": "8318fa31-e9cf-4896-8b94-8ebf7fc56fc2",
                    "userName": "MOD Administrator",
                    "userId": "4d7048b4-f1df-42fa-b749-f7edfa144d00",
                    "checklistId": null,
                    "taskId": "929a6359-5c92-4670-b03f-0f5576b37fae",
                    "action": "createdTask",
                    "comment": "",
                    "datecomment": "2024-07-03T07:12:30.4363252Z",
                    "oldValue": null,
                    "newValue": null,
                    "assignee": "",
                    "reviewer": "",
                    "dueDate": "2024-07-12T00:00:00",
                    "eventDate": "0001-01-01T00:00:00"
                }
            ]
        },
        {
            "taskId": "40e10b52-dad2-4864-a5f2-d0365cfdd50b",
            "activities": [
                {
                    "id": "945c55f1-ca78-4e68-bc66-a3aa3c044fd8",
                    "userName": "MOD Administrator",
                    "userId": "4d7048b4-f1df-42fa-b749-f7edfa144d00",
                    "checklistId": null,
                    "taskId": "40e10b52-dad2-4864-a5f2-d0365cfdd50b",
                    "action": "createdTask",
                    "comment": "",
                    "datecomment": "2024-07-03T07:12:30.436334Z",
                    "oldValue": null,
                    "newValue": null,
                    "assignee": "",
                    "reviewer": "",
                    "dueDate": "2024-07-12T00:00:00",
                    "eventDate": "0001-01-01T00:00:00"
                }
            ]
        },
        {
            "taskId": "573d0658-fdf8-44fa-a79d-6ca62ffd9db7",
            "activities": [
                {
                    "id": "45f5b5cc-ef20-4b60-84b9-ba14425ac235",
                    "userName": "MOD Administrator",
                    "userId": "4d7048b4-f1df-42fa-b749-f7edfa144d00",
                    "checklistId": null,
                    "taskId": "573d0658-fdf8-44fa-a79d-6ca62ffd9db7",
                    "action": "createdTask",
                    "comment": "",
                    "datecomment": "2024-07-03T07:12:30.4363402Z",
                    "oldValue": null,
                    "newValue": null,
                    "assignee": "",
                    "reviewer": "",
                    "dueDate": "2024-07-19T00:00:00",
                    "eventDate": "0001-01-01T00:00:00"
                }
            ]
        },
        {
            "taskId": "d5a75a14-9af9-4011-afb1-6ee9fb0ae1cb",
            "activities": [
                {
                    "id": "4cf60d2d-3e6e-4dd1-9cf1-e863d0d40529",
                    "userName": "MOD Administrator",
                    "userId": "4d7048b4-f1df-42fa-b749-f7edfa144d00",
                    "checklistId": null,
                    "taskId": "d5a75a14-9af9-4011-afb1-6ee9fb0ae1cb",
                    "action": "createdTask",
                    "comment": "",
                    "datecomment": "2024-07-03T07:12:30.4363461Z",
                    "oldValue": null,
                    "newValue": null,
                    "assignee": "",
                    "reviewer": "",
                    "dueDate": "2024-08-02T00:00:00",
                    "eventDate": "0001-01-01T00:00:00"
                }
            ]
        },
        {
            "taskId": "79c4ec7d-722c-48c8-9c6a-7a879549c9f8",
            "activities": [
                {
                    "id": "07e2845d-3c07-4fb1-ba50-ff58a83d0c43",
                    "userName": "MOD Administrator",
                    "userId": "4d7048b4-f1df-42fa-b749-f7edfa144d00",
                    "checklistId": null,
                    "taskId": "79c4ec7d-722c-48c8-9c6a-7a879549c9f8",
                    "action": "createdTask",
                    "comment": "",
                    "datecomment": "2024-07-03T07:12:30.4363549Z",
                    "oldValue": null,
                    "newValue": null,
                    "assignee": "",
                    "reviewer": "",
                    "dueDate": "2024-08-02T00:00:00",
                    "eventDate": "0001-01-01T00:00:00"
                }
            ]
        },
        {
            "taskId": "76b91ddd-6a4f-40cc-8d04-e03405965670",
            "activities": [
                {
                    "id": "1c6814f4-d352-42e2-af35-696d246f2a40",
                    "userName": "MOD Administrator",
                    "userId": "4d7048b4-f1df-42fa-b749-f7edfa144d00",
                    "checklistId": null,
                    "taskId": "76b91ddd-6a4f-40cc-8d04-e03405965670",
                    "action": "createdTask",
                    "comment": "",
                    "datecomment": "2024-07-03T07:12:30.4363603Z",
                    "oldValue": null,
                    "newValue": null,
                    "assignee": "",
                    "reviewer": "",
                    "dueDate": "2024-08-02T00:00:00",
                    "eventDate": "0001-01-01T00:00:00"
                }
            ]
        },
        {
            "taskId": "8824b2f1-1ded-43a7-8014-c014e66e2ce5",
            "activities": [
                {
                    "id": "6cb30417-a09c-4d19-b11d-6ad2ebcc030e",
                    "userName": "MOD Administrator",
                    "userId": "4d7048b4-f1df-42fa-b749-f7edfa144d00",
                    "checklistId": null,
                    "taskId": "8824b2f1-1ded-43a7-8014-c014e66e2ce5",
                    "action": "createdTask",
                    "comment": "",
                    "datecomment": "2024-07-03T07:12:30.4363697Z",
                    "oldValue": null,
                    "newValue": null,
                    "assignee": "",
                    "reviewer": "",
                    "dueDate": "2024-08-02T00:00:00",
                    "eventDate": "0001-01-01T00:00:00"
                }
            ]
        }
    ]
    return (
        <div>
            <button onClick={() => {
                exportExcel({
                    checklist: data.checklist,
                    checklistActivity: data.checklistActivity,
                    tasklist: data.tasklist,
                    taskActivity: taskActivity,
                    isExportChecklist: true,
                    isExportTasklist: true,
                    isExportActivity: true
                })
            }}>Export</button>
        </div>
    );
};

export default ExportExcel;
