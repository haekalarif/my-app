import React, { useState } from "react";
import { CommandButton, FontIcon, IButtonStyles, Link, mergeStyleSets, PrimaryButton, Stack, Text } from "@fluentui/react";
import bg_mobile from "../images/bg_mobile.webp";
import bg_tablet from "../images/bg_tablet.webp";
import bg_web from "../images/bg_web.webp";
import { formatComponent } from "./AutomationRules";
import new_ticketing_instance_thumbnail from "../images/new_ticketing_instance_thumbnail.webp";
import { newWindowOpen } from "../helper/helper";

const styles = mergeStyleSets({
    wrapper: {
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        backgroundSize: "100% 100%",
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
    body: {
        height: "82vh",
        width: "100vw",
        display: 'flex', // Enables Flexbox
        justifyContent: 'center', // Horizontally center
        alignItems: 'center', // Vertically center
        flexDirection: 'column', // Ensure content stacks vertically
        overflowX: "hidden",
    },
    title: {
        background: 'linear-gradient(to right, #558fee, #084f9b)', // Gradient colors
        backgroundClip: "text",
        color: "transparent",
        textAlign: "center",
        fontWeight: 600,
        lineHeight: "1.3",
        fontSize: "11vw",
        '@media (min-width: 480px)': {
            fontSize: "10vw",
        },
        '@media (min-width: 640px)': {
            fontSize: "9vw",
        },
        "@media(min-width: 1024px)": {
            fontSize: "6vw",
        }
    },
    subTitle: {
        background: '#558fee', // Gradient colors
        backgroundClip: "text",
        // color: "transparent",
        display: "inline-block",
        textAlign: "center",
        fontSize: "3.5vw",
        '@media (min-width: 480px)': {
            fontSize: "3vw",
        },
        "@media(min-width: 640px)": {
            fontSize: "3vw",
        },
        "@media(min-width: 1024px)": {
            fontSize: "2vw",
        }
    },
    textContent: {
        display: "inline-block",
        textAlign: "center",
        fontWeight: 400,
        marginTop: 20,
        maxWidth: "70%",
        fontSize: "4vw",
        '@media (min-width: 480px)': {
            maxWidth: "70%",
            fontSize: "3.8vw",
        },
        '@media (min-width: 640px)': {
            maxWidth: "60%",
            fontSize: "3vw",
        },
        "@media(min-width: 1024px)": {
            maxWidth: "50%",
            fontSize: "2.5vw",
        }
    },
    langSelectorWrapper: {
        marginTop: 4,
        marginRight: 10,
    },
    link: {
        textDecoration: "underline",
        cursor: "pointer",
        color: "#0078d4 !important"
    },
    contactText: {
        fontSize: "3.5vw",
        '@media (min-width: 480px)': {
            fontSize: "3vw",
        },
        '@media (min-width: 640px)': {
            fontSize: "2vw",
        },
        "@media(min-width: 1024px)": {
            fontSize: "1.2vw",
        }
    },
    footer: {
        textAlign: "center",
        marginLeft: 20,
        marginRight: 20,
        '@media (min-width: 480px)': {
            marginLeft: 20,
            marginRight: 20,
            textAlign: "start",
        },
        '@media (min-width: 640px)': {
            marginLeft: 30,
            marginRight: 30,
            textAlign: "start",
        },
        "@media(min-width: 1024px)": {
            marginLeft: 50,
            marginRight: 50,
            textAlign: "start",
        }
    },


    // step 2
    title2: {
        background: 'linear-gradient(to right, #558fee, #084f9b)', // Gradient colors
        backgroundClip: "text",
        color: "transparent",
        textAlign: "center",
        fontWeight: 600,
        marginBottom: 10,
        fontSize: "6vw",
        '@media (min-width: 480px)': {
            fontSize: "5vw",
        },
        '@media (min-width: 640px)': {
            fontSize: "4vw",
        },
        "@media(min-width: 1024px)": {
            fontSize: "3vw",
        }
    },
    videoWrapper: {
        position: "relative",
        overflow: "hidden",
        minWidth: "85vw",
        minHeight: "30vh",
        border: "double 0.7em transparent", /* Transparent border to allow gradient */
        backgroundImage: "linear-gradient(white, white), linear-gradient(to right, #558fee, #084f9b)",
        borderRadius: 20,
        backgroundClip: "content-box, border-box",
        backgroundOrigin: "border-box",
        display: "flex",
        justifyContent: 'center', // Horizontally center
        alignItems: 'center', // Vertically center
        '@media (min-width: 480px)': {
            minWidth: "80vw",
            minHeight: "40vh",
        },
        '@media (min-width: 640px)': {
            minWidth: "70vw",
            minHeight: "55vh",
        },
        "@media(min-width: 1024px)": {
            minWidth: "55vw",
            minHeight: "65vh",
        }
    },
    watchTheTutorial: {
        color: "#fff",
        fontSize: "3.5vw",
        fontWeight: 300,
        '@media (min-width: 480px)': {
            fontSize: "3vw"
        },
        '@media (min-width: 640px)': {
            fontSize: "2vw"
        },
        "@media(min-width: 1024px)": {
            fontSize: "1.3vw"
        },
    },
    disabledTextColor: {
        color: "#d2d0ce",
        fontSize: "3.5vw",
        fontWeight: 300,
        '@media (min-width: 480px)': {
            fontSize: "3vw"
        },
        '@media (min-width: 640px)': {
            fontSize: "2vw"
        },
        "@media(min-width: 1024px)": {
            fontSize: "1.3vw"
        },
    },
    video: {
        position: "absolute",
        width: "100%",
        height: "100%"
        // position: "relative"
    },
    thumbnail: {
        position: "absolute",
        width: "100%",
        height: "100%"
    },
    instructionText: {
        fontWeight: 600,
        fontSize: "4.2vw",
        '@media (min-width: 480px)': {
            fontSize: "3.5vw",
        },
        '@media (min-width: 640px)': {
            fontSize: "3.2vw",
        },
        "@media(min-width: 1024px)": {
            fontSize: "2.5vw",
        }
    },
    instructionTextWrapper: {
        padding: "0px 20px",
        '@media (min-width: 480px)': {
            maxWidth: "80vw",
            maxHeight: "40vh",
        },
        '@media (min-width: 640px)': {
            maxWidth: "70vw",
            maxHeight: "55vh",
        },
        "@media(min-width: 1024px)": {
            maxWidth: "55vw",
            maxHeight: "65vh",
        }
    }
});
const nextStyles: IButtonStyles = {
    label: {
        fontWeight: 300,
    },
    root: {
        marginTop: 30,
        borderRadius: 4,
        padding: "16px 20px",
        fontSize: "3.5vw",
        minHeight: "1vw",
        minWidth: "36vw",
        '@media (min-width: 480px)': {
            fontSize: "3vw",
            minHeight: "1vw",
            minWidth: "28vw",
        },
        '@media (min-width: 640px)': {
            fontSize: "2vw",
            minHeight: "1vw",
            minWidth: "23vw",
        },
        "@media(min-width: 1024px)": {
            fontSize: "1.3vw",
            minHeight: "2vw",
            minWidth: "14vw",
        },
    }
}
const TicketingStaticPage: React.FunctionComponent = () => {

    const pages = {
        congratulation: 1,
        preWatchVideo: 2,
        instruction: 3
    }
    const [step, setStep] = useState<number>(1);
    const handleNext = () => setStep(step + 1);
    const handleClickVideoLink = () => newWindowOpen("https://www.youtube.com/watch?v=pIULVvp9RvY");
    const onClickThumbnailVideo = () => {
        handleNext();
        handleClickVideoLink();
    }

    return (
        <div className={styles.wrapper}>
            <Stack horizontalAlign="end">
                <div className={styles.langSelectorWrapper}>
                    <CommandButton
                        // id={props.id}
                        iconProps={{ iconName: "Globe" }}
                        text={"EN"}
                        menuProps={{ items: [] }}
                    />
                </div>
            </Stack>
            <Stack className={styles.body}>
                {/* Step 1 */}
                {(step === pages.congratulation) && <>
                    <Text className={styles.title}>Congratulations!</Text>
                    <Text className={styles.subTitle}>You've successfully added Ticketing as a personal app.</Text>
                    <Text className={styles.textContent}>👉Next, let’s get you set up with your first ticketing instance!</Text>
                    <PrimaryButton styles={nextStyles} onClick={handleNext}>Next</PrimaryButton>
                </>}
                {/* Step 2 */}
                {([pages.preWatchVideo, pages.instruction].includes(step)) && <>
                    <Text className={styles.title2}>Add Ticketing in a Team Channel</Text>
                    <div className={styles.videoWrapper}>
                        {(step === pages.preWatchVideo) &&
                            <img
                                src={new_ticketing_instance_thumbnail}
                                alt="new ticketing instance thumbnail"
                                className={styles.thumbnail}
                                onClick={onClickThumbnailVideo}
                            />
                        }
                        {(step === pages.instruction) &&
                            <Stack className={styles.instructionTextWrapper}>
                                <Text className={styles.instructionText}>
                                    Follow the instructions in the YouTube video to add Ticketing in a Team channel.
                                </Text>
                                <Text className={styles.instructionText}>
                                    {formatComponent("To reopen the video, {video_link}", {
                                        video_link: (
                                            <Link className={styles.link} onClick={handleClickVideoLink}>
                                                Click here <FontIcon iconName="ArrowUpRight" />
                                            </Link>
                                        )
                                    })}
                                </Text>
                                <br />
                                <Text className={styles.instructionText}>
                                    After creating your Ticketing instance, return to this page to explore Ticketing personal app.
                                </Text>
                            </Stack>
                        }
                    </div>
                </>}
            </Stack>
            {/* Step 3 */}
            <Stack
                horizontalAlign="start"
                className={styles.footer}>
                <Text className={styles.contactText}>
                    {formatComponent("Need Assistance? {contact_page_link}", {
                        contact_page_link: (
                            <Link className={styles.link}>
                                Contact Us <FontIcon iconName="ArrowUpRight" />
                            </Link>
                        )
                    })}
                </Text>
            </Stack>
        </div >
    )
}

export default TicketingStaticPage;