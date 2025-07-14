import React from 'react'
import { Text, mergeStyleSets, IStackTokens, Stack, FontIcon } from '@fluentui/react'
import '../App.css'
// import { popUpFAQ } from '../helper/Helper';
import reloadTab from "../images/reloadTab.webp";
import { formatComponent, textFormat } from './AutomationRules';

const className = mergeStyleSets({
    mainBody: {
        backgroundColor: "white",
        display: "block",
        margin: "auto",
        padding: "20px",
        flexFlow: "row nowrap",
        width: "50%",
        minWidth: "500px",
        minHeight: "100%",
        boxSizing: "border-box",
        overflow: "hidden",
    },
    wrapper: {
        backgroundColor: "white",
        maxWidth: "95%",
        margin: "10px",
        display: "flex",
        flexDirection: "column",
        padding: "auto",
        alignContent: "center",
    },
    stacks: {
        marginTop: "14px",
        marginBottom: "14px",
    }
})

const tokens: IStackTokens = { childrenGap: 10 };
interface IErrorString {
    title?: string,
    message?: string,
    tips?: string,
    contactUs?: string,
    errorMessage?: string,
    errorDetail?: string,
}

// Redirection page when permission is needed by the applicaiton
const ErrorPage: React.FC<any> = props => {
    let params = new URLSearchParams(window.location.search);
    const errorCode = props.errorCode; //get id checklist after create new checklist


    const ErrorPageV1 = (props: IErrorString) => {
        return (
            <div className="wrapper">
                <div className={className.mainBody}>
                    <Stack className={className.stacks} tokens={tokens}>
                        <Stack horizontal verticalAlign='center' tokens={tokens}>
                            <FontIcon iconName={"ErrorBadge"} style={{ color: "red", fontWeight: "bolder" }} />
                            <Text variant="large">
                                <b>{props.title}</b>
                            </Text>
                        </Stack>
                        <Text variant="medium">{props.message}</Text>
                        <Text variant="medium">{props.tips}</Text>
                        <Text variant="medium">{
                            formatComponent(props.contactUs, {
                                contact_us: <a href="youtube.com" style={{ textDecoration: "underline" }}>contact us.</a>
                            })}
                        </Text>
                    </Stack>
                </div >
            </div>
        )
    }

    const ErrorPageV2 = (props: IErrorString) => {
        return (
            <div className="wrapper">
                <div className={className.mainBody}>
                    <Stack className={className.stacks} tokens={tokens}>
                        <Stack horizontal verticalAlign='center' tokens={tokens}>
                            <FontIcon iconName={"ErrorBadge"} style={{ color: "red", fontWeight: "bolder" }} />
                            <Text variant="large">
                                <b>{props.title}</b>
                            </Text>
                        </Stack>
                        <Text variant="medium">{props.message}</Text>
                        <img src={reloadTab} width={180} height={120} />
                        <Text variant="medium">{textFormat(props.errorMessage, { message: props.errorDetail })}</Text>
                        <Text variant="medium">
                            <b>Still need help?</b>
                        </Text>
                        <Text variant="medium">This way to send an error report, <b><a href="" style={{ "textDecoration": "underline" }}>contact us</a></b></Text>
                        <Text variant="medium">To help us resolve the issue faster:</Text>
                        <ul>
                            <li>
                                <Text variant="medium">Share a video or screenshoot of the problem.</Text>
                            </li>
                            <li>
                                <Text variant="medium">If that is not convenient, let us know:</Text>
                            </li>
                            <ul>
                                <li>
                                    <Text variant="medium">Are you using TeamsWork app on Teams Desktop, Web, or Mobile?</Text>
                                </li>
                                <li>
                                    <Text variant="medium">What actions were you performing before the issue happen?</Text>
                                </li>
                            </ul>
                        </ul>
                        <Text variant="medium">Your feedback helps us improve. Thank you!</Text>
                    </Stack>
                </div >
            </div>
        )
    }

    let errorString: IErrorString = {};
    switch (errorCode) {
        case "authenticationFailed":
            errorString = {
                title: "Error: Sign-in Failed",
                message: "Oups, for some reason, we couldn't authenticate you 😓",
                tips: "You can try to reload the tab or come back in a few minutes to see if the service has turned back on. ",
                contactUs: "If after several attempts the problem still persists, this way to {contact_us}"
            }
            return <ErrorPageV1 {...errorString} />
        case "serviceUnavailable":
            errorString = {
                title: "Error: Service Unavailable",
                message: "The service is temporarily unavailable as the site server is not available for usage.",
                tips: "You can try to reload the tab or come back in a few minutes to see if the service has turned back on. ",
                contactUs: "If after several attempts the problem still persists, this way to {contact_us}"
            };
            return <ErrorPageV1 {...errorString} />
        case "consentMissing":
            errorString = {
                title: "Error: Admin Consent Missing",
                message: "Oups, for some reason, we couldn't get the required permission 😓",
                tips: "It may took up to several minutes for the permission to propagate, come back later to see if it has loaded.",
                contactUs: "If after several attempts the problem still persists, this way to {contact_us}"
            };
            return <ErrorPageV1 {...errorString} />
        case "timeOut":
            errorString = {
                title: "Error: Timeout",
                message: "The request took longer than the timeour period due to an unknown reason",
                tips: "Check your network connection, try to reload the tab, or come back to the tab in a few minutes and try again.",
                contactUs: "If after several attempts the problem still persists, this way to {contact_us}"
            };

            return <ErrorPageV1 {...errorString} />

        case "missingContext":
            errorString = {
                title: "Error: App Loading Failed",
                message: "The app couldn't load because Microsoft Teams did not send the expected context information",
                errorMessage: "Error message: {message}",
                errorDetail: props.errorDetail
            }
            return <ErrorPageV2 {...errorString} />
        default:
            errorString = {
                title: "Error: App Loading Failed",
                message: "We could not load the app, Please reload the tab or try again later.",
                errorMessage: "Error message: {message}",
                errorDetail: props.errorDetail ?? "No error detail"
            }
            return <ErrorPageV2 {...errorString} />
    }
};


export default ErrorPage;