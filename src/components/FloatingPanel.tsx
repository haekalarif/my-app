import React, { useEffect, useState } from 'react';
import '../App.css';
import { PrimaryButton } from '@fluentui/react';
import { defaultWorkflow } from '../Types';
const FloatingPanel = () => {
    const [isPanelOpen, setPanelOpen] = useState(false);
    function getTicketWorkflow(instance: any) {
        const nodes = instance.workflows.ticket[0].nodes;
        const edges = instance.workflows.ticket[0].edges;
        const results = nodes.map((node) => {
            const nextSteps: any[] = [];
            const steps = edges.filter((edge: any) => edge.source == node.id);
            steps.forEach((step: any) => {
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

    useEffect(() => {
        // const handleScroll = () => {
        //     // Tambahkan logika disini untuk menentukan apakah tombol masih terlihat
        //     const button = document.getElementById('saveButton');
        //     const buttonRect = button?.getBoundingClientRect();
        //     const windowHeight = window.innerHeight;

        //     if (buttonRect?.bottom < 0 || buttonRect?.top > windowHeight) {
        //         // Tombol tidak terlihat, tampilkan floating panel
        //         setPanelOpen(false);
        //     } else {
        //         // Tombol masih terlihat
        //         setPanelOpen(true);
        //     }
        // };

        // // Menambahkan event listener untuk scroll
        // window.addEventListener('scroll', handleScroll);

        // // Membersihkan event listener saat komponen di-unmount
        // return () => {
        //     window.removeEventListener('scroll', handleScroll);
        // };

        let tickets = [
            {
                "id": "5e2c60ff-3a40-4da3-a5e3-f964df420045",
                "ticketId": 1,
                "title": "First Ticket",
                "status": "Open",
                "requestorId": "87bf97a1-bc47-441b-a90a-9ad50dd98371",
                "requestorName": "Debra Berger",
                "requestorEmail": "DebraB@M365B198965.OnMicrosoft.com",
                "customFields": {},
                "priority": "",
                "department": "",
                "assigneeId": "8513bcc0-0124-4fa2-95e6-0eb1f5cc4f42",
                "category": "",
                "instanceId": "8de916ee-8eed-4bcb-a751-0b8b5d76d378",
                "expectedDate": "",
                "assigneeName": "Alex Wilber",
                "assigneeEmail": "AlexW@M365B198965.OnMicrosoft.com",
                "createdDateTime": "2024-01-08T04:49:58.791Z",
                "tags": [],
                "lastInteraction": "2024-01-08T04:49:58.791Z",
                "firstTimeResponse": "",
                "timeResolution": "",
                "isFrtBreached": false,
                "isRtBreached": false,
                "isFrtEscalated": false,
                "isRtEscalated": false,
                "createdBy": {
                    "id": "2c60e7c5-d81d-4f5e-aa0c-e2a60e200c24",
                    "text": "MOD Administrator",
                    "secondaryText": "admin@M365B198965.onmicrosoft.com"
                },
                "lastUpdatedBy": {
                    "id": "2c60e7c5-d81d-4f5e-aa0c-e2a60e200c24",
                    "text": "MOD Administrator",
                    "secondaryText": "admin@M365B198965.onmicrosoft.com"
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
                ]
            },
            {
                "id": "cd0aa985-4d51-4947-9be9-088f0a256d6e",
                "ticketId": 2,
                "title": "Second Ticket",
                "status": "In Progress",
                "requestorId": "2c60e7c5-d81d-4f5e-aa0c-e2a60e200c24",
                "requestorName": "MOD Administrator",
                "requestorEmail": "admin@M365B198965.onmicrosoft.com",
                "customFields": {
                    "e94fb917-c387-4f21-893d-2c055246da56": [],
                    "c18fa1c0-d47a-404b-bef7-0187774742ff": "",
                    "1837b5a8-5df7-48c5-8168-853334476d70": []
                },
                "priority": "",
                "department": "",
                "assigneeId": "",
                "category": "",
                "instanceId": "8de916ee-8eed-4bcb-a751-0b8b5d76d378",
                "expectedDate": "",
                "assigneeName": "",
                "assigneeEmail": "",
                "createdDateTime": "2024-01-09T07:43:09.824Z",
                "tags": [],
                "lastInteraction": "2024-01-11T02:28:29.094Z",
                "firstTimeResponse": "2024-01-11T02:28:29.094Z",
                "timeResolution": "",
                "isFrtBreached": false,
                "isRtBreached": false,
                "isFrtEscalated": false,
                "isRtEscalated": false,
                "createdBy": {
                    "id": "2c60e7c5-d81d-4f5e-aa0c-e2a60e200c24",
                    "text": "MOD Administrator",
                    "secondaryText": "admin@M365B198965.onmicrosoft.com"
                },
                "lastUpdatedBy": {
                    "id": "2c60e7c5-d81d-4f5e-aa0c-e2a60e200c24",
                    "text": "MOD Administrator",
                    "secondaryText": "admin@M365B198965.onmicrosoft.com"
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
                ]
            },
            {
                "id": "0090d2f0-7ed0-4a16-9b91-56b4913e8094",
                "ticketId": 3,
                "title": "Third Ticket",
                "status": "Open",
                "requestorId": "8513bcc0-0124-4fa2-95e6-0eb1f5cc4f42",
                "requestorName": "Alex Wilber",
                "requestorEmail": "AlexW@M365B198965.OnMicrosoft.com",
                "customFields": {
                    "e94fb917-c387-4f21-893d-2c055246da56": [],
                    "c18fa1c0-d47a-404b-bef7-0187774742ff": "",
                    "1837b5a8-5df7-48c5-8168-853334476d70": []
                },
                "priority": "",
                "department": "",
                "assigneeId": "87bf97a1-bc47-441b-a90a-9ad50dd98371",
                "category": "",
                "instanceId": "8de916ee-8eed-4bcb-a751-0b8b5d76d378",
                "expectedDate": "",
                "assigneeName": "Debra Berger",
                "assigneeEmail": "DebraB@M365B198965.OnMicrosoft.com",
                "createdDateTime": "2024-01-09T10:31:58.291Z",
                "tags": [],
                "lastInteraction": "2024-01-09T10:31:58.291Z",
                "firstTimeResponse": "",
                "timeResolution": "",
                "isFrtBreached": false,
                "isRtBreached": false,
                "isFrtEscalated": false,
                "isRtEscalated": false,
                "createdBy": {
                    "id": "2c60e7c5-d81d-4f5e-aa0c-e2a60e200c24",
                    "text": "MOD Administrator",
                    "secondaryText": "admin@M365B198965.onmicrosoft.com"
                },
                "lastUpdatedBy": {
                    "id": "2c60e7c5-d81d-4f5e-aa0c-e2a60e200c24",
                    "text": "MOD Administrator",
                    "secondaryText": "admin@M365B198965.onmicrosoft.com"
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
                ]
            },
            {
                "id": "b2ce1797-5f2a-4c1a-99db-f3bad82e4279",
                "ticketId": 4,
                "title": "Fourth Ticket",
                "status": "Open",
                "requestorId": "87bf97a1-bc47-441b-a90a-9ad50dd98371",
                "requestorName": "Debra Berger",
                "requestorEmail": "DebraB@M365B198965.OnMicrosoft.com",
                "customFields": {
                    "e94fb917-c387-4f21-893d-2c055246da56": [],
                    "c18fa1c0-d47a-404b-bef7-0187774742ff": "",
                    "1837b5a8-5df7-48c5-8168-853334476d70": []
                },
                "priority": "",
                "department": "",
                "assigneeId": "8513bcc0-0124-4fa2-95e6-0eb1f5cc4f42",
                "category": "",
                "instanceId": "8de916ee-8eed-4bcb-a751-0b8b5d76d378",
                "expectedDate": "",
                "assigneeName": "Alex Wilber",
                "assigneeEmail": "AlexW@M365B198965.OnMicrosoft.com",
                "createdDateTime": "2024-01-10T03:11:40.316Z",
                "tags": [],
                "lastInteraction": "2024-01-10T09:37:03.552Z",
                "firstTimeResponse": "",
                "timeResolution": "",
                "isFrtBreached": false,
                "isRtBreached": false,
                "isFrtEscalated": false,
                "isRtEscalated": false,
                "createdBy": {
                    "id": "2c60e7c5-d81d-4f5e-aa0c-e2a60e200c24",
                    "text": "MOD Administrator",
                    "secondaryText": "admin@M365B198965.onmicrosoft.com"
                },
                "lastUpdatedBy": {
                    "id": "2c60e7c5-d81d-4f5e-aa0c-e2a60e200c24",
                    "text": "MOD Administrator",
                    "secondaryText": "admin@M365B198965.onmicrosoft.com"
                },
                "workflow": [
                    {
                        "id": "Open",
                        "label": "Open",
                        "color": "#fff",
                        "recordResolutionSLA": false,
                        "nextSteps": [
                            {
                                "targetId": "Closed",
                                "transitionLabel": "Reject Ticket",
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
                                "targetId": "Approved",
                                "transitionLabel": "Approve Ticket",
                                "transitionIcon": "CheckMark",
                                "authorizedUsers": [
                                    "assignee",
                                    "owner"
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
                            },
                            {
                                "targetId": "On Hold",
                                "transitionLabel": "On Hold Ticket",
                                "transitionIcon": "Clock",
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": false
                            },
                            {
                                "targetId": "Ready in Test",
                                "transitionLabel": "Ready to Test",
                                "transitionIcon": "RecycleBin",
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": true
                            },
                            {
                                "targetId": "Closed",
                                "transitionLabel": "Close Ticket",
                                "transitionIcon": "CheckMark",
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
                            },
                            {
                                "targetId": "Ready in Test",
                                "transitionLabel": "Ready to Test",
                                "transitionIcon": "RecycleBin",
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
                            },
                            {
                                "targetId": "In Progress",
                                "transitionLabel": "Start Ticket",
                                "transitionIcon": "Forward",
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": false
                            },
                            {
                                "targetId": "On Hold",
                                "transitionLabel": "On Hold Ticket",
                                "transitionIcon": "Clock",
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
                        "id": "On Hold",
                        "label": "On Hold",
                        "color": "#bfa640",
                        "recordResolutionSLA": false,
                        "nextSteps": [
                            {
                                "targetId": "In Progress",
                                "transitionLabel": "Resume Ticket",
                                "transitionIcon": "Forward",
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": false
                            },
                            {
                                "targetId": "Closed",
                                "transitionLabel": "Close Ticket",
                                "transitionIcon": "CheckMark",
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
                        "id": "Test OK",
                        "label": "Tested OK",
                        "color": "#b3e6bf",
                        "recordResolutionSLA": true,
                        "nextSteps": [
                            {
                                "targetId": "Closed",
                                "transitionLabel": "Delivered to Production",
                                "transitionIcon": "Archive",
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
                        "id": "Ready in Test",
                        "label": "Ready in Test",
                        "color": "#a940bf",
                        "recordResolutionSLA": true,
                        "nextSteps": [
                            {
                                "targetId": "Test OK",
                                "transitionLabel": "Test OK",
                                "transitionIcon": "CheckMark",
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": true
                            },
                            {
                                "targetId": "Reopened",
                                "transitionLabel": "Test Fail",
                                "transitionIcon": "Cancel",
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
                        "id": "Approved",
                        "label": "Approved",
                        "color": "#be40bf",
                        "recordResolutionSLA": false,
                        "nextSteps": [
                            {
                                "targetId": "In Progress",
                                "transitionLabel": "Start Ticket",
                                "transitionIcon": "Forward",
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": false
                            },
                            {
                                "targetId": "Resolved",
                                "transitionLabel": "Resolve Ticket",
                                "transitionIcon": "CheckMark",
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
                "isCustomWorkflow": true,
                "resolvedStatus": [
                    "Resolved",
                    "Closed",
                    "Test OK",
                    "Ready in Test"
                ]
            },
            {
                "id": "3a9700a7-b9dd-407b-9c8e-3f1618c900b2",
                "ticketId": 5,
                "title": "Fiveth Ticket",
                "status": "Open",
                "requestorId": "8513bcc0-0124-4fa2-95e6-0eb1f5cc4f42",
                "requestorName": "Alex Wilber",
                "requestorEmail": "AlexW@M365B198965.OnMicrosoft.com",
                "customFields": {
                    "e94fb917-c387-4f21-893d-2c055246da56": [],
                    "c18fa1c0-d47a-404b-bef7-0187774742ff": "",
                    "1837b5a8-5df7-48c5-8168-853334476d70": []
                },
                "priority": "",
                "department": "",
                "assigneeId": "87bf97a1-bc47-441b-a90a-9ad50dd98371",
                "category": "",
                "instanceId": "8de916ee-8eed-4bcb-a751-0b8b5d76d378",
                "expectedDate": "",
                "assigneeName": "Debra Berger",
                "assigneeEmail": "DebraB@M365B198965.OnMicrosoft.com",
                "createdDateTime": "2024-01-10T03:12:22.777Z",
                "tags": [],
                "lastInteraction": "2024-01-10T03:12:22.777Z",
                "firstTimeResponse": "",
                "timeResolution": "",
                "isFrtBreached": false,
                "isRtBreached": false,
                "isFrtEscalated": false,
                "isRtEscalated": false,
                "createdBy": {
                    "id": "2c60e7c5-d81d-4f5e-aa0c-e2a60e200c24",
                    "text": "MOD Administrator",
                    "secondaryText": "admin@M365B198965.onmicrosoft.com"
                },
                "lastUpdatedBy": {
                    "id": "2c60e7c5-d81d-4f5e-aa0c-e2a60e200c24",
                    "text": "MOD Administrator",
                    "secondaryText": "admin@M365B198965.onmicrosoft.com"
                },
                "workflow": [
                    {
                        "id": "Open",
                        "label": "Open",
                        "color": "#fff",
                        "recordResolutionSLA": false,
                        "nextSteps": [
                            {
                                "targetId": "Closed",
                                "transitionLabel": "Reject Ticket",
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
                                "targetId": "Approved",
                                "transitionLabel": "Approve Ticket",
                                "transitionIcon": "CheckMark",
                                "authorizedUsers": [
                                    "assignee",
                                    "owner"
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
                            },
                            {
                                "targetId": "On Hold",
                                "transitionLabel": "On Hold Ticket",
                                "transitionIcon": "Clock",
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": false
                            },
                            {
                                "targetId": "Ready in Test",
                                "transitionLabel": "Ready to Test",
                                "transitionIcon": "RecycleBin",
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": true
                            },
                            {
                                "targetId": "Closed",
                                "transitionLabel": "Close Ticket",
                                "transitionIcon": "CheckMark",
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
                            },
                            {
                                "targetId": "Ready in Test",
                                "transitionLabel": "Ready to Test",
                                "transitionIcon": "RecycleBin",
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
                            },
                            {
                                "targetId": "In Progress",
                                "transitionLabel": "Start Ticket",
                                "transitionIcon": "Forward",
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": false
                            },
                            {
                                "targetId": "On Hold",
                                "transitionLabel": "On Hold Ticket",
                                "transitionIcon": "Clock",
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
                        "id": "On Hold",
                        "label": "On Hold",
                        "color": "#bfa640",
                        "recordResolutionSLA": false,
                        "nextSteps": [
                            {
                                "targetId": "In Progress",
                                "transitionLabel": "Resume Ticket",
                                "transitionIcon": "Forward",
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": false
                            },
                            {
                                "targetId": "Closed",
                                "transitionLabel": "Close Ticket",
                                "transitionIcon": "CheckMark",
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
                        "id": "Test OK",
                        "label": "Tested OK",
                        "color": "#b3e6bf",
                        "recordResolutionSLA": true,
                        "nextSteps": [
                            {
                                "targetId": "Closed",
                                "transitionLabel": "Delivered to Production",
                                "transitionIcon": "Archive",
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
                        "id": "Ready in Test",
                        "label": "Ready in Test",
                        "color": "#a940bf",
                        "recordResolutionSLA": true,
                        "nextSteps": [
                            {
                                "targetId": "Test OK",
                                "transitionLabel": "Test OK",
                                "transitionIcon": "CheckMark",
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": true
                            },
                            {
                                "targetId": "Reopened",
                                "transitionLabel": "Test Fail",
                                "transitionIcon": "Cancel",
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
                        "id": "Approved",
                        "label": "Approved",
                        "color": "#be40bf",
                        "recordResolutionSLA": false,
                        "nextSteps": [
                            {
                                "targetId": "In Progress",
                                "transitionLabel": "Start Ticket",
                                "transitionIcon": "Forward",
                                "authorizedUsers": [
                                    "assignee",
                                    "owner",
                                    "requestor"
                                ],
                                "recordComment": true,
                                "recordResolutionSLA": false
                            },
                            {
                                "targetId": "Resolved",
                                "transitionLabel": "Resolve Ticket",
                                "transitionIcon": "CheckMark",
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
                "isCustomWorkflow": true,
                "resolvedStatus": [
                    "Resolved",
                    "Closed",
                    "Test OK",
                    "Ready in Test"
                ]
            }

        ];

        // const uniqueObjects = originalArray.filter((obj, index, self) =>
        //     index === self.findIndex((o) => JSON.stringify(o) === JSON.stringify(obj))
        // );

        function getAvailableSteps(tickets, role: "owner" | "assignee" | "requestor") {
            console.log(role)
            let steps = [];
            for (const item of tickets) {
                let nextSteps: any[] | undefined = item?.workflow ? item.workflow.find((status) => status.id == item.status).nextSteps : getTicketWorkflow(defaultWorkflow).find((status) => status.id == item.status).nextSteps;
                steps.push(nextSteps.filter((item) => item.authorizedUsers.includes(role)));
                // steps.push({
                //     id: item.id,
                //     status: item.status,
                //     nextSteps: nextSteps.filter((item) => item.authorizedUsers.includes(role))
                // });
            }
            console.log(steps)
            // console.log(steps[0])
            const uniqueArray = steps.reduce((acc, step) => {
                console.log("acc", acc);
                console.log("step", step);
                return acc.filter((preVal) => step.some((curVal) => JSON.stringify(preVal) === JSON.stringify(curVal)));
            }, steps[0]);
            console.log(uniqueArray);
            // const uniqueArray = steps.reduce((acc, step) => {
            //     const stringifyStep = JSON.stringify({
            //         targetId: step.targetId,
            //         transitionLabel: step.transitionLabel,
            //         transitionIcon: step.transitionIcon,
            //         authorizedUsers: step.authorizedUsers.sort(),
            //         recordComment: step.recordComment,
            //         recordResolutionSLA: step.recordResolutionSLA,
            //     });

            //     if (!acc.find((s) => stringifyStep === JSON.stringify(s))) acc.push(step);
            //     return acc;
            // }, []);
            // console.log(uniqueArray);
            // return uniqueArray.length == 1 ?
            //     uniqueArray.map((item) => {
            //         return ({
            //             key: item.targetId,
            //             text: String(item.transitionLabel),
            //             data: { icon: item.transitionIcon }
            //         })
            //     })
            //     :
            //     []
        }

        function getUserRole(tickets: any[], user, isUserProvider: boolean, instance): "owner" | "assignee" | "requestor" {
            const isRequestor: boolean = (tickets?.some((item) => item.requestorId == user.id));
            const isAssignee: boolean = (tickets?.some((item) => item?.assigneeId == user.id || (instance?.assignees?.type == "customAssignee") && instance?.assignees?.peoples.some((assignee) => assignee.id == user.id)));

            return tickets.length > 1
                ? isRequestor
                    ? "requestor"
                    : isAssignee
                        ? "assignee"
                        : "owner"
                : isUserProvider
                    ? "owner"
                    : isAssignee
                        ? "assignee"
                        : "requestor";

        }
        /**Admin (Owner)*/
        const user = {
            "id": "2c60e7c5-d81d-4f5e-aa0c-e2a60e200c24",
            "text": "MOD Administrator",
            "secondaryText": "admin@M365B198965.onmicrosoft.com"
        };

        /**Debra (requestor) */
        // const user = {
        //     "id": "87bf97a1-bc47-441b-a90a-9ad50dd98371",
        //     "text": "Debra Berger",
        //     "secondaryText": "DebraB@M365B198965.OnMicrosoft.com"
        // }

        /**Alex (Assignee) */
        // const user = {
        //     "id": "8513bcc0-0124-4fa2-95e6-0eb1f5cc4f42",
        //     "text": "Alex Wilber",
        //     "secondaryText": "AlexW@M365B198965.OnMicrosoft.com"
        // }
        const isUserProvider: boolean = true;
        const instance = {
            "name": "Dev",
            "displayName": "Dev",
            "groupId": "a32b6461-b6eb-4f17-a437-e5025ddf5eeb",
            "enabled": true,
            "tenantId": "d0d03d71-54a6-4a03-985d-c529aa8504da",
            "teamId": "19:etCyPAWuD16Zqfcdkw4p-ZUdPTorYIkxSiNeed7MIiU1@thread.tacv2",
            "channelId": "19:etCyPAWuD16Zqfcdkw4p-ZUdPTorYIkxSiNeed7MIiU1@thread.tacv2",
            "entityId": "",
            "assignees": {
                "type": "customAssignee",
                "peoples": [
                    {
                        "id": "8513bcc0-0124-4fa2-95e6-0eb1f5cc4f42",
                        "text": "Alex Wilber",
                        "imageInitials": "AW",
                        "imageUrl": "",
                        "secondaryText": "AlexW@M365B198965.OnMicrosoft.com"
                    }
                ]
            },
            "customFields": [],
            "customFieldsLeft": [
                {
                    "id": "e94fb917-c387-4f21-893d-2c055246da56",
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
                    "isSeeTicket": false,
                    "isReceiveNotification": false,
                    "isMultipleSection": false,
                    "isMultiple": false,
                    "isReceiveEmailNotification": false
                }
            ],
            "customFieldsRight": [
                {
                    "id": "c18fa1c0-d47a-404b-bef7-0187774742ff",
                    "title": "Emails",
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
                            "key": "6d2a46c2-4f2f-4e3f-8fda-3f79a99fceb1",
                            "text": "arifrozikinh@gmail.com",
                            "isDefault": false
                        },
                        {
                            "key": "d8b4e518-6178-4ec2-81e2-1a4f3a442f2a",
                            "text": "haekal.rozikin@kitameraki.com",
                            "isDefault": false
                        }
                    ],
                    "isSeeTicket": false,
                    "isReceiveNotification": false,
                    "isMultipleSection": false,
                    "isMultiple": false,
                    "isReceiveEmailNotification": true
                },
                {
                    "id": "1837b5a8-5df7-48c5-8168-853334476d70",
                    "title": "Brands",
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
                            "key": "e1bbccdc-6fd3-47c7-b25d-5dac48f66fea",
                            "text": "Nike",
                            "isDefault": false
                        },
                        {
                            "key": "d3c6163e-a88e-4872-944c-4f1d72321b33",
                            "text": "Adidas",
                            "isDefault": false
                        },
                        {
                            "key": "4f50857d-ca6d-4c7f-8136-80a31e79a12b",
                            "text": "Puma",
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
            "assigneeRules": [],
            "defaultRuleAssignee": [
                {
                    "id": "999",
                    "assignee": [],
                    "type": "999_otherwise",
                    "condition": "Otherwise",
                    "enable": true
                }
            ],
            "isAutoAssignIdleTickets": false,
            "dayBeforeTicketsIdle": 2,
            "isNotifyIdleTicket": false,
            "alertNotification": {
                "expectedDate": {
                    "isDueInNotifOn": false,
                    "isDueTodayNotifOn": false,
                    "isOverdueNotifOn": false,
                    "dueInNotifDays": 3,
                    "overdueNotifDays": 7
                },
                "serviceLevelAgreement": {
                    "slaWeek": "1_weekdays",
                    "slaStartTime": {
                        "hours": 2,
                        "minutes": 0
                    },
                    "slaEndTime": {
                        "hours": 10,
                        "minutes": 0
                    },
                    "isBreachesFirstResponseTime": false,
                    "breachesHoursFirstResponseTime": 0,
                    "breachesAssigneeFirstResponseTime": [],
                    "isFrtUrgent": false,
                    "frtUrgentDuration": 0,
                    "frtUrgentTime": "2_hours",
                    "isFrtImportant": false,
                    "frtImportantDuration": 0,
                    "frtImportantTime": "2_hours",
                    "isFrtMedium": false,
                    "frtMediumDuration": 0,
                    "frtMediumTime": "2_hours",
                    "isFrtLow": false,
                    "frtLowDuration": 0,
                    "frtLowTime": "2_hours",
                    "isBreachesResolutionTime": false,
                    "breachesHoursResolutionTime": 0,
                    "breachesAssigneeResolutionTime": [],
                    "isRtUrgent": false,
                    "rtUrgentDuration": 0,
                    "rtUrgentTime": "2_hours",
                    "isRtImportant": false,
                    "rtImportantDuration": 0,
                    "rtImportantTime": "2_hours",
                    "isRtMedium": false,
                    "rtMediumDuration": 0,
                    "rtMediumTime": "2_hours",
                    "isRtLow": false,
                    "rtLowDuration": 0,
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
                    "selectedKey": "4_requestorCannotEdit"
                },
                {
                    "key": "expectedDate",
                    "selectedKey": "3_assigneeCannotEdit"
                },
                {
                    "key": "priority",
                    "selectedKey": "1_allCanEdit"
                },
                {
                    "key": "e94fb917-c387-4f21-893d-2c055246da56",
                    "selectedKey": "4_requestorCannotEdit"
                },
                {
                    "key": "c18fa1c0-d47a-404b-bef7-0187774742ff",
                    "selectedKey": "1_allCanEdit"
                },
                {
                    "key": "1837b5a8-5df7-48c5-8168-853334476d70",
                    "selectedKey": "1_allCanEdit"
                }
            ],
            "isNewInstance": true,
            "userList": {
                "owners": [
                    {
                        "id": "2c60e7c5-d81d-4f5e-aa0c-e2a60e200c24",
                        "text": "MOD Administrator",
                        "secondaryText": "admin@M365B198965.onmicrosoft.com",
                        "imageInitials": "MA"
                    }
                ],
                "members": []
            },
            "notifyOnNoAssignee": false,
            "noAssigneeNotifRecipients": [],
            "appVersion": "1.23.0",
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
            "color": "#2d0b01",
            "id": "8de916ee-8eed-4bcb-a751-0b8b5d76d378",
            "_rid": "RPh2AIxJHo5wAAAAAAAAAA==",
            "_self": "dbs/RPh2AA==/colls/RPh2AIxJHo4=/docs/RPh2AIxJHo5wAAAAAAAAAA==/",
            "_etag": "\"ea02faf0-0000-0100-0000-659f6b3b0000\"",
            "_attachments": "attachments/",
            "_ts": 1704946491,
            "idleTicketAssignedTo": []
        }

        const role = getUserRole(tickets, user, isUserProvider, instance);
        const dropdownList = getAvailableSteps(tickets, role);
        console.log(dropdownList);

        // const ticketSample = tickets[0];
        // const isCurrStatusSame: boolean = tickets?.every((item) => item.status == ticketSample.status);
        // const isResolvedStatusSame: boolean = tickets?.every((item) => item.status == ticketSample.status);

        // const nextStepsSample: any[] = ticketSample.workflow.find((item) => item.id == ticketSample.status).nextSteps;
        // let arr = [];
        // tickets?.map((item, index) => {
        //     if (index !== 0) {
        //         const nextSteps: any[] = item.workflow.find((item) => item.id == ticketSample.status).nextSteps;
        //         if (nextSteps.length === nextStepsSample.length) {
        //             nextSteps.map((ns) => {
        //                 const authorizedSample: any["authorizedUsers"] | undefined = nextStepsSample.find((item) => item.targetId == ns.targetId).authorizedUsers;
        //                 const nextStepSample: any | undefined = nextStepsSample.find((item) => item.targetId == ns.targetId)
        //                 if (authorizedSample) {
        //                     // const authorizedUsers: string[] = ns.authorizedUsers;

        //                     console.log("sample", authorizedSample);
        //                     console.log("ns", ns.authorizedUsers);

        //                     const authorizedUsers = new Set(ns.authorizedUsers);
        //                     // const isAuthorized = authorizedSample.every((user) => authorizedUsers.has(user));
        //                     // return isAuthorized;
        //                     // console.log(authorizedUsers.size);
        //                     if (authorizedSample.length == authorizedUsers.size && authorizedSample.every((user) => authorizedUsers.has(user)) && JSON.stringify({ ...ns, authorizedUsers: undefined }) === JSON.stringify({ ...nextStepSample, authorizedUsers: undefined })) arr.push(true);
        //                     else arr.push(false);

        //                 } else {
        //                     arr.push(false);
        //                 }
        //             })
        //         } else {
        //             arr.push(false);
        //         }
        //     }
        // });

        // console.log(arr)

        // const sampleTicket = tickets[0];
        // const sampleNextSteps = sampleTicket.workflow.find(({ id }) => id === sampleTicket.status)?.nextSteps || [];

        // const result = tickets.slice(1).map((currentTicket) => {
        //     const currentNextSteps = currentTicket.workflow.find(({ id }) => id === sampleTicket.status)?.nextSteps || [];
        //     let isStepEqual = false;
        //     let isResolvedStatusSame = false;

        //     if (currentNextSteps.length === sampleNextSteps.length) {
        //         isStepEqual = currentNextSteps.every((currentStep) => {
        //             const sampleStep = sampleNextSteps.find(({ targetId }) => targetId === currentStep.targetId);
        //             const authorizedUsers = new Set(currentStep.authorizedUsers);

        //             return (
        //                 sampleStep?.authorizedUsers.length === authorizedUsers.size &&
        //                 sampleStep?.authorizedUsers.every((user) => authorizedUsers.has(user)) &&
        //                 JSON.stringify({ ...currentStep, authorizedUsers: undefined }) ===
        //                 JSON.stringify({ ...sampleStep, authorizedUsers: undefined })
        //             );
        //         });
        //     }

        //     if (sampleTicket.resolvedStatus.length === currentTicket.resolvedStatus.length) {
        //         isResolvedStatusSame = sampleTicket.resolvedStatus.every((status) =>
        //             new Set(currentTicket.resolvedStatus).has(status)
        //         );
        //     }

        //     return isStepEqual && isResolvedStatusSame;
        // }).every((value) => value);

        // console.log(result);

        // const sample = tickets[0];
        // console.log(...sample.value);

        // const result = tickets.map((item) => {
        //     const authorizedUsers = new Set(item.value);
        //     const isAuthorized = sample.value.every((user) => authorizedUsers.has(user));
        //     return isAuthorized;
        // });

        // console.log(result);7
    }, []); // Efek hanya dijalankan saat mounting dan unmounting

    return (
        <>
            <div className={`floating-panel ${isPanelOpen ? 'open' : ''}`}>
                {/* <PrimaryButton onClick={togglePanel}>Open Panel</PrimaryButton> */}
                <h2>Floating Panel</h2>
                <p>This is a floating panel content.</p>
                <button onClick={() => setPanelOpen(false)}>Close Panel</button>
            </div>
        </>
    );
};

export default FloatingPanel;