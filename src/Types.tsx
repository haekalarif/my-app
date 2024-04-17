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