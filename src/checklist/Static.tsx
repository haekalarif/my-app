import React, { useContext, useEffect } from "react"
import { IButtonStyles, Stack, mergeStyleSets, Text, PrimaryButton, Link, FontIcon } from "@fluentui/react";
import AddChecklistToTeam from "../images/gifs/add_checklist_to_team.gif";
import { formatComponent } from "../components/AutomationRules";
// import NewLanguageSelector from "../components/NewLanguageSelector";
// import { app } from "@microsoft/teams-js";
// import { formatComponent } from "../helper/stringHelper";
// import { LangContext } from "../components/App";
// import langHelper from "../helper/LangHelper";

interface INewStatic {
    // setLanguageText: Function,
    // setLanguage: Function
}

const Static = (props: INewStatic) => {
    // const strings = useContext(LangContext);

    const styles = mergeStyleSets({
        wrapper: {
            padding: 20
        },
        title: {
            fontSize: 28,
            fontWeight: "bold",
            color: "#0078d4",
            textAlign: "center"
        },
        body: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "0px",
            gap: "10px", // Ensure gap is a string with units
            "@media(min-width: 768px)": {
                flexDirection: "row",
                gap: "50px",
                padding: "0px 50px",
            },
            "& > div": {
                width: "100%",  // Ensure divs take 100% on mobile
                "@media(min-width: 768px)": {
                    width: "50%",  // Adjust width for desktop, accounting for the gap
                }
            }
        },
        subTitle: {
            fontSize: 18
        },
        cardFooter: {
            textAlign: "center"
        },
        cardFooterText: {
            fontSize: 18
        },
        ctaButtonText: {
            fontWeight: 300,
            fontSize: 16,
            color: "#fff",
        },
        contactUs: {
            textDecoration: "underline",
            cursor: "pointer",
            color: "#323130"
        }
    });

    const productButtonStyles: IButtonStyles = {
        root: {
            borderRadius: 0,
            fontSize: 16,
            height: 60,
            width: 160
        }
    };
    // =================
    // Handler Functions
    // =================
    // const handleProductButtonClick = () => app.openLink(`https://teams.microsoft.com/l/app/${import.meta.env['VITE_APP_APP_ID']}?source=app-details-dialog`);

    const handleProductButtonTextRender = () => (
        <Stack horizontal verticalAlign="center">
            <Text style={{
                fontWeight: 300,
                fontSize: 16,
                color: "#fff",
            }}>
                I'm Ready
                {/* {strings.components.Static.ImReady} */}
            </Text>
        </Stack>
    );

    // const onChangeLanguage = (lang: string): Promise<void> => {
    //     props.setLanguageText(langHelper(lang));
    //     props.setLanguage(lang);
    //     return;
    // }

    return (
        <div className={styles.wrapper}>
            <div className="ms-Grid">
                <div className="ms-Grid-row" dir="ltr" style={{ marginBottom: 20 }}>
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        <Stack horizontalAlign="end">
                            {/* <NewLanguageSelector onChange={onChangeLanguage} /> */}
                        </Stack>
                    </div>

                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        <Stack horizontalAlign="center">
                            <Text className={styles.title}>Add Checklist As A Service to a Team</Text>
                        </Stack>
                    </div>
                </div>

                <div className="ms-Grid-row" dir="ltr" style={{ marginBottom: 30 }}>
                    <div className={styles.body}>
                        <div>
                            <img src={AddChecklistToTeam} style={{ width: "100%" }} />
                        </div>
                        <div>
                            <div style={{ width: "100%", paddingTop: 40 }}>
                                <Stack tokens={{ childrenGap: 20 }} horizontalAlign="center">
                                    <div style={{
                                        fontWeight: 600,
                                        fontSize: 20,
                                        color: "rgb(50, 49, 48)",
                                        display: "inline",
                                        fontFamily: "Segoe UI"
                                    }}
                                        dangerouslySetInnerHTML={{ __html: "When you're ready, click the button below to open the product page, and <strong>Add Checklist As A Service to a Team.</strong>" }} />

                                    <Text variant="xLarge" style={{ fontWeight: 600 }}>
                                        {formatComponent("When you're ready, click the button below to open the product page, and <strong>Add Checklist As A Service to a Team.</strong>", {})}
                                    </Text>
                                    <PrimaryButton
                                        styles={productButtonStyles}
                                        // onClick={handleProductButtonClick}
                                        onRenderText={handleProductButtonTextRender}
                                    />
                                </Stack>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ms-Grid-row" dir="ltr">
                    <div className={styles.cardFooter}>
                        <Text className={styles.cardFooterText}>
                            Need Assistance contact us
                            {/* {formatComponent(strings.components.Static.needAssistance, {
                                contact_page_link: (
                                    <Link className={styles.contactUs}>
                                        {strings.components.Static.contactUs} <FontIcon iconName="ArrowUpRight" />
                                    </Link>
                                )
                            })} */}
                        </Text>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default Static;