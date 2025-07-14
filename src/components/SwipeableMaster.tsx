
import { ActionButton, IconButton, mergeStyleSets, Persona, Stack, Tooltip, TooltipHost } from '@fluentui/react';
import React from 'react';
import { useSwipeable } from 'react-swipeable';
/**
 * Styles
 */
const styles = mergeStyleSets({
    wrapper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100vw",
        padding: "20px 0"
    },
    container: {
        minHeight: "100vh",
        width: "min(1100px, 100%)",
        padding: "0 10px 0 10px"
    },
    actionWrapper: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "20px"
    },
    kpiWrapper: {
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        marginBottom: "40px"
    },
    header: {
        display: "flex",
        width: "100%",
        gap: "10px",
        "@media(max-width: 640px)": {
            flexDirection: "column"
        }
    },
    tagSelect: {
        width: "clamp(300px, 25%, 500px) !important",
        "@media(max-width: 640px)": {
            width: "100% !important"
        }
    },
    table: {
        marginTop: "20px"
    },
    checklistCol: { width: "200px" },
    taskCol: {
        minWidth: "500px",
        flex: 1
    },
    badgeWrapper: {
        display: "inline-block",
        position: "relative"
    },
    badge: {
        width: "14px",
        height: "14px",
        position: "absolute",
        right: "-2.5px",
        bottom: "-10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid transparent",
        borderRadius: "50%",
        backgroundColor: "#D13438",
        fontSize: "11px",
        fontWeight: 700,
        color: "#FFF",
    },
    actionBtn: {
        border: "1px solid #ededed",
        height: "100%",
        width: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 8
    }
});

const tableStyles = mergeStyleSets({
    wrapper: {
        display: "flex",
        marginTop: "10px"
    },
    checklistColumn: {
        display: "flex",
        flexBasis: "200px",
        flexShrink: 0,
        flexGrow: 0,
        padding: "0 0 0 10px",
        alignItems: "center"
    },
    taskColumn: {
        flexBasis: "500px",
        flexShrink: 0,
        flexGrow: 1,
        padding: "0 0 0 10px"
    },
    taskNameColumn: {
        flexGrow: 1,
        flexShrink: "0 !important",
        flexBasis: "400px"
    }
});
const tasklist = [
    {
        "status": "Open",
        "duedate": "2024-08-13T00:00:00",
        "resolved_at": "1000-01-01T00:00:00Z",
        "closed_at": "0001-01-01T00:00:00",
        "comment_reopen": "",
        "id": "401fbda9-8b64-a6b7-3305-1f58e90e4917",
        "task": "Task 2",
        "number": 2,
        "subscription_id": "606c88cc-691f-4c0f-b18f-679ab2f9eabe",
        "instance_id": "594c3744-ca76-a4b3-e1b4-35503fcbc0d7",
        "checklist_id": "83598733-8a58-7363-c584-ada89768696d",
        "checklist_name": "HR Onboarding ",
        "duedatenumber": 0,
        "tasktag": [],
        "assignee": [
            {
                "id": "54028cdd-1230-4cc0-a0b8-bb55125e26ee",
                "imageInitials": "MA",
                "secondaryText": "admin@M365x45146571.onmicrosoft.com",
                "text": "MOD Administrator"
            }
        ],
        "reviewer": [],
        "attachment": [],
        "customFieldInput": [],
        "created_at": "2024-08-13T03:31:28.2935392Z",
        "deleted": null,
        "deleted_at": "0001-01-01T00:00:00",
        "deleted_by": null
    },
    {
        "status": "Open",
        "duedate": "2024-08-13T00:00:00",
        "resolved_at": "1000-01-01T00:00:00Z",
        "closed_at": "0001-01-01T00:00:00",
        "comment_reopen": "",
        "id": "7a4bdc0f-cad8-e082-0e4d-aa7689bcd9f6",
        "task": "Task 3",
        "number": 3,
        "subscription_id": "606c88cc-691f-4c0f-b18f-679ab2f9eabe",
        "instance_id": "594c3744-ca76-a4b3-e1b4-35503fcbc0d7",
        "checklist_id": "83598733-8a58-7363-c584-ada89768696d",
        "checklist_name": "HR Onboarding ",
        "duedatenumber": 0,
        "tasktag": [],
        "assignee": [
            {
                "id": "54028cdd-1230-4cc0-a0b8-bb55125e26ee",
                "imageInitials": "MA",
                "secondaryText": "admin@M365x45146571.onmicrosoft.com",
                "text": "MOD Administrator"
            }
        ],
        "reviewer": [],
        "attachment": [],
        "customFieldInput": [],
        "created_at": "2024-08-13T03:32:11.2903935Z",
        "deleted": null,
        "deleted_at": "0001-01-01T00:00:00",
        "deleted_by": null
    },
    {
        "status": "Open",
        "duedate": "2024-08-13T00:00:00",
        "resolved_at": "1000-01-01T00:00:00Z",
        "closed_at": "0001-01-01T00:00:00",
        "comment_reopen": "",
        "id": "0e46821a-c68d-df17-8fcc-8a7d71dceb91",
        "task": "Task 4",
        "number": 4,
        "subscription_id": "606c88cc-691f-4c0f-b18f-679ab2f9eabe",
        "instance_id": "594c3744-ca76-a4b3-e1b4-35503fcbc0d7",
        "checklist_id": "83598733-8a58-7363-c584-ada89768696d",
        "checklist_name": "HR Onboarding ",
        "duedatenumber": 0,
        "tasktag": [],
        "assignee": [
            {
                "id": "54028cdd-1230-4cc0-a0b8-bb55125e26ee",
                "imageInitials": "MA",
                "secondaryText": "admin@M365x45146571.onmicrosoft.com",
                "text": "MOD Administrator"
            }
        ],
        "reviewer": [],
        "attachment": [],
        "customFieldInput": [],
        "created_at": "2024-08-13T03:33:18.9280327Z",
        "deleted": null,
        "deleted_at": "0001-01-01T00:00:00",
        "deleted_by": null
    },
    {
        "status": "Open",
        "duedate": "2024-08-16T00:00:00",
        "resolved_at": "0001-01-01T00:00:00",
        "closed_at": "0001-01-01T00:00:00",
        "comment_reopen": null,
        "id": "2fef1674-f5ee-2d83-dd51-02349612dd8f",
        "task": "Task 1",
        "number": 1,
        "subscription_id": "606c88cc-691f-4c0f-b18f-679ab2f9eabe",
        "instance_id": "594c3744-ca76-a4b3-e1b4-35503fcbc0d7",
        "checklist_id": "83598733-8a58-7363-c584-ada89768696d",
        "checklist_name": "HR Onboarding ",
        "duedatenumber": 2,
        "tasktag": [],
        "assignee": [
            {
                "id": "54028cdd-1230-4cc0-a0b8-bb55125e26ee",
                "imageInitials": "MA",
                "secondaryText": "admin@M365x45146571.onmicrosoft.com",
                "text": "MOD Administrator"
            }
        ],
        "reviewer": [],
        "attachment": [],
        "customFieldInput": [],
        "created_at": "2024-08-13T02:43:02.9084571Z",
        "deleted": null,
        "deleted_at": "0001-01-01T00:00:00",
        "deleted_by": null
    }
];
export const SwipeableMaster = (props) => {
    const handlers = useSwipeable({
        onSwiped: (eventData) => console.log("User Swiped!", eventData),
        onSwipedLeft: (SwipeEventData) => {
            console.log(SwipeEventData)
        },
        onSwipedRight: (SwipeEventData) => {
            console.log(SwipeEventData)
        },
        onSwipedUp: (SwipeEventData) => {
            console.log(SwipeEventData)
        },
        onSwipedDown: (SwipeEventData) => {
            console.log(SwipeEventData)
        },
        onSwipeStart: (SwipeEventData) => {
            console.log(SwipeEventData)
        },
        onSwiping: (SwipeEventData) => {
            console.log(SwipeEventData)
        },
        onTap: (SwipeEventData) => {
            console.log(SwipeEventData)
        },
        onTouchStartOrOnMouseDown: (TapCallback) => {
            console.log(TapCallback)
        },
        onTouchEndOrOnMouseUp: (TapCallback) => {
            console.log(TapCallback)
        },
        delta: { up: 20, down: 20 },                    // min distance(px) before a swipe starts. *See Notes*
        preventScrollOnSwipe: false,           // prevents scroll during swipe (*See Details*)
        trackTouch: true,                      // track touch input
        trackMouse: false,                     // track mouse input
        rotationAngle: 0,                      // set a rotation angle
        swipeDuration: Infinity,               // allowable duration of a swipe (ms). *See Notes*
        touchEventOptions: { passive: true },  // options for touch listeners (*See Details*)
        // ...config,
    });
    return (<>
        <div className={styles.table}>
            <div style={{ display: "flex" }}>
                <div style={{ width: "200px", padding: "4px 10px", fontSize: "16px", fontWeight: 700 }}>
                    Checklist
                </div>
                <div style={{ padding: "4px 10px", flex: 1, fontSize: "16px", fontWeight: 700 }}>
                    Task
                </div>
            </div>
        </div>

        {tasklist.map((task) => {
            return (
                <div {...handlers}>
                    <div style={{ display: "flex", padding: "4px 0", border: "1px solid #ededed" }}>
                        <div className={tableStyles.checklistColumn}>
                            {task.checklist_name}
                        </div>
                        <div className={tableStyles.taskColumn}>
                            <Stack
                                horizontal
                                verticalAlign='center'
                                tokens={{ childrenGap: "15px" }}
                            >
                                {/* <StatusCheckbox
                        task={task}
                        onClick={handleCheckboxClick}

                        tooltipContent={generateCheckboxTooltip(task)}
                        availableStatus={getCheckboxAvailableStatus(task, user?.personaInfo!)}
                        disabled={
                            isCheckboxDisabled(task, user?.personaInfo!) ||
                            (!!!props.isProfessional && !!!props.isEnterprise && !!!props.isTrial)
                        }
                    /> */}

                                <div className={tableStyles.taskNameColumn}>
                                    <span>{task.task}</span>
                                </div>

                                {/* {(isDueDateFieldEnabled(task, props.userActiveInstances) || (!!!props.isProfessional && !!!props.isEnterprise && !!!props.isTrial)) &&
                        <div style={dueDateDisplayStyle(task)}>
                            <FontIcon
                                iconName="Calendar"
                                style={{ marginRight: "6px" }}
                            />
                            <div style={{ display: "flex" }}>
                                {moment(task.duedate).format("DD MMM")}
                            </div>
                        </div>
                    } */}


                                <Persona
                                    hidePersonaDetails
                                // {...assigneePersonaProps(task)}
                                // size={PersonaSize.size32}
                                />



                                <Persona
                                    hidePersonaDetails
                                // {...reviewerPersonaProps(task)}
                                // size={PersonaSize.size32}
                                />


                                <Stack
                                    horizontal
                                    horizontalAlign="center"
                                    verticalAlign="center"
                                    tokens={{ childrenGap: "4px" }}
                                >

                                    <IconButton
                                        // disabled={!!!props.isProfessional && !!!props.isEnterprise && !!!props.isTrial}
                                        iconProps={{ iconName: "CannedChat" }}
                                    // onClick={e => handleCommentClick(e, task)}
                                    />
                                    <IconButton
                                        // disabled={!!!props.isProfessional && !!!props.isEnterprise && !!!props.isTrial}
                                        // data={{ count: task.attachment.length }}
                                        iconProps={{ iconName: "Attach" }}
                                    // onRenderIcon={renderIconWithBadge}
                                    // onClick={e => handleAttachmentClick(e, task)}
                                    />
                                    <IconButton
                                        // disabled={!!!props.isProfessional && !!!props.isEnterprise && !!!props.isTrial}
                                        iconProps={{ iconName: "OpenInNewWindow" }}
                                    // onClick={e => handleNavigateClick(e, task)}
                                    />
                                </Stack>
                            </Stack>
                        </div>
                    </div>
                </div>
            )
        })}

    </>)
}