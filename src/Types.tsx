/**
 * This is initial data for custom workflow
 * 
 * @type {Array}
 */
export const initialNodes: any[] = [
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
]
export const initialEdges: any[] = [
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

/**
 * default workflow is value ticket workflow for besides trial dan professional plan
 */
export const defaultWorkflow = {
    workflows: {
        ticket: [
            {
                nodes: initialNodes,
                edges: initialEdges
            }
        ]
    }
}


// Social network friend recomendation system database

interface Users {
    id: string,
    username: string,
    password: string, // We will using bcrypt,
    name: string,
    age: number,
    address: string,
    job: string,
    hobbies: string[],
    email: string;
    profileUrl: string
    instagram: string,
    tiktok: string,
    facebook: string,
    noTelepon: string
}

interface UserRelationship {
    id: string,
    userId1: string,
    userId2: string,
}

interface NotificationLog {
    from: string, //UserId1,
    to: string, //UserId2,
    action: "REQUESTING FRIENDSHIP" | "ACCEPTING FRIENDSHIP"
}

let userRelationship: UserRelationship[] = [
    {
        id: "",
        userId1: "00da068b-e527-4dfa-993d-aea7266bf831",
        userId2: "2106bdbd-77f4-4de8-88b6-45e52167ab64"
    },
    {
        id: "",
        userId1: "39a5392a-44e3-416b-81b9-ded6bacf1c80",
        userId2: "00da068b-e527-4dfa-993d-aea7266bf831",
    },
    {
        id: "",
        userId1: "00da068b-e527-4dfa-993d-aea7266bf831",
        userId2: "3c7c4954-aa4e-487c-a669-6576a1204d81",
    },
    {
        id: "",
        userId1: "2106bdbd-77f4-4de8-88b6-45e52167ab64",
        userId2: "52d3ad6b-5dd7-4f51-b81e-48893a40daf8",
    },
    {
        id: "",
        userId1: "608a4baf-3215-4491-a31f-bb0fe897412b",
        userId2: "2106bdbd-77f4-4de8-88b6-45e52167ab64",
    },
    {
        id: "",
        userId1: "39a5392a-44e3-416b-81b9-ded6bacf1c80",
        userId2: "7392e1c1-7089-49f0-99d8-31f08a3e12f7",
    },
    {
        id: "",
        userId1: "77deb7b1-2b57-441a-96e1-78ecdff12fb6",
        userId2: "39a5392a-44e3-416b-81b9-ded6bacf1c80",
    },
    {
        id: "",
        userId1: "77deb7b1-2b57-441a-96e1-78ecdff12fb6",
        userId2: "39a5392a-44e3-416b-81b9-ded6bacf1c80",
    },
    {
        id: "",
        userId1: "3c7c4954-aa4e-487c-a669-6576a1204d81",
        userId2: "837e35ec-e846-43d4-be35-c852702d5be1",
    },
    {
        id: "",
        userId1: "87732d8d-37eb-4262-a4c1-9efc895a4b37",
        userId2: "3c7c4954-aa4e-487c-a669-6576a1204d81",
    },
    {
        id: "",
        userId1: "52d3ad6b-5dd7-4f51-b81e-48893a40daf8",
        userId2: "9e370651-0c53-4dde-976d-3d35ffc2dbba",
    },
    {
        id: "",
        userId1: "77deb7b1-2b57-441a-96e1-78ecdff12fb6",
        userId2: "9ee40580-ada8-4013-ab9b-12122f05c52f",
    },
    {
        id: "",
        userId1: "837e35ec-e846-43d4-be35-c852702d5be1",
        userId2: "a4be14ff-660d-4708-9b40-06161f6d8d19",
    },
    {
        id: "",
        userId1: "a697c436-f42e-4369-a870-26b3bfb7b7a0",
        userId2: "87732d8d-37eb-4262-a4c1-9efc895a4b37",
    },

]

//API Specification


//  1. /api/login

// request
// req = {
//     username: "",
//     password: ""
// }

// response


export interface ISupplierAssessment {
    id: string,
    supplierId: string,
    supplierCode: string,
    supplierName: string,
    initiationCriteria: ICriteria,
    normalizationCriteria: ICriteria,
    finalScore: number,
    createdAt: string
}
interface ICriteria {
    productQuality: number,
    onTimeDelivery: number,
    stockAvailability: number,
    communicationResponse: number,
    completnessDocument: number,
    warranty: number,
    easeOrderingProcess: number
    productPrice: number,
    shippingCosts: number,
    leadTime: number
}
export const Criterias: { id: string, weight: string, type: "benefit" | "cost" }[] = [
    {
        id: "productQuality",
        weight: "20%",
        type: "benefit"
    },
    {
        id: "onTimeDelivery",
        weight: "15%",
        type: "benefit"
    },
    {
        id: "stockAvailability",
        weight: "10%",
        type: "benefit"
    },
    {
        id: "communicationResponse",
        weight: "8%",
        type: "benefit"
    },
    {
        id: "completnessDocument",
        weight: "5%",
        type: "benefit"
    },
    {
        id: "warranty",
        weight: "7%",
        type: "benefit"
    },
    {
        id: "easeOrderingProcess",
        weight: "5%",
        type: "benefit"
    },
    {
        id: "productPrice",
        weight: "15%",
        type: "cost"
    },
    {
        id: "shippingCosts",
        weight: "10%",
        type: "cost"
    },
    {
        id: "leadTime",
        weight: "5%",
        type: "cost"
    }
]

export function percentToDecimal(str): number {
    return parseFloat(str) / 100;
}

export function sumArray(numbers: number[]) {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    return sum;
}

export function roundValue(value, decimals = 4) {
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
}