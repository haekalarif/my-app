import { IFontStyles, IStackTokens, ITextProps, PrimaryButton, Stack, Text, mergeStyleSets, IStyle } from "@fluentui/react";
import axios from "axios";
import React, { useEffect } from "react";
import success from "../images/Success.png";
import logo from "../images/Logo.png";
import teamswork from "../images/TeamsWork Logo.png";
import animation from "../images/ConfettisAnimation.gif";

const classNames = mergeStyleSets({
    animation: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: -1,
    },
    bodyImage: {
        width: "400px",
        display: "block",
        padding: "auto",
        margin: "auto",
    },
    mainBody: {
        display: "block",
        margin: "auto",
        padding: "100px 200px",
        flexFlow: "row nowrap",
        boxSizing: "border-box",
        overflow: "hidden",
        backgroundImage: `url(${animation})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        "@media(max-width: 768px)": {
            padding: "0px"
        },
    },
    bodyTitle: {
        WebkitFontSmoothing: "antialiased",
        fontSize: "18px",
        fontWeight: 600,
        color: "black",
    },
    verticalStacks: {
        verticalAlgin: "center",
    },
    informationKey: {
        fontWeight: "bold",
        height: "auto",
        width: "12%",
        minWidth: "160px"
    },
    informationValue: {
        height: "auto",
        margin: "auto",
        padding: "auto",
    },
    buttons: {
        marginInline: "auto",
        borderRadius: 8,
        padding: 20,
        selectors: {
            'span': {
                margin: '0px !important',
            }
        }
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh', // Use relative unit (viewport height)
    },
    textBody: {
        margin: "15px",
        display: "flex",
        textAlign: "center",
    },
    menuHeader: {
        display: "flex",
        flexFlow: "row nowrap",
        width: "auto",
        height: "auto",
        boxSizing: "border-box",
        alignItems: "center",
        backgroundColor: "rgb(1, 32, 58)",
        minHeight: "47px",
        padding: "0px 32px",
        boxShadow: "rgba(0, 0, 0, 0.133) 0px 6.4px 14.4px 0px, rgba(0, 0, 0, 0.11) 0px 1.2px 3.6px 0px",
    },
    menuImage: {
        width: "140px",
        display: "block",
    },
    menuTitle: {
        WebkitFontSmoothing: "antialiased",
        fontSize: "14px",
        fontWeight: 600,
        color: "rgb(200, 200, 200)",
        outline: "none",
        textDecoration: "none",
        margin: "8px"
    },
    thank: {
        color: '#0078d4',
        fontSize: 64,
        fontWeight: "bold",
    },
    subs: {
        fontSize: 24,
        color: "#000000"
    },
    ticketingApp: {
        color: '#0078d4',
        fontSize: 24,
        fontWeight: "bold"
    },
    textInfo: {
        border: '1px solid #ededed',
        marginTop: '20px',
        padding: '10px 15px',
        borderRadius: '8px',
        backgroundColor: '#fff',
        selectors: {
            '&>*:not(:first-child)': {
                marginTop: '10px',
            },
        }
    },
});

const horizontalGapStackTokens: IStackTokens = {
    childrenGap: 15,
};

// const styles
const popUpGettingStarted = (link: string) => window.open(link);

const MenuHeader: React.FunctionComponent<any> = (props) => {
    return (
        <div className={classNames.menuHeader}>
            {/* Kitameraki Logo as a hyperlink to the landing page home page */}
            <a href="https://www.teamswork.app/" className={classNames.menuImage} title="TeamsWork Home Page" aria-label="TeamsWork Home Page">
                <img src={teamswork} className={classNames.menuImage} />
            </a>
            <a className={classNames.menuTitle} title="Configure Subscription Home Page" aria-label="Configure Subscription Home Page" >
                | Ticketing App Subscription Activation
            </a>
        </div>
    );
};
const Complete: React.FC = (props) => {
    return (
        <div>
            <header>
                <MenuHeader />
            </header>
            <body className={classNames.wrapper}>
                <div className={classNames.mainBody}>
                    <div className="ms-Grid" dir="ltr">
                        <div className={classNames.textBody}>
                            <Stack horizontalAlign="center">
                                <Text className={classNames.thank}>Thank You!</Text>
                                <Text className={classNames.subs}>For Subscribing to our <Text className={classNames.ticketingApp}>Ticketing App!</Text></Text>
                                <Stack className={classNames.textInfo}>
                                    <Text>You can close this window, return to Ticketing App and enjoy your new Benefits.</Text>
                                    <PrimaryButton className={classNames.buttons} onClick={() => popUpGettingStarted('https://teams.microsoft.com/')}>
                                        Navigate to Microsoft Teams
                                    </PrimaryButton>
                                    <Text>If you need Assistance with your subscription, please <a href="https://www.teamswork.app/contact" target="_blank">contact us.</a></Text>
                                </Stack>
                            </Stack>
                        </div>
                    </div>
                </div>
            </body>
        </div >
    );
}
export default Complete;