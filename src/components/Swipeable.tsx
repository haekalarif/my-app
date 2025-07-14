import { ActionButton, IconButton, mergeStyleSets, Persona, Stack, Tooltip, TooltipHost, Text, PersonaSize, IIconProps, MessageBar, PrimaryButton, Modal, getTheme, FontWeights, DefaultButton } from '@fluentui/react';
import { CSSProperties, useEffect, useState } from 'react';
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeableListProps,
    SwipeAction,
    TrailingActions,
    Type,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import '../App.css';
import { Affix } from 'antd';
import moment from 'moment';
import { useBoolean } from '@fluentui/react-hooks';
import SwipeableTaskFeature from "../images/gifs/swipeable_task_feature.gif";

interface ISwipeable {

}

const moreVerticalIcon: IIconProps = { iconName: "MoreVertical" }



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
        "status": "Closed",
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
        "status": "Resolved",
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
export const Swipeable: React.FunctionComponent<ISwipeable> = () => {
    const [dragDirection, setDragDirection] = useState<string>("");
    const [progress, setProgress] = useState<number>(0);
    const [swipeableType, setSwipeableType] = useState<SwipeableListProps["type"]>(Type.IOS);
    const [isOpen, {
        setTrue: openModal,
        setFalse: dismissModal
    }] = useBoolean(false);

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction
                onClick={() => console.info('swipe action right triggered')}
            >
                <div className={styles.actionBtn}>Action</div>
                <div className={styles.actionBtn}>Action</div>
            </SwipeAction>
        </LeadingActions>
    );

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction
                onClick={() => console.info('swipe action left triggered')}
            >
                {/* <Stack horizontal> */}
                <div className={styles.actionBtn}>Action</div>
                {/* </Stack> */}
            </SwipeAction>
        </TrailingActions>
    );

    const [showMessage, setShowMessage] = useState<boolean>(false);

    const handleEvent = (event) => {
        console.log(`Event type: ${event.type}`);
        console.log(`Event target: ${event.target.tagName}`);
        console.log(`Event details:`, event);
        const activeElement = document.activeElement;
        console.log(activeElement)

        const clickedElement = event.target;

        if (clickedElement === activeElement) {
            // setIsFocused(true);
            console.log(`Element ${clickedElement.tagName} is focused.`);
        } else {
            // setIsFocused(false);
            console.log(`Element ${clickedElement.tagName} is not focused.`);
        }
    };

    const loadData = () => {
        let initSchedule = {
            "id": "d2f90e43-1ab2-38af-f538-5b75f2601e6d",
            "startDate": "2024-08-28T07:55:29.138Z",
            "repeatInterval": 1,
            "repeatPeriod": "daily",
            "endDate": "2024-08-30T17:00:00.000Z",
            "selectedDays": [
                0,
                1,
                2,
                3,
                4,
                5,
                6
            ],
            "selectedWeek": "onDay",
            "dates": [
                "2024-08-28",
                "2024-08-29",
                "2024-08-30",
                "2024-08-31"
            ]
        };

        let activeActualDates: any[] = [];
        let beforeEventDateNumber = 1;
        activeActualDates = (initSchedule?.dates ?? []).map(scheduleDate => {

            console.log("schedule date ", scheduleDate);
            console.log("result ", moment(scheduleDate).add(-beforeEventDateNumber, 'days').format("YYYY-MM-DD"));

            return {
                date: moment(scheduleDate).add(-beforeEventDateNumber, 'days').format("YYYY-MM-DD"),
                executed: false
            }
        });

        console.log(activeActualDates);

        const today = moment().add(-1, 'days');
        console.log(today);
        activeActualDates = activeActualDates.filter(date => moment(date.date).isSameOrAfter(today));

        console.log(activeActualDates);
    }
    const theme = getTheme();
    const contentStyles = mergeStyleSets({
        header: [
            theme.fonts.xLargePlus,
            {
                flex: '1 1 auto',
                // borderTop: `4px solid ${theme.palette.themePrimary}`,
                color: theme.palette.neutralPrimary,
                display: 'flex',
                alignItems: 'center',
                fontWeight: FontWeights.semibold,
                padding: '12px 12px 14px 24px',
            },
        ],
        body: {
            flex: '4 4 auto',
            padding: '0 24px 24px 24px',
            overflowY: 'hidden',
            textAlign: "center",
            '& > *:not(:first-child)': {
                marginTop: '20px'
            }
        },
    });

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
            border: "2px solid #ededed",
            height: "100%",
            width: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12
        },
        startPartOfTask: {
            width: "10%"
        },
        centerPartOfTask: {
            width: "70%"
        },
        endPartOfTask: {
            width: "20%"
        },
        checklistWrap: {
            width: "80%",
            height: 30,
            border: '1px solid #000000',
            padding: 2
        },
        duedateWrap: {
            width: "20%",
            height: 30,
            border: '1px solid #000000',
            padding: 2
        },
        taskWrap: {
            height: 50,
            border: '1px solid #000000',
            width: "100%",
            padding: 2
        },
        activeTask: {
            backgroundColor: theme.palette.neutralLighter
        }
    });
    useEffect(() => {
        // Daftarkan event listener untuk berbagai jenis event
        // const events = ['click', 'touchstart', 'touchmove', 'touchend', 'keydown', 'keyup'];

        // events.forEach(eventType => {
        //     window.addEventListener(eventType, handleEvent);
        // });

        // Cleanup event listener saat komponen unmount
        // return () => {
        //     events.forEach(eventType => {
        //         window.removeEventListener(eventType, handleEvent);
        //     });
        // };

        loadData();
    }, []);

    return (<>
        {showMessage &&
            <Affix offsetTop={0} style={{ position: "absolute", width: "100%" }}>

                <MessageBar messageBarType={4}>
                    hoho
                </MessageBar>
            </Affix>
        }
        <div style={{
            width: 200,
            height: 200,
            border: "5px solid #000000",
            marginBottom: 10
        }}>

        </div>

        <PrimaryButton text={"Click me"} onClick={() => {
            setShowMessage((prev) => !!!prev)
        }} />
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


        <SwipeableList
            fullSwipe={true}
            type={Type.IOS}
            threshold={1}
        >
            {tasklist.map((task) => {
                return (
                    <SwipeableListItem
                        leadingActions={leadingActions()}
                        // trailingActions={trailingActions()}
                        trailingActions={() => <></>}
                        // maxSwipe={0.5}
                        // blockSwipe={true}
                        // threshold={0.25}
                        onSwipeStart={(dragDirection: string) => {
                            console.log("On Swipe Start")
                            console.log(dragDirection)

                            // if (["Closed", "Resolved"].includes(task.status)) setSwipeableType(Type.ANDROID);
                            // else setSwipeableType(Type.IOS);
                        }}
                        onSwipeEnd={(dragDirection: string) => {
                            console.log("On Swipe End")
                            console.log(dragDirection);
                            // console.log(progress);

                        }}
                        onSwipeProgress={(progress: number, dragDirection: string) => {
                            console.log("On Swipe Progress")
                            console.log(progress)
                            console.log(dragDirection)
                            // setProgress(progress)
                        }}
                    >
                        <div style={{ display: "flex", padding: "4px 0", border: "2px solid #ededed" }}
                            className={styles.activeTask}
                        >
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
                    </SwipeableListItem>
                )
            })}
        </SwipeableList>

        <Stack horizontal verticalAlign="center" style={{ border: "1px solid #000000", height: 100 }}>
            <div className={styles.startPartOfTask}>
                <div style={{
                    width: 30,
                    height: 30,
                    marginLeft: 10,
                    border: '2px solid #000000'
                }}>

                </div>
            </div>
            <div className={styles.centerPartOfTask}>
                <Stack tokens={{ childrenGap: 4 }}>
                    <Stack horizontal tokens={{ childrenGap: 4 }}>
                        <div
                            className={styles.checklistWrap}>
                            <Text
                                variant="small"
                                style={{
                                    color: "#aaaaaa"
                                }}
                            >
                                HR Onboarding john
                            </Text>
                        </div>
                        <div
                            className={styles.duedateWrap}>
                            <Text
                                variant="small"
                            >
                                12 Jul 24
                            </Text>
                        </div>
                    </Stack>
                    <Stack>
                        <div className={styles.taskWrap}>
                            <Text variant="large">
                                Task 1
                            </Text>
                        </div>
                    </Stack>
                </Stack>
            </div>
            <div className={styles.endPartOfTask}>
                <Stack horizontalAlign="center">
                    <Stack horizontal horizontalAlign="center" tokens={{ childrenGap: 10 }}>
                        <Persona
                            hidePersonaDetails
                            size={PersonaSize.size32}
                        />
                        <Persona
                            hidePersonaDetails
                            size={PersonaSize.size32}
                        />

                    </Stack>
                    <Stack>
                        <ActionButton iconProps={moreVerticalIcon} />
                    </Stack>
                </Stack>
            </div>
        </Stack>
        <PrimaryButton
            onClick={() => {
                openModal();
            }}
            text="Click me"
        />
        <Modal
            isOpen={isOpen}
            isBlocking={true}
            styles={{
                main: {
                    backgroundColor: "#0078d4"
                }
            }}
        >
            <div className={contentStyles.header}>
                <Stack>
                    <Text
                        style={{ color: "#fff", fontWeight: 600 }}>
                        Swipe right to resolved / close tasks
                    </Text>
                    <Text style={{ color: "#fff", fontWeight: 600 }}>
                        Swipe left to reopen tasks
                    </Text>
                </Stack>
            </div>
            <div className={contentStyles.body}>
                <img
                    src={SwipeableTaskFeature}
                    style={{ width: "100%" }}
                />
                <DefaultButton
                    text={"Close"}
                />
            </div>
        </Modal>
    </>)
}