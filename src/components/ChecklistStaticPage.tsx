import React from "react";
import { FontIcon, IButtonStyles, IIconProps, Link, mergeStyleSets, MessageBar, MessageBarType, PrimaryButton, Stack, Text } from "@fluentui/react";
import bg_mobile from "../images/bg_mobile.webp";
import bg_tablet from "../images/bg_tablet.webp";
import bg_web from "../images/bg_web.webp";
import { formatComponent } from "./AutomationRules";
import add_checklist_to_team from "../images/gifs/add_checklist_to_team.gif";

const warningIcon: IIconProps = { iconName: "Warning" }
const reopenPagesIcon: IIconProps = { iconName: "ReopenPages" };
const webPublishIcon: IIconProps = { iconName: "WebPublish" };
const checklistIcon: IIconProps = { iconName: "CheckList" };

const styles = mergeStyleSets({
    wrapper: {
        height: "100vh",
        width: "100vw",
        backgroundSize: "100% 100%",
        display: 'flex', // Enables Flexbox
        justifyContent: 'center', // Horizontally center
        alignItems: 'center', // Vertically center
        flexDirection: 'column', // Ensure content stacks vertically
        overflowX: "hidden",
        selectors: {
            // mobile version
            '@media (min-width: 320px)': {
                backgroundImage: `url(${bg_mobile})`,
            },
            // tablet version
            '@media (min-width: 480px)': {
                backgroundImage: `url(${bg_tablet})`,
            },
            // tablet version
            '@media (min-width: 640px)': {
                backgroundImage: `url(${bg_web})`,
            },
        }
    },
    title: {
        background: 'linear-gradient(to right, #558fee, #084f9b)', // Gradient colors
        webkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        display: "inline-block",
        lineHeight: "1.2",
        marginBottom: 24,
        selectors: {
            '@media (min-width: 320px)': {
                width: 340,
                fontSize: 28,
            },
            '@media (min-width: 480px)': {
                marginTop: 30,
                fontSize: 28,
            },
            '@media (min-width: 640px)': {
                width: 490
            },
        }
    },
    body: {
        padding: "0px 10px",
        selectors: {
            '@media (min-width: 320px)': {
                marginBottom: 20,
            },
            '@media (min-width: 640px)': {
                marginBottom: 40,
                width: 800
            },
        }
    },
    video: {
        padding: "20px 20px 0px 20px",
        background: "#f2f2f2",
        borderRadius: 5,
        // width: "95%",
        // height: "95%",
        selectors: {
            "@media (min-width: 320px) and (max-width: 640px)": {
                marginTop: 30,
                width: "75%",
                height: "75%",
            },
            '@media (min-width: 640px)': {
                marginTop: 60
            }

        }
    },
    header: {
        textAlign: "center"
    },
    letsInstallChecklist: {
        display: "inline-block",
        marginBottom: 18,
        selectors: {
            "@media (min-width: 400px) and (max-width: 640px)": {
                width: 400
            },
        }
    },
    messageBar: {
        marginBottom: 18
    },
    footer: {
        textAlign: "center",
        selectors: {
            "@media (max-width: 640px)": {
                paddingBottom: 30
            },
        }
    },
    howToDo: {
        padding: "10px 20px",
        borderLeft: "3px solid #000",
        marginBottom: 18
    },
    todoItems: {
        paddingLeft: 20,
    },
    contactUs: {
        textDecoration: "underline",
        cursor: "pointer"
    },

    videoContent: {
        width: "100%",
    },
    videoFrame: {
        marginBottom: "-4px",
        padding: 0,
        width: "100%",
        border: "1px solid #ccc"
    },
    languageSelectorWrapper: {
        width: "90%",
        selectors: {
            "@media (min-width: 640px)": {
                marginTop: 24
            }
        }
    }
});
const clickToActionStyles: IButtonStyles = {
    label: {
        fontWeight: 400
    }
}
const ChecklistStaticPage: React.FunctionComponent = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Text
                    className={styles.title}
                    variant="xxLargePlus"
                >
                    Congratulation on adding the Checklist As A Service Personal App!
                </Text>
            </div>
            <div className={styles.body}>
                <div className="ms-Grid">
                    <div className="ms-Grid-row" dir="ltr">
                        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg6">
                            <MessageBar
                                messageBarType={MessageBarType.warning}
                                messageBarIconProps={warningIcon}
                                className={styles.messageBar}
                            >
                                You don't have access to any Checklist instance yet.
                            </MessageBar>
                            <Text
                                variant="xLarge"
                                className={styles.letsInstallChecklist}>Let's install Checklist As A Service in a Microsoft Teams channel
                            </Text>
                            <Stack
                                className={styles.howToDo}
                                tokens={{ childrenGap: 8 }}>
                                <Text>How to do it:</Text>
                                <Stack
                                    className={styles.todoItems}
                                    tokens={{ childrenGap: 8 }}>
                                    <Stack
                                        horizontal
                                        verticalAlign="start"
                                        tokens={{ childrenGap: 6 }}
                                    >
                                        <FontIcon iconName={reopenPagesIcon.iconName} />
                                        <Text>Go to Checklist App page</Text>
                                    </Stack>
                                    <Stack
                                        horizontal
                                        verticalAlign="start"
                                        tokens={{ childrenGap: 6 }}
                                    >
                                        <FontIcon iconName={webPublishIcon.iconName} />
                                        <Text>Select a Channel</Text>
                                    </Stack>

                                    <Stack
                                        horizontal
                                        verticalAlign="start"
                                        tokens={{ childrenGap: 6 }}
                                    >
                                        <FontIcon iconName={checklistIcon.iconName} />
                                        <Text>Follow the instructions</Text>
                                    </Stack>
                                </Stack>
                            </Stack>

                            <Stack horizontalAlign="center">
                                <PrimaryButton
                                    text="Open Checklist App Page"
                                    styles={clickToActionStyles}
                                />
                            </Stack>
                        </div>
                        <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg6">
                            <Stack horizontalAlign="center" verticalAlign="center">
                                <div className={styles.video}>
                                    <img
                                        src={add_checklist_to_team}
                                        alt="add checklist to team"
                                        className={styles.videoContent}
                                    />
                                </div>
                            </Stack>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <Text variant="mediumPlus">
                    {formatComponent("Need Assistance? {contact_page_link}", {
                        contact_page_link: (
                            <Link className={styles.contactUs}>
                                Contact Us <FontIcon iconName="ArrowUpRight" />
                            </Link>
                        )
                    })}
                </Text>
            </div>
        </div>
    )
}

export default ChecklistStaticPage;