import React from "react";
import { FontIcon, IButtonStyles, PrimaryButton, Stack, Text, mergeStyleSets } from "@fluentui/react";
import step2 from "../images/step2.webp";
import step3 from "../images/step3.gif";
// import * as msTeams from "@microsoft/teams-js"

const styles = mergeStyleSets({
    wrapper: {
        padding: 20
    },
    header: {
        selectors: {
            "&>*": {
                marginBottom: 14
            }
        }
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#0078d4"
    },
    subTitle: {
        fontSize: 18
    },
    cardItem: {
        border: "2px solid #ededed",
        padding: 20,
        borderRadius: 8,
        "@media(max-width: 480px)": {
            marginBottom: 20
        }
    },
    cardHeader: {
        textAlign: "center",
        marginBottom: 12
    },
    cardHeaderText: {
        fontSize: 24,
        fontWeight: "bold"
    },
    cardBody: {
        display: "flex",
        flexFlow: "column",
        width: "auto",
        height: "auto",
        boxSizing: "borderBox",
        textAlign: "center",
        marginBottom: 42
    },
    cardBodyText: {
        fontSize: 18
    },
    cardFooter: {
        textAlign: "center"
    },
    cardFooterText: {
        fontSize: 18
    }

    ,
    cardItem2: {
        backgroundColor: "#f4f4f4"
    },
    ctaButtonText: {
        fontWeight: 300,
        fontSize: 16,
        color: "#fff",
        marginRight: 14
    },
    image: {
        maxWidth: "100%"
    },
    contactUs: {
        textDecoration: "underline",
        cursor: "pointer"
    }
});

const ctaButtonStyles: IButtonStyles = {
    root: {
        backgroundColor: "#4642c6",
        borderRadius: 8,
        height: "",
        padding: "10px 6px",
        fontSize: 16
    },
    rootHovered: {
        backgroundColor: "#3C39AA"
    },
    rootPressed: {
        backgroundColor: "#2F2C86"
    }
}

const ProductPage: React.FunctionComponent<any> = (props) => {
    return (
        <div className={styles.wrapper}>
            <div className="ms-Grid">
                <div className="ms-Grid-row" dir="ltr">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        <Stack
                            horizontalAlign="center"
                            className={styles.header}
                        >
                            <Text className={styles.title}>Let's get started with your 1st Ticketing Instance!</Text>
                            {/* <Stack horizontalAlign="center"> */}
                            <Text className={styles.subTitle}>You've successfully added Ticketing As A Service to your Teams <b>Personal App</b>.</Text>
                            <Text className={styles.subTitle}>To start using it, follow these 3 simple steps to install Ticketing As A Service in a <b>Team channel</b>: </Text>
                            {/* </Stack> */}
                        </Stack>
                    </div>
                </div>
                <div className="ms-Grid-row" dir="ltr">
                    <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg4">
                        <div className={styles.cardItem}>
                            <div className={styles.cardHeader}>
                                <Text className={styles.cardHeaderText}>STEP 1</Text>
                            </div>
                            <div className={styles.cardBody}>
                                <Text className={styles.cardBodyText}>Click below button and open</Text>
                                <Text className={styles.cardBodyText}>the <strong>Ticketing Product Page</strong></Text>
                            </div>
                            <div className={styles.cardFooter}>
                                <PrimaryButton
                                    styles={ctaButtonStyles}
                                    onRenderText={() => (
                                        <Stack
                                            horizontal
                                            verticalAlign="center"
                                        >
                                            <Text className={styles.ctaButtonText}>Open Ticketing Product Page</Text>
                                            <FontIcon
                                                iconName="ChevronRight"
                                                style={{ marginLeft: 4, fontSize: 12 }}
                                            />
                                        </Stack>
                                    )
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg4">
                        <div className={`${styles.cardItem} ${styles.cardItem2}`}>
                            <div className={styles.cardHeader}>
                                <Text className={styles.cardHeaderText}>STEP 2</Text>
                            </div>
                            <div className={styles.cardBody}>
                                <Text className={styles.cardBodyText}>On the Product page, click</Text>
                                <Text className={styles.cardBodyText}>on <strong>Add to a team</strong></Text>
                            </div>
                            <div className={styles.cardFooter}>
                                <img className={styles.image} src={step2} />
                            </div>
                        </div>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md4 ms-lg4">
                        <div className={styles.cardItem}>
                            <div className={styles.cardHeader}>
                                <Text className={styles.cardHeaderText}>STEP 3</Text>
                            </div>
                            <div className={styles.cardBody}>
                                <Text className={styles.cardBodyText}><strong>Select the Channel</strong> where you</Text>
                                <Text className={styles.cardBodyText}>want to add the Ticketing App and</Text>
                                <Text className={styles.cardBodyText}><strong>Follow the instructions.</strong></Text>
                            </div>
                            <div className={styles.cardFooter}>
                                <img className={styles.image} src={step3} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ms-Grid-row" dir="ltr">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        <div className={styles.cardFooter}>
                            <Text className={styles.cardFooterText}>Need Assistance? <span className={styles.contactUs}>Contact Us!</span></Text>
                        </div>
                    </div>
                </div>
            </div>
            {/* <PrimaryButton
                text="Click me"
                onClick={() => {
                    msTeams.executeDeepLink("https://teams.microsoft.com/l/app/aa6b770e-6b8c-4096-9648-5239295ecadc?source=app-details-dialog")
                }}
            /> */}
        </div>
    )
}

export default ProductPage;