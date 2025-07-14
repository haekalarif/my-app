import React from 'react'
import { Text, PrimaryButton, mergeStyleSets, IStackTokens, Stack } from '@fluentui/react'
import '../App.css'
// import LoadingDialog from '../components/dialogs/LoadingDialog';
// import { LoadingMessageConst } from '../Types';
// import { useBoolean } from '@fluentui/react-hooks';
// import { LangContext } from '../Page';
// import { popUpFAQ } from '../helper/Helper';
// import { useHistory } from 'react-router-dom';

const className = mergeStyleSets({
    mainBody: {
        backgroundColor: "white",
        display: "block",
        margin: "auto",
        padding: "20px",
        flexFlow: "row nowrap",
        width: "60%",
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

// Redirection page when permission is needed by the applicaiton
const PermissionMissing: React.FC<any> = props => {
    function popUpFAQ(arg0: string): void {
        throw new Error('Function not implemented.');
    }

    function getConsent(event: any): void {
        throw new Error('Function not implemented.');
    }

    // const history = useHistory();

    // const [isLoading, { toggle: toggleLoading }] = useBoolean(false);

    // const text = React.useContext(LangContext);
    // const loadingMessageConst = LoadingMessageConst(text.lang);

    // const getConsent = async () => {
    //     toggleLoading();

    //     const isConsentGiven = await props.consent(history.location.state);
    //     if (isConsentGiven) {
    //         toggleLoading();
    //         return;
    //     }
    //     toggleLoading();
    //     return;
    // }

    return (
        <div className="wrapper">
            <div className={className.mainBody}>
                <Stack horizontalAlign='center' >
                    <Text variant="large"><b>Permission Missing</b></Text>
                </Stack>
                <Stack horizontalAlign='center' className={className.stacks} tokens={tokens}>
                    <Text variant="medium">Oups, for some reason the App cannot fetch the required permissions. 😓</Text>
                    <Text variant="medium">If you have recently installed this App, please refresh this page in 2 minutes: </Text>
                    <PrimaryButton
                        iconProps={{ iconName: "Refresh" }}
                        onClick={async () => {
                            // history.push("/Landing");
                            // await props.reload()
                        }}
                    >
                        Refresh
                    </PrimaryButton>
                    <Text variant="medium">
                        If you still see this page after several refresh, this way to <a onClick={getConsent}>give permission</a> again. This way to <a onClick={() => popUpFAQ("http://teamswork.app/contact")}>contact us</a>.
                    </Text>
                </Stack>
                {/* <LoadingDialog
                    hideDialog={!!!isLoading}
                    message={loadingMessageConst.updatePermission}
                /> */}
            </div >
        </div>
    )
};



export default PermissionMissing;