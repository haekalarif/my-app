import React, { useEffect, useState } from "react";
import { ActionButton, BaseButton, Button, Callout, Checkbox, IButtonStyles, ICalloutContentStyleProps, ICalloutContentStyles, ICheckboxStyleProps, ICheckboxStyles, IPersonaProps, IStyleFunctionOrObject, mergeStyleSets, Stack, Text, } from "@fluentui/react";
import { useId } from '@fluentui/react-hooks';


interface IProfile {
    user: IPersonaProps,
    // signOut: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement | BaseButton | Button | HTMLSpanElement>
}


const styles = mergeStyleSets({
    navContainer: {
        display: "flex",
        justifyContent: "right",
        marginLeft: "14px",
    },
    profileImageWrapper: {
        borderRadius: "50%",
        border: "1px solid #000000",
        display: "flex",
        width: "30px",
        height: "30px",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer"
    },
    calloutProfileImageWrapper: {
        borderRadius: "50%",
        border: "1px solid #a0a0a0",
        display: "flex",
        width: "100px",
        height: "100px",
        "@media(max-width: 991px)": {
            width: "80px",
            height: "80px",
        },
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer"
    },
    calloutProfileInitials: {
        fontSize: "42px",
        "@media(max-width: 991px)": {
            fontSize: "28px"
        }
    },
    text: {
        fontSize: "18px",
        "@media(max-width: 991px)": {
            fontSize: "16px"
        }
    },
    emailText: {
        color: "#696969",
        "@media(max-width: 991px)": {
            fontSize: "12px"
        }
    },
    domainText: {
        cursor: "context-menu",
        "@media(max-width: 991px)": {
            fontSize: "12px"
        }
    },
    // notificationCheckboxWrapper: {
    //     marginTop: "auto",
    //     "@media(max-width: 991px)": {
    //         fontSize: "12px"
    //     }
    // },
    initialsText: {
        textAlign: "center"
    },
    actionButton: {
        width: 130,
    },
    calloutContainer: {
        width: "420px !important",
        "@media(max-width: 991px)": {
            width: "auto"
        },
        maxWidth: "",
        padding: '20px 24px',
        borderTop: "4px solid #0078d4",
    }
});

const calloutStyles: IStyleFunctionOrObject<ICalloutContentStyleProps, ICalloutContentStyles> = {
    beak: {
        display: "none"
    },
    calloutMain: {
        ">*:not(:first-child)": {
            marginTop: 20
        }
    }
}

const signOutStyles: IButtonStyles = {
    root: {
        height: "0px"
    },
    label: {
        "@media(max-width: 991px)": {
            fontSize: "12px"
        }
    }
}
const checkboxStyles: IStyleFunctionOrObject<ICheckboxStyleProps, ICheckboxStyles> = {
    root: {
        marginTop: "auto",
    },
    text: {
        "@media(max-width: 991px)": {
            fontSize: "12px"
        }
    }

}
function Profile(props: IProfile): JSX.Element {

    // const text = React.useContext(LangContext);
    const user: IPersonaProps = props.user;
    const splitName = user.text.split(" ");
    const initials = splitName.length == 1 ? splitName[0].charAt(0) : splitName[0].charAt(0) + splitName[splitName.length - 1].charAt(0);
    const domainName = user.secondaryText.split("@").pop();
    const labelId = useId('callout-label');
    const descriptionId = useId('callout-description');
    const buttonId = useId('callout-button');
    const [isCalloutVisible, setIsCalloutVisible] = useState<boolean>(false);

    useEffect(() => {
        const now = new Date();
        console.log(now.getTimezoneOffset())
    }, []);
    return (
        <div>
            <div className={styles.navContainer}>
                <span className={styles.profileImageWrapper} id={buttonId} onClick={() => setIsCalloutVisible(value => !!!value)}>
                    <Text className={styles.initialsText}>{initials}</Text>
                </span>
            </div>
            {isCalloutVisible &&
                <Callout
                    className={styles.calloutContainer}
                    ariaLabelledBy={labelId}
                    ariaDescribedBy={descriptionId}
                    role="dialog"
                    gapSpace={0}
                    target={`#${buttonId}`}
                    onDismiss={() => setIsCalloutVisible(false)}
                    setInitialFocus
                    preventDismissOnLostFocus={true}
                    styles={calloutStyles}
                >
                    <Stack
                        horizontal
                        horizontalAlign="space-between"
                        verticalAlign="center"
                    >
                        <Text className={styles.domainText}>{domainName}</Text>
                        <ActionButton
                            text={"Sign Out"}
                            styles={signOutStyles}
                        // onClick={props.signOut}
                        />
                    </Stack>
                    <Stack>
                        <Stack horizontal horizontalAlign="space-between">
                            <Stack>
                                <span className={styles.calloutProfileImageWrapper}>
                                    <Text className={`${styles.initialsText} ${styles.calloutProfileInitials}`}>{initials}</Text>
                                </span>
                            </Stack>
                            <Stack>
                                <Text className={styles.text}>
                                    <strong>
                                        {user.text}
                                    </strong>
                                </Text>
                                <Text className={styles.emailText}>{user.secondaryText}</Text>
                                <Checkbox styles={checkboxStyles} label="Send me email notification" />
                            </Stack>
                        </Stack>
                    </Stack>
                </Callout>
            }
        </div>
    );
}

export default Profile;

